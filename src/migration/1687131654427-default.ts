import { MigrationInterface, QueryRunner } from "typeorm";

export class default1687131654427 implements MigrationInterface {
    name = 'default1687131654427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`params_questions\` DROP COLUMN \`passing_tree\``);
        await queryRunner.query(`ALTER TABLE \`params_product\` ADD \`passing_tree\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`params_product\` DROP COLUMN \`passing_tree\``);
        await queryRunner.query(`ALTER TABLE \`params_questions\` ADD \`passing_tree\` int NULL`);
    }

}
