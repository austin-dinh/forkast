import { prisma } from "@/lib/db";

export async function getReservations() {
  return prisma.reservation.findMany({
    include: { table: true },
    orderBy: { date: "asc" },
  });
}