import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointment = new FakeAppointmentRepository();
    const createAppoint = new CreateAppointmentService(fakeAppointment);

    const appointment = await createAppoint.execute({
      date: new Date(),
      provider_id: '1234556',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1234556');
  });

  //  it('should not be able to create two appointments on the same time', () => {});
});
