import { Request, Response, Router } from "express";
import { UserServices } from "../Services/user";

export const userRouter = Router();
const userServices = new UserServices
userRouter.get("/", (req: Request, res: Response) => {
  const userList = userServices.fetchAll();
  res.json(userList);
});
userRouter.get('/:id', (req: Request, res: Response) => {
    const user = userServices.fetchById(parseInt(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
userRouter.post('/', (req: Request , res: Response) => {
    const newUser = userServices.create(req.body);
    res.status(201).json(newUser)
});
userRouter.put('/:id', (req: Request, res: Response) => {
    const updatedUser = userServices.update(parseInt(req.params.id), req.body);
    if (updatedUser !== null) {
        res.status(204).json(updatedUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
userRouter.delete('/:id', (req: Request, res: Response) => {
    const deletedUser = userServices.delete(parseInt(req.params.id));
    if (deletedUser) {
        res.status(204).json({ message: 'User deleted' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
