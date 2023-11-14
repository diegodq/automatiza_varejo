import appDataSource from "../data-source";
import Customer from "../entities/Customer";

const customerRepository = appDataSource.getRepository(Customer);
export default customerRepository;