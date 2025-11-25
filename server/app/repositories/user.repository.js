/**
 * @file app/repositories/user.repository.js
 * @description User Repository
 * 251120 v1.0.0 Lee init
 */

import db from "../models/index.js";
const { User } = db;

/**
 * 이메일로 유저 검색
 * @param {import('sequelize').Transaction} t
 * @param {string} email
 * @returns
 */

// DB (User 모델)에 접근하여 상호 작용하는 계층
// 이메일 기준으로 조회
async function findByEmail(t = null, email) {
  // SELECT * FROM users WHERE email = ? AND deleted_at IS NULL;
  return await User.findOne(
    // findOne으로 해당 이메일을 가진 유저를 조회
    {
      where: {
        email: email,
      },
    },
    {
      transaction: t, // 트랜잭션 인자를 받음.
    }
  );
}

/**
 * 유저 모델 인스턴스로 save 처리
 * @param {import('sequelize').Transaction} t
 * @param {import('../models/index.js').User} user
 * @returns
 */
async function save(t = null, user) {
  return await user.save({ transaction: t });
}

export default {
  findByEmail,
  save,
};
