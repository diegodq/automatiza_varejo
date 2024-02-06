import { BadRequestError } from "../../utils/ApiErrors";
import roleRepository from "../../repositories/rolesRepository";
import Roles from "../../entities/Roles";

type RequestRole = {
	name: string;
	description: string;
}

class CreateRoleService
{
	public async execute({name, description}: RequestRole): Promise<string>
	{
		const role: Roles | null = await roleRepository.findOne({ where: { name } });
		if(role)
			throw new BadRequestError('this-role-already-registered');

		const newPermission: Roles = roleRepository.create({ name, description });
		await roleRepository.save(newPermission);

		return 'role-created';
	}
}

export default CreateRoleService;