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
		const newQRCodeControl: QRCodeControl = qrCodeControlRepository.create({qrcode_name, company, id_store });
		await qrCodeControlRepository.save(newQRCodeControl);
	}
}

export default CreateQRCodeControlService;