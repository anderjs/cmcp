'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'authors',
      [
        {
          name: 'Gabriel García Márquez',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Isabel Allende',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Mario Vargas Llosa',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Haruki Murakami',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'J.K. Rowling',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Ernest Hemingway',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Jane Austen',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Stephen King',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Julio Cortázar',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('authors', null, {});
  },
};
