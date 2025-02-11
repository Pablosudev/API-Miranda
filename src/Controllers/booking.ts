import { Request, Response, Router } from "express";
import { BookingServices } from "../Services/booking";



export const bookingsRouter = Router();
const bookingService = new BookingServices();

/**
 * @swagger
 * tags:
 *   - name: bookings
 *     description: Operaciones relacionadas con reservas
 */
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
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: Servidor 1
 *                   ip:
 *                     type: string
 *                     example: 192.168.1.1
 *                   puerto:
 *                     type: integer
 *                     example: 8080
 *                   estado:
 *                     type: string
 *                     example: activo
 */

bookingsRouter.get("/api/v1/bookings", (req: Request, res: Response) => {
  const bookingList = bookingService.fetchAll();
  res.json(bookingList);
});
bookingsRouter.get("/api/v1/bookings/details/:id", (req: Request, res: Response) => {
  const booking = bookingService.fetchById(parseInt(req.params.id));
  if (booking) {
    res.json(booking);
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
});
bookingsRouter.post("/api/v1/bookings/create", (req: Request, res: Response) => {
  const newBooking = bookingService.create(req.body);
  res.status(201).json(newBooking);
});
bookingsRouter.put("/api/v1/bookings/edit/:id", (req: Request, res: Response) => {
  const updatedBooking = bookingService.update(parseInt(req.params.id), req.body);
  if (updatedBooking !== null) {
    res.status(204).json(updatedBooking );
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
});
bookingsRouter.delete("/api/v1/bookings/delete/:id", (req: Request, res: Response) => {
  const deletedBooking = bookingService.delete(parseInt(req.params.id));
  if (deletedBooking) {
    res.status(204).json({ message: "Booking deleted" });
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
});
