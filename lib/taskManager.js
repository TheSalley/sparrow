'use strict';

import { getUserPoints, updateUserPoints } from './db';

// 定时扣除积分的任务
const startDeductionTask = () => {
  // 计算到下一个执行时间的延迟
  const calculateDelay = () => {
    const now = new Date();
    const nextRun = new Date();
    nextRun.setHours(0, 0, 0, 0); // 设置为今天的午夜
    nextRun.setDate(nextRun.getDate() + 1); // 设置为明天的午夜
    
    // 计算到明天午夜的毫秒数
    return nextRun.getTime() - now.getTime();
  };
  
  // 执行积分扣除任务
  const executeDeductionTask = () => {
    try {
      // 获取当前积分
      const currentPoints = getUserPoints();
      
      // 扣除10分
      const newPoints = currentPoints - 10;
      
      // 更新积分
      updateUserPoints(newPoints);
      
      console.log(`积分已更新: ${currentPoints} -> ${newPoints}`);
      
      // 安排下一次执行
      scheduleNextTask();
    } catch (error) {
      console.error('定时扣除积分失败:', error);
      // 即使出错也安排下一次执行
      scheduleNextTask();
    }
  };
  
  // 安排下一次任务执行
  const scheduleNextTask = () => {
    const delay = calculateDelay();
    setTimeout(executeDeductionTask, delay);
    console.log(`下次积分扣除任务将在 ${delay} 毫秒后执行`);
  };
  
  // 启动任务
  scheduleNextTask();
};

export { startDeductionTask };