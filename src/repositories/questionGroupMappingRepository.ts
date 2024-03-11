import appDataSource from '../data-source';
import QuestionGroupMapping from '../entities/QuestionGroupMapping';
import { Repository } from 'typeorm';

const questionGroupMappingRepository: Repository<QuestionGroupMapping> = appDataSource.getRepository(QuestionGroupMapping);
export default questionGroupMappingRepository;