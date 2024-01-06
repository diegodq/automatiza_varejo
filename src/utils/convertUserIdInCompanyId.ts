import appDataSource from "../data-source";

async function convertUserIdInCompanyId(id: number): Promise<number>
{
	const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();

  const result = await queryRunner.query(`select company.id
    from company join customer on customer.company_id = company.id
    where customer.id = ?;`, [id]);

  await queryRunner.release();

  const firstResult = result.find((item: { id: number }) => item.id);

  return firstResult ? firstResult.id : 0;
}

export default convertUserIdInCompanyId;