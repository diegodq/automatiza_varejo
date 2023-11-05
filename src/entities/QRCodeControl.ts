import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Company from "./Company";

@Entity('qrcode_control')
class QRCodeControl
{
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', nullable: true, default: ''})
	qrcode: string;

	@OneToOne(() => Company, company => company.qrcode)
	@JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
	company: Company;

	@Column({type:'int', nullable: true, default: 0 })
	store_number: number;

	constructor(id: number, qrcode: string, store_number: number, company: Company)
	{
		this.id = id;
		this.qrcode = qrcode;
		this.store_number = store_number;
		this.company = company;
	}

	get getId(): number
	{
		return this.id;
	}

	get getQRCode(): string
	{
		return this.qrcode;
	}

	get getStoreNumber(): number
	{
		return this.store_number;
	}

	get getCompany(): Company
	{
		return this.company;
	}
}

export default QRCodeControl;