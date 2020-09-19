import { AppointmentRepositoryInterface } from '@modules/appointments/repositories/AppointmentRepositoryInterface';
import CreateAppointmentDTOInterface from '@modules/appointments/dto/CreateAppointmentDTOInterface';
import { getRepository, Repository } from 'typeorm';
import Appointment from '../entities/Appointment';

class AppointmentRepository implements AppointmentRepositoryInterface {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment || undefined;
  }

  public async create({
    provider_id,
    date,
  }: CreateAppointmentDTOInterface): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentRepository;
