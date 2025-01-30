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

  it("deve calcular o preço total com desconto", () => {
    const property = new Property("1", "Casa", "Descrição", 4, 300);
    const user = new User("1", "Adamastor Pitaco");
    const dateRange = new DateRange(
      new Date("2000-12-30"),
      new Date("2001-01-08")
    );

    const booking = new Booking("1", property, user, dateRange, 4);

    expect(booking.getTotalPrice()).toBe(300 * 9 * 0.9);
  });

  it("não deve realizar o agendamento quando uma propriedade não estiver disponível", () => {
    const property = new Property("1", "Casa", "Descrição", 4, 300);
    const user = new User("1", "Adamastor Pitaco");
    const dateRange = new DateRange(
      new Date("2000-12-30"),
      new Date("2001-01-08")
    );
    const booking = new Booking("1", property, user, dateRange, 4);
    const dateRange2 = new DateRange(
      new Date("2000-12-31"),
      new Date("2001-01-07")
    );

    expect(() => {
      new Booking("2", property, user, dateRange2, 4);
    }).toThrow("Propriedade não disponível para o período selecionado.");
  });

  it("deve cancelar uma reserva sem reembolso quado faltar menos de 1 dia para o check-in", () => {
    const property = new Property("1", "Casa", "Descrição", 4, 300);
    const user = new User("1", "Zézão Firula");
    const dateRange = new DateRange(
      new Date("2000-12-30"),
      new Date("2001-01-01")
    );
    const booking = new Booking("1", property, user, dateRange, 4);
    const currentDate = new Date("2000-12-30");
    booking.cancel(currentDate);

    expect(booking.getStatus()).toBe("CANCELLED");
    expect(booking.getTotalPrice()).toBe(600);
  });

  it("deve cancelar uma reserva com reembolso total quando a data for superior a 7 dias antes do check-in", () => {
    const property = new Property("1", "Casa", "Descrição", 4, 300);
    const user = new User("1", "Chico Butico");
    const dateRange = new DateRange(
      new Date("2000-12-30"),
      new Date("2001-01-04")
    );
    const booking = new Booking("1", property, user, dateRange, 4);
    const currentDate = new Date("2000-12-20");
    booking.cancel(currentDate);

    expect(booking.getStatus()).toBe("CANCELLED");
    expect(booking.getTotalPrice()).toBe(0);
  });

  it("deve cancelar uma reserva com reembolso parcial quando a data estiver entre 1 e 7 dias antes do check-in", () => {
    const property = new Property("1", "Casa", "Descrição", 4, 300);
    const user = new User("1", "Vera Verão");
    const dateRange = new DateRange(
      new Date("2000-12-30"),
      new Date("2001-01-04")
    );
    const booking = new Booking("1", property, user, dateRange, 4);
    const currentDate = new Date("2000-12-25");
    booking.cancel(currentDate);

    expect(booking.getStatus()).toBe("CANCELLED");
    expect(booking.getTotalPrice()).toBe(300 * 5 * 0.5);
  });

  it("não deve permitir cancelar a reserva mais que uma vez", () => {
    const property = new Property("1", "Casa", "Descrição", 4, 300);
    const user = new User("1", "Tarcisio Meira");
    const dateRange = new DateRange(
      new Date("2000-12-30"),
      new Date("2001-01-04")
    );
    const booking = new Booking("1", property, user, dateRange, 4);
    const currentDate = new Date("2000-12-25");
    booking.cancel(currentDate);

    expect(() => {
      booking.cancel(currentDate);
    }).toThrow("Reserva já cancelada.");
  });
});
