import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Product from "./Product";

@Entity('params_product')
class ParamsProduct
{
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => Product, product => product.params_product, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
	@JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
	product: Product;

	@Column({ type: 'varchar', length: 20, nullable:true })
	background_color: string;

	@Column({ type: 'varchar', length: 20, nullable: true })
	font_color: string;

	@Column({ type: 'int', nullable: true })
	passing_tree: number;

	constructor(id: number, product: Product, background_color: string, font_color: string,
		passing_tree: number)
	{
		this.id = id;
		this.product = product;
		this.background_color = background_color;
		this.font_color = font_color;

		this.passing_tree = passing_tree;
	}

	get getId(): number
	{
		return this.id;
	}

	get getProduct(): Product
	{
		return this.product;
	}

	get getBackgroundColor(): string
	{
		return this.background_color;
	}

	get getFontColor(): string
	{
		return this.font_color;
	}

	get getPassingTree(): number
	{
		return this.passing_tree
	}
}

export default ParamsProduct;