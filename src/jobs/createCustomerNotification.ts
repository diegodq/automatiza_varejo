import Mailer from '../configurations/mailer/Mailer';
import path from 'path';

const createAccountTemplate: string = path.resolve(__dirname, '..', 'notifications', 'verify-email.hbs');

export default {
	key: 'createCustomer',
	async handle({ data }: any): Promise<void> {
		const { user } = data;

		await Mailer.sendMail({
			from: {
				name: 'Equipe Automatiza Varejo',
				email: 'noreply@automatizavarejo.com.br'
			},
			to: {
				name: user.first_name,
				email: user.email
			},
			subject: 'BEM-VINDO À AUTOMATIZA VAREJO!',
			templateData: {
				file: createAccountTemplate,
				variables: {
					name: user.first_name,
					link: `https://app.automatizavarejo.com.br/active-customer?token=${user.token}&id=${user.newCustomer.id}`,
				}
			}
		});
	}
}