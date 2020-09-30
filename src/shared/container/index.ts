import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import AppointmentRepositoryInterface from '@modules/appointments/repositories/AppointmentRepositoryInterface';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import UserRepositoryInterface from '@modules/users/repositories/UserRepositoryInterface';
import { container } from 'tsyringe';

container.registerSingleton<AppointmentRepositoryInterface>(
  'AppointmentRepository',
  AppointmentRepository,
);

container.registerSingleton<UserRepositoryInterface>(
  'UserRepository',
  UserRepository,
);
