import appDataSource from "../data-source";
import Company from "../entities/Company";

const companyRepository = appDataSource.getRepository(Company);
export default companyRepository;