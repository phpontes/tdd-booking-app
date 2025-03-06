import { DateRange } from "../value_objects/date_range";
import { Property } from "./property";
import { User } from "./user";
import { Booking } from "./booking";

describe("Booking Entity", () => {
  it("deve criar uma instância de Booking com todos os atributos", () => {
    const property = new Property("1", "Casa", "Descrição", 4, 100);
    const user = new User("1", "João Cangaia");
    const dateRange = new DateRange(
      new Date("2024-12-20"),
      new Date("2024-12-25")
    );

    const booking = new Booking("1", property, user, dateRange, 2);

    expect(booking.getId()).toBe("1");
    expect(booking.getProperty()).toBe(property);
    expect(booking.getUser()).toBe(user);
    expect(booking.getDateRange()).toBe(dateRange);
    expect(booking.getGuestCount()).toBe(2);
  });

  it("deve lançar um erro se o número de hóspedes for zero ou negativo", () => {
    const property = new Property("1", "Casa", "Descrição", 5, 150);
    const user = new User("1", "Chico Butico");
    const dateRange = new DateRange(
      new Date("2024-12-10"),
      new Date("2024-12-15")
    );

    expect(() => {
      new Booking("1", property, user, dateRange, 0);
    }).toThrow("O número de hóspedes deve ser maior que zero");
  });

  it("deve lançar um erro ao tentar reservar com número de hóspedes acima do máximo permitido", () => {
    const property = new Property("1", "Casa", "Descrição", 4, 150);
    const user = new User("1", "Chico Butico");
    const dateRange = new DateRange(
      new Date("2024-12-10"),
      new Date("2024-12-15")
    );

    expect(() => {
      new Booking("1", property, user, dateRange, 5);
    }).toThrow("Número máximo de hóspedes excedido. Máximo permitido: 4");
  });

  it("deve calcular o preço total com desconto", () => {
    const property = new Property("1", "Casa", "Descrição", 4, 300);
    const user = new User("1", "Casca de Ferida");
    const dateRange = new DateRange(
      new Date("2024-12-01"),
      new Date("2024-12-10")
    );

    const booking = new Booking("1", property, user, dateRange, 4);

    expect(booking.getTotalPrice()).toBe(300 * 9 * 0.9);
  });
});
