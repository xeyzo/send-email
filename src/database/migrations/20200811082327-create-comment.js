'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      },
      photoId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Photos',
          key:'id',
          onDelete:'SET NULL',
          onUpdate:'SET NULL'
        }
      },
      contactId: {
        type:Sequelize.INTEGER,
        references:{
            model:'Users',
            key:'id',
            onDelete:'SET NULL',
            onUpdate:'SET NULL'
          }     
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  }
};