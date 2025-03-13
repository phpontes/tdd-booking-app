import { DataSource, Repository } from "typeorm";
import { PropertyEntity } from "../persistence/entities/property_entity";
import { Property } from "../../domain/entities/property";
import { TypeORMPropertyRepository } from "./typeorm_property_repository";

describe("TypeORMPropertyRepository", () => {
  let dataSource: DataSource;
  let propertyRepository: TypeORMPropertyRepository;
  let repository: Repository<PropertyEntity>;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [PropertyEntity],
      synchronize: true,
      logging: false,
    });
    await dataSource.initialize();
    repository = dataSource.getRepository(PropertyEntity);
    propertyRepository = new TypeORMPropertyRepository(repository);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it("deve salvar um propriedade com sucesso", async () => {
    const property = new Property(
      "1",
      "Casa na Praia",
      "Baita casona na praia, bicho, com vista pro mar e tudo",
      6,
      200
    );

    await propertyRepository.save(property);
    const savedProperty = await repository.findOne({ where: { id: "1" } });
    expect(savedProperty).not.toBeNull();
    expect(savedProperty?.id).toBe("1");
  });
});
