function unformatCNPJ(cnpj: string) {
	cnpj = cnpj.replace(/[./-]/g, '');

	return cnpj;
}

export default unformatCNPJ;