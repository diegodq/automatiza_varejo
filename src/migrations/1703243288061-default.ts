import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1703243288061 implements MigrationInterface {
    name = 'Default1703243288061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company\` ADD \`type_company\` varchar(10) NULL DEFAULT 'MATRIZ'`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) COLLATE "utf8mb4_0900_ai_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) COLLATE "utf8mb4_0900_ai_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) COLLATE "utf8mb4_0900_ai_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` DROP COLUMN \`type_company\``);
    }

}
