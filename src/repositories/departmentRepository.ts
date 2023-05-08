import appDataSource from "../data-source";
import Department from "../entities/Department";

const departmentRepository = appDataSource.getRepository(Department);
export default departmentRepository;