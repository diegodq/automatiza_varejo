import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Question from "./Question";

@Entity('answer')
class Answer
{
	@PrimaryGeneratedColumn()
	id: number;

	question: Question;

	@Column({ type:'varchar', nullable: true })
	name: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, question: Question, name: string, created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.question = question;
		this.name = name;
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

	get getName(): string
	{
		return this.name;
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