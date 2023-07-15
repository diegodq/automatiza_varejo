import { BadRequestError } from "../../utils/ApiErrors";
import paramsProduct from "../../repositories/paramsProductsRepository";

type TopicRequest =
{
	id_params: number;
	passing_tree: number;
}

class ModifyPassingTreeService
{
	public async execute({ id_params, passing_tree }: TopicRequest): Promise<string>
	{
		const passingTree = await paramsProduct.findOneBy({ id: id_params });
		if(!passingTree) {
			throw new BadRequestError('no-passing-tree');
		}

		passingTree.passing_tree = passing_tree;
		await paramsProduct.save(passingTree);

		return 'passing-tree-updated';
	}
}

export default ModifyPassingTreeService;