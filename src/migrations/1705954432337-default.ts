import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1705954432337 implements MigrationInterface {
    name = 'Default1705954432337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permissions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NULL, \`description\` varchar(100) NOT NULL DEFAULT '', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customer_permissions\` (\`customer_id\` int NOT NULL, \`permission_id\` int NOT NULL, INDEX \`IDX_5dfb3c4757ba3c09d39811f896\` (\`customer_id\`), INDEX \`IDX_23f5d6607a2a0cac461932e4b9\` (\`permission_id\`), PRIMARY KEY (\`customer_id\`, \`permission_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`customer_permissions\` ADD CONSTRAINT \`FK_5dfb3c4757ba3c09d39811f896e\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`customer_permissions\` ADD CONSTRAINT \`FK_23f5d6607a2a0cac461932e4b96\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer_permissions\` DROP FOREIGN KEY \`FK_23f5d6607a2a0cac461932e4b96\``);
        await queryRunner.query(`ALTER TABLE \`customer_permissions\` DROP FOREIGN KEY \`FK_5dfb3c4757ba3c09d39811f896e\``);
        await queryRunner.query(`DROP INDEX \`IDX_23f5d6607a2a0cac461932e4b9\` ON \`customer_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_5dfb3c4757ba3c09d39811f896\` ON \`customer_permissions\``);
        await queryRunner.query(`DROP TABLE \`customer_permissions\``);
        await queryRunner.query(`DROP TABLE \`permission\``);
    }

}
