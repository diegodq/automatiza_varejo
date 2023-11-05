import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Company from "./Company";

@Entity('params_product')
class ParamsProduct
{
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => Company, company => company.paramsProduct, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
	@JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
	company: Company

	@Column({ type: "varchar", length: 100, nullable: true, default: '' })
	anchor_question: string;

	@Column({ type: 'varchar', length: 20, nullable:true })
	background_color: string;

	@Column({ type: 'varchar', length: 20, nullable: true })
	font_color: string;

	@Column({ type: 'int', nullable: true })
	passing_tree: number;

	@Column({ type: 'tinyint', nullable: true, default: 0 })
	lock_by_ip: boolean;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, anchor_question: string, background_color: string, passing_tree: number, font_color: string, company: Company,
		lock_by_ip: boolean, created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.anchor_question = anchor_question;
		this.background_color = background_color;
		this.font_color = font_color;
		this.passing_tree = passing_tree;
		this.company = company;
		this.lock_by_ip = lock_by_ip;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	get getAnchorQuestion(): string
	{
		return this.anchor_question;
	}

	get getBackgroundColor()
	{
		return this.background_color;
	}

	get getFontColor()
	{
		return this.font_color;
	}

	get getPassingTree()
	{
		return this.passing_tree;
	}

	get getCompany(): Company
	{
		return this.company;
	}

	get getId(): number
	{
		return this.id;
	}

	get getCreatedAt(): Date
	{
		return this.created_at;
	}

	get getUpdated_at(): Date
	{
		return this.updated_at;
	}
}

export default ParamsProduct;