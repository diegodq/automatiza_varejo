import 'dotenv/config';
import { DataSource } from "typeorm";

import Company from './entities/Company';
import ContactUs from './entities/ContactUs';
import Customer from './entities/Customer';
import CustomerTokens from './entities/CustomerTokens';
import Product from './entities/Product';
import User from './entities/User';

const port = process.env.DB_PORT as number | undefined;

import { default1681081114430 } from './migrations/1681081114430-default';

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
		User
	],
	migrations: [
		default1681081114430
	]
});

export default appDataSource;