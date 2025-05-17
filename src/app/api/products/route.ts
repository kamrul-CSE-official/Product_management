import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import products from '@/models/products';


const PAGE_SIZE = 10;

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const skip = (page - 1) * PAGE_SIZE;

    const total = await products.countDocuments();
    const totalPages = Math.ceil(total / PAGE_SIZE);

    const allProducts = await products.find({})
      .skip(skip)
      .limit(PAGE_SIZE)
      .sort({ createdAt: -1 }); // Optional: sort newest first

    return NextResponse.json(
      {
        success: true,
        data: allProducts,
        pagination: {
          total,
          totalPages,
          currentPage: page,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}


export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const product = await products.create(body);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
