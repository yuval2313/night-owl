import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBusinesses1686166769434 implements MigrationInterface {
  name = 'CreateBusinesses1686166769434';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "businesses" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "profile_id" integer NOT NULL, "name" character varying NOT NULL, "metadata" jsonb NOT NULL, CONSTRAINT "PK_bc1bf63498dd2368ce3dc8686e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "businesses" ADD CONSTRAINT "FK_defdc2d5a51e7789ec6c2e7f993" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "businesses" DROP CONSTRAINT "FK_defdc2d5a51e7789ec6c2e7f993"`,
    );
    await queryRunner.query(`DROP TABLE "businesses"`);
  }
}
