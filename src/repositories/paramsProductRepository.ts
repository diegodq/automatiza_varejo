import appDataSource from "../data-source";
import ParamsProduct from "../entities/ParamsProduct";
import { Repository } from 'typeorm';

const paramsProductRepository: Repository<ParamsProduct> = appDataSource.getRepository(ParamsProduct);
export default paramsProductRepository;