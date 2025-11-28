/**
 * @file app/models/Comment.js
 * @description comment model
 * 251120 v1.0.0 Lee init
 */

import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = "comments";

// 컬럼 정의
const attributes = {
  id: {
    field: "id",
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: "코멘트 PK",
  },
  userId: {
    // fk -> user table pk 참조
    field: "user_id",
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: "유저 PK",
  },
  postId: {
    // fk -> posts table pk 참조
    field: "post_id",
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: "게시글 PK",
  },
  replyId: {
    // self fk (self join) -> this.pk 참조
    field: "post_id",
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: "게시글 PK",
  },
  content: {
    field: "content",
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: "코멘트 내용",
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
  tableName: "comments", // 실제 테이블 명
  timeStamps: true, // createdAt, updatedAt,
  paranoid: true, // deletedAt 자동 관리
};

const Comment = {
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  },
  associate: (db) => {
    db.Comment.belongsTo(db.User, {
      targetKey: "id",
      foreignKey: "userId",
      as: "author",
    });
    db.Comment.belongsTo(db.Post, {
      targetKey: "id",
      foreignKey: "postId",
      as: "commentsToPosts",
    });
  },
};

export default Comment;
