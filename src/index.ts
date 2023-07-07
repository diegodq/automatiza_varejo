import 'express-async-errors';
import express from 'express';
import appDataSource from './data-source';3
import errorMiddleware from './middleware/errorsMiddleware';
import routes from './routes';
import cors from 'cors';
import avatarConfig from './configurations/avatarConfig';
import configLogoClient from './configurations/configLogoClient';
import https from 'https';
import fs from 'fs';

// const options = {
// 	key: fs.readFileSync('/etc/letsencrypt/live/automatizavarejo.com.br/privkey.pem'),
// 	cert: fs.readFileSync('/etc/letsencrypt/live/automatizavarejo.com.br/fullchain.pem')
// }

const app = express();

appDataSource.initialize().then(() => {
	// app.use(cors({
	// 	origin: ['https://app.automatizavarejo.com.br', 'https://automatizavarejo.com.br', 'https://pesquisa.automatizavarejo.com.br'],
	// 	methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
	// }));

	app.use(cors({
		origin: '*'
	}));

	app.use('/avatar', express.static(avatarConfig.directory));
	app.use('/logo', express.static(configLogoClient.directory));

	app.use(express.json());
	app.use(express.urlencoded({
		extended: true
	}));

	app.use(routes);

	app.use(errorMiddleware);

	app.listen(process.env.SERVER_PORT, () => {
		console.log('api running on port 3007');
	});

	// https.createServer(options, app).listen();

}).catch(() => {
	console.log('API não conseguiu conectar-se ao Banco de Dados');
	process.exit(128);
})