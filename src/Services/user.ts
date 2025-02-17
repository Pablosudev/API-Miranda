import { UsersInterface } from "../Interfaces/UsersInterface";
import { ServiceInterface } from "../Interfaces/ServiceInterface";
import { UsersModel } from "../Models/users";

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
      const newUser = new UsersModel(user);
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
      const usersToUpdate: UsersInterface | null = await UsersModel.findById(
        id
      ).lean();
      if (usersToUpdate === null) {
        throw new Error("User not found");
      }
      const userObj = usersToUpdate.toObject();

      const updatedUser = { ...userObj, ...user };
      await UsersModel.findByIdAndUpdate(id, updatedUser, { new: true });

      return updatedUser;
    } catch (error) {
      throw error;
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
