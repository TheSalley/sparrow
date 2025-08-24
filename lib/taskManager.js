'use strict';

const { getUserPoints, updateUserPoints } = require('./db');

// 定时扣除积分的任务
const startDeductionTask = () => {
  // 每24小时执行一次
  setInterval(() => {
    try {
      // 获取当前积分
      const currentPoints = getUserPoints();
      
      // 扣除10分
      const newPoints = currentPoints - 10;
      
      // 更新积分
      updateUserPoints(newPoints);
      
      console.log(`积分已更新: ${currentPoints} -> ${newPoints}`);
    } catch (error) {
      console.error('定时扣除积分失败:', error);
    }
  }, 86400000); // 24 hours
};

module.exports = { startDeductionTask };