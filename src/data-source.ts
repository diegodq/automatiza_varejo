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

const port = process.env.DB_PORT as number | undefined;

import { default1696903410923 } from './migration/1696903410923-default';

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
		ParamsProduct
	],
	migrations: [
		default1696903410923
	]
});

export default appDataSource;