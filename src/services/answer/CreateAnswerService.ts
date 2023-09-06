import { BadRequestError } from '../../utils/ApiErrors';
import Question from '../../entities/Question';
import answerRepository from '../../repositories/answerRepository';

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
			if(item.client_name == '' || null && item.client_phone == '' || null) {
				item.is_contact = 0;
			} else {
				item.is_contact = 1;
			}
			item.research_name = item.id_research.split('.')[0].replace(/[^\w\s]/gi, '');
		});

		const createAnswers = answerRepository.create(answers);
		await answerRepository.save(createAnswers);

		return 'answers-added';
	}
}

export default CreateAnswerService;