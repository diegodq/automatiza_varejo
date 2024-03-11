import Permission from "../../entities/Permissions";
import permissionRepository from "../../repositories/permissionRepository";

type PermissionType = {
	created_at: Date;
	updated_at: Date;
}

class ListPermissionsService
{
	public async execute(): Promise<object[]>
	{
		const listPermissions: Permission[] = await permissionRepository.find();

		const list: object[] = this.filterAndRemoveProperties(listPermissions);
		return list;
	}

	private filterAndRemoveProperties(listPermissions: Array<{created_at: Date, updated_at: Date}>)
	{
		return listPermissions.map((item: PermissionType) => {
			const { created_at, updated_at, ...rest } = item;
			return { ...rest };
		});
	}
}

export default ListPermissionsService;