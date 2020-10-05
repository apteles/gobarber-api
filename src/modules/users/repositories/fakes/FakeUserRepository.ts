import UserRepositoryInterface from '@modules/users/repositories/UserRepositoryInterface';
import CreateUserDTOInterface from '@modules/users/dto/CreateUserDTOInterface';
import User from '@modules/users/infra/typeorm/entities/User';
import { uuid } from 'uuidv4';

class FakeUserRepository implements UserRepositoryInterface {
  private users: User[] = [];

  public async save(user: User): Promise<User> {
    const index = this.users.findIndex(
      currentUser => currentUser.id === user.id,
    );
    this.users[index] = user;

    return this.users[index];
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async create({
    name,
    email,
    password,
  }: CreateUserDTOInterface): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), name, email, password });
    this.users.push(user);
    return user;
  }
}

export default FakeUserRepository;
