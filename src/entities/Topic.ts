import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Company from "./Company";

@Entity('topic')
class Topic
{
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Company, company => company.topic, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
	@JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
	company: Company;

	@Column({ type: 'varchar', length: 50 })
	name: string;

	@Column({ type: 'tinyint', default: 1 })
	status: number;

	@Column({ type: 'tinyint', default: 1, nullable: true })
	indicate_employee: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, company: Company, name: string, status: number, indicate_employee: number, created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.company = company;
		this.name = name;
		this.status = status;
		this.indicate_employee = indicate_employee;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	get getId(): number
	{
		return this.id;
	}

	get getCompany(): Company
	{
		return this.company;
	}

	get getName(): string
	{
		return this.name;
	}

	get getStatus(): number
	{
		return this.status;
	}

	get getIndicateEmployee()
	{
		return this.indicate_employee;
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

export default Topic;