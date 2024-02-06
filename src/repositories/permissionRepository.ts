import { Repository } from "typeorm";
import appDataSource from "../data-source";
import Permission from "../entities/Permissions";

const permissionRepository: Repository<Permission> = appDataSource.getRepository(Permission);
export default permissionRepository;