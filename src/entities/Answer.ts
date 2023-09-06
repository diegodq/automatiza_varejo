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

	@Column({ type: 'varchar', nullable: true, length: 200 })
	research_title: string;

	@Column({ type: 'varchar', nullable: true, length: 90 })
	client_name: string;

	@Column({ type: 'varchar', nullable: true, length: 30 })
	client_phone: string;

	@Column({ type: 'tinyint', nullable: true })
	is_contact: number;

	@Column({ type: 'tinyint', nullable: true })
	is_report: number;

	@Column({ type: 'varchar', nullable: true, length: 80 })
	type_report: string;

	@Column({ type: 'varchar', nullable: true, length: 100 })
	id_research: string;

	@Column({ type: 'varchar', nullable: true, length: 200 })
	research_name: string;

	@Column({ type: 'int', nullable: true })
	nps_answer: number;

	@Column({ type: 'varchar', length: 50, nullable: true })
	device_client: string;

	@Column({ type: 'datetime', nullable: true })
	start_research: Date;

	@Column({ type: 'varchar', nullable: true, length: 90 })
	name_employee: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, question: Question, answer: string, research_title: string, client_name: string,
		client_phone: string, is_contact: number, id_research: string, research_name: string, nps_answer: number, device_client: string, start_research: Date,
		name_employee: string, is_report: number, type_report: string, created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.question = question;
		this.answer = answer;
		this.research_title = research_title;
		this.client_name = client_name;
		this.client_phone = client_phone;
		this.is_contact = is_contact;
		this.is_report = is_report;
		this.type_report = type_report;
		this.id_research = id_research;
		this.nps_answer = nps_answer;
		this.research_name = research_name;
		this.device_client = device_client;
		this.start_research = start_research;
		this.name_employee = name_employee;
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

	get getResearchTitle(): string
	{
		return this.research_title;
	}

	get getClientName(): string
	{
		return this.client_name;
	}

	get isContact(): number
	{
		return this.is_contact;
	}

	get getClientPhone(): string
	{
		return this.client_phone;
	}

	get getIsContact(): number
	{
		return this.is_contact;
	}

	get getIsReport(): number
	{
		return this.is_contact;
	}

	get getTypeReport(): string
	{
		return this.type_report;
	}

	get getIdResearch(): string
	{
		return this.id_research;
	}

	get getNpsAnswer(): number
	{
		return this.nps_answer;
	}

	get getResearchName(): string
	{
		return this.research_name;
	}

	get getDeviceClient(): string
	{
		return this.device_client;
	}

	get getStartResearch(): Date
	{
		return this.start_research;
	}

	get getNameEmployee(): string
	{
		return this.name_employee;
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