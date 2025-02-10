import {  UsersInterface } from "../Interfaces/UsersInterface"
import users from "../Data/users.json"
import { ServiceInterface } from "../Interfaces/ServiceInterface";

export class UserServices implements ServiceInterface<UsersInterface>{
    private users : UsersInterface [] = users;

    fetchAll(): UsersInterface[] {
        return this.users;
    }

    fetchById(id: number): UsersInterface | undefined {
        return this.users.find((users) => users.id === id);
    }
    create(user: UsersInterface): UsersInterface {
        const newUser = { ...user, id: this.users.length + 1 };
        this.users.push(newUser);
        return newUser;
    }
    update(id: number, user: UsersInterface): UsersInterface | null {
        const userToUpdate = this.users.filter((user) => user.id === id);
        if (userToUpdate.length > 0) {
            const updatedUser = { ...userToUpdate[0], ...user };
            const finalList = this.users.filter((user) => user.id !== id);
            finalList.push(updatedUser);
            this.users = finalList;
            return updatedUser;
        }
        return null;
    }
    delete(id:number): boolean {
        const userToDelete = this.users.filter((user) => user.id === id);
        if (userToDelete.length > 0) {
            this.users = this.users.filter((user) => user.id !== id);
            return true;
        }
        return false;
    }

}

