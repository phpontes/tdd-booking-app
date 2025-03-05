import { DateRange } from "../value_objects/date_range";
import { Property } from "./property";
import { User } from "./user";

export class Booking {
  private readonly id: string;
  private readonly property: Property;
  private readonly guest: User;
  private readonly dateRange: DateRange;
  private readonly guestCount: number;

  constructor(
    id: string,
    property: Property,
    guest: User,
    dateRange: DateRange,
    guestCount: number
  ) {
    this.id = id;
    this.property = property;
    this.guest = guest;
    this.dateRange = dateRange;
    this.guestCount = guestCount;
  }

    get getId(): string {
        return this.id;
    }

    get getProperty(): Property {
        return this.property;
    }

    get getUser(): User {
        return this.guest;
    }

    get getDateRange(): DateRange {
        return this.dateRange;
    }

    get getGuestCount(): number {
        return this.guestCount;
    }
}
