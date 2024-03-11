import { BadRequestError } from "../../utils/ApiErrors";
import Store from "../../entities/Store";
import storeRepository from "../../repositories/storeRepository";
import path from "path";
import fs from 'fs';

class RemoveStoreService
{
	public async execute(id_store: number): Promise<string>
	{
		const storeExists: Store | null = await storeRepository.findOneBy({ id: Number(id_store) });
		if(!storeExists)
			throw new BadRequestError('store-do-not-exists');

		await storeRepository.remove(storeExists);

		const qrCodePath: string = path.join(__dirname, '../../qrcode');
		const qrCodeNames: string[] = fs.readdirSync(qrCodePath);

		const fileIdentification: string = id_store.toString();
		const identificationFound: string | undefined = qrCodeNames.find((qrcode: string) => {
			return qrcode.includes(fileIdentification);
		})

		fs.unlinkSync(qrCodePath + '/'+ identificationFound);

		return 'store-removed';
	}
}

export default RemoveStoreService;