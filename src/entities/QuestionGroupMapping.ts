import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Question from "./Question";
import QuestionGroup from "./QuestionGroup";

@Entity('question_group_mapping')
class QuestionGroupMapping
{
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => QuestionGroup, questionGroup => questionGroup.questionGroupMapping, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
	@JoinColumn({name: 'question_group_id', referencedColumnName: 'id'})
	questionGroup: QuestionGroup;

	@ManyToOne(() => Question, question => question.questionGroupMapping, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
	@JoinColumn({ name: 'question_id', referencedColumnName: 'id' })
	question: Question;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, question: Question, questionGroup: QuestionGroup,
		created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.question = question;
		this.questionGroup = questionGroup;
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

	get getQuestionGroup(): QuestionGroup
	{
		return this.questionGroup
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

export default QuestionGroupMapping;