import 'dotenv/config';
import { DataSource } from "typeorm";

const port: number | undefined = process.env.DB_PORT as number | undefined;

const appDataSource: DataSource = new DataSource({
	type: "mysql",
	host: process.env.DB_HOST,
	port: port,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	entities: [
		`${__dirname}/**/entities/*.ts`
	],
	migrations: [
		`${__dirname}/**/migrations/*.ts`
	]
});

export default appDataSource;