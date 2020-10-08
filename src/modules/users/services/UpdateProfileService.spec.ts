import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;
let userFake: User;
describe('UpdateProfileService', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUserRepository();

    userFake = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@domain.com',
      password: '123456',
    });

    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should not be able update profile of user non existence', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'wrong-id',
        email: 'john@domain.com',
        name: 'John Doe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able update email if the one already exists', async () => {
    await fakeUsersRepository.create({
      name: 'Mary Doe',
      email: 'mary.doe@domain.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: userFake.id,
        email: 'mary.doe@domain.com',
        name: 'John Doe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able update profile of user existence', async () => {
    const userUpdated = await updateProfileService.execute({
      user_id: userFake.id,
      email: 'john.updated@domain.com',
      name: 'John Doe (updated)',
    });
    expect(userUpdated.email).toEqual('john.updated@domain.com');
    expect(userUpdated.name).toEqual('John Doe (updated)');
  });
  it('should be able encrypt the new password pass in', async () => {
    const generateHashSpy = jest.spyOn(fakeHashProvider, 'generateHash');
    const userUpdated = await updateProfileService.execute({
      user_id: userFake.id,
      email: 'john.updated@domain.com',
      name: 'John Doe (updated)',
      old_password: '123456',
      password: 'n3w-p@33w0d',
    });

    expect(generateHashSpy).toHaveBeenCalledWith('n3w-p@33w0d');
    expect(userUpdated.email).toEqual('john.updated@domain.com');
    expect(userUpdated.name).toEqual('John Doe (updated)');
  });
  it('should not be able update password if old password is not passed', async () => {
    await expect(
      updateProfileService.execute({
        user_id: userFake.id,
        email: 'john.updated@domain.com',
        name: 'John Doe (updated)',
        password: 'n3w-p@33w0d',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able update password if old password passed is wrong', async () => {
    await expect(
      updateProfileService.execute({
        user_id: userFake.id,
        email: 'john.doe@domain.com',
        name: 'John Doe',
        old_password: '654321',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
