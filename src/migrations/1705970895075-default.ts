import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1705970895075 implements MigrationInterface {
    name = 'Default1705970895075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL DEFAULT '', \`description\` varchar(100) NOT NULL DEFAULT '', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles_customer\` (\`role_id\` int NOT NULL, \`customer_id\` int NOT NULL, INDEX \`IDX_7ed01c562327f0fecc4accd835\` (\`role_id\`), INDEX \`IDX_e4ac8f86ba877242ecf0b98745\` (\`customer_id\`), PRIMARY KEY (\`role_id\`, \`customer_id\`)) ENGINE=InnoDB`);
				await queryRunner.query(`ALTER TABLE \`roles_customer\` ADD CONSTRAINT \`FK_e4ac8f86ba877242ecf0b98745d\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles_customer\` ADD CONSTRAINT \`FK_7ed01c562327f0fecc4accd835d\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles_customer\` DROP FOREIGN KEY \`FK_e4ac8f86ba877242ecf0b98745d\``);
        await queryRunner.query(`ALTER TABLE \`roles_customer\` DROP FOREIGN KEY \`FK_7ed01c562327f0fecc4accd835d\``);
        await queryRunner.query(`DROP INDEX \`IDX_e4ac8f86ba877242ecf0b98745\` ON \`roles_customer\``);
        await queryRunner.query(`DROP INDEX \`IDX_7ed01c562327f0fecc4accd835\` ON \`roles_customer\``);
        await queryRunner.query(`DROP TABLE \`roles_customer\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
    }

}
