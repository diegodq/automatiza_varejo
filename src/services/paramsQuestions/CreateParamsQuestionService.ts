// import { BadRequestError } from "../../utils/ApiErrors";
// import questionRepository from "../../repositories/questionRepository";
// import paramsQuestionRepository from "../../repositories/paramsQuestionRepository";
// import Question from "../../entities/Question";

// type ParamsType =
// {
// 	tree_question: number,
// 	option_one: string,
// 	option_two: string,
// 	import_type: string,
// 	position: number,
// 	mandatory_question: number,
// 	finish_research: number,
// 	question: Question;
// }

// class CreateParamsQuestionService
// {
// 	public async execute({ params }: ParamsType): Promise<string | undefined>
// 	{
// 		const questionExists = await questionRepository.findOneBy({ id: Number(question) });
// 		if(!questionExists) {
// 			throw new BadRequestError('no-questions');
// 		}

// 		const storeParams = paramsQuestionRepository.create(params);

// 		const result = await paramsQuestionRepository.save(storeParams);
// 		if(!result) {
// 			return 'error';
// 		} else {
// 			return 'params-created';
// 		}
// 	}
// }

// export default CreateParamsQuestionService;