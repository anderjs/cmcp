'use strict';
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const exists = await queryInterface.rawSelect(
      'users',
      {
        where: { email: 'admin@cmcp.com' },
      },
      ['id']
    );

    if (!exists) {
      await queryInterface.bulkInsert(
        'users',
        [
          {
            name: 'cmcp',
            email: 'admin@cmcp.com',
            password: bcrypt.hashSync("admincmcp", 10),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
