import User from '../infra/typeorm/entities/User';
import CreateUserInterface from '../dto/CreateUserDTOInterface';
import FindProviderDTOInterface from '../dto/FindProviderDTOInterface';

export default interface UserRepositoryInterface {
  findAllProviders(options?: FindProviderDTOInterface): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: CreateUserInterface): Promise<User>;
  save(user: User): Promise<User>;
}
