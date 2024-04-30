import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1709083742552 implements MigrationInterface {
    name = 'Default1709083742552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        //await queryRunner.query(`ALTER TABLE \`customer_permissions\` DROP FOREIGN KEY \`FK_23f5d6607a2a0cac461932e4b96\``);
        //await queryRunner.query(`ALTER TABLE \`customer_permissions\` DROP FOREIGN KEY \`FK_5dfb3c4757ba3c09d39811f896e\``);
        //await queryRunner.query(`ALTER TABLE \`roles_customer\` DROP FOREIGN KEY \`FK_7ed01c562327f0fecc4accd835d\``);
        //await queryRunner.query(`ALTER TABLE \`roles_customer\` DROP FOREIGN KEY \`FK_e4ac8f86ba877242ecf0b98745d\``);
        //await queryRunner.query(`DROP INDEX \`IDX_23f5d6607a2a0cac461932e4b9\` ON \`customer_permissions\``);
        //await queryRunner.query(`DROP INDEX \`IDX_5dfb3c4757ba3c09d39811f896\` ON \`customer_permissions\``);
        //await queryRunner.query(`DROP INDEX \`IDX_7ed01c562327f0fecc4accd835\` ON \`roles_customer\``);
        //await queryRunner.query(`DROP INDEX \`IDX_e4ac8f86ba877242ecf0b98745\` ON \`roles_customer\``);
        //await queryRunner.query(`CREATE TABLE \`paths\` (\`id\` int NOT NULL AUTO_INCREMENT, \`path\` varchar(100) NOT NULL DEFAULT '', \`http_verb\` varchar(20) NOT NULL DEFAULT '*', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        //await queryRunner.query(`CREATE TABLE \`customer_paths\` (\`path_id\` int NOT NULL, \`customer_id\` int NOT NULL, INDEX \`IDX_63ce5c044ecf6205efa54dd194\` (\`path_id\`), INDEX \`IDX_659d73e067f13c03de7709f4bd\` (\`customer_id\`), PRIMARY KEY (\`path_id\`, \`customer_id\`)) ENGINE=InnoDB`);
        //await queryRunner.query(`ALTER TABLE \`question\` DROP COLUMN \`question_description\``);
        await queryRunner.query(`ALTER TABLE \`question\` ADD \`question_description\` varchar(255) NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_3efb387fd25a66f9d84f5e17df\` ON \`customer_permissions\` (\`permission_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_d6e001f3eaa0ded45e7bed27b9\` ON \`customer_permissions\` (\`customer_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_f982f93625ac4cf9f45cbba5cc\` ON \`roles_customer\` (\`role_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_2ffd52eeb8692e54ecfc219642\` ON \`roles_customer\` (\`customer_id\`)`);
        await queryRunner.query(`ALTER TABLE \`customer_permissions\` ADD CONSTRAINT \`FK_3efb387fd25a66f9d84f5e17dfb\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`customer_permissions\` ADD CONSTRAINT \`FK_d6e001f3eaa0ded45e7bed27b90\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles_customer\` ADD CONSTRAINT \`FK_f982f93625ac4cf9f45cbba5cc4\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`roles_customer\` ADD CONSTRAINT \`FK_2ffd52eeb8692e54ecfc219642e\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`customer_paths\` ADD CONSTRAINT \`FK_63ce5c044ecf6205efa54dd1942\` FOREIGN KEY (\`path_id\`) REFERENCES \`paths\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`customer_paths\` ADD CONSTRAINT \`FK_659d73e067f13c03de7709f4bdd\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer_paths\` DROP FOREIGN KEY \`FK_659d73e067f13c03de7709f4bdd\``);
        await queryRunner.query(`ALTER TABLE \`customer_paths\` DROP FOREIGN KEY \`FK_63ce5c044ecf6205efa54dd1942\``);
        await queryRunner.query(`ALTER TABLE \`roles_customer\` DROP FOREIGN KEY \`FK_2ffd52eeb8692e54ecfc219642e\``);
        await queryRunner.query(`ALTER TABLE \`roles_customer\` DROP FOREIGN KEY \`FK_f982f93625ac4cf9f45cbba5cc4\``);
        await queryRunner.query(`ALTER TABLE \`customer_permissions\` DROP FOREIGN KEY \`FK_d6e001f3eaa0ded45e7bed27b90\``);
        await queryRunner.query(`ALTER TABLE \`customer_permissions\` DROP FOREIGN KEY \`FK_3efb387fd25a66f9d84f5e17dfb\``);
        await queryRunner.query(`DROP INDEX \`IDX_2ffd52eeb8692e54ecfc219642\` ON \`roles_customer\``);
        await queryRunner.query(`DROP INDEX \`IDX_f982f93625ac4cf9f45cbba5cc\` ON \`roles_customer\``);
        await queryRunner.query(`DROP INDEX \`IDX_d6e001f3eaa0ded45e7bed27b9\` ON \`customer_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_3efb387fd25a66f9d84f5e17df\` ON \`customer_permissions\``);
        await queryRunner.query(`ALTER TABLE \`question\` DROP COLUMN \`question_description\``);
        await queryRunner.query(`ALTER TABLE \`question\` ADD \`question_description\` varchar(100) COLLATE "utf8mb4_0900_ai_ci" NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_659d73e067f13c03de7709f4bd\` ON \`customer_paths\``);
        await queryRunner.query(`DROP INDEX \`IDX_63ce5c044ecf6205efa54dd194\` ON \`customer_paths\``);
        await queryRunner.query(`DROP TABLE \`customer_paths\``);
        await queryRunner.query(`DROP TABLE \`paths\``);
        await queryRunner.query(`CREATE INDEX \`IDX_e4ac8f86ba877242ecf0b98745\` ON \`roles_customer\` (\`customer_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_7ed01c562327f0fecc4accd835\` ON \`roles_customer\` (\`role_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_5dfb3c4757ba3c09d39811f896\` ON \`customer_permissions\` (\`customer_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_23f5d6607a2a0cac461932e4b9\` ON \`customer_permissions\` (\`permission_id\`)`);
        await queryRunner.query(`ALTER TABLE \`roles_customer\` ADD CONSTRAINT \`FK_e4ac8f86ba877242ecf0b98745d\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles_customer\` ADD CONSTRAINT \`FK_7ed01c562327f0fecc4accd835d\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`customer_permissions\` ADD CONSTRAINT \`FK_5dfb3c4757ba3c09d39811f896e\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`customer_permissions\` ADD CONSTRAINT \`FK_23f5d6607a2a0cac461932e4b96\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
