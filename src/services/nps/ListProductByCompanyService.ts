import companyRepository from "../../repositories/companyRepository";

type NpsRequest =
{
	cnpj: string;
}

class ListProductByCompanyService
{
	public async execute({ cnpj }: NpsRequest)
	{
		const companyExists = await companyRepository.find({
			relations: {
				product: true
			},

			where: { cnpj }
		});

		return companyExists;
	}
}

export default ListProductByCompanyService;