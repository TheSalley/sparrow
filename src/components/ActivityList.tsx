'use client';

import React from 'react';

type Activity = {
  activity: string;
  point: number;
};

type ActivityListProps = {
  activities: Activity[];
};

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">活动记录</h2>
      {activities.length > 0 ? (
        <ul className="space-y-2">
          {activities.map((activity, index) => (
            <li key={index} className="flex justify-between">
              <span>{activity.activity}</span>
              <span className="text-green-500">+{activity.point}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">暂无记录</p>
      )}
    </div>
  );
};

export default ActivityList;