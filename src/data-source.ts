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
import PossibleAnswers from './entities/PossibleAnswers';

import { Default1714246502553 } from './migrations/1714246502553-default';

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
		Paths,
		PossibleAnswers
	],
	migrations: [
		//Default1703242711956 - done
		//Default1703243288061 - done
		//Default1705786126033 - done
		//Default1705951460131 - done
		//Default1705954432337 - done
		//Default1705970895075 - done
		//Default1709083742552 - done
		//Default1709430633775 - done
		//Default1709599722257 - done
		//Default1710000503730 - done
		//Default1710119860272 - done
		Default1714246502553
		// `${__dirname}/**/migrations/*.ts`
	]
});

export default appDataSource;