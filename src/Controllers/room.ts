import { Request, Response, Router } from "express";
import { RoomServices } from "../Services/room";

export const roomsRouter = Router    ();
const roomsService = new RoomServices


/**
 * @swagger
 * tags:
 *   - name: rooms
 *     description: Operaciones relacionadas con habitaciones
 */
/**
 * @swagger
 * /api/v1/rooms :
 *   get:
 *     summary: Obtiene una lista de habitaciones
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Lista de habitaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: Servidor 1
 *                   ip:
 *                     type: string
 *                     example: 192.168.1.1
 *                   puerto:
 *                     type: integer
 *                     example: 8080
 *                   estado:
 *                     type: string
 *                     example: activo
 */

roomsRouter.get("/api/v1/rooms", (req: Request, res: Response) => {
    const roomList = roomsService.fetchAll();
    res.json(roomList);
  });
roomsRouter.get('/api/v1/rooms/:id', (req: Request, res: Response) => {
    const room = roomsService.fetchById(parseInt(req.params.id));
    if (room) {
        res.json(room);
    } else {
        res.status(404).json({ message: 'Room not found' });
    }
});
roomsRouter.post('/api/v1/rooms/create', (req: Request , res: Response) => {
    const newRoom = roomsService.create(req.body);
    res.status(201).json(newRoom)
});
roomsRouter.put('/api/v1/rooms/edit/:id', (req: Request, res: Response) => {
    const updatedRoom = roomsService.update(parseInt(req.params.id), req.body);
    if (updatedRoom !== null) {
        res.status(204).json(updatedRoom);
    } else {
        res.status(404).json({ message: 'Room not found' });
    }
});
roomsRouter.delete('/api/v1/rooms/:id', (req: Request, res: Response) => {
    const deletedRoom = roomsService.delete(parseInt(req.params.id));
    if (deletedRoom) {
        res.status(204).json({ message: 'Room deleted' });
    } else {
        res.status(404).json({ message: 'Room not found' });
    }
});