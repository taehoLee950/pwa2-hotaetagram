/**
 * @file app/repositories/user.repository.js
 * @description User Repository
 * 251120 v1.0.0 Lee init
 */

import db from "../models/index.js";
import { Op } from "sequelize"; // Op를 직접 import
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

/**
 * 유저 id로 조회
 * @param {import('sequelize').Transaction} t
 * @param {number} id
 * @returns {Promise<ImportAttributes("../models/User.js").User}
 */
async function findByPk(t = null, id) {
  return await User.findByPk(id, { transaction: t });
}

async function create(t = null, data) {
  return await User.create(data, { transaction: t });
}

async function logout(t = null, id) {
  return await User.update(
    {
      refreshToken: null,
    },
    {
      where: {
        id: id, // column : param id
      },
      transaction: t,
    }
  );
  // 특정 유저 리프래시토큰 null로 갱신
  // UPDATE users SET refresh_token = null, updated_at = NOW() WHERE id = ?
}

// 이메일 & 닉네임 조회 한번에
async function findByEmailOrNick(t = null, { email, nick }) {
  return await User.findOne({
    where: {
      [Op.or]: [{ email }, { nick }],
    },
    transaction: t,
  });
}

export default {
  findByEmail,
  save,
  findByPk,
  create,
  logout,
  findByEmailOrNick,
};
