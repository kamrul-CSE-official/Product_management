import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Comment from '@/models/comments';

// Utility to handle errors uniformly
const handleError = (error: unknown) => {
  console.error('[API ERROR]:', error);
  return NextResponse.json({ success: false, message: 'Something went wrong', error }, { status: 400 });
};

// GET: Retrieve a single comment by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const comment = await Comment.findById(params.id).populate('userId', 'name image');

    if (!comment) {
      return NextResponse.json({ success: false, message: 'Comment not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: comment }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

// PUT: Update a comment by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const body = await req.json();

    const updatedComment = await Comment.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedComment) {
      return NextResponse.json({ success: false, message: 'Comment not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedComment }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

// DELETE: Remove a comment by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const deletedComment = await Comment.findByIdAndDelete(params.id);

    if (!deletedComment) {
      return NextResponse.json({ success: false, message: 'Comment not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Comment deleted successfully' }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}
