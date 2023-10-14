import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1697244543812 implements MigrationInterface {
    name = 'Default1697244543812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`params_questions\` DROP COLUMN \`lock_by_ip\``);
        await queryRunner.query(`ALTER TABLE \`params_product\` ADD \`lock_by_ip\` tinyint NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`params_product\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`params_product\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`params_product\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`params_product\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`params_product\` DROP COLUMN \`lock_by_ip\``);
        await queryRunner.query(`ALTER TABLE \`params_questions\` ADD \`lock_by_ip\` tinyint NULL DEFAULT '0'`);
    }

}
