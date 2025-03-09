import { Request, Response, Router } from "express";
import { ContactServices } from "../Services/contact";
import { connectDB } from "../Utils/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const contactRouter = Router();
const contactServices = new ContactServices();

contactRouter.get("/", async (req: Request, res: Response) => {
  let connection;
  try {
    connection = await connectDB();
    const [rows] = await connection.execute("SELECT * FROM contacts");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obteener los contactos" });
  }finally{
    if (connection) connection.end();
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
  const contactId = req.params.id;
  let connection;

  try {
    connection = await connectDB();
    const [rows] = await connection.execute('SELECT * FROM contacts WHERE id = ?', [contactId]);

    if (Array.isArray(rows) && rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Contacto no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el contacto:', error);
    res.status(500).json({ message: 'Error al obtener el contacto' });
  } finally {
    if (connection) connection.end();
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
  let connection;

  
  if (typeof archived !== 'boolean') {
    return res.status(400).json({ error: 'El valor de archived debe ser un booleano' });
  }

  try {
    connection = await connectDB();

    
    const [updateResult] = await connection.execute<ResultSetHeader>(
      'UPDATE contacts SET archived = ? WHERE id = ?',
      [archived, contactId]
    );

    
    if (updateResult.affectedRows > 0) {
      
      const [updatedContact] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM contacts WHERE id = ?',
        [contactId]
      );

      
      res.json(updatedContact[0]);
    } else {
      res.status(404).json({ error: 'Contacto no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el contacto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    
    if (connection) {
      connection.end();
    }
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
  const contactId = req.params.id;
  let connection;

  try {
    connection = await connectDB();
    const [result] = await connection.execute<ResultSetHeader>(
      'DELETE FROM contacts WHERE id = ?',
      [contactId]
    );

    if (result.affectedRows > 0) {
      res.status(204).json({ message: 'Contacto eliminado' });
    } else {
      res.status(404).json({ message: 'Contacto no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el contacto:', error);
    res.status(500).json({ message: 'Error al eliminar el contacto' });
  } finally {
    if (connection) {
      connection.end();
    }
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
