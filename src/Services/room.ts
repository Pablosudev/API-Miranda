import { ServiceInterface } from "../Interfaces/ServiceInterface";
import { RoomsInterface } from "../Interfaces/RoomsInterface";
import rooms from "../Data/rooms.json"
import { RoomModel } from "../Models/rooms";


export class RoomServices implements ServiceInterface<RoomsInterface>{
    private rooms : RoomsInterface [] = rooms as unknown as RoomsInterface [];

    async fetchAll(): Promise<RoomsInterface[]> {
        try{
            const rooms: RoomsInterface [] = await RoomModel.find();
            return rooms
        } catch (error) {
            throw error;
        }
        
    }

    async fetchById(id: number ): Promise<RoomsInterface> {
        try{
            const roomId: RoomsInterface | null = await RoomModel.findById(id)
            if(!roomId){
                throw new Error('Room not found')
            }
            return roomId
        }catch(error){
            throw error
        }
    }
    async create(room: RoomsInterface ): Promise<RoomsInterface>  {
        try{
            const newRoom = new RoomModel(room)
            await newRoom.save();
            return newRoom;
        }catch(error){
            throw error
        }
    }
    async update(id: number, room: RoomsInterface): Promise<RoomsInterface | null> {
        try {
            const roomToUpdate: RoomsInterface | null = await RoomModel.findById(id);
            if (roomToUpdate === null) {
                throw new Error('Room not found');
            }
    
            const updatedRoom = { ...roomToUpdate, ...room };
            await RoomModel.findByIdAndUpdate(id, updatedRoom, { new: true });
    
            return updatedRoom;
        } catch (error) {
            throw error;
        }
    }
    
    async delete(id:number): Promise<boolean> {
        try {
            const roomToDelete = await RoomModel.findById(id);
            if (!roomToDelete) {
                throw new Error('Habitación no encontrada');
            }

            await RoomModel.findByIdAndDelete(id);
            return true;
        } catch (error) {
            throw error;
        }
    }

}
