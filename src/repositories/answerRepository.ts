import appDataSource from "../data-source";
import Answer from "../entities/Answer";

const answerRepository = appDataSource.getRepository(Answer);
export default answerRepository;