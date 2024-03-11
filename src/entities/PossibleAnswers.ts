import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Question from "./Question";

@Entity('possible_answers')
class PossibleAnswers
{
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Question, question => question.possible_answers, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
	@JoinColumn({ name: 'question_id', referencedColumnName: 'id' })
	question: Question;

	@Column({ type: 'varchar', nullable: true, default: '' })
	answer: string;

	constructor(id: number, question: Question, answer: string)
	{
		this.id = id;
		this.question = question;
		this.answer = answer;
	}

	public getId(): number
	{
		return this.id;
	}

	public getQuestion(): Question
	{
		return this.question;
	}

	public getAnswer(): string
	{
		return this.answer;
	}
}

export default PossibleAnswers;