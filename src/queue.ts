import 'dotenv/config';
import { libCreateAccountMail, libDeleteAccountMail } from './lib/libMail';
import customerNotification from './jobs/customerNotification';
import deleteAccountNotification from './jobs/deleteAccountNotification';

libCreateAccountMail.process(customerNotification.handle);
libDeleteAccountMail.process(deleteAccountNotification.handle);