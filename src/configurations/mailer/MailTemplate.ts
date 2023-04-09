import handlebars from "handlebars";
import fs from 'fs';
/**
 * definir uma classe onde nesse classe terá um método
 * que fará um parse. montará o conteúdo do email
 */

interface iTemplateVariable
{
	[key: string]: string | number;
}

interface RequestTemplate
{
	file: string;
	variables: iTemplateVariable;
}

class MailTemplate
{
	public async parse({ file, variables }: RequestTemplate ): Promise<string>
	{
		const fileTamplateContent = await fs.promises.readFile(file, { encoding: 'utf-8' });
		const parseTemplate = handlebars.compile(fileTamplateContent);
		return parseTemplate(variables);
	}
}

export default MailTemplate;