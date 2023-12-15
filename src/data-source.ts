import 'dotenv/config';
import { DataSource } from "typeorm";
import Company from './entities/Company';
import ContactUs from './entities/ContactUs';
import Customer from './entities/Customer';
import CustomerTokens from './entities/CustomerTokens';
import Product from './entities/Product';
import Department from './entities/Department';
import Question from './entities/Question';
import Answer from './entities/Answer';
import Topic from './entities/Topic';
import ParamsQuestions from './entities/ParamsQuestions';
import ParamsProduct from './entities/ParamsProduct';
import Store from './entities/Store';
import QRCodeControl from './entities/QRCodeControl';
import QuestionGroup from './entities/QuestionGroup';
import QuestionGroupMapping from './entities/QuestionGroupMapping';
import TypeCustomer from './entities/TypeCustomer';

const port = process.env.DB_PORT as number | undefined;

import { Default1702680309705 } from './migrations/1702680309705-default';

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
		Department,
		Question,
		Answer,
		Topic,
		ParamsQuestions,
		ParamsProduct,
		Store,
		QRCodeControl,
		QuestionGroup,
		QuestionGroupMapping,
		TypeCustomer
	],
	migrations: [
		Default1702680309705
	]
});

export default appDataSource;