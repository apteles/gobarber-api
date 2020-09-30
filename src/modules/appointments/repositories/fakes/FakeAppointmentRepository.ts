import { uuid } from 'uuidv4';
import AppointmentRepositoryInterface from '@modules/appointments/repositories/AppointmentRepositoryInterface';
import CreateAppointmentDTOInterface from '@modules/appointments/dto/CreateAppointmentDTOInterface';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class FakeAppointmentRepository implements AppointmentRepositoryInterface {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => appointment.date === date,
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: CreateAppointmentDTOInterface): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid, date, provider_id });
    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentRepository;
