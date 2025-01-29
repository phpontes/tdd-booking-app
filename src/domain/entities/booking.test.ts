import { Property } from "./property";
import { User } from "./user";
import { DateRange } from "../value_objects/date_range";
import { Booking } from "./booking";

describe("Booking Entity", () => {
  it("deve criar uma instância de Booking com todos os atributos", () => {
    const property = new Property("1", "Casa", "Descrição", 4, 100);
    const user = new User("1", "Jeca Tatu");
    const dateRange = new DateRange(
      new Date("1999-12-30"),
      new Date("2000-01-04")
    );

    const booking = new Booking("1", property, user, dateRange, 2);

    expect(booking.getId()).toBe("1");
    expect(booking.getProperty()).toBe(property);
    expect(booking.getUser()).toBe(user);
    expect(booking.getDateRange()).toBe(dateRange);
    expect(booking.getGuestCount()).toBe(2);
  });
});
