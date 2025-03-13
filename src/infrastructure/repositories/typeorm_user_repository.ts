import { Repository } from "typeorm";
import { UserRepository } from "../../domain/repositories/user_repository";
import { UserEntity } from "../persistence/entities/user_entity";
import { User } from "../../domain/entities/user";
import { UserMapper } from "../persistence/entities/mappers/user_mapper";

export class TypeORMUserRepository implements UserRepository {
  findOne(arg0: { where: { id: string } }) {
    throw new Error("Method not implemented.");
  }
  private readonly repository: Repository<UserEntity>;

  constructor(repository: Repository<UserEntity>) {
    this.repository = repository;
  }

  async save(user: User): Promise<void> {
    const userEntity = UserMapper.toPersistence(user);
    await this.repository.save(userEntity);
  }
  
  async findById(id: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({ where: { id } });
    return userEntity ? UserMapper.toDomain(userEntity) : null;
  }
}
