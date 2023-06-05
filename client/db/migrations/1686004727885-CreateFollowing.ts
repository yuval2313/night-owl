import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFollowing1686004727885 implements MigrationInterface {
  name = 'CreateFollowing1686004727885';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "following" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" integer NOT NULL, "follows_user_id" integer NOT NULL, CONSTRAINT "PK_fb9bbe79689dbe49a18db6bc29b" PRIMARY KEY ("user_id", "follows_user_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "following" ADD CONSTRAINT "FK_4a5bd9db5bd73571f8c45717718" FOREIGN KEY ("user_id") REFERENCES "profiles"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "following" ADD CONSTRAINT "FK_793e0f6c46861b328fe127796d6" FOREIGN KEY ("follows_user_id") REFERENCES "profiles"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "following" DROP CONSTRAINT "FK_793e0f6c46861b328fe127796d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "following" DROP CONSTRAINT "FK_4a5bd9db5bd73571f8c45717718"`,
    );
    await queryRunner.query(`DROP TABLE "following"`);
  }
}
