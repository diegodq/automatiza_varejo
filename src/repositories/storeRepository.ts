import { Repository } from "typeorm";
import appDataSource from "../data-source";
import Store from "../entities/Store";

const storeRepository: Repository<Store> = appDataSource.getRepository(Store);
export default storeRepository;