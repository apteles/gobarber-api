import CreateNotificationDTOInterface from '@modules/notifications/dtos/CreateNotificationDTOInterface';
import NotificationRepositoryInterface from '@modules/notifications/repositories/NotificationsRepositoryInterface';
import { getMongoRepository, MongoRepository } from 'typeorm';
import Notification from '../schemas/Notification';

export default class NotificationRepository
  implements NotificationRepositoryInterface {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: CreateNotificationDTOInterface): Promise<Notification> {
    const appointment = this.ormRepository.create({ content, recipient_id });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}
