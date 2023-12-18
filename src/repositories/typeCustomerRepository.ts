import appDataSource from '../data-source';
import TypeCustomer from '../entities/TypeCustomer';
import { Repository } from 'typeorm';

const typeCustomerRepository: Repository<TypeCustomer> = appDataSource.getRepository(TypeCustomer);
export default typeCustomerRepository;