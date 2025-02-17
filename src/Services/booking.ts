import { ServiceInterface } from "../Interfaces/ServiceInterface";
import { BookingsInterface } from "../Interfaces/BookingsInterface";
import bookings from "../Data/bookings.json";

export class BookingServices implements ServiceInterface<BookingsInterface>{
    private bookings : BookingsInterface [] = bookings;

    fetchAll(): BookingsInterface[] {
        return this.bookings;
    }

    fetchById(id: number): BookingsInterface | undefined {
        return this.bookings.find((bookings) => bookings.id === id);
    }
    create(booking: BookingsInterface): BookingsInterface {
        const newBooking = { ...booking, id: this.bookings.length + 1 };
        this.bookings.push(newBooking);
        return newBooking;
    }
    update(id: number, booking: BookingsInterface): BookingsInterface | null {
        const bookingToUpdate = this.bookings.find((booking) => booking.id ===id); 
        if (bookingToUpdate) { 
            const updatedRoom = {...bookingToUpdate,...booking};
            this.bookings = this.bookings.map((r) => (r.id === id ? updatedRoom : r))
            return updatedRoom;
        }
        return null;
    }
    delete(id:number): boolean {
        const bookingToDelete = this.bookings.filter((booking) => booking.id === id);
        if (bookingToDelete.length > 0) {
            this.bookings = this.bookings.filter((booking) => booking.id !== id);
            return true;
        }
        return false;
    }

}
