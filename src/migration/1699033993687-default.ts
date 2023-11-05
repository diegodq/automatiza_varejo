import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1699033993687 implements MigrationInterface {
    name = 'Default1699033993687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`qrcode_control\` (\`id\` int NOT NULL AUTO_INCREMENT, \`qrcode\` varchar(255) NULL DEFAULT '', \`store_number\` int NULL DEFAULT '0', \`company_id\` int NULL, UNIQUE INDEX \`REL_2238aa0a0874aa711df34ee779\` (\`company_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`qrcode_control\` ADD CONSTRAINT \`FK_2238aa0a0874aa711df34ee7799\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`qrcode_control\` DROP FOREIGN KEY \`FK_2238aa0a0874aa711df34ee7799\``);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`REL_2238aa0a0874aa711df34ee779\` ON \`qrcode_control\``);
        await queryRunner.query(`DROP TABLE \`qrcode_control\``);
    }

}
