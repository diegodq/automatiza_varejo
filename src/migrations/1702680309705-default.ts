import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1702680309705 implements MigrationInterface {
    name = 'Default1702680309705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_352ac9084e066e86c63eba2f26\` ON \`customer\``);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`question_group_mapping\` ADD CONSTRAINT \`FK_526816f8b008ef697940aab9c55\` FOREIGN KEY (\`question_group_id\`) REFERENCES \`question_group\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`question_group_mapping\` ADD CONSTRAINT \`FK_ce5022ab1521b9edd6ab6c72e2d\` FOREIGN KEY (\`question_id\`) REFERENCES \`question\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`question_group_mapping\` DROP FOREIGN KEY \`FK_ce5022ab1521b9edd6ab6c72e2d\``);
        await queryRunner.query(`ALTER TABLE \`question_group_mapping\` DROP FOREIGN KEY \`FK_526816f8b008ef697940aab9c55\``);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) COLLATE "utf8mb4_0900_ai_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) COLLATE "utf8mb4_0900_ai_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) COLLATE "utf8mb4_0900_ai_ci" NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_352ac9084e066e86c63eba2f26\` ON \`customer\` (\`type_customer\`)`);
    }

}
