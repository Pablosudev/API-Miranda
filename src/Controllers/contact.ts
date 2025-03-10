import { Request, Response, Router } from "express";
import { ContactServices } from "../Services/contact";
import Contact from "../Models/contact";

export const contactRouter = Router();
const contactServices = new ContactServices();

contactRouter.get("/", async (req: Request, res: Response) => {
  try {
    const contacts = await contactServices.fetchAll();
    res.json(contacts)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los contactos" });
  }
});
/**
 @swagger
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
 */
contactRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const contactId = parseInt(req.params.id,10)
    const contact = await contactServices.fetchById(contactId)
    res.json(contact)
  }catch (error) {
    res.status(404).json({error})
  }
});
/**
 @swagger
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
 contactRouter.put('/:id', async (req: any, res: any) => {
  const { archived } = req.body;
  const contactId = req.params.id;
  
  if (typeof archived !== 'boolean') {
    return res.status(400).json({ error: 'El valor de archived debe ser un booleano' });
  }

  try {
    
    const [affectedRows] = await Contact.update(
      {archived},
      {where: {id:contactId}}
    )
    if (affectedRows > 0) {
     
      const updatedContact = await Contact.findByPk(contactId);
      res.json(updatedContact);
    } else {
      res.status(404).json({ error: 'Contacto no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el contacto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

/**
 @swagger
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
 */
 contactRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const contactId = parseInt(req.params.id,10);
    const isDeleted = await contactServices.delete(contactId);
    if (isDeleted) {
      res.status(200).json({ message: "Contact deleted successfully"});
    } else {
      res.status(404).json({error: 'Contact not found'});
    }
  } catch (error) {
    
    res.status(500).json({ message: 'Error al eliminar el contacto' });
  } 
});
/**
  @swagger
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
 */