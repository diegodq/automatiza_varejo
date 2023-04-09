import 'dotenv/config';
import nodemailer from 'nodemailer';
import MailTemplate from './MailTemplate';

interface TemplateVariable
{
	[key: string]: string | number;
}

interface RequestTemplate
{
	file: string;
	variables: TemplateVariable;
}


interface MailContact
{
	name: string;
	email: string;
}

interface SendMail
{
	to: MailContact;
	from: MailContact;
	subject: string;
	templateData: RequestTemplate;
}

class EtherealMail
{
	static async sendMail( { from, to, subject, templateData }: SendMail ): Promise<void>
	{
		const mailTemplate = new MailTemplate();

		const port = process.env.SMTP_PORT as unknown as number;

		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: port,
			auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
			}
		});

		await transporter.sendMail({
			from: {
				name: from?.name || 'Equipe Automatiza Varejo',
				address: from?.email || 'equipe@automatizavarejo.com.br'
			},
      to: {
				name: to.name,
				address: to.email,
			},
      subject,
      html: await mailTemplate.parse(templateData)
		});
	}
}

export default EtherealMail;