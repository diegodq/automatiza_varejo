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

	@Column({ type: 'varchar', length: 20, nullable: true })
	option_one: string;

	@Column({ type: 'varchar', length: 20, nullable: true })
	option_two: string;

	@Column({ type: 'varchar', length: 15, nullable: true })
	import_type: string;

	@Column({ type: 'int', nullable: true })
	position: number;

	@Column({ type: 'tinyint', nullable: true })
	mandatory_question: number;

	@Column({ type: 'tinyint', nullable: true })
	finish_research: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, question: Question, option_one: string, option_two: string,
		import_type: string, position: number,
		mandatory_question: number, finish_research: number, lock_by_ip: boolean,
		created_at: Date, updated_at: Date )
	{
		this.id = id;
		this.question = question;
		this.option_one = option_one;
		this.option_two = option_two;
		this.import_type = import_type;
		this.position = position;
		this.mandatory_question = mandatory_question;
		this.finish_research = finish_research;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	get getId(): number
	{
		return this.id;
	}

	get getQuestion(): Question
	{
		return this.question;
	}

	get getPosition(): number
	{
		return this.position;
	}

	get getMandatoryQuestion(): number
	{
		return this.mandatory_question;
	}

	get getFinishResearch(): number
	{
		return this.finish_research;
	}

	get backgroundColor(): string
	{
		return this.backgroundColor;
	}

	get lockByIp(): boolean
	{
		return this.lockByIp;
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