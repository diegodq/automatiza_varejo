import appDataSource from "../data-source";
import Question from "../entities/Question";

const questionRepository = appDataSource.getRepository(Question);
export default questionRepository;