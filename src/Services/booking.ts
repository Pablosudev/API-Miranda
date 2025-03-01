import { ServiceInterface } from "../Interfaces/ServiceInterface";
import { BookingsInterface } from "../Interfaces/BookingsInterface";
import { BookingModel } from "../Models/bookings";

export class BookingServices implements ServiceInterface<BookingsInterface> {
  async fetchAll(): Promise<BookingsInterface[]> {
    try {
      const bookings: BookingsInterface[] = await BookingModel.find();
      return bookings;
    } catch (error) {
      throw error;
    }
  }

  async fetchById(id: string): Promise<BookingsInterface | undefined> {
    try {
      const bookingId: BookingsInterface | null = await BookingModel.findById(
        id
      );
      if (!bookingId) {
        throw new Error("Booking not found");
      }
      return bookingId;
    } catch (error) {
      throw error;
    }
  }
  async create(booking: BookingsInterface): Promise<BookingsInterface> {
    try {
      const newBooking = new BookingModel(booking);
      await newBooking.save();
      return newBooking;
    } catch (error) {
      throw error;
    }
  }
  async update(
    id: string,
    booking: BookingsInterface
  ): Promise<BookingsInterface | null> {
    try {
          const updatedBooking = await BookingModel.findByIdAndUpdate(id, booking, {
            new: true,
          }).exec();
    
          if (!updatedBooking) {
            throw new Error("Booking not found");
          }
    
          return updatedBooking;
        } catch (error) {
          console.error("Error updating booking:", error);
          throw new Error("Failed to update booking");
        }
      }
  async delete(id: string): Promise<boolean> {
    try {
      const bookingToDelete = await BookingModel.findById(id);
      if (!bookingToDelete) {
        throw new Error("Room not found");
      }

      await BookingModel.findByIdAndDelete(id);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
