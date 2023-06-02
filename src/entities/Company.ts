import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import Customer from "./Customer";
import Question from './Question';
import Department from './Department';
import Topic from './Topic';

@Entity("company")
class Company
{
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Customer, customer => customer.company, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
	@JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
	customer: Customer;

	@OneToMany(() => Question, question => question.company)
	question: Question[];

	@OneToMany(() => Department, department => department.company)
	department: Department[];

	@OneToMany(() => Topic, topic => topic.company)
	topic: Topic[];

	@Column({ type: "varchar" })
	corporate_name: string;

	@Column({ type: "varchar" })
	fantasy_name: string;

	@Column({ type: 'varchar', nullable: true })
	logo_company: string;

	@Column({ type: "varchar", length: 20 })
	cnpj: string;

	@Column({ type: "varchar", length: 17 })
	zip_code: string;

	@Column({ type: "varchar", length: 17 })
	state: string;

	@Column({ type: "varchar" })
	address: string;

	@Column({ type: "varchar", length: 20 })
	number: string;

	@Column({ type: 'varchar', nullable: true })
	complement: string;

	@Column({ type: "varchar", length: 200 })
	district: string;

	@Column({ type: "varchar", length: 200 })
	city: string;

	@Column({ type: "varchar", length: 100, nullable: true })
	anchor_question: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, customer: Customer, question: Question[], department: Department[], topic: Topic[], corporate_name: string, fantasy_name: string, logo_company: string ,cnpj: string, zip_code: string, state: string,
		city: string, anchor_question: string, complement: string, district: string, address: string, number: string,
		created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.customer = customer;
		this.question = question;
		this.department = department;
		this.topic = topic;
		this.corporate_name = corporate_name;
		this.fantasy_name = fantasy_name;
		this.logo_company = logo_company;
		this.cnpj = cnpj;
		this.zip_code = zip_code;
		this.state = state;
		this.address = address;
		this.number = number;
		this.complement = complement;
		this.district = district;
		this.city = city;
		this.anchor_question = anchor_question;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	get getId(): number
	{
		return this.id;
	}

	get getCustomer()
	{
		return this.customer;
	}

	get getQuestion(): Question[]
	{
		return this.question;
	}

	get getDepartment(): Department[]
	{
		return this.department;
	}

	get getTopic(): Topic[]
	{
		return this.topic;
	}

	get getCorporateName(): string
	{
		return this.corporate_name;
	}

	get getFantasyName(): string
	{
		return this.fantasy_name;
	}

	get getLogoCompany(): string
	{
		return this.logo_company;
	}

	get getCNPJ(): string
	{
		return this.cnpj;
	}

	get getZipCode(): string
	{
		return this.zip_code;
	}

	get getState(): string
	{
		return this.state;
	}

	get getAddress(): string
	{
		return this.address;
	}

	get getComplement(): string
	{
		return this.complement;
	}

	get getNumber(): string
	{
		return this.number;
	}

	get getDistrict(): string
	{
		return this.district;
	}

	get getCity(): string
	{
		return this.city;
	}

	get getAnchorQuestion(): string
	{
		return this.anchor_question;
	}

	get getCreatedAt(): Date
	{
		return this.created_at;
	}

	get getUpdatedAt(): Date
	{
		return this.updated_at;
	}
}

export default Company;