/**
 * @file databases/seeders/dummy-users-seeder.js
 * @description users dummy table create
 * 251118 v1.0.0 Lee init
 */
import bcrypt from "bcrypt"; // 보안 해싱

// 테이블명
const tableName = "users";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      {
        email: "admin@admin.com",
        password: await bcrypt.hash("admin", 10),
        nick: "이태호관리자",
        provider: "NONE",
        role: "SUPER",
        profile: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "admin2@admin.com",
        password: await bcrypt.hash("qwe123s", 10),
        nick: "이태호관리자2",
        provider: "KAKAO",
        role: "NORMAL",
        profile: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    // 데이터 생성
    await queryInterface.bulkInsert(tableName, records);
  },

  async down(queryInterface, Sequelize) {
    // 데이터 삭제
    await queryInterface.bulkDelete(tableName, null, {});
  },
};
