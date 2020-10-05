import { container } from 'tsyringe';
import '@modules/users/providers';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import AppointmentRepositoryInterface from '@modules/appointments/repositories/AppointmentRepositoryInterface';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import UserRepositoryInterface from '@modules/users/repositories/UserRepositoryInterface';

container.registerSingleton<AppointmentRepositoryInterface>(
  'AppointmentRepository',
  AppointmentRepository,
);

container.registerSingleton<UserRepositoryInterface>(
  'UserRepository',
  UserRepository,
);
