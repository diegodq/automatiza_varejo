import appDataSource from "../data-source";
import Question from "../entities/Question";
import { Repository } from 'typeorm';

const questionRepository: Repository<Question> = appDataSource.getRepository(Question);
export default questionRepository;