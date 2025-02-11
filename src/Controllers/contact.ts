import { Request, Response, Router } from "express";
import { ContactServices } from "../Services/contact";

export const contactRouter = Router();
const contactServices = new ContactServices



contactRouter.get("/api/v1/contact", (req: Request, res: Response) => {
  const contactList = contactServices.fetchAll();
  res.json(contactList);
});
contactRouter.get('/api/v1/contact/:id', (req: Request, res: Response) => {
    const contact = contactServices.fetchById(parseInt(req.params.id));
    if (contact) {
        res.json(contact);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
contactRouter.post('/api/v1/contact', (req: Request , res: Response) => {
    const newContact = contactServices.create(req.body);
    res.status(201).json(newContact)
});

contactRouter.delete('/api/v1/contact/:id', (req: Request, res: Response) => {
    const deletedContact = contactServices.delete(parseInt(req.params.id));
    if (deletedContact) {
        res.status(204).json({ message: 'User deleted' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
