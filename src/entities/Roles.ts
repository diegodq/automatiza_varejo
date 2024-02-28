import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Customer from "./Customer";

@Entity('roles')
class Roles
{
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToMany(() => Customer,
	customer => customer.roles, { onDelete: 'NO ACTION', onUpdate: 'CASCADE' })
	@JoinTable({
		name: 'roles_customer',
		joinColumn: {
			name: 'role_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'customer_id',
			referencedColumnName: 'id'
		}
	})
	customer: Customer[];

	@Column({ type: 'varchar', length: 20, default: '' })
	name: string;

	@Column({ type: 'varchar', length: 100, default: '' })
	description: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, customer: Customer[], name: string, description: string, created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.customer = customer;
		this.name = name;
		this.description = description;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	public getId(): number
	{
		return this.id;
	}

	get getCustomer(): Customer[]
	{
		return this.customer;
	}

	public getName(): string
	{
		return this.name;
	}

	public getDescriptions(): string
	{
		return this.description;
	}

	public getCreatedAt(): Date
	{
		return this.created_at;
	}

	public getUpdatedAt(): Date
	{
		return this.updated_at;
	}
}

export default Roles;