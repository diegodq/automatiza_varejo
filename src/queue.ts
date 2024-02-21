import 'dotenv/config';
import { libCreateAccountMail, libDeleteAccountMail } from './lib/libMail';
import createCustomerNotification from './jobs/createCustomerNotification';
import deleteAccountNotification from './jobs/deleteAccountNotification';

libCreateAccountMail.process(createCustomerNotification.handle);
libDeleteAccountMail.process(deleteAccountNotification.handle);