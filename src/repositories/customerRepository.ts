import appDataSource from "../data-source";
import Customer from "../entities/Customer";
import { Repository } from 'typeorm';

const customerRepository: Repository<Customer> = appDataSource.getRepository(Customer);
export default customerRepository;