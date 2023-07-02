import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsersTokensColumn1683932796891 implements MigrationInterface {
  name = 'AddUsersTokensColumn1683932796891';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "access_token" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "refresh_token" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "access_token"`);
  }
}
