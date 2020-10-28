import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderAppointmentService from './ListProviderAppointmentsService';

let fakeAppointment: FakeAppointmentRepository;
let listAppointments: ListProviderAppointmentService;
let fakeCache: FakeCacheProvider;
describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointment = new FakeAppointmentRepository();
    fakeCache = new FakeCacheProvider();
    listAppointments = new ListProviderAppointmentService(
      fakeAppointment,
      fakeCache,
    );
  });
  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointment.create({
      provider_id: '1',
      user_id: '2',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    const appointment2 = await fakeAppointment.create({
      provider_id: '1',
      user_id: '2',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });

    const appointments = await listAppointments.execute({
      user_id: '1',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
