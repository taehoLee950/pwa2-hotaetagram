/**
 * @file databases/migrations/20251118-01-create-notifications.js
 * @description notifications migration file
 * 251118 v1.0.0 Lee init
 */

import { DataTypes } from "sequelize";

// 테이블 명
const tableName = "notifications";

// 컬럼 정의
const attributes = {
  id: {
    field: "id",
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: "알림 PK",
  },
  userId: {
    // fk -> user table pk 참조
    field: "user_id",
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: "유저 PK",
  },
  title: {
    field: "title",
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: "알림 제목",
  },
  content: {
    field: "content",
    type: DataTypes.STRING(1000),
    allowNull: false,
    comment: "알림 내용",
  },
  isRead: {
    field: "is_read",
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: 0,
  },
  createdAt: {
    field: "created_at",
    type: DataTypes.DATE,
    allowNull: true,
  },
  updatedAt: {
    field: "updated_at",
    type: DataTypes.DATE,
    allowNull: true,
  },
  deletedAt: {
    field: "deleted_at",
    type: DataTypes.DATE,
    allowNull: true,
  },
};

// 옵션 설정
const options = {
  charset: "utf8mb4", // 테이블 문자셋 설정 (이모지 지원)
  collate: "utf8mb4_0900_ai_ci", // 기본 (영 대/소문자 구분 X)
  engine: "InnoDB", // 사용 엔진 설정
};

/** @type {import('sequelize-cli').Migration} */
export default {
  // migration 실행 시 호출되는 메소드 (스키마 생성, 수정)
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(tableName, attributes, options);
  },

  // migration을 롤백 시 호출되는 메소드
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(tableName);
  },
};
