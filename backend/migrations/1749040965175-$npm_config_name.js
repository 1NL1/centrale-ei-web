/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export default class  $npmConfigName1749040965175 {
    name = ' $npmConfigName1749040965175'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY NOT NULL,
                "title" varchar NOT NULL,
                "release_date" varchar NOT NULL,
                "overview" varchar NOT NULL,
                "poster_path" varchar NOT NULL,
                "original_language" varchar NOT NULL,
                "popularity" varchar NOT NULL,
                "genre_ids" varchar NOT NULL,
                "director_id" integer,
                "writer_id" integer,
                "actor1_id" integer,
                "actor2_id" integer,
                "actor3_id" integer,
                "actor4_id" integer,
                "actor5_id" integer
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"(
                    "id",
                    "title",
                    "release_date",
                    "overview",
                    "poster_path",
                    "original_language",
                    "popularity",
                    "genre_ids",
                    "director_id",
                    "writer_id",
                    "actor1_id",
                    "actor2_id",
                    "actor3_id",
                    "actor4_id",
                    "actor5_id"
                )
            SELECT "id",
                "title",
                "release_date",
                "overview",
                "poster_path",
                "original_language",
                "popularity",
                "genre_ids",
                "director_id",
                "writer_id",
                "actor1_id",
                "actor2_id",
                "actor3_id",
                "actor4_id",
                "actor5_id"
            FROM "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie"
                RENAME TO "movie"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY NOT NULL,
                "title" varchar NOT NULL,
                "release_date" varchar NOT NULL,
                "overview" varchar NOT NULL,
                "poster_path" varchar NOT NULL,
                "original_language" varchar NOT NULL,
                "popularity" varchar NOT NULL,
                "genre_ids" varchar NOT NULL,
                "director_id" integer NOT NULL,
                "writer_id" integer NOT NULL,
                "actor1_id" integer NOT NULL,
                "actor2_id" integer NOT NULL,
                "actor3_id" integer NOT NULL,
                "actor4_id" integer NOT NULL,
                "actor5_id" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"(
                    "id",
                    "title",
                    "release_date",
                    "overview",
                    "poster_path",
                    "original_language",
                    "popularity",
                    "genre_ids",
                    "director_id",
                    "writer_id",
                    "actor1_id",
                    "actor2_id",
                    "actor3_id",
                    "actor4_id",
                    "actor5_id"
                )
            SELECT "id",
                "title",
                "release_date",
                "overview",
                "poster_path",
                "original_language",
                "popularity",
                "genre_ids",
                "director_id",
                "writer_id",
                "actor1_id",
                "actor2_id",
                "actor3_id",
                "actor4_id",
                "actor5_id"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
    }
}
