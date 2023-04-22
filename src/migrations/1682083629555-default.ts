import { MigrationInterface, QueryRunner } from "typeorm";

export class default1682083629555 implements MigrationInterface {
    name = 'default1682083629555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`customer_tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`customer_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(180) NOT NULL, \`description\` varchar(180) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`customer_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(200) NOT NULL, \`avatar\` varchar(255) NULL, \`surname\` varchar(255) NOT NULL, \`position\` varchar(255) NOT NULL, \`phone\` varchar(17) NOT NULL, \`email\` varchar(255) NULL, \`temp_email\` varchar(255) NULL, \`email_change_on\` datetime NULL, \`activated\` tinyint NULL DEFAULT '0', \`activated_on\` datetime NULL, \`accept_newsletter\` tinyint NULL DEFAULT '0', \`info_payment\` tinyint NULL DEFAULT '0', \`accept_terms\` char NOT NULL, \`accept_terms_on\` datetime NULL, \`old_password\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`system_user\` varchar(40) NULL, \`agent_user\` varchar(40) NULL, \`pass_change_on\` datetime NULL, \`city\` varchar(90) NULL, \`region_name\` varchar(90) NULL, \`country\` varchar(90) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_fdb2f3ad8115da4c7718109a6e\` (\`email\`), UNIQUE INDEX \`IDX_7f0a0b82d3e4b38ace0200652c\` (\`temp_email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company\` (\`id\` int NOT NULL AUTO_INCREMENT, \`corporate_name\` varchar(255) NOT NULL, \`fantasy_name\` varchar(255) NOT NULL, \`cnpj\` varchar(20) NOT NULL, \`zip_code\` varchar(17) NOT NULL, \`state\` varchar(17) NOT NULL, \`address\` varchar(255) NOT NULL, \`number\` varchar(20) NOT NULL, \`complement\` varchar(255) NULL, \`district\` varchar(200) NOT NULL, \`city\` varchar(200) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`customer_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contact_us\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`subject\` varchar(255) NOT NULL, \`message\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`surname\` varchar(90) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` char NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`customer_tokens\` ADD CONSTRAINT \`FK_603f63d478610e2c71e15dffc57\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_d8ae3fcf7d0ce64451a46b85252\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD CONSTRAINT \`FK_4f8b4c49d336c1091ffd429a059\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company\` DROP FOREIGN KEY \`FK_4f8b4c49d336c1091ffd429a059\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_d8ae3fcf7d0ce64451a46b85252\``);
        await queryRunner.query(`ALTER TABLE \`customer_tokens\` DROP FOREIGN KEY \`FK_603f63d478610e2c71e15dffc57\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`contact_us\``);
        await queryRunner.query(`DROP TABLE \`company\``);
        await queryRunner.query(`DROP INDEX \`IDX_7f0a0b82d3e4b38ace0200652c\` ON \`customer\``);
        await queryRunner.query(`DROP INDEX \`IDX_fdb2f3ad8115da4c7718109a6e\` ON \`customer\``);
        await queryRunner.query(`DROP TABLE \`customer\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`customer_tokens\``);
    }

}
