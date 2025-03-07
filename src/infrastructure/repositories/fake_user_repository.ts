import { User } from "../../domain/entities/user";

export class FakeUserRepository {
  private users: User[] = [
    new User("1", "Silvestre Estalone"),
    new User("2", "Arnaldo Chuazeneguer"),
  ];

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.getId() === id) || null;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
