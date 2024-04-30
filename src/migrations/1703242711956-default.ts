import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1703242711956 implements MigrationInterface {
    name = 'Default1703242711956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company\` DROP FOREIGN KEY \`FK_4f8b4c49d336c1091ffd429a059\``);
        await queryRunner.query(`ALTER TABLE \`company\` DROP COLUMN \`customer_id\``);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`company_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_170a73f2523d7ca266834e38ef1\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_170a73f2523d7ca266834e38ef1\``);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`company_id\``);
        await queryRunner.query(`ALTER TABLE \`company\` ADD \`customer_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD CONSTRAINT \`FK_4f8b4c49d336c1091ffd429a059\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
