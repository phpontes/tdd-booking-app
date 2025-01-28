import { Property } from "./property";

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
    expect(property.getDescription()).toBe("Uma baita casona de frente ca praia, bicho!");
    expect(property.getMaxGuests()).toBe(4);
    expect(property.getBasePricePerNight()).toBe(200);
  });
});
