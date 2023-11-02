import Company from "../../entities/Company";
import appDataSource from "../../data-source";
import companyRepository from "../../repositories/companyRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import formatCNPJ from "../../utils/formatCNPJ";

type NPSRequest = {
	cnpj_company: string,
	ip_address: string,
	store: string
}

class ListAnchorQuestionAndLogoClientService
{
	public async execute({ cnpj_company, ip_address, store }: NPSRequest): Promise<object>
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

		if(typeof store === 'undefined') {
			const queryRunner = appDataSource.createQueryRunner();
			await queryRunner.connect();

			const dataResearch: any = await queryRunner.query(`select answer.created_at, answer.ip_address from answer where answer.ip_address <> ''
			and date(answer.created_at) = date(now()) order by answer.created_at desc limit 50;`);

			const lockIp: any = await queryRunner.query(`select params_product.lock_by_ip from params_product join company
			where params_product.company_id = company.id and company.cnpj = ?;`, [cnpj]);

			await queryRunner.release();

			let allowResearch = true;
			dataResearch.forEach((item: any): any => {
				if(item.ip_address === ip_address)
					allowResearch = false;
			})

			let ipLock = false;
			lockIp.forEach((item: any ): any => {
				if(item.lock_by_ip) ipLock = true;
				else ipLock = false;
			});

			if(process.env.APP_MODE == 'development')
				return { status: 'success', anchorQuestion: anchorQuestion[0] == null || '' ? '' : anchorQuestion[0],
				logo: logoClient[0] == '' ? '' : process.env.BASE_URL + ':' + process.env.SERVER_PORT + '/logo/' + logoClient[0], allowResearch: allowResearch, lockByIp: ipLock };
			else
				return {status: 'success', anchorQuestion: anchorQuestion[0] == null || '' ? '' : anchorQuestion[0],
				logo: logoClient[0] == '' ? '' : process.env.IMG_URL + '/logo/' + logoClient[0], allowResearch: allowResearch, lockByIp: ipLock };
		} else {
			const queryRunner = appDataSource.createQueryRunner();
			await queryRunner.connect();

			const dataResearch: any = await queryRunner.query(`select answer.created_at, answer.ip_address from answer join store on store.id = answer.store_id
			where answer.ip_address <> '' and date(answer.created_at) = date(now()) and store.store_number = ?
			order by answer.created_at desc limit 50;`, [store]);

			const lockIp: any = await queryRunner.query(`select params_product.lock_by_ip from params_product join company
			on params_product.company_id = company.id
			join store on store.company_id = company.id
			where company.cnpj = ? and store.store_number = ? limit 1;`, [cnpj, store]);

			await queryRunner.release();

			let allowResearch = true;
			dataResearch.forEach((item: any): any => {
				if(item.ip_address === ip_address)
					allowResearch = false;
			})

			let ipLock = false;
			lockIp.forEach((item: any ): any => {
				if(item.lock_by_ip) ipLock = true;
				else ipLock = false;
			});

			if(process.env.APP_MODE == 'development')
				return { status: 'success', anchorQuestion: anchorQuestion[0] == null || '' ? '' : anchorQuestion[0],
				logo: logoClient[0] == '' ? '' : process.env.BASE_URL + ':' + process.env.SERVER_PORT + '/logo/' + logoClient[0], allowResearch: allowResearch, lockByIp: ipLock };
			else
				return {status: 'success', anchorQuestion: anchorQuestion[0] == null || '' ? '' : anchorQuestion[0],
				logo: logoClient[0] == '' ? '' : process.env.IMG_URL + '/logo/' + logoClient[0], allowResearch: allowResearch, lockByIp: ipLock };
		}
	}
}

export default ListAnchorQuestionAndLogoClientService;