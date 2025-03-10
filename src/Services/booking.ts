import { ServiceInterface } from "../Interfaces/ServiceInterface";
import { BookingsInterface } from "../Interfaces/BookingsInterface";
import Bookings from "../Models/bookings";

export class BookingServices implements ServiceInterface<BookingsInterface> {
  async fetchAll(): Promise<BookingsInterface[]> {
    try {
      const bookings = await Bookings.findAll();
      return bookings.map((booking) => booking.get({ plain: true }));
    } catch (error) {
      throw new Error(`Error fetching Bookings ${error}`);
    }
  }

  async fetchById(id: number): Promise<BookingsInterface> {
    try {
      const bookingId = await Bookings.findByPk(id);
      if (!bookingId) {
        throw new Error("Booking id not found");
      }
      return bookingId.get({ plain: true });
    } catch (error) {
      throw new Error(`Error fetching bookingId ${error}`);
    }
  }
  async create(booking: BookingsInterface): Promise<BookingsInterface> {
    try {
      const newBooking = await Bookings.create(booking);

      return newBooking.get({ plain: true });
    } catch (error) {
      throw new Error(`Failed to create room`);
    }
  }
  async update(
    id: number,
    booking: Partial<BookingsInterface>
  ): Promise<BookingsInterface | null> {
    try {
      const bookingData: Partial<BookingsInterface> = Object.fromEntries(
        Object.entries(booking).filter(
          ([__dirname, value]) => value !== undefined
        )
      );
      const [affectedRows] = await Bookings.update(bookingData, {
        where: { id },
      });

      if (affectedRows === 0) {
        throw new Error("Booking not found");
      }

      const updatedBooking = await Bookings.findByPk(id);

      return updatedBooking ? updatedBooking.get({ plain: true }) : null;
    } catch (error) {
      console.error("Error updating booking:", error);
      throw new Error("Failed to update booking");
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const booking = await Bookings.findByPk(id);
      if (!booking) {
        throw new Error("Booking not found");
      }

      await booking.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  }
}
