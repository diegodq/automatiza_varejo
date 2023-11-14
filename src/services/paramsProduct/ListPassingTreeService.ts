import paramsProductRepository from '../../repositories/paramsProductRepository';
import { BadRequestError } from '../../utils/ApiErrors';

type QuestionRequest =
{
	company: number;
}

class ListPassingTreeService
{
	public async execute({ company }: QuestionRequest): Promise<number>
	{
		const id = Number(company);

		const passingTree = await paramsProductRepository.findOne({ where: { company: { id } } });
		if(!passingTree) {
			throw new BadRequestError('no-passing-tree');
		}

		return passingTree.passing_tree
	}
}

export default ListPassingTreeService;