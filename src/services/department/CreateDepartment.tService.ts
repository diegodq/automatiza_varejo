import departmentRepository from "src/repositories/departmentRepository";
import { BadRequestError } from "src/utils/ApiErrors";

type DepartmentRequest =
{
	department: string;
	status: string;
}

class CreateDepartmentService
{
	public async execute({ department, status }: DepartmentRequest)
	{
		const departmentExist = await departmentRepository.findOneBy({ department });
		if(departmentExist) {
			throw new BadRequestError('Este departamento já está cadastrado.');
		}

		const newDepartment = departmentRepository.create({ department, status });
		await departmentRepository.save(newDepartment);

		return 'Novo departamento adicionado.';
	}
}

export default CreateDepartmentService;