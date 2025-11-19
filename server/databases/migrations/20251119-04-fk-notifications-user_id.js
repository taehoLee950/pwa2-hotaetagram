/**
 * @file databases/migrations/20251119-04-fk-notifications-user_id
 * @description Add FK constraint on notifications.user_id
 * 251119 v1.0.0 Lee init
 */

// 테이블 명
const tableName = "notifications";

// Constraint 정의
const constraintName = "fk-notifications-user_id";

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
