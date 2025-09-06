import { NextResponse } from 'next/server';
import { getUserPoints, updateUserPoints, addActivity, getActivities } from '../../../../lib/db';

// 获取用户积分和活动记录
export async function GET() {
  try {
    const points = await getUserPoints();
    const activities = await getActivities();
    return NextResponse.json({ points, activities });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

// 处理积分和活动相关操作
export async function POST(request) {
  try {
    const body = await request.json();
    const { action, points, activity } = body;
    
    switch (action) {
      case 'updatePoints':
        await updateUserPoints(points);
        return NextResponse.json({ success: true });
      
      case 'addActivity':
        await addActivity(activity, points);
        return NextResponse.json({ success: true });
      
      case 'deductPoints':
        // 扣除10分积分
        const currentPoints = await getUserPoints();
        const newPoints = Math.max(0, currentPoints - 10);
        await updateUserPoints(newPoints);
        await addActivity('扣除积分', -10);
        return NextResponse.json({ success: true, points: newPoints });
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to process request', details: error.message }, { status: 500 });
  }
}