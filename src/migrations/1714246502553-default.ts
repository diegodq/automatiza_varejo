import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1714246502553 implements MigrationInterface {
    name = 'Default1714246502553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`change_password\` tinyint NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`change_password\``);
    }

}
