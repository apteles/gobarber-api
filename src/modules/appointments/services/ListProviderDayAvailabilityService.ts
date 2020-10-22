import { getHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import AppointmentRepositoryInterface from '../repositories/AppointmentRepositoryInterface';

interface Request {
  user_id: string;
  month: number;
  year: number;
  day: number;
}

type Response = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: AppointmentRepositoryInterface,
  ) {}

  public async execute({
    user_id,
    year,
    month,
    day,
  }: Request): Promise<Response> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      { provider_id: user_id, month, year, day },
    );

    const START_WORKING = 8;

    const hoursInDay = Array.from(
      { length: 10 },
      (_, index) => index + START_WORKING,
    );

    const currentDate = new Date(Date.now());

    const availability = hoursInDay.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
