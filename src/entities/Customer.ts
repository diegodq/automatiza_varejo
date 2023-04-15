import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Company from "./Company";
import CustomerTokens from "./CustomerTokens";
import UserTokens from "./CustomerTokens";
import Product from "./Product";

@Entity('customer')
class Customer
{
	@PrimaryGeneratedColumn()
	id: number;

	@OneToMany(() => Company, company => company.customer)
	company: Company[];

	@OneToMany(() => Product, product => product.customer)
	product: Product[];

	@OneToMany(() => UserTokens, customer => customer.customer)
	customerTokens: CustomerTokens[];

	@Column({ type: 'varchar', length: 200 })
	first_name: string;

	@Column({ type: 'varchar', nullable: true })
	avatar: string;

	@Column({ type: 'varchar' })
	surname: string

	@Column({ type: 'varchar' })
	position: string;

	@Column({ type: 'varchar', length: 17 })
	phone: string;

	@Column({ type: 'varchar', nullable: true, unique: true })
	email: string;

	@Column({type: 'tinyint', nullable: true, default: 0 })
	activated: number;

	@Column({ type: 'datetime', nullable: true })
	activated_on: Date;

	@Column({ type: 'tinyint', nullable: true, default: 0 })
	accept_newsletter: number;

	@Column({ type: 'tinyint', nullable: true, default: 0 })
	info_payment: number;

	@Column({ type: 'char' })
	accept_terms: string;

	@Column({ type: 'varchar', nullable: true })
	old_password: string;

	@Column({ type: 'varchar' })
	password: string;

	@Column({ type: 'varchar', nullable: true, length: 40 })
	system_user: string;

	@Column({ type: 'varchar', nullable: true, length: 40 })
	agent_user: string;

	@Column({ type: 'datetime', nullable: true })
	pass_change_on: Date;

	@Column({ type: 'varchar', nullable: true, length: 90 })
	city: string;

	@Column({ type: 'varchar', nullable: true, length: 90 })
	region_name: string;

	@Column({ type: 'varchar', nullable: true, length: 90 })
	country: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, company: Company[], product: Product[], customerTokens: CustomerTokens[], first_name: string,
		avatar: string, surname_name: string, position: string,
		phone: string, email: string, activated: number, activated_on: Date, accept_newsletter: number, info_payment: number, accept_terms: string,system_user: string, agent_user: string, pass_change_on: Date,old_password: string,
		password: string, city: string, region_name: string, country: string, created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.company = company;
		this.customerTokens = customerTokens;
		this.product = product;
		this.first_name = first_name;
		this.avatar = avatar;
		this.surname = surname_name;
		this.position = position;
		this.phone = phone;
		this.activated = activated;
		this.activated_on = activated_on;
		this.accept_newsletter = accept_newsletter;
		this.info_payment = info_payment;
		this.accept_terms = accept_terms;
		this.email = email;
		this.old_password = old_password;
		this.password = password;
		this.system_user = system_user;
		this.agent_user = agent_user;
		this.pass_change_on = pass_change_on;
		this.city = city;
		this.region_name = region_name;
		this.country = country;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	get getId(): number
	{
		return this.id;
	}

	get getCompany(): Company[]
	{
		return this.company;
	}

	get getCustomerTokens(): CustomerTokens[]
	{
		return this.customerTokens;
	}

	get getProduct(): Product[]
	{
		return this.product;
	}

	get getFirstName(): string
	{
		return this.first_name;
	}

	get getAvatar(): string
	{
		return this.avatar;
	}

	get getSurname(): string
	{
		return this.surname;
	}

	get getPosition(): string
	{
		return this.position;
	}

	get getPhone(): string
	{
		return this.phone;
	}

	get getActivated(): number
	{
		return this.activated;
	}

	get getActivatedOn(): Date
	{
		return this.activated_on
	}

	get getAcceptNewsletter(): number
	{
		return this.accept_newsletter;
	}

	get getInfoPayment(): number
	{
		return this.info_payment;
	}

	get getAcceptTerms(): string
	{
		return this.accept_terms;
	}

	get getSystemUser(): string
	{
		return this.system_user;
	}

	get getAgentUser(): string
	{
		return this.agent_user;
	}

	get getPassChangeOn(): Date
	{
		return this.pass_change_on;
	}

	get getCity(): string
	{
		return this.city;
	}

	get getRegionName(): string
	{
		return this.region_name;
	}

	get getCountry(): string
	{
		return this.country;
	}

	get getEmail(): string
	{
		return this.email;
	}
}

export default Customer;