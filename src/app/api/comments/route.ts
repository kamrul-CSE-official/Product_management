import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import comments from '@/models/comments';




export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const { productId, userId, userName, userImage, comment } = body;

    if (!productId || !userId || !userName || !comment) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newComment = await comments.create({
      productId,
      userId,
      userName,
      userImage,
      comment,
    });

    return NextResponse.json({ success: true, data: newComment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
