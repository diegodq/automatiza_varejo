import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1702652507939 implements MigrationInterface {
    name = 'Default1702652507939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`question_group\` (\`id\` int NOT NULL AUTO_INCREMENT, \`group_name\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`question_group_mapping\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`question_group_id\` int NULL, \`question_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`company_product\` DROP COLUMN \`multi_store\``);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`type_customer\` varchar(10) NULL DEFAULT ''`);
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
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`type_customer\``);
        await queryRunner.query(`ALTER TABLE \`company_product\` ADD \`multi_store\` tinyint NULL DEFAULT '0'`);
        await queryRunner.query(`DROP TABLE \`question_group_mapping\``);
        await queryRunner.query(`DROP TABLE \`question_group\``);
    }

}
