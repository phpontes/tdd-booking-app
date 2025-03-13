import { UserEntity } from "../persistence/entities/user_entity";
import { DataSource, Repository } from "typeorm";
import { User } from "../../domain/entities/user";
import { TypeORMUserRepository } from "./typeorm_user_repository";

describe("TypeORMUserRepository", () => {
  let dataSource: DataSource;
  let userRepository: TypeORMUserRepository;
  let repository: Repository<UserEntity>;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [UserEntity],
      synchronize: true,
      logging: false,
    });
    await dataSource.initialize();
    repository = dataSource.getRepository(UserEntity);
    userRepository = new TypeORMUserRepository(repository);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it("deve salvar um usuário com sucesso", async () => {
    const user = new User("1", "José das Couves");
    await userRepository.save(user);

    const savedUser = await repository.findOne({ where: { id: "1" } });
    expect(savedUser).not.toBeNull();
    expect(savedUser?.id).toBe("1");
    expect(savedUser?.name).toBe("José das Couves");
  });
});
