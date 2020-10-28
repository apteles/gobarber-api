import CacheProviderInterface from '@shared/container/providers/CacheProvider/models/CacheProviderInterface';
import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentRepositoryInterface from '../repositories/AppointmentRepositoryInterface';

interface Request {
  user_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: AppointmentRepositoryInterface,
    @inject('cacheProvider')
    private cache: CacheProviderInterface,
  ) {}

  public async execute({
    user_id,
    year,
    month,
    day,
  }: Request): Promise<Appointment[]> {
    let appointments = await this.cache.get<Appointment[]>(
      `provider-appointments:${user_id}:${year}-${month}-${day}`,
    );

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider(
        { provider_id: user_id, month, year, day },
      );

      this.cache.save(
        `provider-appointments:${user_id}:${year}-${month}-${day}`,
        classToClass(appointments),
      );
    }

    return appointments;
  }
}

export default ListProviderAppointmentService;
