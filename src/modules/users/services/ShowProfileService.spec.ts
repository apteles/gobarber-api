import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUserRepository;
let showProfileService: ShowProfileService;
let userFake: User;
describe('ShowProfileService', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUserRepository();

    userFake = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@domain.com',
      password: '123456',
    });

    showProfileService = new ShowProfileService(fakeUsersRepository);
  });
  it('should not be able list a non existence user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be return a instance of user ', async () => {
    const userFetched = await showProfileService.execute({
      user_id: userFake.id,
    });

    expect(userFetched).toHaveProperty('id');
    expect(userFetched).toHaveProperty('password');
    expect(userFetched.email).toEqual('john.doe@domain.com');
    expect(userFetched.name).toEqual('John Doe');
  });
});
