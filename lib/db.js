'use strict';

import mysql from 'mysql2/promise';
import { startDeductionTask } from './taskManager';

// 创建数据库连接
const dbConfig = {
  host: '120.55.2.201',
  port: 3306,
  user: 'admin',
  password: 'admin123456',
  database: 'sparrow'
};

let connection;

const getConnection = async () => {
  if (!connection) {
    connection = await mysql.createConnection(dbConfig);
  }
  return connection;
};

// 获取用户积分
const getUserPoints = async () => {
  const conn = await getConnection();
  const [rows] = await conn.execute('SELECT point FROM points ORDER BY id DESC LIMIT 1');
  return rows.length > 0 ? rows[0].point : 0;
};

// 更新用户积分
const updateUserPoints = async (point) => {
  const conn = await getConnection();
  await conn.execute(
    `INSERT INTO points (point) VALUES (${point})`
  );
};

// 添加活动记录
const addActivity = async (activity, point) => {
  const conn = await getConnection();
  await conn.execute('INSERT INTO activities (activity, point) VALUES (?, ?)', [activity, point]);
};

// 获取活动记录
const getActivities = async () => {
  const conn = await getConnection();
  const [rows] = await conn.execute('SELECT activity, point, create_time FROM activities ORDER BY id DESC');
  return rows;
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