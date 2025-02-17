import { Request, Response, Router } from "express";
import { BookingServices } from "../Services/booking";
import { validateBookings } from "../Validators/BookingsValidators";

export const bookingsRouter = Router();
const bookingService = new BookingServices();

bookingsRouter.get("/", async (req: Request, res: Response) => {
  const bookingList = await bookingService.fetchAll();
  res.json(bookingList);
});
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
 */
bookingsRouter.get("/:id", async (req: Request, res: Response) => {
  const booking =  await bookingService.fetchById(req.params.id);
  if (booking) {
    res.json(booking);
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
});
/**
 @swagger
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
 */
bookingsRouter.post("/", async (req: Request, res: Response) => {
  const validationError = await validateBookings(req, res);
  if (validationError) {
    return;
  }
  const newBooking = bookingService.create(req.body);
  res.status(201).json(newBooking);
});
/**
 @swagger
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
 */
bookingsRouter.put("/:id", async (req: Request, res: any) => {
  const validationError = await validateBookings(req, res);
  if (validationError) {
    return;
  }
  const bookingId = req.params.id;
  const updatedBooking = bookingService.update(bookingId, req.body);

  if (updatedBooking) {
    return res.status(200).json(updatedBooking);
  } else {
    return res.status(404).json({ error: "Reserva no encontrada" });
  }
});
/**
@swagger
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
bookingsRouter.delete("/:id", async (req: Request, res: Response) => {
  const deletedBooking = await bookingService.delete(req.params.id);
  if (deletedBooking) {
    res.status(204).json({ message: "Booking deleted" });
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
});
/**
 @swagger
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
 */