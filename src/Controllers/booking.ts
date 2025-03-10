import { Request, Response, Router } from "express";
import { BookingServices } from "../Services/booking";
import { validateBookings } from "../Validators/BookingsValidators";
import { BookingsInterface } from "../Interfaces/BookingsInterface";


export const bookingsRouter = Router();
const bookingService = new BookingServices();

bookingsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const bookingList = await bookingService.fetchAll();
    res.json(bookingList);
  } catch (error) {
    res.status(500).json({ message: "Bookings not found" });
  }
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
  try {
    const bookingId = parseInt(req.params.id, 10);
    const booking = await bookingService.fetchById(bookingId);
  } catch (error) {
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
  const validationError = validateBookings(req, res);
  if (validationError) {
    return;
  }
  const newBooking = await bookingService.create(req.body);
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
  try{
    const bookingId = parseInt(req.params.id, 10);
    const bookingData: Partial<BookingsInterface> = req.body;
    const updatedBooking = await bookingService.update(bookingId, bookingData);
    if(updatedBooking){
      res.status(200).json(updatedBooking)
    } else {
      res.status(404).json({error: 'Booking not update'})
    } 
  }catch (error){
    res.status(500).json({error: 'Booking not update'})
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
  try{
    const bookingId = parseInt(req.params.id, 10);
    const isDeleted = await bookingService.delete(bookingId);

    if(isDeleted) {
      res.status(200).json({message: 'Booking deleted sucessfully'})
    }else {
      res.status(404).json({error: 'Booking not found'})
    }
      }catch (error) {
        res.status(500).json({error: 'Error delete Booking'})
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
