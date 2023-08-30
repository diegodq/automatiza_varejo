import path from "path";
import fs from 'fs';
import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import multerConfig from "../../configurations/avatarConfig";

interface AvatarRequest
{
	id: string;
	avatarFileName: string;
	fileSize: number;
}

class UpdateCustomerAvatarService
{
	public async execute({ id, avatarFileName, fileSize }: AvatarRequest): Promise<string>
	{
		const customer = await customerRepository.findOneBy({ id: Number(id) });
		if (!customer) {
			throw new BadRequestError('Usuário não encontrado');
		}

		if(fileSize >= 1000000) {
			throw new BadRequestError('Tamanho da imagem não pode passar de 1Mb');
		}

		if(customer.avatar) {
			const userAvatarFilePath = path.join(multerConfig.directory, customer.avatar);
			const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
			if(userAvatarFileExists) {
				await fs.promises.unlink(userAvatarFilePath);
			}
		}

		customer.avatar = avatarFileName;
		await customerRepository.save(customer);

		return customer.avatar;
	}
}

export default UpdateCustomerAvatarService;