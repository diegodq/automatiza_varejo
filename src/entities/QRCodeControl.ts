import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Company from "./Company";

@Entity('qrcode_control')
class QRCodeControl
{
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => Company, company => company.qrcode)
	@JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
	company: Company;

	@Column({type:'int', nullable: true, default: 0 })
	id_store: number;

	constructor(id: number, id_store: number, company: Company)
	{
		this.id = id;
		this.id_store = id_store;
		this.company = company;
	}

	get getId(): number
	{
		return this.id;
	}

	get getStoreID(): number
	{
		return this.id_store;
	}

	get getCompany(): Company
	{
		return this.company;
	}
}

export default QRCodeControl;