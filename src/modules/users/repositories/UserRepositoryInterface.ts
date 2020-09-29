import User from '../infra/typeorm/entities/User';
import CreateUserInterface from '../dto/CreateUserDTOInterface';

export default interface UserRepositoryInterface {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: CreateUserInterface): Promise<User>;
  save(user: User): Promise<User>;
}
