import appDataSource from "../data-source";
import ContactUs from "../entities/ContactUs";
import { Repository } from 'typeorm';

const contactUsRepository: Repository<ContactUs> = appDataSource.getRepository(ContactUs);
export default contactUsRepository;