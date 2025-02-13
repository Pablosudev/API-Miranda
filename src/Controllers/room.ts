import { Request, Response, Router } from "express";
import { RoomServices } from "../Services/room";

export const roomsRouter = Router();
const roomsService = new RoomServices();

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
 *                     type: number
 *                     example: 1
 *                   room_number:
 *                     type: number
 *                     example: 40
 *                   room_price:
 *                     type: number
 *                     example: 192
 *                   room_offer:
 *                     type: number
 *                     example: 80
 *                   status:
 *                     type: string
 *                     example: Booked
 *                   room_type:
 *                      type: string
 *                      example: suite
 *                   amenities:
 *                      type: string
 *                      example: 
 * 
 * @swagger
 * /api/v1/rooms/:id :
 *   delete:
 *     summary: Borra un habitación
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Elimina habitación
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   room_number:
 *                     type: number
 *                     example: 40
 *                   room_price:
 *                     type: number
 *                     example: 192
 *                   room_offer:
 *                     type: number
 *                     example: 80
 *                   status:
 *                     type: string
 *                     example: Booked
 *                   room_type:
 *                      type: string
 *                      example: suite
 *                   amenities:
 *                      type: string
 *                      example: WIFI
 
 * @swagger
 * /api/v1/rooms/5 :
 *   get:
 *     summary: Obtiene una habitación
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Habitación por id
 *         content:
 *           application/json:
 *             schema:
 *               
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   room_number:
 *                     type: number
 *                     example: 40
 *                   room_price:
 *                     type: number
 *                     example: 192
 *                   room_offer:
 *                     type: number
 *                     example: 80
 *                   status:
 *                     type: string
 *                     example: Booked
 *                   room_type:
 *                      type: string
 *                      example: suite
 *                   amenities:
 *                      type: string
 *                      example: WIFI
 * @swagger
 * /api/v1/rooms/create :
 *   post:
 *     summary: Crear una habitación
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Crea una habitación
 *         content:
 *           application/json:
 *             schema:
 *               
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 4131
 *                   room_number:
 *                     type: number
 *                     example: 12
 *                   room_price:
 *                     type: number
 *                     example: 213
 *                   room_offer:
 *                     type: number
 *                     example: 150
 *                   status:
 *                     type: string
 *                     example: Active
 *                   room_type:
 *                      type: string
 *                      example: Suite
 *                   amenities:
 *                      type: string
 *                      example: WIFI
 *  @swagger
 * /api/v1/rooms/edit/:id :
 *   put:
 *     summary: Edita una habitación
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Edita una habitación
 *         content:
 *           application/json:
 *             schema:
 *               
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   room_number:
 *                     type: number
 *                     example: 40
 *                   room_price:
 *                     type: number
 *                     example: 192
 *                   room_offer:
 *                     type: number
 *                     example: 80
 *                   status:
 *                     type: string
 *                     example: Booked
 *                   room_type:
 *                      type: string
 *                      example: suite
 *                   amenities:
 *                      type: string
 *                      example: WIFI
 */

roomsRouter.get("/api/v1/rooms", (req: Request, res: Response) => {
  const roomList = roomsService.fetchAll();
  res.json(roomList);
});
roomsRouter.get("/api/v1/rooms/:id", (req: Request, res: Response) => {
  const roomsId = roomsService.fetchById(parseInt(req.params.id));
  if (roomsId) {
    res.json(roomsId);
  } else {
    res.status(404).json({ message: "Habitación no encontrada" });
  }
});
roomsRouter.post("/api/v1/rooms/create", (req: Request, res: Response) => {
  const newRoom = roomsService.create(req.body);
  res.status(201).json(newRoom);
});
roomsRouter.put("/api/v1/rooms/edit/:id", (req: Request, res: Response) => {
  const roomId = parseInt(req.params.id);
  const updatedRoom = roomsService.update(roomId, req.body);
  if (updatedRoom) {
    res.status(204).json(updatedRoom);
  } else {
    res.status(404).json({ message: "Room not found" });
  }
});
roomsRouter.delete("/api/v1/rooms/:id", (req: Request, res: Response) => {
  const roomId = parseInt(req.params.id);
  const deletedRoom = roomsService.delete(roomId);
  if (deletedRoom) {
    res.status(200).json({ message: "Room deleted" });
  } else {
    res.status(404).json({ message: "Room not found" });
  }
});
