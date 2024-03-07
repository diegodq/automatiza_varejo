import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1709599722257 implements MigrationInterface {
    name = 'Default1709599722257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`research_title\` \`other_answer\` varchar(200) COLLATE "utf8mb4_0900_ai_ci" NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`answer\` DROP COLUMN \`other_answer\``);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD \`other_answer\` varchar(255) NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) COLLATE "utf8mb4_0900_ai_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) COLLATE "utf8mb4_0900_ai_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) COLLATE "utf8mb4_0900_ai_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`answer\` DROP COLUMN \`other_answer\``);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD \`other_answer\` varchar(200) COLLATE "utf8mb4_0900_ai_ci" NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`company_product\` ADD \`multi_store\` tinyint NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`other_answer\` \`research_title\` varchar(200) COLLATE "utf8mb4_0900_ai_ci" NULL DEFAULT ''`);
    }

}
