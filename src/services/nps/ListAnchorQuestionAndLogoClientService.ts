import companyRepository from "../../repositories/companyRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import formatCNPJ from "../../utils/formatCNPJ";

type NPSRequest = {
	cnpj_company: string
}

class ListAnchorQuestionAndLogoClientService
{
	public async execute({ cnpj_company }: NPSRequest): Promise<object>
	{
		const cnpj = formatCNPJ(cnpj_company);
		if(cnpj.length < 14 && cnpj.length > 15) {
			throw new BadRequestError('invalid-cnpj');
		}

		const companyExists = await companyRepository.findOneBy({ cnpj });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const information = await companyRepository.find({
			relations: {
				paramsProduct: true
			},
			where: { cnpj }
		});

		let anchorQuestion = information.map(item => {
			if(item.paramsProduct == null) return '';
			else return item.paramsProduct.anchor_question;
		});

		let logoClient = information.map(item => {
			return item.logo_company;
		})

		console.log(logoClient);

		if(process.env.APP_MODE == 'development')
			return { status: 'success', anchorQuestion: anchorQuestion[0] == null || '' ? '' : anchorQuestion[0], logo: logoClient[0] == '' ? '' : process.env.BASE_URL + ':' + process.env.SERVER_PORT + '/logo/' + logoClient[0] };
		else
			return {status: 'success', anchorQuestion: anchorQuestion[0] == null || '' ? '' : anchorQuestion[0], logo: logoClient[0] == '' ? '' : process.env.IMG_URL + '/logo/' + logoClient[0] };
	}
}

export default ListAnchorQuestionAndLogoClientService;