/**
 * @file databases/migrations/20251118-06-alter-notifications-is_read.js
 * @description alter-notifications-is_read migration file
 * 251118 v1.0.0 Lee init
 */

import { DataTypes } from "sequelize";

// 테이블 명
const tableName = "notifications";

// 수정할 키 명
const key = "is_read";

// 수정될 컬럼 정의
const upAttributes = {
  type: DataTypes.BOOLEAN,
  allowNull: false,
  defaultValue: false,
  comment: "읽음 여부",
};

// 롤백용 기존 컬럼
const downAttributes = {
  type: DataTypes.TINYINT(1),
  allowNull: false,
  defaultValue: 0,
  comment: "읽음 여부",
};

// 옵션 설정
const options = {};

/** @type {import('sequelize-cli').Migration} */
export default {
  // migration 실행 시 호출되는 메소드 (스키마 생성, 수정)
  async up(queryInterface, Sequelize) {
    // 컬럼 수정 (changeColumn)
    await queryInterface.changeColumn(tableName, key, upAttributes);
  },

  // migration을 롤백 시 호출되는 메소드
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn(tableName, key, downAttributes);
  },
};
