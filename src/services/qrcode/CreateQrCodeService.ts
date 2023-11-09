import path from "path";
import qrcode from 'qrcode';

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
	}
}

export default CreateQrCodeService;