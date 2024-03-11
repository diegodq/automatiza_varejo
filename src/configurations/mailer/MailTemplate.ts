import handlebars from "handlebars";
import fs from 'fs';

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
		const fileTemplateContent: string = await fs.promises.readFile(file, { encoding: 'utf-8' });
		const parseTemplate: HandlebarsTemplateDelegate = handlebars.compile(fileTemplateContent);
		return parseTemplate(variables);
	}
}

export default MailTemplate;