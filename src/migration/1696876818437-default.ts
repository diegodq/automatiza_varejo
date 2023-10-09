import { MigrationInterface, QueryRunner } from "typeorm";

export class default1696876818437 implements MigrationInterface {
    name = 'default1696876818437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`idxAnswer\` ON \`answer\``);
        await queryRunner.query(`DROP INDEX \`idxQuestion\` ON \`question\``);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD \`ip_address\` varchar(60) NULL`);
        await queryRunner.query(`ALTER TABLE \`params_questions\` DROP COLUMN \`option_one\``);
        await queryRunner.query(`ALTER TABLE \`params_questions\` ADD \`option_one\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`params_questions\` DROP COLUMN \`option_two\``);
        await queryRunner.query(`ALTER TABLE \`params_questions\` ADD \`option_two\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`params_questions\` DROP COLUMN \`option_two\``);
        await queryRunner.query(`ALTER TABLE \`params_questions\` ADD \`option_two\` varchar(80) NULL`);
        await queryRunner.query(`ALTER TABLE \`params_questions\` DROP COLUMN \`option_one\``);
        await queryRunner.query(`ALTER TABLE \`params_questions\` ADD \`option_one\` varchar(80) NULL`);
        await queryRunner.query(`ALTER TABLE \`answer\` DROP COLUMN \`ip_address\``);
        await queryRunner.query(`CREATE INDEX \`idxQuestion\` ON \`question\` (\`company_id\`)`);
        await queryRunner.query(`CREATE INDEX \`idxAnswer\` ON \`answer\` (\`question_id\`)`);
    }

}
