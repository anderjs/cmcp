'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'genres',
      [
        {
          name: 'Ficción',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Fantasía',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Terror',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Haruki Murakami',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Romance',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Thriller / Suspenso',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Drama',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Distopía',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('genres', null, {});
  },
};
