/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export default class  $npmConfigName1748942828705 {
    name = ' $npmConfigName1748942828705'

    async up(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS "movie"`);
        await queryRunner.query(`
        CREATE TABLE "movie" (
            "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
            "title" varchar NOT NULL,
            "release_date" varchar NOT NULL
        )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
    }
}
