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

  it("deve verificar se dois intervalos de datas se sobrepõem", () => {
    const dateRange1 = new DateRange(
      new Date("2024-12-20"),
      new Date("2024-12-25")
    );
    const dateRange2 = new DateRange(
      new Date("2024-12-24"),
      new Date("2024-12-27")
    );
    const overlaps = dateRange1.overlaps(dateRange2);
    
    expect(overlaps).toBe(true);
  });

  it("deve lançar erro se as datas de início e término forem iguais", () => {
    const date = new Date("2024-12-20");
    expect(() => {
      new DateRange(date, date);
    }).toThrow("As datas de início e término não podem ser iguais");
  });
});
