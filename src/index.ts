import 'express-async-errors';
import express from 'express';
import appDataSource from './data-source';
import errorMiddleware from './middleware/errorsMiddleware';
import routes from './routes';
import cors from 'cors';
import avatarConfig from './configurations/avatarConfig';
import configLogoClient from './configurations/configLogoClient';
import https from 'https';
import fs from 'fs';
import products from './configurations/products';
import addProducts from './utils/insertProductsOnBoost';
import createFolder from './utils/createFolder';

const app = express();

appDataSource.initialize().then(() => {
	if(process.env.APP_MODE == 'development') {
		app.use(cors({
			origin: '*'
		}));

		console.log('cors enable to any urls in development mode');
	} else {
		app.use(cors({
			origin: ['https://api.automatizavarejo.com.br', 'https://app.automatizavarejo.com.br', 'https://automatizavarejo.com.br', 'https://pesquisa.automatizavarejo.com.br'],
			methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
		}));
	}

	app.use('/avatar', express.static(avatarConfig.directory));
	app.use('/logo', express.static(configLogoClient.directory));
	app.use('/qrcode', express.static(__dirname +'/qrcode'));

	app.use(express.json());
	app.use(express.urlencoded({
		extended: true
	}));

	app.use(routes);

	app.use(errorMiddleware);

	app.listen(process.env.SERVER_PORT, () => {
		console.log('api running on port', process.env.SERVER_PORT);
		addProducts(products);
		createFolder(['qrcode', 'reports']);
	});

	if(process.env.APP_MODE == 'development') {
		console.log('not enable certificates in development mode');
	} else {
		const options = {
			key: fs.readFileSync('/etc/letsencrypt/live/automatizavarejo.com.br/privkey.pem'),
			cert: fs.readFileSync('/etc/letsencrypt/live/automatizavarejo.com.br/fullchain.pem')
		}

		https.createServer(options, app).listen();
	}

}).catch(() => {
	console.log('API não conseguiu conectar-se ao Banco de Dados');
	process.exit(128);
})