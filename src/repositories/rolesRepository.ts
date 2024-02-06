import { Repository } from "typeorm";
import appDataSource from "../data-source";
import Roles from "../entities/Roles";

const roleRepository: Repository<Roles> = appDataSource.getRepository(Roles);
export default roleRepository;