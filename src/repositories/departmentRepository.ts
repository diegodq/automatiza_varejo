import appDataSource from "../data-source";
import Department from "../entities/Department";
import { Repository } from 'typeorm';

const departmentRepository: Repository<Department> = appDataSource.getRepository(Department);
export default departmentRepository;