'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const books = [];

    const [genres] = await queryInterface.sequelize.query(
      'SELECT id FROM genres',
    );

    const [authors] = await queryInterface.sequelize.query(
      'SELECT id FROM authors',
    );

    const [publishers] = await queryInterface.sequelize.query(
      'SELECT id FROM publishers',
    );

    for (let i = 0; i < 50; i++) {
      const author = faker.helpers.arrayElement(authors);

      const genre = faker.helpers.arrayElement(genres);

      const publisher = faker.helpers.arrayElement(publishers);

      books.push({
        title: faker.lorem.words(3),
        price: parseFloat(faker.commerce.price({ min: 10, max: 100 })),
        available: faker.datatype.boolean(),
        image_url: faker.image.urlPicsumPhotos({ width: 200, height: 300 }),
        authorId: author.id,
        genreId: genre.id,
        publisherId: publisher.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('books', books, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('books', null, {});
  },
};
