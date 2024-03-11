import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import QuestionGroupMapping from "./QuestionGroupMapping";

@Entity('question_group')
class QuestionGroup
{
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 100 })
	group_name: string;

	@OneToMany(() => QuestionGroupMapping, questionGroupMapping => questionGroupMapping.questionGroup)
	questionGroupMapping: QuestionGroupMapping;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, group_name: string, questionGroupMapping: QuestionGroupMapping, created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.group_name = group_name;
		this.questionGroupMapping = questionGroupMapping;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	get getId(): number
	{
		return this.id;
	}

	get getGroupName(): string
	{
		return this.group_name;
	}

	get getQuestionGroupMapping(): QuestionGroupMapping
	{
		return this.questionGroupMapping;
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

export default QuestionGroup;