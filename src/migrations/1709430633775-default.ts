import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1709430633775 implements MigrationInterface {
    name = 'Default1709430633775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`research_title\` \`multiply_questions\` varchar(80) COLLATE "utf8mb4_0900_ai_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`question\` DROP COLUMN \`multiply_questions\``);
        await queryRunner.query(`ALTER TABLE \`question\` ADD \`multiply_questions\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`question\` DROP COLUMN \`multiply_questions\``);
        await queryRunner.query(`ALTER TABLE \`question\` ADD \`multiply_questions\` varchar(80) COLLATE "utf8mb4_0900_ai_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`company_product\` ADD \`multi_store\` tinyint NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`multiply_questions\` \`research_title\` varchar(80) COLLATE "utf8mb4_0900_ai_ci" NULL`);
    }

}
