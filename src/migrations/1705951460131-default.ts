import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1705951460131 implements MigrationInterface {
    name = 'Default1705951460131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_352ac9084e066e86c63eba2f268\` ON \`customer\``);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`type_customer\``);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`type_customer\` int NULL`);
        await queryRunner.query(`CREATE INDEX \`FK_352ac9084e066e86c63eba2f268\` ON \`customer\` (\`type_customer\`)`);
    }

}
