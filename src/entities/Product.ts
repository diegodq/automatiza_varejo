import { Column, CreateDateColumn, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Company from "./Company";

@Entity('product')
class Product
{
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToMany(() => Company, company => company.product)
	company: Company[];

	@Column({ type: 'varchar', length: 180 })
	name: string;

	@Column({ type: 'varchar', length: 180 })
	description: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, company: Company[], name: string, description: string, anchor_question: string, created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.company = company;
		this.name = name;
		this.description = description;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	get getId(): number
	{
		return this.id;
	}

	get getCompany(): Company[]
	{
		return this.company;
	}

	get getName(): string
	{
		return this.name
	}

	get getDescription(): string
	{
		return this.description;
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