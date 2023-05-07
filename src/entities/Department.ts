import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('department')
class Department
{
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'string', length: 50 })
	department: string;

	@Column({ type: 'char', default: 0 })
	status: boolean;

	@Column({ type: 'datetime' })
	created_at: Date;

	@Column({ type: 'datetime' })
	updated_at: Date;

	constructor(id: number, department: string, status: boolean, created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.department = department;
		this.status = status;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	get getId(): number
	{
		return this.id;
	}

	get getDepartment(): string
	{
		return this.department;
	}

	get getStatus(): boolean
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