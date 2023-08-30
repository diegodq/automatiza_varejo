import appDataSource from "../data-source";
import ParamsQuestions from "../entities/ParamsQuestions";

const paramsQuestionRepository = appDataSource.getRepository(ParamsQuestions);
export default paramsQuestionRepository;