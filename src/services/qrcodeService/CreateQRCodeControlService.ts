import qrCodeControlRepository from "../../repositories/qrCodeControlRepository";
import Company from "../../entities/Company";
import QRCodeControl from "../../entities/QRCodeControl";

type QRCodeControlType =
{
	qrcode_name: string,
	company: Company,
	id_store: number
}

class CreateQRCodeControlService
{
	public async execute({ qrcode_name, company, id_store }: QRCodeControlType): Promise<void>
	{
		if(id_store === 0) {
			const newQRCodeControl: QRCodeControl = qrCodeControlRepository.create({qrcode_name, company });
			await qrCodeControlRepository.save(newQRCodeControl);
		} else {
			const newQRCodeControl: QRCodeControl = qrCodeControlRepository.create({qrcode_name, company, id_store });
			await qrCodeControlRepository.save(newQRCodeControl);
		}
	}
}

export default CreateQRCodeControlService;