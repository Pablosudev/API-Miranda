import { ServiceInterface } from "../Interfaces/ServiceInterface";
import { RoomsInterface } from "../Interfaces/RoomsInterface";
import { RoomModel } from "../Models/rooms";


export class RoomServices implements ServiceInterface<RoomsInterface>{
    

    async fetchAll(): Promise<RoomsInterface[]> {
        try{
            const rooms: RoomsInterface [] = await RoomModel.find();
            return rooms
        } catch (error) {
            throw error;
        }
        
    }

    async fetchById(id: string ): Promise<RoomsInterface> {
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
    async update(id: string, room: RoomsInterface): Promise<RoomsInterface | null> {
        try {
            
              const updatedRoom = await RoomModel.findByIdAndUpdate(id, room, {
                new: true,
              }).exec();
        
              if (!updatedRoom) {
                throw new Error("Room not found");
              }
        
              return updatedRoom;
            } catch (error) {
              console.error("Error updating room:", error);
              throw new Error("Failed to update room");
            }
          }
    
    async delete(id:string): Promise<boolean> {
        try {
            const roomToDelete = await RoomModel.findById(id);
            if (!roomToDelete) {
                throw new Error('Room not found');
            }

            await RoomModel.findByIdAndDelete(id);
            return true;
        } catch (error) {
            throw error;
        }
    }

}
