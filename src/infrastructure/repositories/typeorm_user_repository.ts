import { Repository } from "typeorm";
import { UserRepository } from "../../domain/repositories/user_repository";
import { UserEntity } from "../persistence/entities/user_entity";
import { User } from "../../domain/entities/user";

export class TypeORMUserRepository implements UserRepository {
  findOne(arg0: { where: { id: string; }; }) {
    throw new Error("Method not implemented.");
  }
  private readonly repository: Repository<UserEntity>;

  constructor(repository: Repository<UserEntity>) {
    this.repository = repository;
  }

  save(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
}
