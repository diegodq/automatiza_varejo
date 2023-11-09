import {Column, CreateDateColumn, Entity, JoinColumn, JoinTable,
	ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn,
	UpdateDateColumn} from 'typeorm';

import Customer from "./Customer";
import Question from './Question';
import Department from './Department';
import Topic from './Topic';
import Product from './Product';
import ParamsProduct from './ParamsProduct';
import Store from './Store';
import QRCodeControl from './QRCodeControl';

@Entity("company")
class Company
{
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => ParamsProduct, paramsProduct => paramsProduct.company)
	paramsProduct: ParamsProduct;

	@ManyToOne(() => Customer, customer => customer.company, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
	@JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
	customer: Customer;

	@ManyToMany(() => Product, product => product.company, { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
	@JoinTable({
		name: 'company_product',
		joinColumn: {
			name: 'company',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'product',
			referencedColumnName: 'id'
		}
	})
	product: Product[];

	@OneToMany(() => Question, question => question.company)
	question: Question[];

	@OneToMany(() => Department, department => department.company)
	department: Department[];

	@OneToMany(() => Topic, topic => topic.company)
	topic: Topic[];

	@OneToMany(() => Store, store => store.company)
	store: Store[];

	@OneToOne(() => QRCodeControl, qrcode => qrcode.company)
	qrcode: QRCodeControl

	@Column({ type: "varchar", nullable: true, default: '' })
	corporate_name: string;

	@Column({ type: "varchar", default: '' })
	fantasy_name: string;

	@Column({ type: 'varchar', nullable: true, default: '' })
	logo_company: string;

	@Column({ type: "varchar", length: 20, default: '' })
	cnpj: string;

	@Column({ type: "varchar", length: 17, default: '' })
	zip_code: string;

	@Column({ type: "varchar", length: 17, default: '' })
	state: string;

	@Column({ type: "varchar", default: '' })
	address: string;

	@Column({ type: "varchar", length: 20, default: 0 })
	number: string;

	@Column({ type: 'varchar', nullable: true, default: '' })
	complement: string;

	@Column({ type: "varchar", length: 200, default: '' })
	district: string;

	@Column({ type: "varchar", length: 200, default: '' })
	city: string;

	@Column({ type: 'tinyint', nullable: true, default: 0 })
	is_report: number;

	@Column({ type: 'varchar', nullable: true, length: 10, default: 'show' })
	type_report: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, customer: Customer, paramsProduct: ParamsProduct, product: Product[], question: Question[],
		department: Department[], topic: Topic[], store: Store[], qrcode: QRCodeControl,
		corporate_name: string, fantasy_name: string, logo_company: string ,cnpj: string,
		zip_code: string, state: string, city: string, complement: string, district: string,
		address: string, number: string, is_report: number, type_report: string,
		created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.customer = customer;
		this.paramsProduct = paramsProduct;
		this.product = product;
		this.question = question;
		this.department = department;
		this.topic = topic;
		this.store = store;
		this.qrcode = qrcode;
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
		this.is_report = is_report;
		this.type_report = type_report;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	get getId(): number
	{
		return this.id;
	}

	get getCustomer(): Customer
	{
		return this.customer;
	}

	get getAnchorQuestion(): ParamsProduct
	{
		return this.paramsProduct;
	}

	get getProduct(): Product[]
	{
		return this.product;
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

	get getStore(): Store[]
	{
		return this.store;
	}

	get getQrCodeControl(): QRCodeControl
	{
		return this.qrcode;
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

	get getIsReport(): number
	{
		return this.is_report;
	}

	get getTypeRecord(): string
	{
		return this.type_report;
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