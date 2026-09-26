import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1790404877951 implements MigrationInterface {
  name = 'InitialSchema1790404877951';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."project_memberships_role_enum" AS ENUM('owner', 'admin', 'member')`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_memberships" ("id" SERIAL NOT NULL, "project_id" integer NOT NULL, "user_id" uuid NOT NULL, "role" "public"."project_memberships_role_enum" NOT NULL, CONSTRAINT "UQ_b877acbf8d466f2889a2eeb1475" UNIQUE ("project_id", "user_id"), CONSTRAINT "PK_856d7bae2d9bddc94861d41eded" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_tasks" ("id" SERIAL NOT NULL, "project_id" integer NOT NULL, "title" character varying NOT NULL, "completed" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b1b6204912a6f44133df3a4518b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "comments" ("id" SERIAL NOT NULL, "task_id" integer NOT NULL, "user_id" uuid NOT NULL, "body" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "comments"`);
    await queryRunner.query(`DROP TABLE "project_tasks"`);
    await queryRunner.query(`DROP TABLE "project_memberships"`);
    await queryRunner.query(
      `DROP TYPE "public"."project_memberships_role_enum"`,
    );
    await queryRunner.query(`DROP TABLE "projects"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
