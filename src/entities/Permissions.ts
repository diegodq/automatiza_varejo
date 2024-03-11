import Customer from '../entities/Customer';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("permissions")
class Permissions
{
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 20, default: null })
	name: string;

	@Column({ type: 'varchar', length: 100, default: '' })
	description: string;

	@ManyToMany(() => Customer,
	customer => customer.permission, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
	@JoinTable({
		name: 'customer_permissions',
		joinColumn: {
			name: 'permission_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'customer_id',
			referencedColumnName: 'id'
		}
	})
	customer: Customer[];

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, name: string, description: string, customer: Customer[], created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.name = name;
		this.description = description;
		this.customer = customer;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	public getName(): string
	{
		return this.name;
	}

	public getDescription(): string
	{
		return this.description;
	}

	public getCustomer(): Customer[]
	{
		return this.customer;
	}

	public getCreatedAt(): Date
	{
		return this.created_at;
	}

	public getUpdateAt(): Date
	{
		return this.updated_at;
	}
}

export default Permissions;