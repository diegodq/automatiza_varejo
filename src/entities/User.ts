import { Column, CreateDateColumn, Entity, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
class User
{
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 50 })
	name: string;

	@Column({ type: 'varchar', length: 90 })
	surname: string;

	@Column({ type: 'varchar' })
	email: string;

	@Column({ type: 'varchar' })
	password: string;

	@Column({ type: 'char', nullable: true, default: 0 })
	status: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, name: string, surname: string, email: string, password: string, status: string, created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.password = password;
		this.status = status;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	get getId(): number
	{
		return this.id;
	}

	get getName(): string
	{
		return this.name;
	}

	get getSurname(): string
	{
		return this.surname;
	}

	get getEmail(): string
	{
		return this.email;
	}

	get getStatus(): string
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

export default User;