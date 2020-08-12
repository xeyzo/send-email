'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [{
      username: "john",
      password: "$2b$10$lTwSdJZyPEUfb30U06Ut5ek8d7qJSOn.M418miZw/HkNSzzHgebDG", //12345
      email: "johnmail@com",
      fullname: "John Doe",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: "sam",
      password: "$2b$10$lTwSdJZyPEUfb30U06Ut5ek8d7qJSOn.M418miZw/HkNSzzHgebDG", //12345
      email: "sammail@com",
      fullname: "sam Doe",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: "due",
      password: "$2b$10$lTwSdJZyPEUfb30U06Ut5ek8d7qJSOn.M418miZw/HkNSzzHgebDG", //12345
      email: "duemail@com",
      fullname: "Due Doe",
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
    return queryInterface.bulkDelete("Users", null, {})
  }
};
