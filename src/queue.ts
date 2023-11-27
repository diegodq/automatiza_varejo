import 'dotenv/config';
import libMail from './lib/libMail';
import customerNotification from './jobs/customerNotification';

libMail.process(customerNotification.handle);