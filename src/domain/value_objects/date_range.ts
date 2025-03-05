export class DateRange {
  private readonly startDate: Date;
  private readonly endDate: Date;

  constructor(startDate: Date, endDate: Date) {
    this.validateDates(startDate, endDate);
    this.startDate = startDate;
    this.endDate = endDate;
  }

  private validateDates(startDate: Date, endDate: Date): void {
    if (startDate == endDate) {
      throw new Error("As datas de início e término não podem ser iguais");
    }
    if (endDate < startDate) {
      throw new Error("A data de término deve ser posterior à data de início");
    }
  }

  getStartDate(): Date {
    return this.startDate;
  }

  getEndDate(): Date {
    return this.endDate;
  }

  getTotalNights(): number {
    const timeDiff = this.endDate.getTime() - this.startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  overlaps(other: DateRange): boolean {
    return this.startDate < other.endDate && this.getStartDate() < this.endDate;
  }
}
