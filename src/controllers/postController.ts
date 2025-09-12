import { prisma } from "@/lib/prisma";

export async function getAllPosts() {
  return prisma.post.findMany({
    orderBy: { id: "desc" },
  });
}

// export async function getPostById(id: number) {
//   return prisma.post.findUnique({ where: { id } });
// }

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({ where: { slug } });
}

export async function createPost(data: { title: string; slug: string; content: string }) {
  return prisma.post.create({ data });
}

export async function updatePost(
  id: number,
  data: { title?: string; slug?: string; content?: string }
) {
  return prisma.post.update({
    where: { id },
    data,
  });
}

export async function deletePost(id: number) {
  return prisma.post.delete({
    where: { id },
  });
}
