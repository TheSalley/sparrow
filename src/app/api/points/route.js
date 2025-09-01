import { NextResponse } from 'next/server';
import { getUserPoints, updateUserPoints, addActivity, getActivities } from '../../../../lib/db';

// 获取用户积分
export async function GET() {
  try {
    const points = await getUserPoints();
    const activities = await getActivities();
    return NextResponse.json({ points, activities });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch points' }, { status: 500 });
  }
}

// 更新用户积分或添加活动
export async function POST(request) {
  try {
    const body = await request.json();
    const { action, points, activity } = body;
    
    if (action === 'updatePoints') {
      await updateUserPoints(points);
      return NextResponse.json({ success: true });
    }
    
    if (action === 'addActivity') {
      await addActivity(activity, points);
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update points' }, { status: 500 });
  }
}