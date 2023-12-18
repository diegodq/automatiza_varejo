import appDataSource from '../data-source';
import QuestionGroup from '../entities/QuestionGroup';
import {Repository} from 'typeorm';

const questionGroupRepository: Repository<QuestionGroup> = appDataSource.getRepository(QuestionGroup);
export default questionGroupRepository;