import { Request, Response, Router } from "express";
import { UserServices } from "../Services/user";
import { validateUser } from "../Validators/UsersValidators";

export const userRouter = Router();
const userServices = new UserServices();

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
 * @swagger
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
 * @swagger
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
 * @swagger
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
 * @swagger
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

userRouter.get("/", (req: Request, res: Response) => {
  const userList = userServices.fetchAll();
  res.json(userList);
});
userRouter.get("/:id", (req: Request, res: Response) => {
  const user = userServices.fetchById(parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
userRouter.post("/", (req: Request, res: Response) => {
  const validationError = validateUser(req, res);
    if(validationError) {
      return;
    }
  const newUser = userServices.create(req.body);
  res.status(201).json(newUser);
});
userRouter.put("/:id", (req: Request, res: Response) => {
  const validationError = validateUser(req, res);
    if(validationError) {
      return;
    }
  const updatedUser = userServices.update(parseInt(req.params.id), req.body);
  if (updatedUser !== null) {
    res.status(204).json(updatedUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
userRouter.delete("/:id", (req: Request, res: Response) => {
  const deletedUser = userServices.delete(parseInt(req.params.id));
  if (deletedUser) {
    res.status(204).json({ message: "User deleted" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
