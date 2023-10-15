import ParamsProduct from "../../entities/ParamsProduct";
import paramsProductRepository from "../../repositories/paramsProductRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type QuestionRequest =
{
	company: number;
  lock_by_ip: boolean;
}

class UpdateLockByIpService
{
	public async execute({ company, lock_by_ip }: QuestionRequest): Promise<string>
	{
		const id = Number(company);

		const lockByIp: ParamsProduct | null = await paramsProductRepository.findOne({ where: { company: { id } } });
		if(!lockByIp) {
			throw new BadRequestError('no-params-product');
		}

		lockByIp.lock_by_ip = lock_by_ip;
		await paramsProductRepository.save(lockByIp);

		return 'lock-updated';
	}
}

export default UpdateLockByIpService;