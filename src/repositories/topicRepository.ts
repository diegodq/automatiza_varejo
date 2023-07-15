import appDataSource from "../data-source";
import Topic from "../entities/Topic";

const topicRepository = appDataSource.getRepository(Topic);
export default topicRepository;