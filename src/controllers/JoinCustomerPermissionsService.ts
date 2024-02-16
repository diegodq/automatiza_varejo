type RequestType = {
	customer_id: number,
	permissions: []
}

class JoinCustomerPermissionsService
{
	public async execute({ customer_id, permissions }: RequestType): Promise<string>
	{
		console.log('customer id: ',customer_id);
		console.log(permissions);
		return '';
	}
}

export default JoinCustomerPermissionsService;