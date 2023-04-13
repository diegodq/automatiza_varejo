import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import Customer from "./Customer";

@Entity("company")
class Company
{
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Customer, customer => customer.company, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
	@JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
	customer: Customer;

	@Column({ type: "varchar" })
	corporate_name: string;

	@Column({ type: "varchar" })
	fantasy_name: string;

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

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, corporate_name: string, fantasy_name: string, cnpj: string, zip_code: string, state: string,
		city: string, complement: string, district: string, address: string, number: string,
		created_at: Date, updated_at: Date, customer: Customer)
	{
		this.id = id;
		this.corporate_name = corporate_name;
		this.fantasy_name = fantasy_name;
		this.cnpj = cnpj;
		this.zip_code = zip_code;
		this.state = state;
		this.address = address;
		this.number = number;
		this.complement = complement;
		this.district = district;
		this.city = city;
		this.customer = customer;
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

	get getCorporateName(): string
	{
		return this.corporate_name;
	}

	get getFantasy(): string
	{
		return this.fantasy_name;
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