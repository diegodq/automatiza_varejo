import { MigrationInterface, QueryRunner } from "typeorm";

export class default1693354238308 implements MigrationInterface {
    name = 'default1693354238308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`customer_tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`customer_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(200) NOT NULL, \`avatar\` varchar(255) NULL, \`surname\` varchar(255) NOT NULL, \`position\` varchar(255) NOT NULL, \`phone\` varchar(17) NOT NULL, \`email\` varchar(255) NULL, \`temp_email\` varchar(255) NULL, \`email_change_on\` datetime NULL, \`resent_email_on\` datetime NULL, \`activated\` tinyint NULL DEFAULT '0', \`activated_on\` datetime NULL, \`accept_newsletter\` tinyint NULL DEFAULT '0', \`info_payment\` tinyint NULL DEFAULT '0', \`accept_terms\` char NOT NULL, \`accept_terms_on\` datetime NULL, \`old_password\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`system_user\` varchar(40) NULL, \`agent_user\` varchar(40) NULL, \`pass_change_on\` datetime NULL, \`city_locate\` varchar(90) NULL, \`country_name\` varchar(90) NULL, \`country_capital\` varchar(90) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_fdb2f3ad8115da4c7718109a6e\` (\`email\`), UNIQUE INDEX \`IDX_7f0a0b82d3e4b38ace0200652c\` (\`temp_email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`answer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`answer\` varchar(255) NULL, \`type_answer\` varchar(90) NULL, \`research_title\` varchar(200) NULL, \`client_name\` varchar(90) NULL, \`client_phone\` varchar(30) NULL, \`is_contact\` tinyint NULL, \`is_report\` tinyint NULL, \`type_report\` varchar(80) NULL, \`id_research\` varchar(100) NULL, \`research_name\` varchar(200) NULL, \`nps_answer\` int NULL, \`device_client\` varchar(50) NULL, \`start_research\` datetime NULL, \`name_employee\` varchar(90) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`question_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`params_questions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`option_one\` varchar(80) NULL, \`option_two\` varchar(80) NULL, \`import_type\` varchar(15) NULL, \`position\` int NULL, \`mandatory_question\` tinyint NULL, \`finish_research\` tinyint NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`question_id\` int NULL, UNIQUE INDEX \`REL_9aa79f2a7894b704ec14a133ae\` (\`question_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`question\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title_question\` varchar(100) NULL, \`tree_question\` tinyint NULL, \`question_description\` varchar(100) NULL, \`type_question\` varchar(20) NOT NULL, \`status\` tinyint NULL, \`text_end_research\` varchar(200) NULL, \`text_label_one\` varchar(40) NULL, \`text_label_two\` varchar(40) NULL, \`research_title\` varchar(80) NULL, \`alert_label\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`company_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`department\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`status\` tinyint NOT NULL DEFAULT '1', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`company_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`topic\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`status\` tinyint NOT NULL DEFAULT '1', \`indicate_employee\` tinyint NULL DEFAULT '1', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`company_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(180) NOT NULL, \`description\` varchar(180) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`params_product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`anchor_question\` varchar(100) NULL DEFAULT '', \`background_color\` varchar(20) NULL, \`font_color\` varchar(20) NULL, \`passing_tree\` int NULL, \`company_id\` int NULL, UNIQUE INDEX \`REL_466e06fa07b44e7749332bebea\` (\`company_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company\` (\`id\` int NOT NULL AUTO_INCREMENT, \`corporate_name\` varchar(255) NOT NULL, \`fantasy_name\` varchar(255) NOT NULL, \`logo_company\` varchar(255) NULL DEFAULT '', \`cnpj\` varchar(20) NOT NULL, \`zip_code\` varchar(17) NOT NULL, \`state\` varchar(17) NOT NULL, \`address\` varchar(255) NOT NULL, \`number\` varchar(20) NOT NULL, \`complement\` varchar(255) NULL, \`district\` varchar(200) NOT NULL, \`city\` varchar(200) NOT NULL, \`is_report\` tinyint NULL DEFAULT '0', \`type_report\` varchar(10) NULL DEFAULT 'show', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`customer_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contact_us\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`subject\` varchar(255) NOT NULL, \`message\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`surname\` varchar(90) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` char NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company_product\` (\`company\` int NOT NULL, \`product\` int NOT NULL, INDEX \`IDX_6d4301639c0f64533b454f3bda\` (\`company\`), INDEX \`IDX_f98fd6722c590dc1d4a767c60c\` (\`product\`), PRIMARY KEY (\`company\`, \`product\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`customer_tokens\` ADD CONSTRAINT \`FK_603f63d478610e2c71e15dffc57\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD CONSTRAINT \`FK_c3d19a89541e4f0813f2fe09194\` FOREIGN KEY (\`question_id\`) REFERENCES \`question\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`params_questions\` ADD CONSTRAINT \`FK_9aa79f2a7894b704ec14a133aeb\` FOREIGN KEY (\`question_id\`) REFERENCES \`question\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`question\` ADD CONSTRAINT \`FK_150758ea0fe6f96dd2cd53bff21\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`department\` ADD CONSTRAINT \`FK_f840e8ae1c80c7acb64dc668118\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`topic\` ADD CONSTRAINT \`FK_54b86956201f019887f1be3430a\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`params_product\` ADD CONSTRAINT \`FK_466e06fa07b44e7749332bebead\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD CONSTRAINT \`FK_4f8b4c49d336c1091ffd429a059\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`company_product\` ADD CONSTRAINT \`FK_6d4301639c0f64533b454f3bda6\` FOREIGN KEY (\`company\`) REFERENCES \`company\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`company_product\` ADD CONSTRAINT \`FK_f98fd6722c590dc1d4a767c60c3\` FOREIGN KEY (\`product\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company_product\` DROP FOREIGN KEY \`FK_f98fd6722c590dc1d4a767c60c3\``);
        await queryRunner.query(`ALTER TABLE \`company_product\` DROP FOREIGN KEY \`FK_6d4301639c0f64533b454f3bda6\``);
        await queryRunner.query(`ALTER TABLE \`company\` DROP FOREIGN KEY \`FK_4f8b4c49d336c1091ffd429a059\``);
        await queryRunner.query(`ALTER TABLE \`params_product\` DROP FOREIGN KEY \`FK_466e06fa07b44e7749332bebead\``);
        await queryRunner.query(`ALTER TABLE \`topic\` DROP FOREIGN KEY \`FK_54b86956201f019887f1be3430a\``);
        await queryRunner.query(`ALTER TABLE \`department\` DROP FOREIGN KEY \`FK_f840e8ae1c80c7acb64dc668118\``);
        await queryRunner.query(`ALTER TABLE \`question\` DROP FOREIGN KEY \`FK_150758ea0fe6f96dd2cd53bff21\``);
        await queryRunner.query(`ALTER TABLE \`params_questions\` DROP FOREIGN KEY \`FK_9aa79f2a7894b704ec14a133aeb\``);
        await queryRunner.query(`ALTER TABLE \`answer\` DROP FOREIGN KEY \`FK_c3d19a89541e4f0813f2fe09194\``);
        await queryRunner.query(`ALTER TABLE \`customer_tokens\` DROP FOREIGN KEY \`FK_603f63d478610e2c71e15dffc57\``);
        await queryRunner.query(`DROP INDEX \`IDX_f98fd6722c590dc1d4a767c60c\` ON \`company_product\``);
        await queryRunner.query(`DROP INDEX \`IDX_6d4301639c0f64533b454f3bda\` ON \`company_product\``);
        await queryRunner.query(`DROP TABLE \`company_product\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`contact_us\``);
        await queryRunner.query(`DROP TABLE \`company\``);
        await queryRunner.query(`DROP INDEX \`REL_466e06fa07b44e7749332bebea\` ON \`params_product\``);
        await queryRunner.query(`DROP TABLE \`params_product\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`topic\``);
        await queryRunner.query(`DROP TABLE \`department\``);
        await queryRunner.query(`DROP TABLE \`question\``);
        await queryRunner.query(`DROP INDEX \`REL_9aa79f2a7894b704ec14a133ae\` ON \`params_questions\``);
        await queryRunner.query(`DROP TABLE \`params_questions\``);
        await queryRunner.query(`DROP TABLE \`answer\``);
        await queryRunner.query(`DROP INDEX \`IDX_7f0a0b82d3e4b38ace0200652c\` ON \`customer\``);
        await queryRunner.query(`DROP INDEX \`IDX_fdb2f3ad8115da4c7718109a6e\` ON \`customer\``);
        await queryRunner.query(`DROP TABLE \`customer\``);
        await queryRunner.query(`DROP TABLE \`customer_tokens\``);
    }

}
