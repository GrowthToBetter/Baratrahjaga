"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getAllProjects,
  createOrUpdateProject,
  deleteProject,
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
import { Project, ProjectSchema } from "@/utils/util";
import { randomString } from "@/utils/validate-file.utils";

export default function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    cover: "",
    url: "",
  });

  useEffect(() => {
    async function fetchProjects() {
      setIsLoading(true);
      try {
        const data = await getAllProjects();
        console.log(data);
        const parsed = z.array(ProjectSchema).safeParse(data);
        console.log(parsed);
        if (parsed.success) {
          setProjects(parsed.data);
          toast.success("Data project berhasil dimuat.");
        } else {
          toast.error("Format data project tidak valid.");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Gagal memuat data project.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, []);

  function openEditForm(project: Project) {
    setForm({
      id: project.id,
      name: project.name,
      cover: project.cover || "",
      description: project.description || "",
      url: project.url || "",
    });
    setImageFile(null);
    setEditingProject(project);
    setOpenDialog(true);
  }

  function openNewForm() {
    setForm({ id: "", name: "", description: "", url: "", cover: "" });
    setImageFile(null);
    setEditingProject(null);
    setOpenDialog(true);
  }

  async function handleSubmit() {
    // Validasi form
    if (!form.name.trim()) {
      toast.error("Nama project harus diisi.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("description", form.description.trim());
      formData.append("url", form.url.trim());

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
          publicId: `project-cover-${randomString(10)}`,
        });

        formData.append("image_url", result.url);
      } else if (form.cover) {
        // Gunakan cover lama jika tidak ada file baru
        formData.append("image_url", form.cover);
      }

      const result = await createOrUpdateProject(form.id, formData);
      if (result.success) {
        toast.success(
          `Project berhasil ${editingProject ? "diperbarui" : "dibuat"}.`
        );
        setOpenDialog(false);

        // Refresh data projects
        const updated = await getAllProjects();
        const parsed = z.array(ProjectSchema).safeParse(updated);
        if (parsed.success) {
          setProjects(parsed.data);
          toast.success("Data project berhasil dimuat ulang.");
        }
      } else {
        toast.error("Gagal menyimpan project.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat menyimpan project.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(projectId: string) {
    if (!confirm("Yakin ingin menghapus project ini?")) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteProject(projectId);
      if (result.success) {
        toast.success("Project berhasil dihapus.");
        setOpenDialog(false);

        // Refresh data projects
        const updated = await getAllProjects();
        const parsed = z.array(ProjectSchema).safeParse(updated);
        if (parsed.success) {
          setProjects(parsed.data);
          toast.success("Data project berhasil diperbarui.");
        }
      } else {
        toast.error("Gagal menghapus project.");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Terjadi kesalahan saat menghapus project.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Manajemen Project</h1>
        <Button onClick={openNewForm} disabled={isLoading || isSubmitting}>
          Tambah Project
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-3">Memuat data project...</span>
            </div>
          ) : projects.length === 0 ? (
            <p>Tidak ada project saat ini.</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-2 px-4">Nama</th>
                  <th className="py-2 px-4">Deskripsi</th>
                  <th className="py-2 px-4">Cover</th>
                  <th className="py-2 px-4">Url</th>
                  <th className="py-2 px-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-t">
                    <td className="py-2 px-4">{project.name}</td>
                    <td className="py-2 px-4">{project.description || "-"}</td>
                    <td className="py-2 px-4">{project.url || "-"}</td>
                    <td className="py-2 px-4">
                      {project.cover ? (
                        <Image
                          src={project.cover}
                          alt="Cover"
                          width={60}
                          height={40}
                          className="rounded"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-2 px-4">
                      <Button
                        variant="outline"
                        onClick={() => openEditForm(project)}
                        disabled={isSubmitting || isDeleting}>
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* Dialog tambah/edit */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingProject ? "Edit Project" : "Tambah Project"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Nama Project"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              disabled={isSubmitting || isDeleting}
            />
            <Textarea
              placeholder="Deskripsi"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              disabled={isSubmitting || isDeleting}
            />
            <Input
              placeholder="Url Project"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              disabled={isSubmitting || isDeleting}
            />
            {form.cover && !imageFile && (
              <div className="mt-2">
                <label className="text-sm mx-5">Cover Saat Ini:</label>
                <Image
                  src={form.cover}
                  alt="Current cover"
                  width={100}
                  height={60}
                  className="rounded mt-1"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium">
                Cover (Opsional)
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
                disabled={isSubmitting || isDeleting || !form.name.trim()}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {editingProject ? "Mengupdate..." : "Membuat..."}
                  </>
                ) : editingProject ? (
                  "Update"
                ) : (
                  "Buat"
                )}
              </Button>

              {editingProject && (
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(editingProject.id)}
                  disabled={isSubmitting || isDeleting}>
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
