import { ServiceInterface } from "../Interfaces/ServiceInterface";
import { RoomsInterface } from "../Interfaces/RoomsInterface";
import Rooms from "../Models/rooms";

export class RoomServices implements ServiceInterface<RoomsInterface> {
  async fetchAll(): Promise<RoomsInterface[]> {
    try {
      const rooms = await Rooms.findAll();
      return rooms.map((room) => room.get({ plain: true }));
    } catch (error) {
      throw new Error(`Error fetching rooms ${error}`);
    }
  }

  async fetchById(id: number): Promise<RoomsInterface> {
    try {
      const roomId = await Rooms.findByPk(id);
      if (!roomId) {
        throw new Error(`Room with id ${id} not found`);
      }
      return roomId.get({ plain: true });
    } catch (error) {
      throw new Error(`Error fetching roomId ${error}`);
    }
  }
  async create(room: RoomsInterface): Promise<RoomsInterface> {
    try {
      const newRoom = await Rooms.create(room)
     
      return newRoom.get({plain: true});
    } catch (error) {
      throw new Error('Failed to create room');
    }
  }
  async update(
    id: number,
    room: Partial<RoomsInterface>
  ): Promise<RoomsInterface | null> {
    try {
      const roomData: Partial<RoomsInterface> = Object.fromEntries(
        Object.entries(room).filter(([_, value]) => value !== undefined)
      );

      const [affectedRows] = await Rooms.update(roomData, {
        where: { id },
      });

      if (affectedRows === 0) {
        throw new Error("Room not found");
      }

      const updatedRoom = await Rooms.findByPk(id);

      return updatedRoom ? updatedRoom.get({ plain: true }) : null;
    } catch (error) {
      console.error("Error updating room:", error);
      throw new Error("Failed to update room");
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const room = await Rooms.findByPk(id);
      if (!room) {
        throw new Error("Room not found");
      }

      await room.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  }
}
