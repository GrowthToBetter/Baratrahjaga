import { Card, CardContent } from "@/components/ui/card";
import { fruitGetPayload } from "@/utils/relationship";
import Image from "next/image";

export function FruitList({
  showVerificationStatus = false,
  fruits,
}: {
  showVerificationStatus?: boolean;
  fruits: fruitGetPayload[];
}) {
  return (
    <Card>
      <CardContent className="space-y-2 p-4">
        <h3 className="text-lg font-medium">Daftar Produk Buah</h3>
        {fruits.map((fruit, i) => (
          <div key={i} className="flex justify-between border p-2 rounded-md">
            <div className="">
              <p>
                <strong>Nama:</strong> {fruit.name}
              </p>
              <p>
                <strong>Stok:</strong> {fruit.stock} Kg
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    fruit.isVerif ? "text-green-500" : "text-red-500"
                  }>
                  {fruit.isVerif
                    ? "Terverifikasi"
                    : "Belum Terverifikasi"}
                </span>
              </p>
              <p>
                <strong>Price:</strong> {fruit.price.price} -{" "}
                {`${fruit.price.date.getDate()}/${
                  fruit.price.date.getMonth() + 1
                }/${fruit.price.date.getFullYear()}`}
              </p>
              {showVerificationStatus && (
                <p>
                  <strong>Status Verifikasi:</strong>{" "}
                  {fruit.isVerif ? "Terverifikasi" : "Belum"}
                </p>
              )}
            </div>
            {fruit.image && (
              <Image
                src={fruit.image}
                alt={fruit.name}
                width={100}
                height={100}
              />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
