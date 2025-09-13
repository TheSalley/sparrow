'use strict';

import mysql from 'mysql2/promise';

// 数据库配置
const dbConfig = {
  host: '120.55.2.201',
  port: 3306,
  user: 'admin',
  password: 'admin123456',
  database: 'sparrow'
};

// 数据库连接实例
let connection;

/**
 * 获取数据库连接
 * @returns {Promise<Object>} 数据库连接对象
 */
const getConnection = async () => {
  // 检查连接是否有效
  if (!connection || !connection.connection || connection.connection.stream.destroyed) {
    try {
      connection = await mysql.createConnection(dbConfig);
    } catch (error) {
      console.error('Database connection error:', error);
      throw new Error('Failed to connect to database');
    }
  }
  
  // 检查连接状态
  if (connection.connection && connection.connection.state === 'disconnected') {
    try {
      await connection.connect();
    } catch (error) {
      console.error('Database reconnect error:', error);
      // 如果重连失败，创建新连接
      connection = await mysql.createConnection(dbConfig);
    }
  }
  
  return connection;
};

/**
 * 获取用户积分
 * @returns {Promise<number>} 用户积分
 */
const getUserPoints = async () => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT point FROM points ORDER BY id DESC LIMIT 1');
    return rows.length > 0 ? rows[0].point : 0;
  } catch (error) {
    console.error('Error in getUserPoints:', error);
    // 如果是连接错误，尝试重新连接
    if (error.code === 'ECONNRESET' || error.code === 'EPIPE' || error.code === 'ECONNREFUSED') {
      connection = null; // 清除旧连接
      const conn = await getConnection(); // 重新连接
      const [rows] = await conn.execute('SELECT point FROM points ORDER BY id DESC LIMIT 1');
      return rows.length > 0 ? rows[0].point : 0;
    }
    throw error;
  }
};

/**
 * 更新用户积分
 * @param {number} point - 积分值
 * @returns {Promise<void>}
 */
const updateUserPoints = async (point) => {
  // 验证积分值范围
  if (point < 0 || point > 2147483647) {
    throw new Error('Point value out of range');
  }
  
  try {
    const conn = await getConnection();
    await conn.execute(
      'INSERT INTO points (point, label, create_time) VALUES (?, ?, CURRENT_TIMESTAMP) ON DUPLICATE KEY UPDATE point = ?, create_time = CURRENT_TIMESTAMP',
      [point, '更新积分', point]
    );
  } catch (error) {
    console.error('Error in updateUserPoints:', error);
    // 如果是连接错误，尝试重新连接
    if (error.code === 'ECONNRESET' || error.code === 'EPIPE' || error.code === 'ECONNREFUSED') {
      connection = null; // 清除旧连接
      const conn = await getConnection(); // 重新连接
      await conn.execute(
        'INSERT INTO points (point, label, create_time) VALUES (?, ?, CURRENT_TIMESTAMP) ON DUPLICATE KEY UPDATE point = ?, create_time = CURRENT_TIMESTAMP',
        [point, '更新积分', point]
      );
      return;
    }
    throw error;
  }
};

/**
 * 添加活动记录
 * @param {string} activity - 活动描述
 * @param {number} point - 积分值
 * @returns {Promise<void>}
 */
const addActivity = async (activity, point) => {
  // 验证积分值范围
  if (point < -2147483648 || point > 2147483647) {
    throw new Error('Point value out of range');
  }
  
  try {
    const conn = await getConnection();
    await conn.execute('INSERT INTO activities (activity, point, create_time) VALUES (?, ?, CURRENT_TIMESTAMP)', [activity, point]);
  } catch (error) {
    console.error('Error in addActivity:', error);
    // 如果是连接错误，尝试重新连接
    if (error.code === 'ECONNRESET' || error.code === 'EPIPE' || error.code === 'ECONNREFUSED') {
      connection = null; // 清除旧连接
      const conn = await getConnection(); // 重新连接
      await conn.execute('INSERT INTO activities (activity, point, create_time) VALUES (?, ?, CURRENT_TIMESTAMP)', [activity, point]);
      return;
    }
    throw error;
  }
};

/**
 * 获取活动记录
 * @returns {Promise<Array>} 活动记录列表
 */
const getActivities = async () => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT activity, point, create_time FROM activities ORDER BY id DESC');
    return rows;
  } catch (error) {
    console.error('Error in getActivities:', error);
    // 如果是连接错误，尝试重新连接
    if (error.code === 'ECONNRESET' || error.code === 'EPIPE' || error.code === 'ECONNREFUSED') {
      connection = null; // 清除旧连接
      const conn = await getConnection(); // 重新连接
      const [rows] = await conn.execute('SELECT activity, point, create_time FROM activities ORDER BY id DESC');
      return rows;
    }
    throw error;
  }
};

// 导出函数
export {
  getUserPoints,
  updateUserPoints,
  addActivity,
  getActivities
};