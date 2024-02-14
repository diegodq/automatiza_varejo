import Queue from 'bull';
import redisConfig from '../configurations/redisConfig';

import createCustomerNotification from '../jobs/customerNotification';
import deleteAccountNotification from '../jobs/deleteAccountNotification';

const libCreateAccountMail = new Queue(createCustomerNotification.key);
const libDeleteAccountMail = new Queue(deleteAccountNotification.key);

export { libCreateAccountMail, libDeleteAccountMail };