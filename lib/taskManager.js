'use strict';

import cron from 'node-cron';
import { getUserPoints, updateUserPoints } from './db';

// 定时扣除积分的任务
const startDeductionTask = () => {
  // 每天午夜执行 (0 0 0 * * *)
  cron.schedule('0 0 0 * * *', async () => {
    try {
      console.log('开始执行每日积分扣除任务');
      
      // 获取当前积分
      const currentPoints = await getUserPoints();
      
      // 扣除10分
      const newPoints = Math.max(0, currentPoints - 10); // 确保积分不会为负
      
      // 更新积分
      await updateUserPoints(newPoints);
      
      console.log(`积分已更新: ${currentPoints} -> ${newPoints}`);
    } catch (error) {
      console.error('定时扣除积分失败:', error);
    }
  });
  
  console.log('每日积分扣除任务已安排，将在每天午夜执行');
};

export { startDeductionTask };