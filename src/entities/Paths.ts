import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Customer from "./Customer";

@Entity('paths')
class Paths
{
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToMany(() => Customer, customer => customer.paths, { onUpdate: 'CASCADE', onDelete: 'CASCADE'})
	@JoinTable({
		name: 'customer_paths',
		joinColumn: {
			name: 'path_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'customer_id',
			referencedColumnName: 'id'
		}
	})
	customer: Customer[]

	@Column({ type: 'varchar', length: 100, default: '' })
	path: string;

	@Column({ type: 'varchar', length: 20, default: '*' })
	http_verb: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, customer: Customer[], path: string, http_verb: string, created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.customer = customer;
		this.path = path;
		this.http_verb = http_verb;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	public getId(): number
	{
		return this.id;
	}

	public getCustomer(): Customer[]
	{
		return this.customer;
	}

	public getRoute(): string
	{
		return this.path;
	}

	public getHttpVerb(): string
	{
		return this.http_verb;
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

export default Paths;