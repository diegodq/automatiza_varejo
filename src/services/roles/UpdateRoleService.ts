import permissionRepository from '../../repositories/permissionRepository';
import { BadRequestError } from '../../utils/ApiErrors';
import roleRepository from '../../repositories/rolesRepository';
import Roles from '../../entities/Roles';

type RequestRole = {
	id: number;
	name: string;
	description: string;
}

class UpdateRoleService
{
	public async execute({ id, name, description }: RequestRole): Promise<string>
	{
		const role: Roles | null = await roleRepository.findOneBy({ id });
		if(!role) {
			throw new BadRequestError('role-do-not-exists');
		}

		role.name = name;
		role.description = description;

		await permissionRepository.save(role);

		return 'role-updated';
	}
}

export default UpdateRoleService;