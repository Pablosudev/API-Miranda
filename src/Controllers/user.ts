import { Request, Response, Router } from "express";
import users from '../Data/users.json';
import { UserServices } from "../Services/user";
export const userRouter = Router();
const userServices = new UserServices
userRouter.get("/", (req: Request, res: Response) => {
  const userList = userServices.fetchAll();
  res.json(userList);
});
userRouter.get('/:id', (req: Request, res: Response) => {
    const server = userServices.fetchById(parseInt(req.params.id));
    if (server) {
        res.json(server);
    } else {
        res.status(404).json({ message: 'Server not found' });
    }
});