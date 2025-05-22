'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'publishers',
      [
        {
          name: 'Ediciones B',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'HarperCollins',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Anagrama',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'RBA Libros',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Editorial Norma',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Tusquets Editores',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('publishers', null, {});
  },
};
