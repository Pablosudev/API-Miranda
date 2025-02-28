import { UsersInterface } from "../Interfaces/UsersInterface";
import { ServiceInterface } from "../Interfaces/ServiceInterface";
import { UsersModel } from "../Models/users";
import * as bcryptjs from "bcryptjs";

export class UserServices implements ServiceInterface<UsersInterface> {
  async fetchAll(): Promise<UsersInterface[]> {
    try {
      const users: UsersInterface[] = await UsersModel.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async fetchById(id: string): Promise<UsersInterface | undefined> {
    try {
      const userId: UsersInterface | null = await UsersModel.findById(id);
      if (!userId) {
        throw new Error("User not found");
      }
      return userId;
    } catch (error) {
      throw error;
    }
  }
  async create(user: UsersInterface): Promise<UsersInterface> {
    try {
      let newUser = new UsersModel(user);
      const hashedPassword = await bcryptjs.hash(user.password, 10);
      newUser.password = hashedPassword;
      await newUser.save();
      return newUser;
    } catch (error) {
      throw error;
    }
  }
  async update(
    id: string,
    user: UsersInterface
  ): Promise<UsersInterface | null> {
    try {
      if (user.password) {
        user.password = await bcryptjs.hash(user.password, 10);
      }

      const updatedUser = await UsersModel.findByIdAndUpdate(id, user, {
        new: true,
      }).exec();

      if (!updatedUser) {
        throw new Error("User not found");
      }

      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Failed to update user");
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const userToDelete = await UsersModel.findById(id);
      if (!userToDelete) {
        throw new Error("User not founf");
      }

      await UsersModel.findByIdAndDelete(id);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
