'use strict';

import mysql from 'mysql2/promise';

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
    'INSERT INTO points (point, label, create_time) VALUES (?, ?, CURRENT_TIMESTAMP) ON DUPLICATE KEY UPDATE point = ?, create_time = CURRENT_TIMESTAMP',
    [point, '更新积分', point]
  );
};

// 添加活动记录
const addActivity = async (activity, point) => {
  const conn = await getConnection();
  await conn.execute('INSERT INTO activities (activity, point, create_time) VALUES (?, ?, CURRENT_TIMESTAMP)', [activity, point]);
};

// 获取活动记录
const getActivities = async () => {
  const conn = await getConnection();
  const [rows] = await conn.execute('SELECT activity, point, create_time FROM activities ORDER BY id DESC');
  return rows;
};

export {
  getUserPoints,
  updateUserPoints,
  addActivity,
  getActivities
};