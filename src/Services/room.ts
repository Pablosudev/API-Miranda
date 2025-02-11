import { ServiceInterface } from "../Interfaces/ServiceInterface";
import { RoomsInterface } from "../Interfaces/RoomsInterface";
import rooms from "../Data/rooms.json"

export class RoomServices implements ServiceInterface<RoomsInterface>{
    private rooms : RoomsInterface [] = rooms;

    fetchAll(): RoomsInterface[] {
        return this.rooms;
    }

    fetchById(id: number): RoomsInterface | undefined {
        return this.rooms.find((rooms) => rooms.id === id);
    }
    create(room: RoomsInterface): RoomsInterface {
        const newRoom = { ...room, id: this.rooms.length + 1 };
        this.rooms.push(newRoom);
        return newRoom;
    }
    update(id: number, room: RoomsInterface): RoomsInterface | null {
        const roomToUpdate = this.rooms.filter((room) => room.id === id);
        if (roomToUpdate.length > 0) {
            const updatedRoom = { ...roomToUpdate[0], ...room };
            const finalList = this.rooms.filter((room) => room.id !== id);
            finalList.push(updatedRoom);
            this.rooms = finalList;
            return updatedRoom;
        }
        return null;
    }
    delete(id:number): boolean {
        const roomToDelete = this.rooms.filter((room) => room.id === id);
        if (roomToDelete.length > 0) {
            this.rooms = this.rooms.filter((room) => room.id !== id);
            return true;
        }
        return false;
    }

}
