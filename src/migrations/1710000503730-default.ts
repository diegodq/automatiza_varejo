import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1710000503730 implements MigrationInterface {
    name = 'Default1710000503730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`possible_answers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`answer\` varchar(255) NULL DEFAULT '', \`question_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`question\` ADD \`question_two\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`possible_answers\` ADD CONSTRAINT \`FK_4e2667064dc7188962dbb9d471a\` FOREIGN KEY (\`question_id\`) REFERENCES \`question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`possible_answers\` DROP FOREIGN KEY \`FK_4e2667064dc7188962dbb9d471a\``);
        await queryRunner.query(`ALTER TABLE \`question\` DROP COLUMN \`question_two\``);
        await queryRunner.query(`DROP TABLE \`possible_answers\``);
    }

}
