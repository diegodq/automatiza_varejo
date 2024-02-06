import Permission from "../../entities/Permissions";
import permissionRepository from "../../repositories/permissionRepository";
import { BadRequestError } from "../../utils/ApiErrors";

class RemovePermissionsService
{
	public async execute(id: number): Promise<string>
	{
		const permission: Permission | null = await permissionRepository.findOneBy({ id });
		if (!permission)
			throw new BadRequestError('do-not-exists-this-permission');

		await permissionRepository.remove(permission);
		return 'permission-removed';
	}
}

export default RemovePermissionsService;