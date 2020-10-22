import { getDate, getDaysInMonth } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import AppointmentRepositoryInterface from '../repositories/AppointmentRepositoryInterface';

interface Request {
  user_id: string;
  month: number;
  year: number;
}

type Response = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: AppointmentRepositoryInterface,
  ) {}

  public async execute({ user_id, year, month }: Request): Promise<Response> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      { provider_id: user_id, month, year },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const daysInMonth = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const availability = daysInMonth.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });
      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
