import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostPhotos1686163721108 implements MigrationInterface {
  name = 'CreatePostPhotos1686163721108';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "post_photos" ("photo_id" integer NOT NULL, "post_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_497c9946f204f5777943b46f5eb" PRIMARY KEY ("photo_id", "post_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_photos" ADD CONSTRAINT "FK_74c3316d09991b7240ed8ca0de2" FOREIGN KEY ("photo_id") REFERENCES "photos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_photos" ADD CONSTRAINT "FK_4161734dfb6af056c0fc0bf84f9" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post_photos" DROP CONSTRAINT "FK_4161734dfb6af056c0fc0bf84f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_photos" DROP CONSTRAINT "FK_74c3316d09991b7240ed8ca0de2"`,
    );
    await queryRunner.query(`DROP TABLE "post_photos"`);
  }
}
