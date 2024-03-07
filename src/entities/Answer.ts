import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Question from "./Question";
import Store from "./Store";

@Entity('answer')
class Answer
{
	@Index('idxAnswer')
	@PrimaryGeneratedColumn()
	id: number;

	@Index('idxQuestion')
	@ManyToOne(() => Question, question => question.answer, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
	@JoinColumn({ name: 'question_id', referencedColumnName: 'id' })
	question: Question;

	@ManyToOne(() => Store, store => store.answer, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
	@JoinColumn({ name: 'store_id', referencedColumnName: 'id' })
	store: Store;

	@Column({ type:'varchar', nullable: true, default: '' })
	answer: string;

	@Column({ type: 'varchar', nullable: true, length: 255, default: '' })
	other_answer: string;

	@Column({ type: 'varchar', nullable: true, length: 90, default: '' })
	client_name: string;

	@Column({ type: 'varchar', nullable: true, length: 30, default: '' })
	client_phone: string;

	@Column({ type: 'tinyint', nullable: true, default: 0 })
	is_contact: number;

	@Column({ type: 'tinyint', nullable: true, default: 0 })
	is_report: number;

	@Column({ type: 'varchar', nullable: true, length: 80, default: '' })
	type_report: string;

	@Column({ type: 'varchar', nullable: true, length: 100, default: '' })
	id_research: string;

	@Column({ type: 'varchar', nullable: true, length: 200, default: '' })
	research_name: string;

	@Column({ type: 'int', nullable: true, default: 0 })
	nps_answer: number;

	@Column({ type: 'varchar', length: 50, nullable: true, default: '' })
	device_client: string;

	@Column({ type: 'datetime', nullable: true })
	start_research: Date;

	@Column({ type: 'varchar', nullable: true, length: 90, default: '' })
	name_employee: string;

	@Column({ type: 'varchar', nullable: true, length: 60, default: '' })
	ip_address: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(id: number, question: Question, store: Store, answer: string, other_answer: string, client_name: string,
		client_phone: string, is_contact: number, id_research: string, research_name: string, nps_answer: number, device_client: string, start_research: Date,
		name_employee: string, is_report: number, type_report: string, ip_address: string, created_at: Date, updated_at: Date)
	{
		this.id = id;
		this.question = question;
		this.store = store;
		this.answer = answer;
		this.other_answer = other_answer;
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
		this.ip_address = ip_address;
	}

	get getId(): number
	{
		return this.id;
	}

	get getQuestion(): Question
	{
		return this.question;
	}

	get getStore(): Store
	{
		return this.store
	}

	get getAnswer(): string
	{
		return this.answer;
	}

	get getOtherAnswer(): string
	{
		return this.other_answer;
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

	get getIpAddress(): string
	{
		return this.ip_address;
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