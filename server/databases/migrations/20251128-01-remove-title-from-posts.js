/**
 * @file databases/migrations/20251128-01-remove-title-from-posts.js
 * @description alter-posts-title migration file
 * 251128 v1.0.0 Lee init
 */

"use strict";

import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  // 마이그레이션 실행 시 호출됨
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "posts", // 테이블명
      "title" // 추가할 컬럼명
    );
  },

  // 마이그레이션 롤백 시 호출됨
  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("posts", "title", {
      // 추가할 컬럼 속성
      field: "title",
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "게시글 제목",
    });
  },
};
