'use strict';

import Database from 'better-sqlite3';
import path from 'path';
import { startDeductionTask } from './taskManager';

// 创建数据库连接
const dbPath = path.join(process.cwd(), 'sparrow.db');
const db = new Database(dbPath);

// 获取用户积分
const getUserPoints = () => {
  const stmt = db.prepare('SELECT points FROM points ORDER BY id DESC LIMIT 1');
  const result = stmt.get();
  return result ? result.points : 0;
};

// 更新用户积分
const updateUserPoints = (points) => {
  const stmt = db.prepare(
    'INSERT INTO points (points) VALUES (?) ON CONFLICT(id) DO UPDATE SET points = ?, updated_at = CURRENT_TIMESTAMP'
  );
  stmt.run(points, points);
};

// 添加活动记录
const addActivity = (activity, points) => {
  const stmt = db.prepare('INSERT INTO activities (activity, points) VALUES (?, ?)');
  stmt.run(activity, points);
};

// 获取活动记录
const getActivities = () => {
  const stmt = db.prepare('SELECT activity, points, created_at FROM activities ORDER BY created_at DESC');
  return stmt.all();
};

// 初始化定时任务
const initializeScheduledTasks = () => {
  // 启动积分扣除任务
  startDeductionTask();
  console.log('定时任务已初始化');
};

// 应用启动时初始化定时任务
initializeScheduledTasks();

export {
  getUserPoints,
  updateUserPoints,
  addActivity,
  getActivities
};