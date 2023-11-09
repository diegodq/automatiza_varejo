import path from "path";
import fs, { Stats } from 'fs';
import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import multerConfig from "../../configurations/avatarConfig";
import Customer from "../../entities/Customer";

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
		const customer: Customer | null = await customerRepository.findOneBy({ id: Number(id) });
		if (!customer) {
			throw new BadRequestError('Usuário não encontrado');
		}

		if(fileSize >= 1000000) {
			throw new BadRequestError('Tamanho da imagem não pode passar de 1Mb');
		}

		if(customer.avatar) {
			const userAvatarFilePath: string = path.join(multerConfig.directory, customer.avatar);
			const userAvatarFileExists: Stats = await fs.promises.stat(userAvatarFilePath);
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