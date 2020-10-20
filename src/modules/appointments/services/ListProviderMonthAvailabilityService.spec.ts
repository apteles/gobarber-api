import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointment: FakeAppointmentRepository;
let listAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointment = new FakeAppointmentRepository();
    listAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointment,
    );
  });
  it('should be able to create a new appointment', async () => {
    await fakeAppointment.create({
      provider_id: '1',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointment.create({
      provider_id: '1',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });

    await fakeAppointment.create({
      provider_id: '1',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });
    await fakeAppointment.create({
      provider_id: '1',
      date: new Date(2020, 4, 20, 11, 0, 0),
    });
    await fakeAppointment.create({
      provider_id: '1',
      date: new Date(2020, 4, 20, 12, 0, 0),
    });
    await fakeAppointment.create({
      provider_id: '1',
      date: new Date(2020, 4, 20, 13, 0, 0),
    });
    await fakeAppointment.create({
      provider_id: '1',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });
    await fakeAppointment.create({
      provider_id: '1',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });
    await fakeAppointment.create({
      provider_id: '1',
      date: new Date(2020, 4, 20, 16, 0, 0),
    });
    await fakeAppointment.create({
      provider_id: '1',
      date: new Date(2020, 4, 20, 17, 0, 0),
    });

    await fakeAppointment.create({
      provider_id: '1',
      date: new Date(2020, 4, 21, 10, 0, 0),
    });
    const availability = await listAvailability.execute({
      user_id: '1',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
