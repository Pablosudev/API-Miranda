import { Request, Response, Router } from "express";
import { RoomServices } from "../Services/room";

export const roomsRouter = Router    ();
const roomsService = new RoomServices
roomsRouter.get("/", (req: Request, res: Response) => {
  const roomList = roomsService.fetchAll();
  res.json(roomList);
});
roomsRouter.get('/:id', (req: Request, res: Response) => {
    const room = roomsService.fetchById(parseInt(req.params.id));
    if (room) {
        res.json(room);
    } else {
        res.status(404).json({ message: 'Room not found' });
    }
});
roomsRouter.post('/', (req: Request , res: Response) => {
    const newRoom = roomsService.create(req.body);
    res.status(201).json(newRoom)
});
roomsRouter.put('/:id', (req: Request, res: Response) => {
    const updatedRoom = roomsService.update(parseInt(req.params.id), req.body);
    if (updatedRoom !== null) {
        res.status(204).json(updatedRoom);
    } else {
        res.status(404).json({ message: 'Room not found' });
    }
});
roomsRouter.delete('/:id', (req: Request, res: Response) => {
    const deletedRoom = roomsService.delete(parseInt(req.params.id));
    if (deletedRoom) {
        res.status(204).json({ message: 'Room deleted' });
    } else {
        res.status(404).json({ message: 'Room not found' });
    }
});