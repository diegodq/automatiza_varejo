enum EnumPermissions {
	CRIAR = 1,
	EDITAR = 2,
	ATUALIZAR = 3,
	VISUALIZAR = 4,
	REMOVER = 5
}

enum FixedRole {
	ADMINISTRATOR = 1,
	GERENTE = 2,
	USUÁRIO = 3
}

enum HTTP_Verbs {
	GET = 'GET',
	POST = 'POST',
	DELETE = 'DELETE',
	PATCH = 'PATCH',
	PUT = 'PUT'
}

export { EnumPermissions, FixedRole, HTTP_Verbs }