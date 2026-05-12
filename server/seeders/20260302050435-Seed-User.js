'use strict';
const bcrypt = require("bcryptjs")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      username: 'admin',
      email: 'admin@email.com',
      password: bcrypt.hashSync('admin123', 8),
      role: 'Admin',
      phoneNumber: "08183249182",
      address: "Jalan Setiabudi nomor 2, Tangerang, Banten, Indonseia",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: 'staff',
      email: 'staff@email.com',
      password: bcrypt.hashSync('staff123', 8),
      role: 'Staff',
      phoneNumber: "08183249165",
      address: "Jalan Setiabudi nomor 3, Tangerang, Banten, Indonseia",
      createdAt: new Date(),
      updatedAt: new Date()
    }],
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
