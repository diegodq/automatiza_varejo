import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1702661295292 implements MigrationInterface {
    name = 'Default1702661295292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`type_customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type_customer\` varchar(50) NOT NULL DEFAULT '', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`type_customer\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD UNIQUE INDEX \`IDX_352ac9084e066e86c63eba2f26\` (\`type_customer\`)`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_352ac9084e066e86c63eba2f26\` ON \`customer\` (\`type_customer\`)`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_352ac9084e066e86c63eba2f268\` FOREIGN KEY (\`type_customer\`) REFERENCES \`type_customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_352ac9084e066e86c63eba2f268\``);
        await queryRunner.query(`DROP INDEX \`REL_352ac9084e066e86c63eba2f26\` ON \`customer\``);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) COLLATE "utf8mb4_0900_ai_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) COLLATE "utf8mb4_0900_ai_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) COLLATE "utf8mb4_0900_ai_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP INDEX \`IDX_352ac9084e066e86c63eba2f26\``);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`type_customer\``);
        await queryRunner.query(`DROP TABLE \`type_customer\``);
    }

}
