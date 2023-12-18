import appDataSource from "../data-source";
import Answer from "../entities/Answer";
import { Repository } from 'typeorm';

const answerRepository: Repository<Answer> = appDataSource.getRepository(Answer);
export default answerRepository;