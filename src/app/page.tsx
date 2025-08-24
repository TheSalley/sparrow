'use client';
import { useState, useEffect } from "react";
import PointsDisplay from '../components/PointsDisplay';
import ActivityList from '../components/ActivityList';
import AddActivityForm from '../components/AddActivityForm';

export default function Home() {
  const [points, setPoints] = useState<number>(0);
  const [activities, setActivities] = useState<Array<{activity: string, points: number}>>([]);

  // 获取服务器端积分和活动记录
  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await fetch('/api/points');
        const data = await response.json();
        console.log('@@@', data)
        setPoints(data.points);
        setActivities(data.activities || []);
      } catch (error) {
        console.error('Failed to fetch points:', error);
      }
    };

    fetchPoints();
  }, []);

  const handleAddActivity = async (activity: string, activityPoints: number) => {
    const activityData = { activity, points: activityPoints };
    setActivities([...activities, activityData]);
    const updatedPoints = points + activityPoints;
    setPoints(updatedPoints);
    
    // 发送活动记录到服务器
    try {
      await fetch('/api/points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'addActivity', 
          activity, 
          points: activityPoints 
        }),
      });
      
      // 更新积分
      await fetch('/api/points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'updatePoints', points: updatedPoints }),
      });
    } catch (error) {
      console.error('Failed to add activity:', error);
    }
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">每日激励系统</h1>
          <PointsDisplay points={points} />
          <AddActivityForm onAddActivity={handleAddActivity} />
          <ActivityList activities={activities} />
        </div>
      </main>
    </div>
  );
}
