import express, { Request, Response } from "express";
import { RoomServices } from "../Services/room";
import { validateRooms } from "../Validators/RoomsValidators";
export const roomsRouter = express.Router();
const roomsService = new RoomServices();


roomsRouter.get("/", (req: Request, res: Response) => {
  const roomList = roomsService.fetchAll();
  res.json(roomList);
});
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
 */
roomsRouter.get("/:id", (req: Request, res: Response) => {
  const roomsId = roomsService.fetchById(parseInt(req.params.id));
  if (roomsId) {
    res.json(roomsId);
  } else {
    res.status(404).json({ message: "Habitación no encontrada" });
  }
});
/**
 @swagger
 * /api/v1/rooms/:id :
 *   get:
 *     summary: Habitación por id
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Obtiene una habitación
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
 */
roomsRouter.post("/", (req: Request, res: Response) => {
  const validationError = validateRooms(req, res);
  if (validationError) {
    return;
  }
  const newRoom = roomsService.create(req.body);
  res.status(201).json(newRoom);
});
/**
 @swagger
 * /api/v1/rooms/5 :
 *   post:
 *     summary: Crea una habitación
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Crea una habitación 
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
 */
roomsRouter.put("/:id", (req: Request, res: any) => {
  const validationError = validateRooms(req, res);
  if (validationError) {
    return;
  }
  const roomId = Number(req.params.id);
  const updatedRoom = roomsService.update(roomId, req.body);

  if (updatedRoom) {
    return res.status(200).json(updatedRoom);
  } else {
    return res.status(404).json({ error: "Habitación no encontrada" });
  }
});
/**
 @swagger
 * /api/v1/rooms/create :
 *   put:
 *     summary: Editar una habitación
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Edita una habitación
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
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
 */
roomsRouter.delete("/:id", (req: Request, res: Response) => {
  const roomId = parseInt(req.params.id);
  const deletedRoom = roomsService.delete(roomId);
  if (deletedRoom) {
    res.status(204).json({ message: "Room deleted" });
  } else {
    res.status(404).json({ message: "Room not found" });
  }
});
/**
 @swagger
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
 */
