import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Customer from "./Customer";

@Entity('product')
class Product
{
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 180 })
	name: string;

	@Column({ type: 'varchar', length: 180 })
	description: string;

	@ManyToOne(() => Customer, customer => customer.product, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
	@JoinColumn({
		name: 'customer_id',
		referencedColumnName: 'id'
	})
	customer: Customer;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, name: string, description: string, customer: Customer, created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.name = name;
		this.description = description;
		this.customer = customer;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	get getId(): number
	{
		return this.id;
	}

	get getName(): string
	{
		return this.name
	}

	get getDescription(): string
	{
		return this.description;
	}

	get getCustomer()
	{
		return this.customer;
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

export default Product;