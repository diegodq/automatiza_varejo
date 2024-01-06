import Company from "../../entities/Company";
import { BadRequestError } from "../../utils/ApiErrors";
import paramsProductRepository from "../../repositories/paramsProductRepository";
import ParamsProduct from "../../entities/ParamsProduct";
import convertUserIdInCompanyId from "../../utils/convertUserIdInCompanyId";

type TopicRequest =
{
	company: Company;
	passing_tree: number;
}

class ModifyPassingTreeService
{
	public async execute({ company, passing_tree }: TopicRequest): Promise<string>
	{
		const id = await convertUserIdInCompanyId(Number(company));

		const passingTree: ParamsProduct | null = await paramsProductRepository.findOne({ where: { company: { id } } });
		if(!passingTree) {
			throw new BadRequestError('no-passing-tree');
		}

		passingTree.passing_tree = passing_tree;
		await paramsProductRepository.save(passingTree);

		return 'passing-tree-updated';
	}
}

export default ModifyPassingTreeService;