import { RoomsInterface } from "../Interfaces/RoomsInterface";

export class RoomsValidators {
  validateProperties(room: RoomsInterface): string[] {
    const errorMessages: string[] = [];
    const requiredProperties: string[] = [
      'room_number',
      'id',
      'room_price',
      'room_offer',
      'status',
      'room_type',
      'amenities'
    ];

    requiredProperties.forEach((property) => {
      if (!(property in room)) {
        errorMessages.push(`La propiedad [${property}] es obligatoria en Rooms.`);
      }
    });

    return errorMessages;
  }

  validateRooms(rooms: RoomsInterface[]): string[] {
    const errorMessages: string[] = [];

    rooms.forEach((room, index) => {
      const roomErrors = this.validateProperties(room);
      if (roomErrors.length > 0) {
        errorMessages.push(`Errores en la habitación ${index + 1}:`);
        errorMessages.push(...roomErrors);
      }
    });

    return errorMessages;
  }
}
