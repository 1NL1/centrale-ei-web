/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export default class  $npmConfigName1749024734141 {
    name = ' $npmConfigName1749024734141'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "release_date" varchar NOT NULL,
                "overview" varchar NOT NULL,
                "poster_path" varchar NOT NULL,
                "original_language" varchar NOT NULL,
                "popularity" varchar NOT NULL,
                "genre_ids" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"("id", "title", "release_date")
            SELECT "id",
                "title",
                "release_date"
            FROM "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie"
                RENAME TO "movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY NOT NULL,
                "title" varchar NOT NULL,
                "release_date" varchar NOT NULL,
                "overview" varchar NOT NULL,
                "poster_path" varchar NOT NULL,
                "original_language" varchar NOT NULL,
                "popularity" varchar NOT NULL,
                "genre_ids" varchar NOT NULL
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
                    "genre_ids"
                )
            SELECT "id",
                "title",
                "release_date",
                "overview",
                "poster_path",
                "original_language",
                "popularity",
                "genre_ids"
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
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "release_date" varchar NOT NULL,
                "overview" varchar NOT NULL,
                "poster_path" varchar NOT NULL,
                "original_language" varchar NOT NULL,
                "popularity" varchar NOT NULL,
                "genre_ids" varchar NOT NULL
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
                    "genre_ids"
                )
            SELECT "id",
                "title",
                "release_date",
                "overview",
                "poster_path",
                "original_language",
                "popularity",
                "genre_ids"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "release_date" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"("id", "title", "release_date")
            SELECT "id",
                "title",
                "release_date"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
    }
}
