import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Answer from "./Answer";
import Department from "./Department";

@Entity('question')
class Question
{
	@PrimaryGeneratedColumn()
	id: number;

	@OneToMany(() => Answer, answer => answer.question)
	answer: Answer;

	@ManyToOne(() => Department, department => department.question)
	@JoinColumn({ name: 'department_id', referencedColumnName: 'id' })
	department: Department

	@Column({ type: 'varchar', nullable: true, length: 100 })
	question_description: string;

	@Column({ type: 'varchar', nullable: true, length: 20 })
	type_question: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, answer: Answer, department: Department, question_description: string, type_question: string,
		created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.answer = answer;
		this.department = department;
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

	get getDepartment(): Department
	{
		return this.department;
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