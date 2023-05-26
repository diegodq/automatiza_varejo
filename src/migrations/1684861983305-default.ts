import { MigrationInterface, QueryRunner } from "typeorm";

export class default1684861983305 implements MigrationInterface {
    name = 'default1684861983305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`question\` DROP COLUMN \`option_one\``);
        await queryRunner.query(`ALTER TABLE \`question\` ADD \`option_one\` varchar(80) NULL`);
        await queryRunner.query(`ALTER TABLE \`question\` DROP COLUMN \`option_two\``);
        await queryRunner.query(`ALTER TABLE \`question\` ADD \`option_two\` varchar(80) NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`question\` DROP COLUMN \`option_two\``);
        await queryRunner.query(`ALTER TABLE \`question\` ADD \`option_two\` varchar(40) NULL`);
        await queryRunner.query(`ALTER TABLE \`question\` DROP COLUMN \`option_one\``);
        await queryRunner.query(`ALTER TABLE \`question\` ADD \`option_one\` varchar(40) NULL`);
    }

}
