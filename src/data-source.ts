import 'dotenv/config';
import { DataSource } from "typeorm";
import Company from './entities/Company';
import ContactUs from './entities/ContactUs';
import Customer from './entities/Customer';
import CustomerTokens from './entities/CustomerTokens';
import Product from './entities/Product';
import User from './entities/User';
import Department from './entities/Department';
import Question from './entities/Question';
import Answer from './entities/Answer';
import Topic from './entities/Topic';
import ParamsQuestions from './entities/ParamsQuestions';
import ParamsProduct from './entities/ParamsProduct';
import Store from './entities/Store';
import QRCodeControl from './entities/QRCodeControl';

const port = process.env.DB_PORT as number | undefined;

import { Default1699329996354 } from './migration/1699329996354-default';

const appDataSource = new DataSource({
	type: "mysql",
	host: process.env.DB_HOST,
	port: port,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	entities: [
		CustomerTokens,
		Product,
		Customer,
		Company,
		ContactUs,
		User,
		Department,
		Question,
		Answer,
		Topic,
		ParamsQuestions,
		ParamsProduct,
		Store,
		QRCodeControl
	],
	migrations: [
		Default1699329996354
	]
});

export default appDataSource;