import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import CreateAppointmentDTOInterface from '../dto/CreateAppointmentDTOInterface';
import FindInMonthProviderDTOInterface from '../dto/FindInMonthProviderDTOInterface';

export default interface AppointmentRepositoryInterface {
  create(data: CreateAppointmentDTOInterface): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: Omit<FindInMonthProviderDTOInterface, 'day'>,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: FindInMonthProviderDTOInterface,
  ): Promise<Appointment[]>;
}
