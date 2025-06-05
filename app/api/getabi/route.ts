import { NextResponse } from 'next/server';
import { mockAbi } from '../mock';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json(
        { error: 'Address parameter is required' },
        { status: 400 }
      );
    }

    // 这里可以添加从区块链浏览器或其他来源获取 ABI 的逻辑
    // 目前返回一个示例 ABI
    const data = mockAbi[address as keyof typeof mockAbi]

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching ABI:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ABI' },
      { status: 500 }
    );
  }
} 