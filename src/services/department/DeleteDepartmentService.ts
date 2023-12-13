import paramsConfig from "../../params/paramsConfig";
import departmentRepository from "../../repositories/departmentRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type DepartmentRequest =
{
	id: number;
}

class DeleteDepartmentService
{
	public async execute({ id }: DepartmentRequest)
	{
		const department = await departmentRepository.findOneBy({ id });
		if(!department) {
			throw new BadRequestError('no-department');
		}

		if(!paramsConfig.params.allowRemoveDepartments) {
			throw new BadRequestError('Não permitido excluir departamentos');
		}

		await departmentRepository.remove(department);
		return 'Departamento removido.';
	}
}

export default DeleteDepartmentService;