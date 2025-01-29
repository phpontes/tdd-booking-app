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

  it("deve lançar um erro se o número de hóspedes for zero ou negativo", () => {
    const property = new Property("1", "Casa", "Descrição", 4, 100);
    const user = new User("1", "Chico Teixeira");
    const dateRange = new DateRange(
      new Date("1999-12-30"),
      new Date("2000-01-04")
    );

    expect(() => {
      new Booking("1", property, user, dateRange, 0);
    }).toThrow("O número de hóspedes deve ser maior que zero.");
  });

  it("deve lançar um erro se o número de hóspedes for acima do limite", () => {
    const property = new Property("1", "Casa", "Descrição", 4, 100);
    const user = new User("1", "Chico Teixeira");
    const dateRange = new DateRange(
      new Date("1999-12-30"),
      new Date("2000-01-04")
    );

    expect(() => {
      new Booking("1", property, user, dateRange, 5);
    }).toThrow("Número de hóspedes excede o limite. Limite: 4.");
  });
});
