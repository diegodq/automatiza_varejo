import { BadRequestError } from "../../utils/ApiErrors";
import companyRepository from "../../repositories/companyRepository";
import formatCNPJ from "../../utils/formatCNPJ";
import appDataSource from "../../data-source";
import { QueryRunner } from "typeorm";
import Company from "../../entities/Company";

type NPSRequest = {
	cnpj_company: string
}

class ListProductByCompanyService {
	public async execute({ cnpj_company }: NPSRequest): Promise<object> {
		const cnpj = formatCNPJ(cnpj_company);
		if (cnpj.length < 14 && cnpj.length > 15) {
			throw new BadRequestError('invalid-cnpj');
		}

		const companyExists: Company | null = await companyRepository.findOneBy({ cnpj });
		if (!companyExists) {
			throw new BadRequestError('no-company');
		}

		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const paramsProduct: any = await queryRunner.query(`
		SELECT pp.font_color, pp.background_color, pp.passing_tree
		FROM params_product pp
		JOIN company c ON pp.company_id = c.id
		WHERE c.cnpj = ?`, [cnpj]);

		const lockIp: any = await queryRunner.query(`select params_product.lock_by_ip from params_product join company 
		where params_product.company_id = company.id and company.cnpj = '${cnpj}';`);

		await queryRunner.release();

		let ipLock = '';
		lockIp.forEach((item: any): any => {
			ipLock = item.lock_by_ip;
		});

		return { status: 'success', paramsProduct, lockByIp: ipLock }
	}
}

export default ListProductByCompanyService;