import appDataSource from "../data-source";
import CustomerTokens from "../entities/CustomerTokens";

const customerTokenRepository = appDataSource.getRepository(CustomerTokens);
export default customerTokenRepository;