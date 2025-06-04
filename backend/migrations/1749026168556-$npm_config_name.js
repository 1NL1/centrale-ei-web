/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export default class  $npmConfigName1749026168556 {
    name = ' $npmConfigName1749026168556'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "movie" (
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
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
    }
}
