import Mailer from '../configurations/mailer/Mailer';
import path from 'path';

const accountRemoved: string = path.resolve(__dirname, '..', '..', 'notifications', 'account-removed.hbs');

export default {
	key: 'deleteAccount',
	async handle({ data }: any) {
		const { customer } = data;

		await Mailer.sendMail({
			from: {
				name: 'Equipe Automatiza Varejo',
				email: 'noreply@automatizavarejo.com.br'
			},
			to: {
				name: customer.first_name,
				email: customer.email
			},
			subject: 'Exclusão de conta',
			templateData: {
				file: accountRemoved,
				variables: {}
			}
		});
	}
}