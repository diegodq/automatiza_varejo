import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1698684650090 implements MigrationInterface {
    name = 'Default1698684650090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company_product\` DROP COLUMN \`multi_store\``);
        await queryRunner.query(`ALTER TABLE \`store\` ADD \`store_number\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`store\` DROP COLUMN \`store_number\``);
        await queryRunner.query(`ALTER TABLE \`company_product\` ADD \`multi_store\` tinyint NULL DEFAULT '0'`);
    }

}
