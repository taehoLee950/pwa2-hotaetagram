/**
 * @file app/models/Notification.js
 * @description Notification model
 * 251120 v1.0.0 Lee init
 */

import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = "Notification"; // 모델명(JS 내부에서 사용)

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
  tableName: "posts", // 실제 테이블 명
  timeStamps: true, // createdAt, updatedAt,
  paranoid: true, // deletedAt 자동 관리
};

const Notification = {
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  },
  associate: (db) => {
    db.Notification.belongsTo(db.User, {
      targetKey: "id",
      foreignKey: "userId",
      as: "author",
    });
  },
};

export default Notification;
