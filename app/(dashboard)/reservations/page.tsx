import { getReservations } from "@/lib/db/reservation";

const STATUS_BADGE: Record<string, string> = {
  pending: "badge-warning",
  confirmed: "badge-success",
  seated: "badge-info",
  completed: "badge-neutral",
  cancelled: "badge-error",
};

export default async function ReservationsPage() {
  const reservations = await getReservations();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Reservations</h1>
        <p className="text-base-content/60 mt-1">{reservations.length} total</p>
      </div>

      <div className="rounded-box border shadow-sm border-base-content/5 bg-base-100">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Guest</th>
              <th>Contact</th>
              <th>Party</th>
              <th>Date &amp; Time</th>
              <th>Table</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-base-content/50 py-12">
                  No reservations yet
                </td>
              </tr>
            ) : (
              reservations.map((r) => (
                <tr key={r.id}>
                  <td className="font-medium">{r.guestName}</td>
                  <td>
                    <div className="text-sm">{r.guestEmail}</div>
                    {r.guestPhone && (
                      <div className="text-sm text-base-content/60">{r.guestPhone}</div>
                    )}
                  </td>
                  <td>{r.partySize}</td>
                  <td className="whitespace-nowrap">
                    {new Date(r.date).toLocaleDateString("en-NZ", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    <div className="text-sm text-base-content/60">
                      {new Date(r.date).toLocaleTimeString("en-NZ", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>
                  <td>Table {r.table.number}</td>
                  <td>
                    <span className={`badge badge-soft badge-sm ${STATUS_BADGE[r.status] ?? "badge-ghost"}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="max-w-xs text-sm text-base-content/60 truncate">
                    {r.notes ?? "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
