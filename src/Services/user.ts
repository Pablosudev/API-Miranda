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
        const userToUpdate = this.users.find((user) => user.id ===id); 
        if (userToUpdate) { 
            const updatedRoom = {...userToUpdate,...user};
            this.users = this.users.map((r) => (r.id === id ? updatedRoom : r))
            return updatedRoom;
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

