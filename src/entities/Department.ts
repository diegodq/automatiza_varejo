import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Company from "./Company";

@Entity('department')
class Department
{
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Company, company => company.department, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
	@JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
	company: Company;

	@Column({ type: 'varchar', length: 50 })
	name: string;

	@Column({ type: 'tinyint', default: 1 })
	status: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, company: Company, name: string, status: number, created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.company = company;
		this.name = name;
		this.status = status;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	get getId(): number
	{
		return this.id;
	}

	get getCompany(): Company
	{
		return this.getCompany;
	}

	get getName(): string
	{
		return this.name;
	}

	get getStatus(): number
	{
		return this.status;
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

export default Department;