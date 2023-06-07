import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFollowers1686161793774 implements MigrationInterface {
    name = 'CreateFollowers1686161793774'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "followers" ("follower" integer NOT NULL, "follows" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_ed4fd9df51ff2b9fd8c3426124d" PRIMARY KEY ("follower", "follows"))`);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "FK_2df7cfad060953a934ecdf5dd97" FOREIGN KEY ("follower") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "FK_28c556e7794c94c4fa2cc3e352a" FOREIGN KEY ("follows") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_28c556e7794c94c4fa2cc3e352a"`);
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_2df7cfad060953a934ecdf5dd97"`);
        await queryRunner.query(`DROP TABLE "followers"`);
    }

}
