import {MigrationInterface, QueryRunner} from "typeorm";

export class userTable1616106505117 implements MigrationInterface {
    name = 'userTable1616106505117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session" ("sid" text NOT NULL, "sess" json NOT NULL, "expire" TIMESTAMP NOT NULL, CONSTRAINT "PK_7575923e18b495ed2307ae629ae" PRIMARY KEY ("sid"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "userName" text NOT NULL, "password" text NOT NULL, "email" text NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "session"`);
    }

}
