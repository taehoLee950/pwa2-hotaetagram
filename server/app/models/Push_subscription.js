/**
 * @file app/models/Push_subscription.js
 * @description Push_subscription model
 * 251120 v1.0.0 Lee init
 */

import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = "push_subscriptions";

// 컬럼 정의
const attributes = {
  id: {
    field: "id",
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: "푸쉬구독 PK",
  },
  userId: {
    // fk -> user table pk 참조
    field: "user_id",
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: "유저 PK",
  },
  endpoint: {
    field: "endpoint",
    type: DataTypes.STRING(500),
    allowNull: false,
    unique: true,
    comment: "엔드포인트",
  },
  p256dh: {
    field: "p256dh",
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: "공개키",
  },
  auth: {
    field: "auth",
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: "인증키",
  },
  device: {
    field: "device",
    type: DataTypes.STRING(500),
    allowNull: false,
    comment: "디바이스",
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

// 옵션 설정
const options = {
  tableName: "push_subscriptions", // 실제 테이블 명
  timeStamps: true, // createdAt, updatedAt,
  paranoid: true, // deletedAt 자동 관리
};

const Push_subscription = {
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  },
  associate: (db) => {
    db.Push_subscription.belongsTo(db.User, {
      targetKey: "id",
      foreignKey: "userId",
      as: "author",
    });
  },
};

export default Push_subscription;
