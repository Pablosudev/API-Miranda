import { Request, Response, Router } from "express";
import { UserServices } from "../Services/user";
import { validateUser } from "../Validators/UsersValidators";
import { UsersInterface } from "../Interfaces/UsersInterface";

export const userRouter = Router();

const userServices = new UserServices();

userRouter.get("/", async (req: Request, res: Response) => {
  try {
    console.log('obteniendo ususarios...')
    const userList = await userServices.fetchAll();
    console.log('usuarios ')
    res.json(userList);
  } catch (error) {
    res.status(500).json({ message: "Users not found" });
  }
});

/**
 * @swagger
 * /api/v1/users :
 *   get:
 *     summary: Obtiene una lista de usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   full_name:
 *                     type: string
 *                     example: Pepito
 *                   id:
 *                     type: number
 *                     example: 1
 *                   email:
 *                     type: string
 *                     example: "1234"
 *                   start_date:
 *                     type: string
 *                     example: 7/20/2022
 *                   job_description:
 *                     type: string
 *                     example: Assistant Manager
 *                   phone_numuber:
 *                     type: string
 *                     example: "154444"
 *                   status:
 *                     type: string
 *                     example: Active
 *                   department:
 *                     type: string
 *                     example: finance
 *
 */

userRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const user = await userServices.fetchById(userId);
  } catch (error) {
    res.status(404).json({ error });
  }
});
/**
 @swagger
 * /api/v1/users/:id :
 *   get:
 *     summary: Obtiene un Usuario
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   full_name:
 *                     type: string
 *                     example: Pepito
 *                   id:
 *                     type: number
 *                     example: 1
 *                   email:
 *                     type: string
 *                     example: "1234"
 *                   start_date:
 *                     type: string
 *                     example: 7/20/2022
 *                   job_description:
 *                     type: string
 *                     example: Assistant Manager
 *                   phone_numuber:
 *                     type: string
 *                     example: "154444"
 *                   status:
 *                     type: string
 *                     example: Active
 *                   department:
 *                     type: string
 *                     example: finance 
 */
userRouter.post("/", async (req: Request, res: Response) => {
  const validationError = validateUser(req, res);
  if (validationError) {
    return;
  }
  const newUser = await userServices.create(req.body);
  res.status(201).json(newUser);
});
/**
 @swagger
 * /api/v1/users/create :
 *   post:
 *     summary: Crea un usuario
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Crear usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   full_name:
 *                     type: string
 *                     example: Pepito
 *                   id:
 *                     type: number
 *                     example: 1
 *                   email:
 *                     type: string
 *                     example: "1234"
 *                   start_date:
 *                     type: string
 *                     example: 7/20/2022
 *                   job_description:
 *                     type: string
 *                     example: Assistant Manager
 *                   phone_numuber:
 *                     type: string
 *                     example: "154444"
 *                   status:
 *                     type: string
 *                     example: Active
 *                   department:
 *                     type: string
 *                     example: finance
 */
userRouter.put("/:id", async (req: Request, res: any) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const userData: Partial<UsersInterface> = req.body;

    const updatedUser = await userServices.update(userId, userData);

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: " Update not found " });
  }
});
/**
 @swagger
 * /api/v1/users/edit/:id :
 *   put:
 *     summary: Editar un usuario
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Editar un usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   full_name:
 *                     type: string
 *                     example: Pepito
 *                   id:
 *                     type: number
 *                     example: 1
 *                   email:
 *                     type: string
 *                     example: "1234"
 *                   start_date:
 *                     type: string
 *                     example: 7/20/2022
 *                   job_description:
 *                     type: string
 *                     example: Assistant Manager
 *                   phone_numuber:
 *                     type: string
 *                     example: "154444"
 *                   status:
 *                     type: string
 *                     example: Active
 *                   department:
 *                     type: string
 *                     example: finance
 */
userRouter.delete("/:id", async (req: Request, res: Response) => {
  try{
    const userId = parseInt(req.params.id, 10);
    const user = await userServices.delete(userId);
  if(user) {
    res.status(200).json({message: 'User deleted sucessfully'})
  }else {
    res.status(404).json({error: 'User not found'})
  }
    }catch (error) {
      res.status(500).json({error: 'Error delete User'})
    }
  });
/**
 @swagger
 * /api/v1/users/delete :
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Eliminar un usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   full_name:
 *                     type: string
 *                     example: Pepito
 *                   id:
 *                     type: number
 *                     example: 1
 *                   email:
 *                     type: string
 *                     example: "1234"
 *                   start_date:
 *                     type: string
 *                     example: 7/20/2022
 *                   job_description:
 *                     type: string
 *                     example: Assistant Manager
 *                   phone_numuber:
 *                     type: string
 *                     example: "154444"
 *                   status:
 *                     type: string
 *                     example: Active
 *                   department:
 *                     type: string
 *                     example: finance
 */
