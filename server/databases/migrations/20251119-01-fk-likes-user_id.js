/**
 * @file databases/migrations/20251119-01-fk-likes-user_id
 * @description Add FK constraint on likes.user_id
 * 251119 v1.0.0 Lee init
 */

// 테이블 명
const tableName = "likes";

// Constraint 정의
const constraintName = "fk_likes-user_id"; // constraint(FK)-table-column

// Constraint 정의
const options = {
  fields: ["user_id"], // FK 부여할 컬럼
  type: "foreign key", // constraint 종류
  name: constraintName, // constraint명 지정
  references: {
    table: "users", // 참조할 테이블
    field: "id", // 참조 테이블 컬럼
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
