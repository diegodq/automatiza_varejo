import appDataSource from "../data-source";
import Company from "../entities/Company";
import { Repository } from 'typeorm';

const companyRepository: Repository<Company> = appDataSource.getRepository(Company);
export default companyRepository;