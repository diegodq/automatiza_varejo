import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Answer from "./Answer";
import Department from "./Department";
import Company from "./Company";

@Entity('question')
class Question
{
	@PrimaryGeneratedColumn()
	id: number;

	@OneToMany(() => Answer, answer => answer.question)
	answer: Answer;

	@ManyToOne(() => Department, department => department.question, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
	@JoinColumn({ name: 'department_id', referencedColumnName: 'id' })
	department: Department

	@ManyToOne(() => Company, company => company.question, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
	@JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
	company: Company;

	@Column({ type: 'varchar', nullable: true, length: 100 })
	title_question: string;

	@Column({ type: 'varchar', nullable: true, length: 100 })
	question_description: string;

	@Column({ type: 'tinyint', nullable: true })
	status: number;

	@Column({ type: 'varchar', length: 10 })
	tree_question: string;

	@Column({ type: 'varchar', length: 20 })
	type_question: string;

	@Column({ type: 'varchar', length: 10, nullable: true })
	option_one: string;

	@Column({ type: 'varchar', length: 10, nullable: true })
	option_two: string;

	@Column({ type: 'varchar', length: 15, nullable: true })
	import_type: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, answer: Answer, company: Company, department: Department, title_question: string, question_description: string, type_question: string,
		status: number, tree_question: string, option_one: string, option_two: string, import_type: string, created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.answer = answer;
		this.company = company;
		this.department = department;
		this.title_question = title_question;
		this.question_description = question_description;
		this.type_question = type_question;
		this.status = status;
		this.tree_question = tree_question;
		this.option_one = option_one;
		this.option_two = option_two;
		this.import_type = import_type;
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

	get getDepartment(): Department
	{
		return this.department;
	}

	get getTitleQuestion(): string
	{
		return this.title_question;
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