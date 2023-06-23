import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostLikes1686165277706 implements MigrationInterface {
  name = 'CreatePostLikes1686165277706';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "post_likes" ("post_id" uuid NOT NULL, "profile_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_12481d3df8d29841562e28cfe5a" PRIMARY KEY ("post_id", "profile_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_likes" ADD CONSTRAINT "FK_b40d37469c501092203d285af80" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_likes" ADD CONSTRAINT "FK_9162feff002caed5b107259355c" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post_likes" DROP CONSTRAINT "FK_9162feff002caed5b107259355c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_likes" DROP CONSTRAINT "FK_b40d37469c501092203d285af80"`,
    );
    await queryRunner.query(`DROP TABLE "post_likes"`);
  }
}
