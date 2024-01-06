import Topic from "../../entities/Topic";
import topicRepository from "../../repositories/topicRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import convertUserIdInCompanyId from "../../utils/convertUserIdInCompanyId";

type TopicRequest = {
  name: string;
  status: number;
  indicate_employee: number;
  company_id: number;
};

class CreateTopicService {
  public async execute({ name, status, indicate_employee, company_id }: TopicRequest): Promise<string | any> {
    const companyId = await convertUserIdInCompanyId(Number(company_id));

    const topicExists: Topic | null = await topicRepository.findOne({
      where: { company: { id: companyId } },
    });

    if (topicExists?.name === name) {
      throw new BadRequestError('topic-already-registered.');
    }

    const newTopic = topicRepository.create({
      name,
      status,
      indicate_employee,
      company: { id: companyId }
    });

    await topicRepository.save(newTopic);

    return 'topic-added';
  }
}

export default CreateTopicService;