import { BadRequestError } from "../../utils/ApiErrors";
import companyRepository from "../../repositories/companyRepository";
import formatCNPJ from "../../utils/formatCNPJ";
import appDataSource from "src/data-source";

type NPSRequest = {
	cnpj_company: string
}

class ListProductByCompanyService {
	public async execute({ cnpj_company }: NPSRequest): Promise<object> {
		const cnpj = formatCNPJ(cnpj_company);
		if (cnpj.length < 14 && cnpj.length > 15) {
			throw new BadRequestError('invalid-cnpj');
		}

		const companyExists = await companyRepository.findOneBy({ cnpj });
		if (!companyExists) {
			throw new BadRequestError('no-company');
		}

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const paramsProduct = await queryRunner.query(`
		
		SELECT pp.font_color, pp.background_color
		FROM params_product pp
		JOIN company c ON pp.company_id = c.id
		WHERE c.cnpj = ?`, [cnpj])

		await queryRunner.release()

		return { status: 'success', paramsProduct }
	}
}

export default ListProductByCompanyService;