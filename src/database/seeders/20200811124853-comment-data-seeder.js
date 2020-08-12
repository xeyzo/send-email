'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Comments", [{
      content: "lorem ipsum",
      photoId: 1,
      contactId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      content: "lorem ipsum",
      photoId: 2,
      contactId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      content: "lorem ipsum",
      photoId: 3,
      contactId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Comments", null, {})
  }
};
