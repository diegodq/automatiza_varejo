import { BadRequestError } from "../../utils/ApiErrors";
import appDataSource from "../../data-source";

type TokenType = {
	userId: number;
}

class GetTypeCustomersService
{
	public async execute({ userId }: TokenType): Promise<object>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const queryResult = await queryRunner.query(`select type_customer.type_customer from customer
		left join type_customer on type_customer.id = customer.type_customer
		where customer.id = ?;`, [ userId ]);

		await queryRunner.release();

		if(queryResult.length === 0)
			throw new BadRequestError('no-type-customer');

		return queryResult;
	}
}

export default GetTypeCustomersService;