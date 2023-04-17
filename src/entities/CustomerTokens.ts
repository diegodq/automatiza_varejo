import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne,
	PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Customer from "./Customer";

@Entity('customer_tokens')
class CustomerTokens
{
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Customer, customer => customer.customerTokens, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
	@JoinColumn({
		name: 'customer_id',
		referencedColumnName: 'id'
	})
	customer: Customer;

	@Column({ type: 'varchar' })
	@Generated('uuid')
	token: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, customer: Customer, token: string, created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.customer = customer;
		this.token = token;
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

	get getToken(): string
	{
		return this.token;
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

export default CustomerTokens;