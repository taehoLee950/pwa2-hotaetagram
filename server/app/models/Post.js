/**
 * @file app/models/Post.js
 * @description post model
 * 251120 v1.0.0 Lee init
 */

import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = "Post"; // 모델명(JS 내부에서 사용)

// 컬럼 정의
const attributes = {
  id: {
    field: "id",
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: "게시글 PK",
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
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: "게시글 제목",
  },
  content: {
    field: "content",
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: "게시글 내용",
  },
  image: {
    field: "image",
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null,
    comment: "게시글 이미지",
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

const Post = {
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  },
  associate: (db) => {
    db.Post.belongsTo(db.User, {
      targetKey: "id",
      foreignKey: "userId",
      as: "PostTable.user_id-belongsTo-User",
    });
    // 아래 2개 수정
    db.Post.hasMany(db.Like, {
      sourceKey: "id",
      foreignKey: "userId",
      as: "likes",
    });
    db.Post.belongsTo(db.User, {
      targetKey: "id",
      foreignKey: "userId",
      as: "author",
    });
  },
};

export default Post;
