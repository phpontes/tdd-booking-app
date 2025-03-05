import { DateRange } from "./date_range";

describe("DateRange Value Object", () => {
  it("deve lançar um erro se a data de término for antes da data de início", () => {
    expect(() => {
      new DateRange(new Date("2024-12-25"), new Date("2024-12-20"));
    }).toThrow("A data de término deve ser posterior à data de início");
  });

  it("deve criar uma instância de DateRange com a data de início e data de término, e verificar o retorno das datas", () => {
    const startDate = new Date("2024-12-20");
    const endDate = new Date("2024-12-25");
    const dateRange = new DateRange(startDate, endDate);

    expect(dateRange.getStartDate()).toEqual(startDate);
    expect(dateRange.getEndDate()).toEqual(endDate);
  });

  it("deve calcular o total de noites corretamente", () => {
    const startDate = new Date("2024-12-20");
    const endDate = new Date("2024-12-25");
    const dateRange = new DateRange(startDate, endDate);
    const totalNights = dateRange.getTotalNights();

    expect(totalNights).toBe(5);

    const startDate2 = new Date("2024-12-10");
    const endDate2 = new Date("2024-12-25");
    const dateRange2 = new DateRange(startDate2, endDate2);
    const totalNights2 = dateRange2.getTotalNights();

    expect(totalNights2).toBe(15);
  });
});
