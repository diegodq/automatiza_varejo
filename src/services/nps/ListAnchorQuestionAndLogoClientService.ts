import companyRepository from "../../repositories/companyRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type NPSRequest = {
	cnpj: string
}

class ListAnchorQuestionAndLogoClientService
{
	public async execute({ cnpj }: NPSRequest): Promise<object>
	{
		const companyExists = await companyRepository.findOneBy({ cnpj });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const information = await companyRepository.find({
			relations: {
				product: true
			},
			where: { cnpj }
		});

		const anchorQuestion = information.map(item => {
			return item.product[0].anchor_question;
		});

		const logoClient = information.map(item => {
			return item.getLogoCompany;
		});

		if(process.env.APP_MODE == 'development')
			return { status: 'success', anchorQuestion: anchorQuestion, logo: process.env.BASE_URL + ':' + process.env.SERVER_PORT + '/logo/' + logoClient };
		else
			return {status: 'success', anchorQuestion: anchorQuestion, logo: process.env.IMG_URL + '/logo/' + logoClient };
	}
}

export default ListAnchorQuestionAndLogoClientService;