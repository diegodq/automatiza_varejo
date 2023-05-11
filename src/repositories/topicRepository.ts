import appDataSource from "src/data-source";
import Topic from "src/entities/Topic";

const topicRepository = appDataSource.getRepository(Topic);
export default topicRepository;