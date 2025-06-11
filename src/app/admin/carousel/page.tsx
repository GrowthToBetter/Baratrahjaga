"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getAllCarousel,
  createOrUpdateCarousel,
  deleteCarousel,
} from "@/utils/AdminServerAction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { z } from "zod";
import { toast } from "sonner";
import { uploadImageToCloudinary } from "@/utils/cloudinary.utils";
import { randomString } from "@/utils/validate-file.utils";

// Schema untuk carousel
export const CarouselSchema = z.object({
  id: z.string().optional(),
  desc: z.string().optional(),
  path: z.string(),
});

export type CarouselImage = z.infer<typeof CarouselSchema>;

export default function CarouselPage() {
  const [carousels, setCarousels] = useState<CarouselImage[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCarousel, setEditingCarousel] = useState<CarouselImage | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [form, setForm] = useState({
    id: "",
    desc: "",
    path: "",
  });

  useEffect(() => {
    async function fetchCarousels() {
      setIsLoading(true);
      try {
        const data = await getAllCarousel();
        console.log(data);
        const parsed = z.array(CarouselSchema).safeParse(data);
        console.log(parsed);
        if (parsed.success) {
          setCarousels(parsed.data);
          toast.success("Data carousel berhasil dimuat.");
        } else {
          toast.error("Format data carousel tidak valid.");
        }
      } catch (error) {
        console.error("Error fetching carousels:", error);
        toast.error("Gagal memuat data carousel.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCarousels();
  }, []);

  function openEditForm(carousel: CarouselImage) {
    setForm({
      id: carousel.id || "",
      desc: carousel.desc || "",
      path: carousel.path || "",
    });
    setImageFile(null);
    setEditingCarousel(carousel);
    setOpenDialog(true);
  }

  function openNewForm() {
    setForm({ id: "", desc: "", path: "" });
    setImageFile(null);
    setEditingCarousel(null);
    setOpenDialog(true);
  }

  async function handleSubmit() {
    // Validasi form - path harus ada (dari file atau form)
    if (!imageFile && !form.path.trim()) {
      toast.error("Gambar carousel harus dipilih.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("desc", form.desc.trim());

      if (imageFile) {
        // Upload file ke Cloudinary
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(imageFile);
        });

        const result = await uploadImageToCloudinary({
          base64,
          publicId: `carousel-${randomString(10)}`,
        });

        formData.append("path", result.url);
      } else if (form.path) {
        // Gunakan path lama jika tidak ada file baru
        formData.append("path", form.path);
      }

      const result = await createOrUpdateCarousel(form.id, formData);
      if (result.success) {
        toast.success(
          `Carousel berhasil ${editingCarousel ? "diperbarui" : "dibuat"}.`
        );
        setOpenDialog(false);

        // Refresh data carousels
        const updated = await getAllCarousel();
        const parsed = z.array(CarouselSchema).safeParse(updated);
        if (parsed.success) {
          setCarousels(parsed.data);
          toast.success("Data carousel berhasil dimuat ulang.");
        }
      } else {
        toast.error("Gagal menyimpan carousel.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat menyimpan carousel.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(carouselId: string) {
    if (!confirm("Yakin ingin menghapus carousel ini?")) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteCarousel(carouselId);
      if (result.success) {
        toast.success("Carousel berhasil dihapus.");
        setOpenDialog(false);

        // Refresh data carousels
        const updated = await getAllCarousel();
        const parsed = z.array(CarouselSchema).safeParse(updated);
        if (parsed.success) {
          setCarousels(parsed.data);
          toast.success("Data carousel berhasil diperbarui.");
        }
      } else {
        toast.error("Gagal menghapus carousel.");
      }
    } catch (error) {
      console.error("Error deleting carousel:", error);
      toast.error("Terjadi kesalahan saat menghapus carousel.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Manajemen Carousel</h1>
        <Button onClick={openNewForm} disabled={isLoading || isSubmitting}>
          Tambah Carousel
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-3">Memuat data carousel...</span>
            </div>
          ) : carousels.length === 0 ? (
            <p>Tidak ada carousel saat ini.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {carousels.map((carousel, index) => (
                <Card key={carousel.id || index} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={carousel.path}
                      alt={carousel.desc || "Carousel image"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-3">
                      {carousel.desc || "Tidak ada deskripsi"}
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => openEditForm(carousel)}
                      disabled={isSubmitting || isDeleting}
                      className="w-full"
                    >
                      Edit
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog tambah/edit */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCarousel ? "Edit Carousel" : "Tambah Carousel"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Deskripsi (Opsional)"
              value={form.desc}
              onChange={(e) =>
                setForm({ ...form, desc: e.target.value })
              }
              disabled={isSubmitting || isDeleting}
            />
            
            {form.path && !imageFile && (
              <div className="mt-2">
                <label className="text-sm mx-1">Gambar Saat Ini:</label>
                <div className="mt-2 relative h-32 w-full">
                  <Image
                    src={form.path}
                    alt="Current carousel"
                    fill
                    className="rounded object-cover"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">
                Gambar Carousel {editingCarousel ? "(Opsional - kosongkan jika tidak ingin mengubah)" : "(Wajib)"}
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setImageFile(file);
                }}
                disabled={isSubmitting || isDeleting}
              />
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || isDeleting || (!imageFile && !form.path.trim())}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {editingCarousel ? "Mengupdate..." : "Membuat..."}
                  </>
                ) : editingCarousel ? (
                  "Update"
                ) : (
                  "Buat"
                )}
              </Button>

              {editingCarousel && (
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(editingCarousel.id || "")}
                  disabled={isSubmitting || isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Menghapus...
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}