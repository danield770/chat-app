import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const msg = await request.json();

    const post = await prisma.post.create({
      data: msg,
    });

    console.log({ post });

    return new NextResponse(JSON.stringify(post), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
