import { DateRange } from "../value_objects/date_range";
import { Property } from "./property";
import { User } from "./user";

export class Booking {
  private readonly id: string;
  private readonly property: Property;
  private readonly user: User;
  private readonly dateRange: DateRange;
  private readonly guestCount: number;
  private status: "CONFIRMED" | "CANCELLED" = "CONFIRMED";
  private totalPrice: number;

  constructor(
    id: string,
    property: Property,
    user: User,
    dateRange: DateRange,
    guestCount: number
  ) {
    if (guestCount <= 0) {
      throw new Error("O número de hóspedes deve ser maior que zero.");
    }
    property.validateGuestCount(guestCount);

    if (!property.isAvailable(dateRange)) {
      throw new Error("Propriedade não disponível para o período selecionado.");
    }

    this.id = id;
    this.property = property;
    this.user = user;
    this.dateRange = dateRange;
    this.guestCount = guestCount;
    this.totalPrice = property.calculateTotalPrice(dateRange);
    this.status = "CONFIRMED";

    property.addBooking(this);
  }

  getId(): string {
    return this.id;
  }

  getProperty(): Property {
    return this.property;
  }

  getUser(): User {
    return this.user;
  }

  getDateRange(): DateRange {
    return this.dateRange;
  }

  getGuestCount(): number {
    return this.guestCount;
  }

  getStatus(): "CONFIRMED" | "CANCELLED" {
    return this.status;
  }

  getTotalPrice(): number {
    return this.totalPrice;
  }

  cancel(currentDate: Date): void {
    if (this.status === "CANCELLED") {
      throw new Error("Reserva já cancelada.");
    }
    this.status = "CANCELLED";

    const checkInDate = this.dateRange.getStartDate();
    const timeDiff = checkInDate.getTime() - currentDate.getTime();
    const daysUntilCheckIn = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysUntilCheckIn > 7) {
      this.totalPrice = 0;
    } else if (daysUntilCheckIn >= 1) {
      this.totalPrice *= 0.5;
    }
  }
}
