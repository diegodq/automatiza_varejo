import appDataSource from "../data-source";
import ParamsQuestions from "../entities/ParamsQuestions";
import { Repository } from 'typeorm';

const paramsQuestionRepository: Repository<ParamsQuestions> = appDataSource.getRepository(ParamsQuestions);
export default paramsQuestionRepository;