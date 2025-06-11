"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { upsertFruit, deleteFruit } from "@/utils/fruitServerAction";
import { uploadImageToCloudinary } from "@/utils/cloudinary.utils";
import { randomString } from "@/utils/validate-file.utils";

const formSchema = z.object({
  id: z.string().optional(),
  fruit: z.string().min(1, "Nama buah wajib diisi"),
  stock: z.coerce.number().int().min(0, "Stok tidak valid"),
  price: z.string().min(1, "Harga wajib diisi"),
  image: z.any(),
});

export function AddFruitForm({ supplierId }: { supplierId: string }) {
  const [isPending, startTransition] = useTransition();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: undefined,
      fruit: "",
      stock: 0,
      price: "",
      image: undefined,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    startTransition(async () => {
      try {
        let imageUrl: string | undefined;

        if (imageFile) {
          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result as string); // ✅ jangan split, kirim full
            };
            reader.onerror = reject;
            reader.readAsDataURL(imageFile);
          });

          const result = await uploadImageToCloudinary({
            base64,
            publicId: `supplier-image-${randomString(10)}`,
          });

          imageUrl = result.url;
        }
        const formData = new FormData();
        formData.append("fruit", data.fruit);
        formData.append("stock", String(data.stock));
        formData.append("price", data.price);
        if (imageUrl) {
          formData.append("image_url", imageUrl);
        }
        if (data.id) formData.append("id", data.id);

        await upsertFruit(formData, supplierId);
        toast.success("Buah berhasil disimpan");
        form.reset();
      } catch {
        toast.error("Gagal menyimpan buah");
      }
    });
  });

  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        <h3 className="text-lg font-medium">Tambah / Edit Buah</h3>
        <form onSubmit={onSubmit} className="space-y-3">
          <Input
            placeholder="Nama buah"
            {...form.register("fruit")}
            disabled={isPending}
          />
          <Input
            type="number"
            placeholder="Stok"
            {...form.register("stock")}
            disabled={isPending}
          />
          <Input
            placeholder="Harga"
            {...form.register("price")}
            disabled={isPending}
          />
          <div>
            <Label htmlFor="image">Foto Buah (max 3mb)</Label>
            <Input
              type="file"
              accept="image/*"
              required
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setImageFile(file);
              }}
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={isPending}>
              Simpan
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                const id = prompt("ID buah yang ingin dihapus:");
                if (!id) return;
                startTransition(async () => {
                  try {
                    await deleteFruit(id);
                    toast.success("Buah berhasil dihapus");
                  } catch {
                    toast.error("Gagal menghapus buah");
                  }
                });
              }}
              disabled={isPending}>
              Hapus
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
