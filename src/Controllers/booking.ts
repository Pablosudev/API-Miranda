import { Request, Response, Router } from "express";
import { BookingServices } from "../Services/booking";
import { validateBookings } from "../Validators/BookingsValidators";

export const bookingsRouter = Router();
const bookingService = new BookingServices();

/**
 * @swagger
 * /api/v1/bookings :
 *   get:
 *     summary: Obtiene una lista de reservas
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   full_name:
 *                     type: string
 *                     example: Pepito
 *                   date_bookings:
 *                     type: string
 *                     example: 7/20/2022
 *                   check-in:
 *                     type: string
 *                     example: 7/20/2022
 *                   check-out:
 *                     type: string
 *                     example: 7/20/2022
 *                   special_request:
 *                     type: string
 *                     example: extra towels
 *                   room_type:
 *                     type: string
 *                     example: single
 *                   number_room:
 *                     type: number
 *                     example: 3
 *                   status:
 *                     type: string
 *                     example: Check-In
 *                   price:
 *                     type: number
 *                     example:
 * @swagger
 * /api/v1/bookings/details/:id :
 *   get:
 *     summary: Obtiene una Reserva
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: Reserva
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   full_name:
 *                     type: string
 *                     example: Pepito
 *                   date_bookings:
 *                     type: string
 *                     example: 7/20/2022
 *                   check-in:
 *                     type: string
 *                     example: 7/20/2022
 *                   check-out:
 *                     type: string
 *                     example: 7/20/2022
 *                   special_request:
 *                     type: string
 *                     example: extra towels
 *                   room_type:
 *                     type: string
 *                     example: single
 *                   number_room:
 *                     type: number
 *                     example: 3
 *                   status:
 *                     type: string
 *                     example: Check-In
 *                   price:
 *                     type: number
 *                     example: 150
 * @swagger
 * /api/v1/bookings/create :
 *   post:
 *     summary: Crea una Reserva
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: Crear reserva
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   full_name:
 *                     type: string
 *                     example: Pepito
 *                   date_bookings:
 *                     type: string
 *                     example: 7/20/2022
 *                   check-in:
 *                     type: string
 *                     example: 7/20/2022
 *                   check-out:
 *                     type: string
 *                     example: 7/20/2022
 *                   special_request:
 *                     type: string
 *                     example: extra towels
 *                   room_type:
 *                     type: string
 *                     example: single
 *                   number_room:
 *                     type: number
 *                     example: 3
 *                   status:
 *                     type: string
 *                     example: Check-In
 *                   price:
 *                     type: number
 *                     example: 150
 * @swagger
 * /api/v1/bookings/:id :
 *   delete:
 *     summary: Borrar una Reserva
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: Borrar una reserva
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   full_name:
 *                     type: string
 *                     example: Pepito
 *                   date_bookings:
 *                     type: string
 *                     example: 7/20/2022
 *                   check-in:
 *                     type: string
 *                     example: 7/20/2022
 *                   check-out:
 *                     type: string
 *                     example: 7/20/2022
 *                   special_request:
 *                     type: string
 *                     example: extra towels
 *                   room_type:
 *                     type: string
 *                     example: single
 *                   number_room:
 *                     type: number
 *                     example: 3
 *                   status:
 *                     type: string
 *                     example: Check-In
 *                   price:
 *                     type: number
 *                     example: 150
 * @swagger
 * /api/v1/bookings/edit/:id :
 *   put:
 *     summary: Editar una Reserva
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: Editar una reserva
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   full_name:
 *                     type: string
 *                     example: Pepito
 *                   date_bookings:
 *                     type: string
 *                     example: 7/20/2022
 *                   check-in:
 *                     type: string
 *                     example: 7/20/2022
 *                   check-out:
 *                     type: string
 *                     example: 7/20/2022
 *                   special_request:
 *                     type: string
 *                     example: extra towels
 *                   room_type:
 *                     type: string
 *                     example: single
 *                   number_room:
 *                     type: number
 *                     example: 3
 *                   status:
 *                     type: string
 *                     example: Check-In
 *                   price:
 *                     type: number
 *                     example: 150
 */

bookingsRouter.get("/", (req: Request, res: Response) => {
  const bookingList = bookingService.fetchAll();
  res.json(bookingList);
});
bookingsRouter.get(
  "/:id",
  (req: Request, res: Response) => {
    const booking = bookingService.fetchById(parseInt(req.params.id));
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  }
);
bookingsRouter.post(
  "/",
  (req: Request, res: Response) => {
    const validationError = validateBookings(req, res);
        if(validationError) {
          return;
        }
    const newBooking = bookingService.create(req.body);
    res.status(201).json(newBooking);
  }
);
bookingsRouter.put(
  "/:id",
  (req: Request, res: any) => {
    const validationError = validateBookings(req, res);
    if(validationError) {
      return;
    }
    const bookingId = Number(req.params.id);
    const updatedBooking = bookingService.update(bookingId, req.body);
  
    if (updatedBooking) {
      return res.status(200).json(updatedBooking);
    } else {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }
  }
);
bookingsRouter.delete("/:id", (req: Request, res: Response) => {
  const deletedBooking = bookingService.delete(parseInt(req.params.id));
  if (deletedBooking) {
    res.status(204).json({ message: "Booking deleted" });
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
});
