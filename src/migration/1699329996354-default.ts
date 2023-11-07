import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1699329996354 implements MigrationInterface {
    name = 'Default1699329996354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`store\` DROP FOREIGN KEY \`FK_6aabecf199859f1189fd4446cfb\``);
        await queryRunner.query(`ALTER TABLE \`answer\` DROP FOREIGN KEY \`FK_42a0982fb324e20477f4ca342c8\``);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`store\` ADD CONSTRAINT \`FK_6aabecf199859f1189fd4446cfb\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD CONSTRAINT \`FK_42a0982fb324e20477f4ca342c8\` FOREIGN KEY (\`store_id\`) REFERENCES \`store\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`answer\` DROP FOREIGN KEY \`FK_42a0982fb324e20477f4ca342c8\``);
        await queryRunner.query(`ALTER TABLE \`store\` DROP FOREIGN KEY \`FK_6aabecf199859f1189fd4446cfb\``);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_us\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD CONSTRAINT \`FK_42a0982fb324e20477f4ca342c8\` FOREIGN KEY (\`store_id\`) REFERENCES \`store\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`store\` ADD CONSTRAINT \`FK_6aabecf199859f1189fd4446cfb\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
