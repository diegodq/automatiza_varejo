import permissionRepository from '../../repositories/permissionRepository';
import Permission from '../../entities/Permissions';
import { BadRequestError } from '../../utils/ApiErrors';

type RequestPermission = {
	id: number;
	name: string;
	description: string;
}

class UpdatePermissionService
{
	public async execute({ id, name, description }: RequestPermission): Promise<string>
	{
		const permission: Permission | null = await permissionRepository.findOneBy({ id });
		if(!permission) {
			throw new BadRequestError('permission-do-not-exists');
		}

		permission.name = name;
		permission.description = description;

		await permissionRepository.save(permission);

		return 'permission-updated';
	}
}

export default UpdatePermissionService;