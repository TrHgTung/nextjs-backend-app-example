import { NextResponse } from "next/server";
import { getAllPosts, createPost } from "@/controllers/postController";

// GET /api/posts
export async function GET() {
  const posts = await getAllPosts();
  // return NextResponse.json(posts);
  return NextResponse.json(posts, {
    headers: {
      "Access-Control-Allow-Origin": "*", // hoặc chỉ domain frontend, ví dụ "http://localhost:3000"
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

// Xử lý preflight OPTIONS request
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

// POST /api/posts
export async function POST(request: Request) {
  const body = await request.json();
  const { title, content, slug } = body;

  if (!title || !content) {
    return NextResponse.json(
      { error: "Missing title or content" },
      { status: 400 }
    );
  }

  const newPost = await createPost({ title, content, slug });
  return NextResponse.json(newPost, { status: 201 });
}
