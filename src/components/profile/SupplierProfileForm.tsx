"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { toast } from "sonner";

import { uploadImageToCloudinary } from "@/utils/cloudinary.utils"; // pastikan ada
import { updateSupplierImage } from "@/utils/memberServerAction"; // kamu buat sendiri

const formSchema = z.object({
  image: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function SupplierImageUpdateForm({
  initialImage,
  supplierId,
}: {
  initialImage?: string;
  supplierId: string;
}) {
  const [preview, setPreview] = useState(initialImage || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      if (!values.image) {
        toast.error("Pilih gambar terlebih dahulu");
        return;
      }

      // Convert File to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(values.image!);
      });

      const result = await uploadImageToCloudinary({
        base64,
        publicId: `supplier-profile-${supplierId}`,
      });

      await updateSupplierImage(supplierId, result.url);

      toast.success("Foto profil berhasil diperbarui");
      setPreview(result.url);
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengunggah foto");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <h3 className="text-lg font-medium">Ubah Foto Profil Supplier</h3>

        {preview && (
          <Image
            src={preview}
            alt="Preview"
            width={120}
            height={120}
            className="rounded-xl border shadow-md"
          />
        )}

        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              form.setValue("image", file);
              setPreview(URL.createObjectURL(file));
            }
          }}
        />

        <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
          {isSubmitting ? "Menyimpan..." : "Simpan"}
        </Button>
      </CardContent>
    </Card>
  );
}
