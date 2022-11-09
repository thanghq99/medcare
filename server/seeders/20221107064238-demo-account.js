"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Accounts",
      [
        {
          firstName: "Thang",
          lastName: "Ha",
          email: "thang@email.com",
          phoneNumber: "0365498987",
          dob: "1999/04/02",
          address: "Trai Ca, Truong Dinh, HN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Thang 1",
          lastName: "Ha",
          email: "thang1@email.com",
          phoneNumber: "0365498111",
          dob: "1996/05/02",
          address: "Trai Ca, Truong Dinh, HN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Thang 2",
          lastName: "Ha",
          email: "thang2@email.com",
          phoneNumber: "0344498987",
          dob: "2000/04/02",
          address: "Trai Ca, Truong Dinh, HN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Thang 3",
          lastName: "Ha",
          email: "thang3@email.com",
          phoneNumber: "0365498987",
          dob: "1954/04/22",
          address: "Trai Ca, Truong Dinh, HN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Accounts", null, {});
  },
};
