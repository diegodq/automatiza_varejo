import { MigrationInterface, QueryRunner } from "typeorm";

export class default1681414290919 implements MigrationInterface {
    name = 'default1681414290919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`info_payment\` tinyint NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`info_payment\``);
    }

}
