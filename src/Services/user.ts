import { UsersInterface } from "../Interfaces/UsersInterface";
import { ServiceInterface } from "../Interfaces/ServiceInterface";
import * as bcryptjs from "bcryptjs";
import { Users } from "../Models/users";

export class UserServices {
  async fetchAll(): Promise<UsersInterface[]> {
  try {
    console.log("Consultando la base de datos...");
    const users = await Users.findAll();
    console.log("Usuarios obtenidos:", users); 
    return users.map((user) => user.get({ plain: true }));
  } catch (error) {
    console.error("Error en el servicio:", error); 
    throw new Error(`Error fetching users ${error}`);
  }
}

  async fetchById(id: number): Promise<UsersInterface> {
    try {
      const userId= await Users.findByPk(id);
      if (!userId) {
        throw new Error("User not found");
      }
      return userId.get({ plain:true });
    } catch (error) {
      throw new Error(`Error fetching userID ${error}`);
    }
  }
  async create(user: UsersInterface): Promise<UsersInterface> {
    try {
      const newUser = await Users.create(user);
      const hashedPassword = await bcryptjs.hash(user.password, 10);
      newUser.password = hashedPassword;
      await newUser.get({ plain: true});
      return newUser;
    } catch (error) {
      throw new Error('Failed to create User');
    }
  }
  async update(
    id: number,
    user: Partial<UsersInterface>
  ): Promise<UsersInterface | null> {
    try {
      const userData: Partial<UsersInterface> = Object.fromEntries(
        Object.entries(user).filter(([_, value]) => value !== undefined)
      );

      const [affectedRows] = await Users.update(userData, {
        where: { id },
      });

      if (affectedRows === 0) {
        throw new Error("User not found");
      }

      const updatedUser = await Users.findByPk(id);

      return updatedUser ? updatedUser.get({ plain: true }) : null;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Failed to update user");
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const userToDelete = await Users.findByPk(id);
      if (!userToDelete) {
        throw new Error("User not found");
      }

      await userToDelete.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  }
}
