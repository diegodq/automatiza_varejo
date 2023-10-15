import Company from "../../entities/Company";
import appDataSource from "../../data-source";
import companyRepository from "../../repositories/companyRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import formatCNPJ from "../../utils/formatCNPJ";
import { QueryRunner } from "typeorm";


type NPSRequest = {
	cnpj_company: string,
	ip_address: string
}

class ListAnchorQuestionAndLogoClientService
{
	public async execute({ cnpj_company, ip_address }: NPSRequest): Promise<object>
	{
		const cnpj: string = formatCNPJ(cnpj_company);
		if(cnpj.length < 14 && cnpj.length > 15) {
			throw new BadRequestError('invalid-cnpj');
		}

		const companyExists: Company | null = await companyRepository.findOneBy({ cnpj });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const information: Company[] = await companyRepository.find({
			relations: {
				paramsProduct: true
			},
			where: { cnpj }
		});

		const anchorQuestion: string[] = information.map(item => {
			if(item.paramsProduct == null) return '';
			else return item.paramsProduct.anchor_question;
		});

		const logoClient: string[] = information.map(item => {
			return item.logo_company;
		})

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const dataResearch: any = await queryRunner.query(`select answer.created_at, answer.ip_address from answer where answer.ip_address <> '' order by answer.created_at desc limit 30;`);

		await queryRunner.release();

		let resultAllow = true;
		dataResearch.forEach((item: any ): any => {
			if(item.ip_address === ip_address) resultAllow = false;
			else resultAllow = true;
		});

		const queryRunner2: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner2.connect();

		const lockIp: any = await queryRunner2.query(`select params_product.lock_by_ip from params_product join company 
		where params_product.company_id = company.id and company.cnpj = '${cnpj}';`);

		await queryRunner2.release();

		let ipLock = false;
		lockIp.forEach((item: any ): any => {
			if(item.lock_by_ip) ipLock = true;
			else ipLock = false;
		});

		if(process.env.APP_MODE == 'development')
			return { status: 'success', anchorQuestion: anchorQuestion[0] == null || '' ? '' : anchorQuestion[0], 
			logo: logoClient[0] == '' ? '' : process.env.BASE_URL + ':' + process.env.SERVER_PORT + '/logo/' + logoClient[0], resultAllow: resultAllow, lockByIp: ipLock };
		else
			return {status: 'success', anchorQuestion: anchorQuestion[0] == null || '' ? '' : anchorQuestion[0], 
			logo: logoClient[0] == '' ? '' : process.env.IMG_URL + '/logo/' + logoClient[0], resultAllow: resultAllow, lockByIp: ipLock };
	}
}

export default ListAnchorQuestionAndLogoClientService;