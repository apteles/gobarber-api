import CreateAppointmentDTOInterface from '@modules/appointments/dto/CreateAppointmentDTOInterface';
import CreateNotificationDTOInterface from '../dtos/CreateNotificationDTOInterface';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface NotificationRepositoryInterface {
  create(data: CreateNotificationDTOInterface): Promise<Notification>;
}
