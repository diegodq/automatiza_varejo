import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Customer from "./Customer";

@Entity()
class TypeCustomer
{
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => Customer, customer => customer.type_customer)
	customer: Customer

	@Column({ type: 'varchar', length: 50, default: '' })
	type_customer: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	constructor(id: number, customer: Customer, type_customer: string, createdAt: Date, updatedAt: Date)
	{
		this.id = id;
		this.customer = customer;
		this.type_customer = type_customer;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	get getId(): number
	{
		return this.id;
	}

	get getCustomer(): Customer
	{
		return this.customer;
	}

	get getTypeCustomer(): string
	{
		return this.type_customer;
	}

	get getCreatedAt(): Date
	{
		return this.createdAt;
	}

	get getUpdateAt(): Date
	{
		return this.updatedAt;
	}
}

export default TypeCustomer;