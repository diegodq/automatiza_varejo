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
		let url = '';
		let output = '';

		if(id_store == 0) {
			url = `https://pesquisa.automatizavarejo.com.br/?cnpj=${cnpj}`;
			output = path.join(__dirname, '../../qrcode/' + `${cnpj}.png`);
		} else {
			url = `https://pesquisa.automatizavarejo.com.br/?cnpj=${cnpj}/${id_store}`;
			output = path.join(__dirname, '../../qrcode/' + `${cnpj}.${id_store}.png`);
		}
		await qrcode.toFile(output, url, {
			color: {
				light: '#0000'
			},
			margin: 1,
			scale: 12
		});
	}
}

export default CreateQrCodeService;