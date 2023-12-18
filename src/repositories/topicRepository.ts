import appDataSource from "../data-source";
import Topic from "../entities/Topic";
import { Repository } from 'typeorm';

const topicRepository: Repository<Topic> = appDataSource.getRepository(Topic);
export default topicRepository;