import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointment = new FakeAppointmentRepository();
    const createAppoint = new CreateAppointmentService(fakeAppointment);

    const appointment = await createAppoint.execute({
      date: new Date(),
      provider_id: '1234556',
      user_id: '1',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1234556');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointment = new FakeAppointmentRepository();
    const createAppoint = new CreateAppointmentService(fakeAppointment);

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppoint.execute({
      date: appointmentDate,
      provider_id: '123123',
      user_id: '1',
    });

    expect(
      createAppoint.execute({
        date: appointmentDate,
        provider_id: '321321',
        user_id: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
