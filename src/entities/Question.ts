import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Answer from "./Answer";
import Company from "./Company";
import ParamsQuestions from "./ParamsQuestions";

@Entity('question')
class Question
{
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => ParamsQuestions, params_questions => params_questions.question)
	params_questions: ParamsQuestions;

	@OneToMany(() => Answer, answer => answer.question)
	answer: Answer;

	@ManyToOne(() => Company, company => company.question, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
	@JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
	company: Company;

	@Column({ type: 'varchar', nullable: true, length: 100 })
	title_question: string;

	@Column({ type: 'tinyint', nullable: true })
	tree_question: number;

	@Column({ type: 'varchar', nullable: true, length: 100 })
	question_description: string;

	@Column({ type: 'varchar', length: 20 })
	type_question: string;

	@Column({ type: 'tinyint', nullable: true })
	status: number;

	@Column({ type: 'varchar', nullable: true, length: 200 })
	text_end_research: string;

	@Column({ type: 'varchar', nullable: true, length: 40 })
	text_label_one: string;

	@Column({ type: 'varchar', nullable: true, length: 40 })
	text_label_two: string;

	@Column({ type: 'varchar', nullable: true, length: 80 })
	research_title: string;

	@Column({ type: 'varchar', nullable: true })
	alert_label: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, params_questions: ParamsQuestions, answer: Answer, company: Company, title_question: string,
		tree_question: number,
		question_description: string,
		type_question: string, status: number, text_end_research: string,
		text_label_one: string,
		text_label_two: string, research_title: string, alert_label: string,
		created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.params_questions = params_questions;
		this.answer = answer;
		this.company = company;
		this.title_question = title_question;
		this.tree_question = tree_question;
		this.question_description = question_description;
		this.type_question = type_question;
		this.status = status;
		this.text_end_research = text_end_research;
		this.text_label_one = text_label_one;
		this.text_label_two = text_label_two;
		this.research_title = research_title;
		this.alert_label = alert_label;

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

	get getCompany(): Company
	{
		return this.company;
	}

	get getTitleQuestion(): string
	{
		return this.title_question;
	}

	get getTreeQuestion(): number
	{
		return this.tree_question;
	}

	get getQuestionDescription(): string
	{
		return this.question_description;
	}

	get getTypeQuestion(): string
	{
		return this.type_question;
	}

	get getStatus(): number
	{
		return this.status;
	}

	get getTextEndResearch(): string
	{
		return this.text_end_research
	}

	get getTextLabelOne(): string
	{
		return this.text_label_one;
	}

	get getTextLabelTwo(): string
	{
		return this.text_label_two;
	}

	get getResearchTitle(): string
	{
		return this.research_title;
	}

	get getAlertLabel(): string
	{
		return this.alert_label;
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