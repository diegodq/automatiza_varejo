import Queue from 'bull';
import redisConfig from '../configurations/redisConfig';

import createCustomerNotification from '../jobs/customerNotification';

const libMail = new Queue(createCustomerNotification.key);
export default libMail;