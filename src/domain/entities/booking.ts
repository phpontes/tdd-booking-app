import { DateRange } from "../value_objects/date_range";
import { Property } from "./property";
import { User } from "./user";

export class Booking {
  private readonly id: string;
  private readonly property: Property;
  private readonly guest: User;
  private readonly dateRange: DateRange;
  private readonly guestCount: number;
  private readonly status: "CONFIRMED" | "CANCELLED" = "CONFIRMED";
  private totalPrice: number;

  constructor(
    id: string,
    property: Property,
    guest: User,
    dateRange: DateRange,
    guestCount: number
  ) {
    if (guestCount <= 0) {
      throw new Error("O número de hóspedes deve ser maior que zero");
    }
    property.validateGuestCount(guestCount);

    if (!property.isAvailable(dateRange)) {
      throw new Error("Propriedade indisponível para o período selecionado");
    }

    this.id = id;
    this.property = property;
    this.guest = guest;
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
    return this.guest;
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
}
