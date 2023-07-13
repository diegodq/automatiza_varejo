import { Column, CreateDateColumn, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Company from "./Company";
import ParamsProduct from "./ParamsProduct";

@Entity('product')
class Product
{
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToMany(() => Company, company => company.product)
	company: Company[];

	@OneToOne(() => ParamsProduct, params_product => params_product.product)
	params_product: ParamsProduct;

	@Column({ type: 'varchar', length: 180 })
	name: string;

	@Column({ type: 'varchar', length: 180 })
	description: string;

	@Column({ type: "varchar", length: 100, nullable: true })
	anchor_question: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, company: Company[], params_product: ParamsProduct, name: string, description: string, anchor_question: string, created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.company = company;
		this.params_product = params_product;
		this.name = name;
		this.description = description;
		this.anchor_question = anchor_question;
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

	get getParamsProduct(): ParamsProduct
	{
		return this.params_product;
	}

	get getName(): string
	{
		return this.name
	}

	get getDescription(): string
	{
		return this.description;
	}

	get getAnchorQuestion(): string
	{
		return this.anchor_question;
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