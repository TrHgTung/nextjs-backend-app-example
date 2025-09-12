import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/posts -> lấy danh sách bài viết
export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" }
  });
  return Response.json(posts);
}

// POST /api/posts -> tạo bài viết mới
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title || !body.content) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return Response.json(post);
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
