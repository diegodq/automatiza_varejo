import companyRepository from "../../repositories/companyRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type NpsRequest =
{
	cnpj: string;
}

class ListAnchorQuestionAndLogoClientService
{
	public async execute({ cnpj }: NpsRequest): Promise<object>
	{
		const companyExist = await companyRepository.findOneBy({ cnpj });
		if(!companyExist) {
			throw new BadRequestError('no-company');
		}

		const data = await companyRepository.find({
			relations: {
				product: true
			},
			where: { cnpj }
		})

		const logoClient = data.map(item => {
			return item.getLogoCompany;
		});

		const anchorQuestion = data.map(item => {
			item.product.map(item => {
				return item.getAnchorQuestion;
			})
		});

		if(process.env.APP_MODE == 'development')
			return { status: 'success', anchorQuestion: anchorQuestion, logo: process.env.BASE_URL + ':' + process.env.SERVER_PORT + '/logo/' + logoClient };
		else
			return { status: 'success', anchorQuestion: anchorQuestion, logo: process.env.IMG_URL + '/logo/' + logoClient };
	}
}

export default ListAnchorQuestionAndLogoClientService;