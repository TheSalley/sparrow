'use client';

import React from 'react';

type PointsDisplayProps = {
  points: number;
};

const PointsDisplay: React.FC<PointsDisplayProps> = ({ points }) => {
  const handleDeductPoints = async () => {
    try {
      const response = await fetch('/api/points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'deductPoints' }),
      });
      
      if (response.ok) {
        // 重新加载页面以显示更新后的积分
        window.location.reload();
      } else {
        console.error('Failed to deduct points');
      }
    } catch (error) {
      console.error('Error deducting points:', error);
    }
  };

  return (
    <div className="mb-4">
      <p className="text-lg">当前积分: <span className="font-bold">{points}</span></p>
      <p className="text-sm text-gray-500">每天自动扣除10点</p>
      <button 
        onClick={handleDeductPoints}
        className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
      >
        手动扣除10分
      </button>
    </div>
  );
};

export default PointsDisplay;