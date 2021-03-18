import {MigrationInterface, QueryRunner} from "typeorm";

export class productTable1616106381402 implements MigrationInterface {
    name = 'productTable1616106381402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "price" numeric NOT NULL, "dateAdded" TIMESTAMP NOT NULL DEFAULT now(), "dateModified" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "description" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "description" text NOT NULL`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
