'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      CREATE EXTENSION IF NOT EXISTS pg_trgm;
    `);

    await queryInterface.sequelize.query(`
      CREATE INDEX books_title_trgm_idx
      ON "books" USING gin ("title" gin_trgm_ops);
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      DROP INDEX IF EXISTS books_title_trgm_idx;
    `);
  },
};
