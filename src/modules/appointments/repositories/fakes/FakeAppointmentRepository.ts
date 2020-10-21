import { uuid } from 'uuidv4';
import { getDate, getMonth, getYear, isEqual } from 'date-fns';
import AppointmentRepositoryInterface from '@modules/appointments/repositories/AppointmentRepositoryInterface';
import CreateAppointmentDTOInterface from '@modules/appointments/dto/CreateAppointmentDTOInterface';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import FindInMonthProviderDTOInterface from '@modules/appointments/dto/FindInMonthProviderDTOInterface';

class FakeAppointmentRepository implements AppointmentRepositoryInterface {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: CreateAppointmentDTOInterface): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid, date, provider_id, user_id });
    this.appointments.push(appointment);

    return appointment;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: FindInMonthProviderDTOInterface): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    month,
    year,
    day,
  }: FindInMonthProviderDTOInterface): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year &&
        getDate(appointment.date) === day,
    );

    return appointments;
  }
}

export default FakeAppointmentRepository;
