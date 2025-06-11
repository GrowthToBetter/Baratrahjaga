/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";
import { userGetPayload } from "@/utils/relationship";

export function ProfileHeader({ user }: { user: userGetPayload }) {
  // Logika validasi status berdasarkan supplier
  let status = "";

  if (user.supplier) {
    if (user.supplier.member) {
      status = "VERIFIED";
    } else {
      status = "PENDING";
    }
  }

  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <h2 className="text-xl font-semibold">Profil Umum</h2>
        <p>
          <strong>Nama:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Alamat:</strong> {user.address ?? "Belum diisi"}
        </p>
        <p>
          <strong>Peran:</strong> {user.role}
        </p>

        {user.supplier && (
          <p>
            <strong>Status Supplier:</strong>{" "}
            <span
              className={
                status === "PENDING" ? "text-yellow-500" : "text-green-600"
              }>
              {status}
            </span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
