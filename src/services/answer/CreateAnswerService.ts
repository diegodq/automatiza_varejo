import { BadRequestError } from '../../utils/ApiErrors';
import Question from '../../entities/Question';
import answerRepository from '../../repositories/answerRepository';
import Answer from '../../entities/Answer';
import Store from '../../entities/Store';

interface AnswerTypes
{
	answer: string;
	research_title: string;
	client_name: string;
	client_phone: string;
	device_client: string;
	start_research: Date;
	is_contact: number;
	id_research: string;
	nps_answer: number;
	research_name: string
	name_employee: string;
	ip_address: string;
	store: Store,
	question: Question;
}

class CreateAnswerService
{
	public async execute( answers: AnswerTypes[] ): Promise<string>
	{
		if(!Array.isArray(answers)) {
			throw new BadRequestError('data-is-not-array');
		}

		answers.forEach(item => {
			if(item.client_name != '')
				item.is_contact = 1;
			item.research_name = item.id_research.split('.')[0].replace(/[^\w\s]/gi, '');
		});

		const createAnswers: Answer[] = answerRepository.create(answers);
		await answerRepository.save(createAnswers);

		return 'answers-added';
	}
}

export default CreateAnswerService;