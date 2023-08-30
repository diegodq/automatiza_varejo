import appDataSource from "../data-source";
import Product from "../entities/Product";

const productRepository = appDataSource.getRepository(Product);
export default productRepository;