import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import FakeNotificationsRepository from '../../notifications/repositories/fakes/FakeNotificationsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointment: FakeAppointmentRepository;
let createAppoint: CreateAppointmentService;
let fakeNotification: FakeNotificationsRepository;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointment = new FakeAppointmentRepository();
    fakeNotification = new FakeNotificationsRepository();
    createAppoint = new CreateAppointmentService(
      fakeAppointment,
      fakeNotification,
    );
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppoint.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: '1234556',
      user_id: '1',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1234556');
  });

  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointmentDate = new Date(2020, 4, 10, 13);

    await createAppoint.execute({
      date: appointmentDate,
      provider_id: '123123',
      user_id: '1',
    });

    await expect(
      createAppoint.execute({
        date: appointmentDate,
        provider_id: '321321',
        user_id: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppoint.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: '1',
        provider_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppoint.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: '1',
        provider_id: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 6).getTime();
    });

    await expect(
      createAppoint.execute({
        date: new Date(2020, 4, 10, 7),
        user_id: '1',
        provider_id: '10',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an appointment after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 6).getTime();
    });

    await expect(
      createAppoint.execute({
        date: new Date(2020, 4, 10, 19),
        user_id: '1',
        provider_id: '10',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
