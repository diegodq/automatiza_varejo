import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Company from "./Company";
import CustomerTokens from "./CustomerTokens";
import UserTokens from "./CustomerTokens";
import TypeCustomer from "./TypeCustomer";

@Entity('customer')
class Customer
{
	@PrimaryGeneratedColumn()
	id: number;

	@OneToMany(() => Company, company => company.customer)
	company: Company[];

	@OneToMany(() => UserTokens, customerTokens => customerTokens.customer)
	customerTokens: CustomerTokens[];

	@OneToOne(() => TypeCustomer, type_customer => type_customer.customer)
	@JoinColumn({ name: 'type_customer', referencedColumnName: 'id' })
	type_customer: TypeCustomer;

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

	@Column({ type: 'varchar', nullable: true, unique: true })
	temp_email: string;

	@Column({ type: 'datetime', nullable: true })
	email_change_on: Date;

	@Column({ type: 'datetime', nullable: true })
	resent_email_on: Date;

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

	@Column({ type: 'datetime', nullable: true })
	accept_terms_on: Date;

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
	city_locate: string;

	@Column({ type: 'varchar', nullable: true, length: 90 })
	country_name: string;

	@Column({ type: 'varchar', nullable: true, length: 90 })
	country_capital: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, company: Company[], customerTokens: CustomerTokens[], type_customer: TypeCustomer,first_name: string,
		avatar: string, surname_name: string, position: string, phone: string, email: string, temp_email: string,
		email_change_on: Date, resent_email_on: Date, activated: number, activated_on: Date, accept_newsletter: number,
		info_payment: number, accept_terms: string, accept_terms_on: Date, system_user: string, agent_user: string, pass_change_on: Date,old_password: string,
		password: string, city_locate: string, country_name: string, country_capital: string, created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.company = company;
		this.customerTokens = customerTokens;
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
		this.accept_terms_on = accept_terms_on;
		this.email = email;
		this.temp_email = temp_email;
		this.type_customer = type_customer;
		this.email_change_on = email_change_on;
		this.resent_email_on = resent_email_on;
		this.old_password = old_password;
		this.password = password;
		this.system_user = system_user;
		this.agent_user = agent_user;
		this.pass_change_on = pass_change_on;
		this.city_locate = city_locate;
		this.country_name = country_name;
		this.country_capital = country_capital;
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

	get getTypeCustomer(): TypeCustomer
	{
		return this.type_customer;
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

	get getAcceptTermsOn(): Date
	{
		return this.accept_terms_on;
	}

	get getEmail(): string
	{
		return this.email;
	}

	get getTempEmail(): string
	{
		return this.temp_email;
	}

	get getEmailChangeOn(): Date
	{
		return this.email_change_on;
	}

	get getResentEmailOn(): Date
	{
		return this.resent_email_on;
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

	get getCityLocate(): string
	{
		return this.city_locate;
	}

	get getCountryName(): string

	{
		return this.country_name;
	}

	get getCountryCapital(): string
	{
		return this.country_capital;
	}
}

export default Customer;