import express, { Request, Response } from "express";
import { RoomServices } from "../Services/room";
import { validateRooms } from "../Validators/RoomsValidators";
import { RoomsInterface } from "../Interfaces/RoomsInterface";
export const roomsRouter = express.Router();
const roomsService = new RoomServices();


roomsRouter.get("/", async (req: Request, res: Response) => {
  try{
    const rooms = await roomsService.fetchAll();
    res.json(rooms)
  }catch (error) {
  res.status(500).json( {message:'Rooms not found'})
  }
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
roomsRouter.get("/:id", async (req: Request, res: Response) => {
  try{
    const roomsId = parseInt(req.params.id,10);
    const rooms = await roomsService.fetchById(roomsId)
    res.json(rooms)
  } catch (error) {
    res.status(404).json({error})
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
roomsRouter.post("/", async (req: Request, res: Response) => {
  const validationError = validateRooms(req, res);
  if (validationError) {
    return;
  }
  const newRoom = await roomsService.create(req.body);
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
roomsRouter.put("/:id", async (req: Request, res: any) => {
  try {
    const roomId = parseInt(req.params.id, 10); 
    const roomData: Partial<RoomsInterface> = req.body; 

    
    const updatedRoom = await roomsService.update(roomId, roomData);

    
    if (updatedRoom) {
      res.status(200).json(updatedRoom);
    } else {
      res.status(404).json({ error: "Room not found" });
    }
  } catch (error) {
   
    res.status(500).json({ error: ' Update not found ' });
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
roomsRouter.delete('/:id', async (req: Request, res: Response) => {
  try{
const roomId  = parseInt(req.params.id,10);
const isDeleted = await roomsService.delete(roomId);
if(isDeleted) {
  res.status(200).json({message: 'Room deleted sucessfully'})
}else {
  res.status(404).json({error: 'Room not found'})
}
  }catch (error) {
    res.status(500).json({error: 'Error delete Room'})
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