import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

	constructor(id: number, group_name: string, questionGroupMapping: QuestionGroupMapping)
	{
		this.id = id;
		this.group_name = group_name;
		this.questionGroupMapping = questionGroupMapping;
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
}

export default QuestionGroup;