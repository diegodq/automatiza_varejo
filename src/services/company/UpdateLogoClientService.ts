import path from "path";
import fs from 'fs';
import configLogoClient from "../../configurations/configCompanyLogo";
import { BadRequestError } from "../../utils/ApiErrors";
import companyRepository from "../../repositories/companyRepository";
import Company from '../../entities/Company';

interface AvatarRequest
{
	id: string;
	logoClientName: string;
	fileSize: number;
}

class UpdateLogoClientService
{
	public async execute({ id, logoClientName, fileSize }: AvatarRequest): Promise<string>
	{
		const company: Company | null  = await companyRepository.findOneBy({ id: Number(id) });
		if (!company) {
			throw new BadRequestError('no-company');
		}

		if(fileSize >= 1000000) {
			throw new BadRequestError('Tamanho da imagem não pode passar de 1Mb');
		}

		if(company.logo_company) {
			const logoClientFilePath = path.join(configLogoClient.directory, company.logo_company);
			const userAvatarFileExists = await fs.promises.stat(logoClientFilePath);
			if(userAvatarFileExists) {
				await fs.promises.unlink(logoClientFilePath);
			}
		}

		company.logo_company = logoClientName;
		await companyRepository.save(company);

		return company.logo_company;
	}
}

export default UpdateLogoClientService;