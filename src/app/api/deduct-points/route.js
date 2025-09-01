import { NextResponse } from 'next/server';
import { getUserPoints, updateUserPoints } from '../../../../lib/db';

// 定时扣除积分
export async function POST() {
  try {
    // 获取当前积分
    const currentPoints = await getUserPoints();
    
    // 扣除30分
    const newPoints = currentPoints - 30;
    
    // 更新积分
    await updateUserPoints(newPoints);
    
    return NextResponse.json({ success: true, points: newPoints });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to deduct points' }, { status: 500 });
  }
}