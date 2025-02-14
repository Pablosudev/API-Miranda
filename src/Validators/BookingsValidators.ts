import { BookingsInterface } from "../Interfaces/BookingsInterface";

export class BookingsValidators {
  validateProperties(booking: BookingsInterface): string[] {
    const errorMessages: string[] = [];
    const requiredProperties: string[] = [
      "full_name",
      "id",
      "date__booking",
      "check_in",
      "chack_out",
      "special_request",
      "room_type",
      "number_room",
      "status",
      "price"
    ];

    requiredProperties.forEach((property) => {
      if (!(property in booking)) {
        errorMessages.push(
          `La propiedad [${property}] es obligatoria en Bookings.`
        );
      }
    });

    return errorMessages;
  }
  validateContacts(booking: BookingsInterface[]): string[] {
    const errorMessages: string[] = [];

    booking.forEach((booking, index) => {
      const bookingErrors = this.validateProperties(booking);
      if (bookingErrors.length > 0) {
        errorMessages.push(`Errores en la reserva ${index + 1}:`);
        errorMessages.push(...bookingErrors);
      }
    });

    return errorMessages;
  }
}
