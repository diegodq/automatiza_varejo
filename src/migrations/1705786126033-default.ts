import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1705786126033 implements MigrationInterface {
    name = 'Default1705786126033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_170a73f2523d7ca266834e38ef1\` ON \`customer\``);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_170a73f2523d7ca266834e38ef1\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_170a73f2523d7ca266834e38ef1\``);
        await queryRunner.query(`CREATE INDEX \`FK_170a73f2523d7ca266834e38ef1\` ON \`customer\` (\`company_id\`)`);
    }

}
