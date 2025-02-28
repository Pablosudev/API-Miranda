import { Request, Response, Router } from "express";
import { UserServices } from "../Services/user";
import { validateUser } from "../Validators/UsersValidators";

export const userRouter = Router();
const userServices = new UserServices();

userRouter.get("/", async (req: Request, res: Response) => {
  const userList = await userServices.fetchAll();
  res.json(userList);
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
  const user = await userServices.fetchById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
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
    if(validationError) {
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
  const validationError = validateUser(req, res);
    if(validationError) {
      return;
    }
  const userId = (req.params.id);
  const updatedUser = await userServices.update(userId, req.body);

  if (updatedUser) {
    return res.status(200).json(updatedUser);
  } else {
    return res.status(404).json({ error: "User not found" });
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
  const deletedUser = await userServices.delete(req.params.id);
  if (deletedUser) {
    res.status(204).json({ message: "User deleted" });
  } else {
    res.status(404).json({ message: "User not found" });
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
