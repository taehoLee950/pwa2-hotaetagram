/**
 * @file app/models/User.js
 * @description user model
 * 251120 v1.0.0 Lee init
 */

import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = "User"; // 모델명(JS 내부에서 사용)

// 컬럼 정의
const attributes = {
  id: {
    field: "id",
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: "유저 PK",
  },
  email: {
    field: "email",
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    field: "password",
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: "비밀번호",
  },
  nick: {
    field: "nick",
    type: DataTypes.STRING(15), // 가변길이 VARCHAR
    allowNull: false,
    unique: true,
  },
  provider: {
    field: "provider",
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: "로그인 제공자(NONE, KAKAO, GOOGLE",
  },
  role: {
    field: "role",
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: "유저 권한(NORMAL, SUPER...)",
  },
  profile: {
    field: "profile",
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: "유저 프로필",
  },
  refreshToken: {
    field: "refresh_token",
    type: DataTypes.STRING(),
    comment: "리프래시 토큰",
  },
  createdAt: {
    field: "created_at",
    type: DataTypes.DATE,
    allowNull: true,
    get() {
      const val = this.getDataValue("createdAt");
      if (!val) {
        return null;
      }
      return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  updatedAt: {
    field: "updated_at",
    type: DataTypes.DATE,
    allowNull: true,
    get() {
      const val = this.getDataValue("updatedAt");
      if (!val) {
        return null;
      }
      return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  deletedAt: {
    field: "deleted_at",
    type: DataTypes.DATE,
    allowNull: true,
    get() {
      const val = this.getDataValue("deletedAt");
      if (!val) {
        return null;
      }
      return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
    },
  },
};

const options = {
  tableName: "users", // 실제 테이블 명
  timeStamps: true, // createdAt, updatedAt,
  paranoid: true, // deletedAt 자동 관리
};

const User = {
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    // JSON으로 SERIALIZE시, 제외할 컬럼을 지정
    define.prototype.toJSON = function () {
      const attributes = this.get();
      delete attributes.password;
      delete attributes.refreshToken;
      return attributes;
    };

    return define;
  },
  associate: (db) => {
    db.User.hasMany(db.Post, {
      sourceKey: "id",
      foreignkEY: "userId",
      as: "userTable.id-hasMany-Post",
    });
  },
};

export default User;
