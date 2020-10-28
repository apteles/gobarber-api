import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import NotificationsRepositoryInterface from '@modules/notifications/repositories/NotificationsRepositoryInterface';
import CacheProviderInterface from '@shared/container/providers/CacheProvider/models/CacheProviderInterface';
import AppointmentRepositoryInterface from '../repositories/AppointmentRepositoryInterface';

interface Request {
  date: Date;
  provider_id: string;
  user_id: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: AppointmentRepositoryInterface,
    @inject('NotificationRepository')
    private notificationRepository: NotificationsRepositoryInterface,
    @inject('CacheProvider')
    private cache: CacheProviderInterface,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
      provider_id,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }
    if (isBefore(date, Date.now())) {
      throw new AppError('This appointment has passed');
    }

    if (user_id === provider_id) {
      throw new AppError('You cannot create an appointment to yourself.');
    }
    if (getHours(date) < 8 || getHours(date) > 17) {
      throw new AppError('You cannot create an appointment before 8am.');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const formattedDate = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm");
    await this.notificationRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para o dia ${formattedDate}`,
    });

    await this.cache.invalidate(
      `provider-appointments:${user_id}:${format(appointmentDate, 'yyyy-M-d')}`,
    );

    return appointment;
  }
}

export default CreateAppointmentService;
