import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Answer from "./Answer";
import Company from "./Company";

@Entity('store')
class Store
{
	@PrimaryGeneratedColumn()
	id: number;

	@OneToMany(() => Answer, answer => answer.store)
	answer: Answer[];

	@ManyToOne(() => Company, company => company.store)
	@JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
	company: Company;

	@Column({ type: 'varchar', length: 90, nullable: true, default: '' })
	name: string;

	@Column({ type: 'varchar', length: 90, nullable: true, default: '' })
	address: string;

	@Column({ type: 'int', nullable: true, default: 0 })
	store_number: number;

	@Column({ type: 'tinyint', nullable: true, default: 1 })
	active: boolean;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, answer: Answer[], company:Company,  name: string, address: string, store_number: number,  active: boolean, created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.answer = answer;
		this.company = company;
		this.name = name;
		this.address = address;
		this.store_number = store_number;
		this.active = active;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	get getId(): number
	{
		return this.id;
	}

	get getAnswer(): Answer[]
	{
		return this.answer;
	}

	get getCompany(): Company
	{
		return this.company;
	}

	get getName(): string
	{
		return this.name;
	}

	get getAddress(): string
	{
		return this.address;
	}

	get getActive(): boolean
	{
		return this.active;
	}

	get getStoreNumber(): number
	{
		return this.store_number;
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

export default Store;