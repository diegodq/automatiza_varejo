import Company from "../../entities/Company";
import appDataSource from "../../data-source";
import companyRepository from "../../repositories/companyRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import formatCNPJ from "../../utils/formatCNPJ";
import storeRepository from "../../repositories/storeRepository";
import Store from "../../entities/Store";

type NPSRequest = {
	cnpj_company: string,
	ip_address: string,
	id_store: string
}

class ListAnchorQuestionAndLogoClientService
{

	public async execute({ cnpj_company, ip_address, id_store }: NPSRequest): Promise<object>
	{
		const cnpj: string = formatCNPJ(cnpj_company);
		if(cnpj.length < 14 && cnpj.length > 15) {
			throw new BadRequestError('invalid-cnpj');
		}

		const companyExists: Company | null = await companyRepository.findOneBy({ cnpj });
		if(!companyExists)
			throw new BadRequestError('no-company');

		if(await this.checkMultiStoreIsOn(cnpj)) {
			const storeExists: Store | null = await storeRepository.findOneBy({ id: Number(id_store) });
			if(!storeExists)
				throw new BadRequestError('store-do-not-exists');
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

		let dataResearch = null;
		let lockIp = null;

		if(typeof id_store === 'undefined') {
			dataResearch = await queryRunner.query(`select answer.created_at, answer.ip_address from answer where answer.ip_address <> ''
			and date(answer.created_at) = date(now()) order by answer.created_at desc limit 50;`);

			lockIp = await queryRunner.query(`select params_product.lock_by_ip from params_product join company
			where params_product.company_id = company.id and company.cnpj = ?;`, [cnpj]);
		} else {
			dataResearch = await queryRunner.query(`select answer.created_at, answer.ip_address from answer join store on store.id = answer.store_id
			where answer.ip_address <> '' and date(answer.created_at) = date(now()) and store.store_number = ?
			order by answer.created_at desc limit 50;`, [id_store]);

			lockIp = await queryRunner.query(`select params_product.lock_by_ip from params_product join company
			on params_product.company_id = company.id
			join store on store.company_id = company.id
			where company.cnpj = ? and store.store_number = ? limit 1;`, [cnpj, id_store]);
		}

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

	private async checkMultiStoreIsOn(cnpj: string): Promise<number>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const multiStoreIsOn = await queryRunner.query(`select multi_store from company_product join company on company.id = company_product.company
		where company.cnpj = ?;`, [cnpj]);

		await queryRunner.release();

		let hasMultiStore = 0;
		multiStoreIsOn.forEach((item: {multi_store: number}) => {
			hasMultiStore = item.multi_store;
		})

		return hasMultiStore;
	}
}

export default ListAnchorQuestionAndLogoClientService;