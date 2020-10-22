import { ObjectID } from 'mongodb';
import CreateNotificationDTOInterface from '@modules/notifications/dtos/CreateNotificationDTOInterface';
import NotificationRepositoryInterface from '@modules/notifications/repositories/NotificationsRepositoryInterface';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

export default class FakeNotificationsRepository
  implements NotificationRepositoryInterface {
  private notifications: Array<Notification> = [];

  public async create({
    content,
    recipient_id,
  }: CreateNotificationDTOInterface): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), content, recipient_id });

    this.notifications.push(notification);

    return notification;
  }
}
