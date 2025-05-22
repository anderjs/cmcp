'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, { DataTypes }) {
    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_audit_logs_type" AS ENUM (
        'CREATE',
        'UPDATE',
        'DELETE',
        'RESTORE',
        'SOFT_DELETE'
      );
    `);

    await queryInterface.createTable('audit_logs', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      action: {
        type: DataTypes.STRING,
      },
      type: {
        type: 'enum_audit_logs_type',
        allowNull: false,
      },
      entity: {
        type: DataTypes.STRING,
      },
      entityId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      metadata: {
        type: DataTypes.JSONB,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('audit_logs');

    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_audit_logs_type";`);
  },
};