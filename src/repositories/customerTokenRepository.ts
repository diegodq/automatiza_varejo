import appDataSource from "../data-source";
import CustomerTokens from "../entities/CustomerTokens";
import { Repository } from 'typeorm';

const customerTokenRepository: Repository<CustomerTokens> = appDataSource.getRepository(CustomerTokens);
export default customerTokenRepository;