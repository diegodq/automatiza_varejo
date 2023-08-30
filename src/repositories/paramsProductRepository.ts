import appDataSource from "../data-source";
import ParamsProduct from "../entities/ParamsProduct";

const paramsProductRepository = appDataSource.getRepository(ParamsProduct);
export default paramsProductRepository;