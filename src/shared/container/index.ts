import { container } from 'tsyringe';
import '@modules/users/providers';
import './providers';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import AppointmentRepositoryInterface from '@modules/appointments/repositories/AppointmentRepositoryInterface';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';
import UserRepositoryInterface from '@modules/users/repositories/UserRepositoryInterface';
import UserTokenRepositoryInterface from '@modules/users/repositories/UserTokenRepositoryInterface';

container.registerSingleton<AppointmentRepositoryInterface>(
  'AppointmentRepository',
  AppointmentRepository,
);

container.registerSingleton<UserRepositoryInterface>(
  'UserRepository',
  UserRepository,
);
container.registerSingleton<UserTokenRepositoryInterface>(
  'UserTokenRepository',
  UserTokenRepository,
);
