import { MigrationInterface, QueryRunner } from "typeorm";

export class Defualt1720955847517 implements MigrationInterface {
    name = 'Defualt1720955847517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`phone\` varchar(255) COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`contact_us\` ADD \`phone\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contact_us\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`contact_us\` ADD \`phone\` varchar(255) COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`phone\` \`subject\` varchar(255) COLLATE "utf8mb4_unicode_ci" NOT NULL`);
    }

}
