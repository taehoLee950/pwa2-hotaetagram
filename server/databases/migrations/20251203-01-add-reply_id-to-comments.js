"use strict";
import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("comments", "reply_id", {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: 0,
      comment: "대댓글 참조 ID",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("comments", "reply_id");
  },
};
