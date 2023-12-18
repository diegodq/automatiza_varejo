import companyRepository from "../../repositories/companyRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Company from '../../entities/Company';

class RemoveCompanyService
{
	public async execute(id: number): Promise<string>
	{
		const company: Company | null = await companyRepository.findOneBy({ id });
		if (!company) {
			throw new BadRequestError('Empresa não cadastrada.');
		}

		await companyRepository.remove(company);

		return 'Empresa removida.'
	}
}

export default RemoveCompanyService;