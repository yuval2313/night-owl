import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFollowers1686005787933 implements MigrationInterface {
  name = 'CreateFollowers1686005787933';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "followers" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" integer NOT NULL, "followed_by_user_id" integer NOT NULL, CONSTRAINT "PK_30c67bc9862157e995f4e1b1228" PRIMARY KEY ("user_id", "followed_by_user_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "followers" ADD CONSTRAINT "FK_d6e6e6be11ffefd40e60bffbebd" FOREIGN KEY ("user_id") REFERENCES "profile"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "followers" ADD CONSTRAINT "FK_7f9f77b833c0ac88ea2bef91639" FOREIGN KEY ("followed_by_user_id") REFERENCES "profile"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "followers" DROP CONSTRAINT "FK_7f9f77b833c0ac88ea2bef91639"`,
    );
    await queryRunner.query(
      `ALTER TABLE "followers" DROP CONSTRAINT "FK_d6e6e6be11ffefd40e60bffbebd"`,
    );
    await queryRunner.query(`DROP TABLE "followers"`);
  }
}
