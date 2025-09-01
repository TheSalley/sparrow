import PointsDisplay from '../../components/PointsDisplay';
import ActivityList from '../../components/ActivityList';
import AddActivityForm from '../../components/AddActivityForm';
import { getUserPoints, getActivities } from '../../../lib/db';

// 服务端获取数据
const getData = async () => {
  try {
    const points = await getUserPoints();
    const activities = await getActivities();
    console.log("@@@", activities,  points)
    return { points, activities };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return { points: 0, activities: [] };
  }
};

export default async function Home() {
  // 在服务端获取数据
  const { points, activities } = await getData();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">每日激励系统</h1>
          <PointsDisplay points={points} />
          {/* AddActivityForm需要保持客户端组件 */}
          <div className="w-full">
            <AddActivityForm />
          </div>
          <ActivityList activities={activities} />
        </div>
      </main>
    </div>
  );
}
