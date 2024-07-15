import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import appDataSource from './data-source';
import errorMiddleware from './middleware/errorsMiddleware';
import routes from './routes';
import cors from 'cors';
import avatarConfig from './configurations/avatarConfig';
import configLogoClient from './configurations/configCompanyLogo';
import https from 'https';
import fs from 'fs';
import products from './configurations/products';
import addProducts from './utils/insertProductsOnBoost';
import createFolder from './utils/createFolder';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import paramsConfig from './params/paramsConfig';

const app = express();

const whiteList: string[] = ['http://localhost:5173', 'https://api.automatizafacil.com.br', 'https://app.automatizafacil.com.br', 'https://automatizafacil.com.br', 'https://pesquisa.automatizafacil.com.br'];

const options = {
	swaggerOptions: {
		validatorUrl: null
	}
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

appDataSource.initialize().then(() => {
	if (paramsConfig.params.useImplicitToken) {
		if(process.env.APP_MODE == 'development') {
			app.use(cors({
				origin: '*',
				credentials: true,
			}));

			console.log('Cors enable to any urls in development mode');
		} else {
			app.use(cors({
				origin: function (origin: string | undefined, callback: (arg0: Error | null, arg1: boolean) => void) {
					if (!origin || whiteList.indexOf(origin) !== -1)
						callback(null, true);
					else
						callback(new Error('Not allowed by cors'), false);
				},
				credentials: true,
				methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
			}));
		}
	} else {
		if(process.env.APP_MODE == 'development') {
			app.use(cors({
				origin: '*',
			}));

			console.log('Cors enable to any urls in development mode');
		} else {
			app.use(cors({
				origin: function (origin: string | undefined, callback: (arg0: Error | null, arg1: boolean) => void) {
					if (!origin || whiteList.indexOf(origin) !== -1)
						callback(null, true);
					else
						callback(new Error('Not allowed by cors'), false);
				},
				credentials: true,
				methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
			}));
		}
	}

	app.use('/avatar', express.static(avatarConfig.directory));
	app.use('/logo', express.static(configLogoClient.directory));
	app.use('/qrcode', express.static(__dirname +'/qrcode'));
	app.use('/report', express.static(__dirname+'/files'));

	app.use(express.json());
	app.use(express.urlencoded({
		extended: true
	}));

	app.use(routes);

	app.use(errorMiddleware);

	app.listen(process.env.SERVER_PORT, async () => {
		console.log('api running on port', process.env.SERVER_PORT);
		await addProducts(products);
		await createFolder(['qrcode', 'reports', 'files']);
	});

	if(process.env.APP_MODE == 'development') {
		console.log('Not enable certificates in development mode');
	} else {
		const options = {
			key: fs.readFileSync('/etc/letsencrypt/live/api.automatizafacil.com.br/privkey.pem'),
			cert: fs.readFileSync('/etc/letsencrypt/live/api.automatizafacil.com.br/fullchain.pem')
		}

		https.createServer(options, app).listen();
	}

}).catch((error) => {
	console.log('API was unable to connect to the Database', error);
	process.exit(128);
})