import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCommentLikes1686165788088 implements MigrationInterface {
  name = 'CreateCommentLikes1686165788088';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comment_likes" ("comment_id" uuid NOT NULL, "profile_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_776e2d9fea81c0ef931e6a3d684" PRIMARY KEY ("comment_id", "profile_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_likes" ADD CONSTRAINT "FK_2073bf518ef7017ec19319a65e5" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_likes" ADD CONSTRAINT "FK_e987f05d7c7e3a55432dc9a6fc4" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment_likes" DROP CONSTRAINT "FK_e987f05d7c7e3a55432dc9a6fc4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_likes" DROP CONSTRAINT "FK_2073bf518ef7017ec19319a65e5"`,
    );
    await queryRunner.query(`DROP TABLE "comment_likes"`);
  }
}
