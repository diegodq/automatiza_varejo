import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Answer from "./Answer";

@Entity('question')
class Question
{
	@PrimaryGeneratedColumn()
	id: number;

	@OneToMany(() => Answer, answer => answer.question)
	answer: Answer;

	@Column({ type: 'varchar', nullable: true, length: 100 })
	question_description: string;

	@Column({ type: 'varchar', nullable: true, length: 20 })
	type_question: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, answer: Answer, question_description: string, type_question: string, created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.answer = answer;
		this.question_description = question_description;
		this.type_question = type_question;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	get getId(): number
	{
		return this.id;
	}

	get getAnswer(): Answer
	{
		return this.answer;
	}

	get getQuestionDescription(): string
	{
		return this.question_description;
	}

	get getTypeQuestion(): string
	{
		return this.type_question;
	}

	get getCreatedAt(): Date
	{
		return this.created_at
	}

	get getUpdatedAt(): Date
	{
		return this.updated_at;
	}
}

export default Question;