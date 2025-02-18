import { Property } from "./property";
import { DateRange } from "../value_objects/date_range";
import { Booking } from "./booking";
import { User } from "./user";

describe("Property Entity", () => {
  it("deve criar uma instância de Property com todos os atributos", () => {
    const property = new Property(
      "1",
      "Casa de praia",
      "Uma baita casona de frente ca praia, bicho!",
      4,
      200
    );

    expect(property.getId()).toBe("1");
    expect(property.getName()).toBe("Casa de praia");
    expect(property.getDescription()).toBe(
      "Uma baita casona de frente ca praia, bicho!"
    );
    expect(property.getMaxGuests()).toBe(4);
    expect(property.getBasePricePerNight()).toBe(200);
  });

  it("deve lançar um erro se o nome for vazio", () => {
    expect(() => {
      new Property("1", "", "Descrição", 4, 200);
    }).toThrow("O nome é obrigatório");
  });

  it("deve lançar um erro se o número máximo de hóspedes for zero ou negativo", () => {
    expect(() => {
      new Property("1", "Casa", "Descrição", 0, 200);
    }).toThrow("O número máximo de hóspedes deve ser maior que zero");
  });

  it("deve validar o número máximo de hóspedes", () => {
    const property = new Property("1", "Casa de Campo", "Descrição", 5, 150);
    expect(() => {
      property.validateGuestCount(6);
    }).toThrow("Número de hóspedes excede o limite. Limite: 5");
  });

  it("não deve aplicar desconto para estadias menores que 7 noites", () => {
    const property = new Property("1", "Apartamento", "Descrição", 2, 100);
    const dateRange = new DateRange(
      new Date("1995-03-14"),
      new Date("1995-03-20")
    );
    const totalPrice = property.calculateTotalPrice(dateRange);
    expect(totalPrice).toBe(600);
  });

  it("deve aplicar desconto para estadias de 7 noites ou mais", () => {
    const property = new Property("1", "Apartamento", "Descrição", 2, 100);
    const dateRange = new DateRange(
      new Date("1995-03-14"),
      new Date("1995-03-21")
    );
    const totalPrice = property.calculateTotalPrice(dateRange);
    expect(totalPrice).toBe(630);
  });

  it("deve verificar disponibilidade da propriedade", () => {
    const property = new Property("1", "Apartamento", "Descrição", 4, 200);
    const user = new User("1", "Jeca Tatu");
    const dateRange = new DateRange(
      new Date("1995-12-20"),
      new Date("1995-12-25")
    );
    const dateRange2 = new DateRange(
      new Date("1995-12-22"),
      new Date("1995-12-27")
    );

    new Booking("1", property, user, dateRange, 2);

    expect(property.isAvailable(dateRange)).toBe(false);
    expect(property.isAvailable(dateRange2)).toBe(false);
  });

  it("deve adicionar uma reserva à propriedade", () => {
    const property = new Property("1", "Casa de praia", "Descrição", 4, 200);
    const user = new User("1", "Jeca Tatu");
    const dateRange = new DateRange(
      new Date("2023-12-20"),
      new Date("2023-12-25")
    );
    const booking = new Booking("1", property, user, dateRange, 2);
  
    property.addBooking(booking);
  
    expect(property.getBookings()).toContain(booking);
  });
  
  it("deve adicionar múltiplas reservas à propriedade", () => {
    const property = new Property("1", "Casa de praia", "Descrição", 4, 200);
    const user = new User("1", "Jeca Tatu");
    const dateRange1 = new DateRange(
      new Date("2023-12-20"),
      new Date("2023-12-25")
    );
    const dateRange2 = new DateRange(
      new Date("2023-12-26"),
      new Date("2023-12-30")
    );
    const booking1 = new Booking("1", property, user, dateRange1, 2);
    const booking2 = new Booking("2", property, user, dateRange2, 2);
  
    property.addBooking(booking1);
    property.addBooking(booking2);
  
    expect(property.getBookings()).toContain(booking1);
    expect(property.getBookings()).toContain(booking2);
  });
});