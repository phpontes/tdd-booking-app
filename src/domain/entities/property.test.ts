import { Property } from "./property";

describe("Property Entity", () => {
  it("deve criar uma instância de Property com todos os atributos", () => {
    const property = new Property(
      "1",
      "Casa de praia",
      "Uma baita casona na praia, bicho",
      4,
      200
    );

    expect(property.getId()).toBe("1");
    expect(property.getName()).toBe("Casa de praia");
    expect(property.getDescription()).toBe("Uma baita casona na praia, bicho");
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
    const property = new Property("1", "Casa", "Descrição", 5, 150);
    
    expect(() => {
        property.validateGuestCount(6);
    }).toThrow("Número máximo de hóspedes excedido. Máximo permitido: 5");
  });
});
