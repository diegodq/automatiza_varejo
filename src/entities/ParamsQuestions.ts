import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Question from "./Question";

@Entity('params_questions')
class ParamsQuestions
{
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => Question, question => question.params_questions, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
	@JoinColumn({ name: 'question_id', referencedColumnName: 'id' })
	question: Question;

	@Column({ type: 'tinyint', nullable: true })
	tree_question: number;

	@Column({ type: 'varchar', length: 80, nullable: true })
	option_one: string;

	@Column({ type: 'varchar', length: 80, nullable: true })
	option_two: string;

	@Column({ type: 'varchar', length: 15, nullable: true })
	import_type: string;

	@Column({ type: 'int', nullable: true })
	position: number;

	@Column({ type: 'int', nullable: true })
	passing_tree: number;

	@Column({ type: 'tinyint', nullable: true })
	mandatory_question: number;

	@Column({ type: 'tinyint', nullable: true })
	finish_research: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, question: Question, tree_question: number, option_one: string, option_two: string,
		import_type: string, position: number, passing_tree: number,
		mandatory_question: number, finish_research: number, created_at: Date, updated_at: Date )
	{
		this.id = id;
		this.question = question;
		this.tree_question = tree_question;
		this.option_one = option_one;
		this.option_two = option_two;
		this.import_type = import_type;
		this.position = position;
		this.passing_tree = passing_tree;
		this.mandatory_question = mandatory_question;
		this.finish_research = finish_research;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	get getQuestion(): Question
	{
		return this.question;
	}

	get getTreeQuestion(): number
	{
		return this.tree_question;
	}

	get getPosition(): number
	{
		return this.position;
	}

	get getPassingTree(): number
	{
		return this.passing_tree
	}

	get getMandatoryQuestion(): number
	{
		return this.mandatory_question;
	}

	get getFinishResearch(): number
	{
		return this.finish_research;
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

export default ParamsQuestions;