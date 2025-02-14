import { Request, Response, Router } from "express";
import { ContactServices } from "../Services/contact";

export const contactRouter = Router();
const contactServices = new ContactServices

/**
 * @swagger
 * /api/v1/contact :
 *   get:
 *     summary: Obtiene una lista de contactos
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Lista de contactos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     example: "18-11-2021"
 *                   id:
 *                     type: number
 *                     example: 4
 *                   full_name:
 *                     type: string 
 *                     example: "Pablo"
 *                   email:
 *                     type: string
 *                     example: "11618"
 *                   phone:
 *                     type: string
 *                     example: "616474"
 *                   asunto:
 *                      type: string
 *                      example: Room Service Request
 *                   comment:
 *                      type: string
 *                      example: "gsfsgfdsg"
 * 
 * @swagger
 * /api/v1/contact/:id :
 *   delete:
 *     summary: Borra un contacto
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Elimina contacto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     example: "18-11-2021"
 *                   id:
 *                     type: number
 *                     example: 4
 *                   full_name:
 *                     type: string 
 *                     example: "Pablo"
 *                   email:
 *                     type: string
 *                     example: "11618"
 *                   phone:
 *                     type: string
 *                     example: "616474"
 *                   asunto:
 *                      type: string
 *                      example: Room Service Request
 *                   comment:
 *                      type: string
 *                      example: "gsfsgfdsg"
 * @swagger
 * /api/v1/contact/create :
 *   post:
 *     summary: Crear un contacto
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Crea un contacto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     example: "18-11-2021"
 *                   id:
 *                     type: number
 *                     example: 4
 *                   full_name:
 *                     type: string 
 *                     example: "Pablo"
 *                   email:
 *                     type: string
 *                     example: "11618"
 *                   phone:
 *                     type: string
 *                     example: "616474"
 *                   asunto:
 *                      type: string
 *                      example: Room Service Request
 *                   comment:
 *                      type: string
 *                      example: "gsfsgfdsg"
 *  @swagger
 * /api/v1/contact/:id :
 *   get:
 *     summary: Contacto 
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Contacto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     example: "18-11-2021"
 *                   id:
 *                     type: number
 *                     example: 4
 *                   full_name:
 *                     type: string 
 *                     example: "Pablo"
 *                   email:
 *                     type: string
 *                     example: "11618"
 *                   phone:
 *                     type: string
 *                     example: "616474"
 *                   asunto:
 *                      type: string
 *                      example: Room Service Request
 *                   comment:
 *                      type: string
 *                      example: "gsfsgfdsg"
 */


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
