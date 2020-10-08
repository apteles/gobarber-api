import User from '@modules/users/infra/typeorm/entities/User';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUserRepository;
let listProvidersService: ListProvidersService;
let providerLoggedInFake: User;
describe('ShowProfileService', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUserRepository();

    providerLoggedInFake = await fakeUsersRepository.create({
      name: 'Provider 01',
      email: 'provider.01@domain.com',
      password: '123456',
    });
    await fakeUsersRepository.create({
      name: 'Provider 02',
      email: 'provider.02@domain.com',
      password: '123456',
    });
    await fakeUsersRepository.create({
      name: 'Provider 03',
      email: 'provider.03@domain.com',
      password: '123456',
    });
    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });
  it('should be able list a collection of provider', async () => {
    const providers = await listProvidersService.execute({
      user_id: providerLoggedInFake.id,
    });

    expect(providers).toHaveLength(2);
    expect(providers[0]).toBeInstanceOf(User);
  });
  it('should not be able list the current user in collection of provider', async () => {
    const providers = await listProvidersService.execute({
      user_id: providerLoggedInFake.id,
    });

    expect(providers).not.toContainEqual(providerLoggedInFake);
  });
});
