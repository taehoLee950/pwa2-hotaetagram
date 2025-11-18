/**
 * @file databases/migrations/20251118-07-fk-posts-user_id.js
 * @description Add FK constraint on posts.user_id
 * 251118 v1.0.0 Lee init
 */

// 테이블 명
const tableName = "posts";

// Constraint 정의
const constraintName = "fk_posts_user_id";

// Constraint 정의
const options = {
  fields: ["user_id"],
  type: "foreign key",
  name: constraintName,
  references: {
    table: "users",
    field: "id",
  },
  onDelete: "CASCADE",
};
/** @type {import('sequelize-cli').Migration} */
export default {
  // migration 실행 시 호출되는 메소드 (스키마 생성, 수정)
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint(tableName, options);
  },

  // migration을 롤백 시 호출되는 메소드
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(tableName, constraintName);
  },
};
