import Queue from 'bull';

import createCustomerNotification from '../jobs/createCustomerNotification';
import deleteAccountNotification from '../jobs/deleteAccountNotification';

const libCreateAccountMail = new Queue(createCustomerNotification.key,{
  redis: { host: '127.0.0.1', port: 6379 }
});
const libDeleteAccountMail = new Queue(deleteAccountNotification.key,{
  redis: { host: '127.0.0.1', port: 6379 }
});

export { libCreateAccountMail, libDeleteAccountMail };