import 'dotenv/config';
import { DataSource } from "typeorm";

import Answer from './entities/Answer';
import Company from './entities/Company';
import ContactUs from './entities/ContactUs';
import Customer from './entities/Customer';
import CustomerTokens from './entities/CustomerTokens';
import Department from './entities/Department';
import ParamsProduct from './entities/ParamsProduct';
import ParamsQuestions from './entities/ParamsQuestions';
import Permissions from './entities/Permissions';
import Product from './entities/Product';
import QRCodeControl from './entities/QRCodeControl';
import Question from './entities/Question';
import QuestionGroup from './entities/QuestionGroup';
import QuestionGroupMapping from './entities/QuestionGroupMapping';
import Roles from './entities/Roles';
import Store from './entities/Store';
import Topic from './entities/Topic';
import Paths from './entities/Paths';

import { Default1709599722257 } from './migrations/1709599722257-default';

const port: number | undefined = process.env.DB_PORT as number | undefined;

const appDataSource: DataSource = new DataSource({
	type: "mysql",
	host: process.env.DB_HOST,
	port: port,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	entities: [
		Answer,
		Company,
		ContactUs,
		Customer,
		CustomerTokens,
		Department,
		ParamsProduct,
		ParamsQuestions,
		Permissions,
		Product,
		QRCodeControl,
		Question,
		QuestionGroup,
		QuestionGroupMapping,
		Roles,
		Store,
		Topic,
		Paths
	],
	migrations: [
		`${__dirname}/**/migrations/*.ts`
	]
});

export default appDataSource;