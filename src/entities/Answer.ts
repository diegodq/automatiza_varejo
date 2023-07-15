import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Question from "./Question";

@Entity('answer')
class Answer
{
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Question, question => question.answer, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
	@JoinColumn({ name: 'question_id', referencedColumnName: 'id' })
	question: Question;

	@Column({ type:'varchar', nullable: true })
	answer: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, question: Question, answer: string, created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.question = question;
		this.answer = answer;
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

	get getAnswer(): string
	{
		return this.answer;
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

export default Answer;