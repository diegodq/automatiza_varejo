import appDataSource from "../data-source";
import ContactUs from "../entities/ContactUs";

const contactUsRepository = appDataSource.getRepository(ContactUs);
export default contactUsRepository;