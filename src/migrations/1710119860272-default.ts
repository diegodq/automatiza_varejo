import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1710119860272 implements MigrationInterface {
    name = 'Default1710119860272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`possible_answers\` DROP FOREIGN KEY \`FK_4e2667064dc7188962dbb9d471a\``);
        await queryRunner.query(`ALTER TABLE \`possible_answers\` ADD CONSTRAINT \`FK_4e2667064dc7188962dbb9d471a\` FOREIGN KEY (\`question_id\`) REFERENCES \`question\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`possible_answers\` DROP FOREIGN KEY \`FK_4e2667064dc7188962dbb9d471a\``);
        await queryRunner.query(`ALTER TABLE \`possible_answers\` ADD CONSTRAINT \`FK_4e2667064dc7188962dbb9d471a\` FOREIGN KEY (\`question_id\`) REFERENCES \`question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
