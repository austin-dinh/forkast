import { prisma } from "@/lib/db";

export async function getTables() {
  return prisma.table.findMany({
    orderBy: { number: "asc" },
    include: {
      _count: { select: { reservations: true } },
    },
  });
}