import { Request, Response, Router } from "express";
import { ContactServices } from "../Services/contact";

export const contactRouter = Router();
const contactServices = new ContactServices
contactRouter.get("/", (req: Request, res: Response) => {
  const contactList = contactServices.fetchAll();
  res.json(contactList);
});
contactRouter.get('/:id', (req: Request, res: Response) => {
    const contact = contactServices.fetchById(parseInt(req.params.id));
    if (contact) {
        res.json(contact);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
contactRouter.post('/', (req: Request , res: Response) => {
    const newContact = contactServices.create(req.body);
    res.status(201).json(newContact)
});
contactRouter.put('/:id', (req: Request, res: Response) => {
    const updatedContact = contactServices.update(parseInt(req.params.id), req.body);
    if (updatedContact !== null) {
        res.status(204).json(updatedContact);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
contactRouter.delete('/:id', (req: Request, res: Response) => {
    const deletedContact = contactServices.delete(parseInt(req.params.id));
    if (deletedContact) {
        res.status(204).json({ message: 'User deleted' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
