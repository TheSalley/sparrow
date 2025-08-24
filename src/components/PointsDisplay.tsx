'use client';

import React from 'react';

type PointsDisplayProps = {
  points: number;
};

const PointsDisplay: React.FC<PointsDisplayProps> = ({ points }) => {
  return (
    <div className="mb-4">
      <p className="text-lg">当前积分: <span className="font-bold">{points}</span></p>
      <p className="text-sm text-gray-500">每天自动扣除10点</p>
    </div>
  );
};

export default PointsDisplay;