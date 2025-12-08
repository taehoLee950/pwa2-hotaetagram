/**
 * @file routes/posts.router.js
 * @description 구독 관련 리포지토리
 * 251208 v1.0.0 Lee init
 */

import db from "../models/index.js";
const { Push_subscription } = db;

async function upsert(t = null, data) {
  return await Push_subscription.upsert(data, { transaction: t });
}

export default {
  upsert,
};
