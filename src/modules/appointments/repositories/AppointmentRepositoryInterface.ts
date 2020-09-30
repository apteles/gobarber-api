import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import CreateAppointmentDTOInterface from '../dto/CreateAppointmentDTOInterface';

export default interface AppointmentRepositoryInterface {
  create(data: CreateAppointmentDTOInterface): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
