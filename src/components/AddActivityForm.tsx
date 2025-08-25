'use client';

import React, { useState } from 'react';

const AddActivityForm: React.FC = () => {
  const [newActivity, setNewActivity] = useState<string>("");
  const [newPoints, setNewPoints] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newActivity && newPoints) {
      try {
        // 发送活动记录到服务器
        await fetch('/api/points', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            action: 'addActivity', 
            activity: newActivity, 
            points: newPoints 
          }),
        });
        
        // 页面重新加载以显示更新后的数据
        window.location.reload();
      } catch (error) {
        console.error('Failed to add activity:', error);
      }
      
      setNewActivity("");
      setNewPoints(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={newActivity}
        onChange={(e) => setNewActivity(e.target.value)}
        placeholder="今天做了什么"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="number"
        value={newPoints}
        onChange={(e) => setNewPoints(Number(e.target.value))}
        placeholder="获得的积分"
        className="w-full p-2 border rounded"
      />
      <button 
        type="submit"
        className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        添加
      </button>
    </form>
  );
};

export default AddActivityForm;