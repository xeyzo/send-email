'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Photos", [{
      caption: "lorem",
      url: "cloudinary.com/",
      contactId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      caption: "ipsum",
      url: "cloudinary.com/",
      contactId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      caption: "dolor",
      url: "cloudinary.com/",
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
    return queryInterface.bulkDelete("Photos", null, {})
  }
};
