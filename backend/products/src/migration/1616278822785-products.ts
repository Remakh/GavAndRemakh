import {MigrationInterface, QueryRunner} from "typeorm";

export class products1616278822785 implements MigrationInterface {
    name = 'products1616278822785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_images" ("id" SERIAL NOT NULL, "description" text, "url" text NOT NULL, "dateAdded" TIMESTAMP NOT NULL DEFAULT now(), "dateModified" TIMESTAMP NOT NULL DEFAULT now(), "productId" integer, CONSTRAINT "PK_1974264ea7265989af8392f63a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "price" numeric NOT NULL, "dateAdded" TIMESTAMP NOT NULL DEFAULT now(), "dateModified" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_images" ADD CONSTRAINT "FK_b367708bf720c8dd62fc6833161" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_images" DROP CONSTRAINT "FK_b367708bf720c8dd62fc6833161"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "product_images"`);
    }

}
