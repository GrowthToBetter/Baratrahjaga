"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteCarousel(id: string) {
  await prisma.carousel.delete({ where: { id } });
  revalidatePath("/");
  return { success: true };
}

export async function getAllCarousel() {
  return await prisma.carousel.findMany();
}
export async function createOrUpdateCarousel(id: string, data: FormData) {
  const desc = data.get("desc") as string;
  const path = data.get("path") as string;
  if (id) {
    await prisma.carousel.update({
      where: { id },
      data: {
        desc,
        path,
      },
    });
  } else {
    await prisma.carousel.create({
      data: {
        desc,
        path,
      },
    });
  }
  revalidatePath("/");
  return { success: true };
}
export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  return { success: true };
}

export async function getAllProjects() {
  return await prisma.project.findMany();
}
export async function createOrUpdateProject(id: string, data: FormData) {
  const name = data.get("name") as string;
  const description = data.get("description") as string;
  const cover = data.get("image_url") as string;
  const url = data.get("url") as string;
  if (id) {
    await prisma.project.update({
      where: { id },
      data: {
        name,
        description,
        cover,
        url,
      },
    });
  } else {
    await prisma.project.create({
      data: {
        name,
        description,
        cover,
        url,
      },
    });
  }
  revalidatePath("/");
  return { success: true };
}
