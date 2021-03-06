import UserRepositoryInterface from '@modules/users/repositories/UserRepositoryInterface';
import CreateUserDTOInterface from '@modules/users/dto/CreateUserDTOInterface';
import { getRepository, Repository, Not } from 'typeorm';
import FindProviderDTOInterface from '@modules/users/dto/FindProviderDTOInterface';
import User from '../entities/User';

class UserRepository implements UserRepositoryInterface {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findAllProviders({
    except,
  }: FindProviderDTOInterface): Promise<User[]> {
    if (except.id) {
      return this.ormRepository.find({ where: { id: Not(except.id) } });
    }
    return this.ormRepository.find();
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne(id);

    return user;
  }

  public async create({
    name,
    email,
    password,
  }: CreateUserDTOInterface): Promise<User> {
    const appointment = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default UserRepository;
