import { ServiceInterface } from "../Interfaces/ServiceInterface";
import { RoomsInterface } from "../Interfaces/RoomsInterface";
import rooms from "../Data/rooms.json"

export class RoomServices implements ServiceInterface<RoomsInterface>{
    private rooms : RoomsInterface [] = rooms as unknown as RoomsInterface [];

    fetchAll(): RoomsInterface[] {
        return this.rooms;
    }

    fetchById(id: number ){
        return rooms.find((room) => room.id === id);
    }
    create(room: RoomsInterface ): RoomsInterface  {
        console.log(room)
        const newRoom = { ...room, id: this.rooms.length + 1};
        this.rooms.push(newRoom);
        return newRoom;
    }
    update(id: number, room: RoomsInterface): RoomsInterface | null {
        const roomToUpdate = this.rooms.find((room) => room.id ===id); 
        if (roomToUpdate) { 
            const updatedRoom = {...roomToUpdate,...room};
            this.rooms = this.rooms.map((r) => (r.id === id ? updatedRoom : r))
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
