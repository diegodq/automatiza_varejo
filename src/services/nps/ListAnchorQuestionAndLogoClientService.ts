import appDataSource from "../../data-source";
import companyRepository from "../../repositories/companyRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import formatCNPJ from "../../utils/formatCNPJ";


type NPSRequest = {
	cnpj_company: string,
	ip_address: string
}

class ListAnchorQuestionAndLogoClientService
{
	public async execute({ cnpj_company, ip_address }: NPSRequest): Promise<object>
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

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const dataResearch = await queryRunner.query(`select answer.created_at, answer.ip_address from answer order by answer.created_at desc limit 1;`);

		await queryRunner.release();

		let resultAllow = true;
		dataResearch.forEach((item: any ) => {
			if(item.ip_address === ip_address)
				resultAllow = false;
			else
				resultAllow = true;
		});

		console.log(resultAllow);

		if(process.env.APP_MODE == 'development')
			return { status: 'success', anchorQuestion: anchorQuestion[0] == null || '' ? '' : anchorQuestion[0], logo: logoClient[0] == '' ? '' : process.env.BASE_URL + ':' + process.env.SERVER_PORT + '/logo/' + logoClient[0], allowResearch: resultAllow };
		else
			return {status: 'success', anchorQuestion: anchorQuestion[0] == null || '' ? '' : anchorQuestion[0], logo: logoClient[0] == '' ? '' : process.env.IMG_URL + '/logo/' + logoClient[0], allowResearch: resultAllow };
	}
}

export default ListAnchorQuestionAndLogoClientService;