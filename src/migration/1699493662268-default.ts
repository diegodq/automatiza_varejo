import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1699493662268 implements MigrationInterface {
    name = 'Default1699493662268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`answer\` \`answer\` varchar(255) NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`research_title\` \`research_title\` varchar(200) NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`client_name\` \`client_name\` varchar(90) NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`client_phone\` \`client_phone\` varchar(30) NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`is_contact\` \`is_contact\` tinyint NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`is_report\` \`is_report\` tinyint NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`type_report\` \`type_report\` varchar(80) NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`id_research\` \`id_research\` varchar(100) NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`research_name\` \`research_name\` varchar(200) NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`nps_answer\` \`nps_answer\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`device_client\` \`device_client\` varchar(50) NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`name_employee\` \`name_employee\` varchar(90) NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`name_employee\` \`name_employee\` varchar(90) NULL`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`device_client\` \`device_client\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`nps_answer\` \`nps_answer\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`research_name\` \`research_name\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`id_research\` \`id_research\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`type_report\` \`type_report\` varchar(80) NULL`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`is_report\` \`is_report\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`is_contact\` \`is_contact\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`client_phone\` \`client_phone\` varchar(30) NULL`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`client_name\` \`client_name\` varchar(90) NULL`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`research_title\` \`research_title\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`answer\` \`answer\` varchar(255) NULL`);
    }

}
