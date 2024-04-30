import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1709599722257 implements MigrationInterface {
    name = 'Default1709599722257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`research_title\` \`other_answer\` varchar(200) COLLATE "utf8mb4_0900_ai_ci" NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`answer\` DROP COLUMN \`other_answer\``);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD \`other_answer\` varchar(255) NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`answer\` DROP COLUMN \`other_answer\``);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD \`other_answer\` varchar(200) COLLATE "utf8mb4_0900_ai_ci" NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`other_answer\` \`research_title\` varchar(200) COLLATE "utf8mb4_0900_ai_ci" NULL DEFAULT ''`);
    }

}
