import { prisma } from "@/lib/prisma";
import Hero from "@/components/dashboard/Hero";

export default async function Home() {
  const portfolio = await prisma.project.findMany().then((res) =>
    res.map((item) => ({
      id: item.id,
      name: item.name,
      cover: item.cover ?? undefined,
      description: item.description ?? undefined,
      url: item.url ?? undefined,
    }))
  );

  const carousel = await prisma.carousel.findMany().then((res) =>
    res.map((item) => {
      return {
        desc: item.desc ?? undefined,
        path: item.path,
      };
    })
  );
  return <Hero carousel={carousel} portfolio={portfolio} />;
}
