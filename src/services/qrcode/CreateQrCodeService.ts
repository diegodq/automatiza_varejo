import path from "path";
import qrcode from 'qrcode';
import Company from "src/entities/Company";
import companyRepository from "src/repositories/companyRepository";
import qrCodeRepository from "src/repositories/qrCodeControlRepository";

type QRCodeType =
{
	cnpj: string,
	id_store: number
}

class CreateQrCodeService
{
	public async execute({ cnpj, id_store }: QRCodeType): Promise<void>
	{
		const url = `https://pesquisa.automatizavarejo.com.br/?cnpj=${cnpj}/${id_store}`;
		const output = path.join(__dirname, '../qrcode/' + `${cnpj}.${id_store}.png`);
		await qrcode.toFile(output, url, {
			margin: 1,
			scale: 12
		});

		const idCompany: Company[] = await companyRepository.find({ select: { id: true }, where:{ cnpj } });


	}
}

export default CreateQrCodeService;