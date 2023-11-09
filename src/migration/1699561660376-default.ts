import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1699561660376 implements MigrationInterface {
    name = 'Default1699561660376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`qrcode_control\` DROP COLUMN \`qrcode\``);
        await queryRunner.query(`ALTER TABLE \`qrcode_control\` DROP COLUMN \`store_number\``);
        await queryRunner.query(`ALTER TABLE \`qrcode_control\` ADD \`qrcode_name\` varchar(200) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`qrcode_control\` ADD \`id_store\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`qrcode_control\` DROP COLUMN \`id_store\``);
        await queryRunner.query(`ALTER TABLE \`qrcode_control\` DROP COLUMN \`qrcode_name\``);
        await queryRunner.query(`ALTER TABLE \`qrcode_control\` ADD \`store_number\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`qrcode_control\` ADD \`qrcode\` varchar(255) NULL DEFAULT ''`);
    }

}
