"use client";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { PembeliInfo } from "@/components/profile/PembeliInfo";
import { SupplierImageUpdateForm } from "@/components/profile/SupplierProfileForm";
import { FruitList } from "@/components/profile/FruitList";
import { AddFruitForm } from "@/components/profile/AddFruitForm";
import { userGetPayload } from "@/utils/relationship";

export default function ProfilePage({ user }: { user: userGetPayload }) {

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <ProfileHeader user={user} />

      {user?.role === "Pembeli" && <PembeliInfo />}

      {user?.role === "Supplier" && (
        <>
          <SupplierImageUpdateForm
            supplierId={user?.supplier?.supplier_data?.id as string}
            initialImage={
              user?.supplier?.supplier_data?.photo_profile as string
            }
          />
          <FruitList fruits={user.supplier?.fruit as []}/>
          <AddFruitForm supplierId={user?.supplier?.id as string}/>
        </>
      )}
    </div>
  );
}
