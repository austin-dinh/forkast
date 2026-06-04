import { prisma } from "@/lib/db";

export default async function TablesPage() {
  const tables = await prisma.table.findMany({
    orderBy: { number: "asc" },
    include: {
      _count: { select: { reservations: true } },
    },
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Tables</h1>
        <p className="text-base-content/60 mt-1">{tables.length} tables</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`card card-border bg-base-100 shadow-sm card-sm ${!table.isActive && "opacity-60"}`}
          >
            <div className="card-body gap-3">
              <div className="flex items-start justify-between">
                <span className="text-3xl font-bold">{table.number}</span>
                <span className={`badge badge-outline badge-sm ${table.isActive ? "badge-success" : "badge-ghost"}`}>
                  {table.isActive ? "active" : "inactive"}
                </span>
              </div>
              <div className="divider my-0" />
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-base-content/60">Capacity</span>
                  <span className="font-medium">{table.capacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/60">Reservations</span>
                  <span className="font-medium">{table._count.reservations}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
