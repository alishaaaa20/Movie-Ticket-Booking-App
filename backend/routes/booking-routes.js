import express from 'express';
import { newBooking } from '../controller/booking-controller';

const bookingRouter = express.Router();

bookingRouter.post("/", newBooking);

export default bookingRouter;