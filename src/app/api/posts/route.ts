import { NextResponse } from "next/server";
import { getAllPosts, createPost } from "@/controllers/postController";

// GET /api/posts
export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json(posts);
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
