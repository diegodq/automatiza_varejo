import appDataSource from "../data-source";
import Product from "../entities/Product";
import { Repository } from 'typeorm';

const productRepository: Repository<Product> = appDataSource.getRepository(Product);
export default productRepository;