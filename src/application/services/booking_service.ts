import { CreateBookingDTO } from "../dtos/create_booking_dto";
import { Booking } from "../../domain/entities/booking";

export class BookingService {
    async createBooking(dto: CreateBookingDTO): Promise<Booking> {
        
    }
}