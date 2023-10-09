import { MigrationInterface, QueryRunner } from "typeorm";

export class default1696883319660 implements MigrationInterface {
    name = 'default1696883319660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`idxAnswer\` ON \`answer\` (\`id\`)`);
        await queryRunner.query(`CREATE INDEX \`idxQuestion\` ON \`answer\` (\`question_id\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`idxQuestion\` ON \`answer\``);
        await queryRunner.query(`DROP INDEX \`idxAnswer\` ON \`answer\``);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
    }

}
