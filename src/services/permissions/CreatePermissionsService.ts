import { BadRequestError } from "../../utils/ApiErrors";
import Permission from "../../entities/Permissions";
import permissionRepository from "../../repositories/permissionRepository";

type RequestPermission = {
	name: string;
	description: string;
}

class CreatePermissionsService
{
	public async execute({name, description}: RequestPermission): Promise<string>
	{
		const permissionExists: Permission | null = await permissionRepository.findOne({ where: { name } });
		if(permissionExists)
			throw new BadRequestError('this-permission-already-registered');

		const newPermission: Permission = permissionRepository.create({ name, description });
		await permissionRepository.save(newPermission);

		return 'permission-created';
	}
}

export default CreatePermissionsService;