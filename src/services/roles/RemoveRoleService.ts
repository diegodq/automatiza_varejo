import Roles from "../../entities/Roles";
import { BadRequestError } from "../../utils/ApiErrors";
import roleRepository from "../../repositories/rolesRepository";

class RemoveRoleService
{
	public async execute(id: number): Promise<string>
	{
		const role: Roles | null = await roleRepository.findOneBy({ id });
		if (!role)
			throw new BadRequestError('do-not-exists-this-role');

		await roleRepository.remove(role);
		return 'role-removed';
	}
}

export default RemoveRoleService;