import Roles from "../../entities/Roles";
import roleRepository from "../../repositories/rolesRepository";

type RequestRole = {
	created_at: Date;
	updated_at: Date;
}

class ListRoleService
{
	public async execute(): Promise<object[]>
	{
		const ListRoles: Roles[] = await roleRepository.find();

		const list: object[] = this.filterAndRemoveProperties(ListRoles);
		return list;
	}

	private filterAndRemoveProperties(listRoles: Array<{created_at: Date, updated_at: Date}>)
	{
		return listRoles.map((item: RequestRole) => {
			const { created_at, updated_at, ...rest } = item;
			return { ...rest };
		});
	}
}

export default ListRoleService;