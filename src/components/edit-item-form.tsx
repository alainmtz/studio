
'use client';
import MuiBox from '@mui/material/Box';
import MuiFormControl from '@mui/material/FormControl';
import MuiInputLabel from '@mui/material/InputLabel';
import MuiOutlinedInput from '@mui/material/OutlinedInput';
import MuiButton from '@mui/material/Button';
import MuiTypography from '@mui/material/Typography';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getSuppliers, type Supplier } from "@/data/suppliers";
import { useTranslation } from "@/hooks/use-translation";
import { updateItem } from "@/actions/inventory";
import type { Item } from "@/data/items";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogHeaderWithDescription } from "@/components/ui/dialog-header-with-description";
import { useEffect, useState, useRef } from "react";

// Move hooks to top-level scope
const _useState = useState;
const _useRef = useRef;

const formSchema = z.object({
  name: z.string().min(2),
  sku: z.string().min(2),
  description: z.string().optional(),
  price: z.coerce.number().min(0),
  stock: z.coerce.number().min(0),
  category: z.string().min(2),
  supplierId: z.coerce.number().min(1),
  status: z.enum(["in-stock", "low-stock", "out-of-stock", "discontinued"]).optional(),
  imageUrl: z.string().optional(),
});

export function EditItemForm({ open, item, onFormSubmit, onCancel }: { open: boolean; item: Item | null; onFormSubmit: () => void; onCancel: () => void }) {
  if (!item) return null;
  const [suppliers, setSuppliers] = _useState<Supplier[]>([]);
  useEffect(() => {
    getSuppliers().then(setSuppliers).catch(() => setSuppliers([]));
  }, []);
  const [imageFile, setImageFile] = _useState<File | null>(null);
  const [uploading, setUploading] = _useState(false);
  const fileInputRef = _useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item.name,
      sku: item.sku,
      description: item.description ?? "",
      price: item.price,
      stock: item.stock,
      category: item.category ?? "",
      supplierId: Number(item.supplier.id),
      status: item.status ?? "in-stock",
      imageUrl: item.images[0]?.url?.replace("/uploads/", "") ?? "",
    },
    values: {
      name: item.name,
      sku: item.sku,
      description: item.description ?? "",
      price: item.price,
      stock: item.stock,
      category: item.category ?? "",
      supplierId: Number(item.supplier.id),
      status: item.status ?? "in-stock",
      imageUrl: item.images[0]?.url?.replace("/uploads/", "") ?? "",
    },
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };
  const handleUpload = async () => {
    if (!imageFile) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("itemId", item.id);
    try {
      const res = await fetch("/api/upload-item-image", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        form.setValue("imageUrl", data.imageUrl);
      }
    } catch (err) {
      // handle error
    } finally {
      setUploading(false);
    }
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateItem({
        id: item.id,
        name: values.name,
        sku: values.sku,
        description: values.description,
        price: values.price,
        quantity: values.stock,
        brand: values.category,
        supplierId: values.supplierId,
        status: values.status,
        imageUrl: values.imageUrl,
      });
      toast({
        title: t('editItemForm.toast.title'),
        description: t('editItemForm.toast.description', { name: values.name }),
      });
      onFormSubmit();
    } catch (error) {
      toast({
        variant: "destructive",
        title: t('editItemForm.toast.errorTitle') || 'Failed to update item',
        description: t('editItemForm.toast.errorDescription') || 'Could not update the item in the database.',
      });
    }
  }
  return (
    <Dialog open={open} onOpenChange={v => !v && onCancel()}>
      <DialogContent className="max-w-lg">
        <DialogHeaderWithDescription
          title="Edit Item"
          description="Update the details for this item."
          titleKey="editItemForm.title"
          descriptionKey="editItemForm.description"
          defaultTitle="Edit Item"
          defaultDescription="Update the details for this item."
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 max-h-[70vh] overflow-y-auto p-1">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('addItemForm.productName.label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('addItemForm.productName.placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="sku" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('addItemForm.sku.label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('addItemForm.sku.placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>{t('addItemForm.descriptionField.label')}</FormLabel>
                <FormControl>
                  <Textarea placeholder={t('addItemForm.descriptionField.placeholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="grid md:grid-cols-2 gap-4">
              <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('addItemForm.price.label')}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={t('addItemForm.price.placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="stock" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('addItemForm.stock.label')}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={t('addItemForm.stock.placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('addItemForm.category.label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('addItemForm.category.placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="supplierId" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('addItemForm.supplier.label')}</FormLabel>
                  <Select onValueChange={value => field.onChange(Number(value))} defaultValue={field.value ? String(field.value) : undefined}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('addItemForm.supplier.placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {suppliers.map((supplier: Supplier) => (
                        <SelectItem key={supplier.id} value={String(supplier.id)}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('addItemForm.status.label')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('addItemForm.status.placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="in-stock">{t('inventory.status.instock')}</SelectItem>
                      <SelectItem value="low-stock">{t('inventory.status.lowstock')}</SelectItem>
                      <SelectItem value="out-of-stock">{t('inventory.status.outofstock')}</SelectItem>
                      <SelectItem value="discontinued">{t('inventory.status.discontinued')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="imageUrl" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('addItemForm.imageUrl.label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('addItemForm.imageUrl.placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            {/* Material UI file upload */}
            <MuiBox mt={4} p={2} bgcolor="#f9fafb" borderRadius={2} boxShadow={1}>
              <MuiFormControl fullWidth>
                <MuiInputLabel htmlFor="item-image">Imagen del producto</MuiInputLabel>
                <MuiOutlinedInput
                  id="item-image"
                  type="file"
                  inputRef={fileInputRef}
                  inputProps={{ accept: "image/*" }}
                  onChange={handleFileChange}
                  label="Imagen del producto"
                  sx={{ borderRadius: 2, bgcolor: '#fff' }}
                />
              </MuiFormControl>
              {imageFile && (
                <MuiBox display="flex" alignItems="center" gap={2} mt={2}>
                  <MuiButton
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    disabled={uploading}
                    sx={{ borderRadius: 2, boxShadow: 1 }}
                  >
                    {uploading ? "Subiendo..." : "Subir imagen"}
                  </MuiButton>
                  <MuiTypography variant="caption" color="textSecondary">{imageFile.name}</MuiTypography>
                </MuiBox>
              )}
              {form.watch("imageUrl") && (
                <MuiBox mt={2} display="flex" justifyContent="center">
                  <img
                    src={(form.watch("imageUrl") || "").startsWith("/uploads/") ? (form.watch("imageUrl") || "") : `/uploads/${form.watch("imageUrl") || ""}`}
                    alt="Imagen del producto"
                    style={{ height: 96, borderRadius: 12, border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                  />
                </MuiBox>
              )}
            </MuiBox>
            <div className="flex justify-end pt-4 gap-2">
              <Button type="button" variant="outline" onClick={onCancel}>{t('common.cancel')}</Button>
              <Button type="submit">{t('editItemForm.submitButton') || 'Save Changes'}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
