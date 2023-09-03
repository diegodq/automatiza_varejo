import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('contact_us')
class ContactUs
{
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', width: 200 })
	name: string;

	@Column({ type: 'varchar', width: 200 })
	email: string;

	@Column({ type: 'varchar', width: 200 })
	subject: string;

	@Column({ type: 'text' })
	message: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, name: string, email: string, subject: string, message: string, created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.name = name
		this.email = email;
		this.subject = subject;
		this.message = message;
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

	get getEmail(): string
	{
		return this.email;
	}

	get getSubject(): string
	{
		return this.subject;
	}

	get getMessage(): string
	{
		return this.message;
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

export default ContactUs;