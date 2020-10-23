interface MailConfigInterface {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      name: string;
      address: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      name: 'Gobarber',
      address: 'admin@andretelestp.com',
    },
  },
} as MailConfigInterface;
