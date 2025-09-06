
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { suppliers } from "@/data/suppliers";
import { useTranslation } from "@/hooks/use-translation";
import { createItem } from "@/actions/inventory";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  sku: z.string().min(2, {
    message: "SKU must be at least 2 characters.",
  }),
  description: z.string().optional(),
  price: z.coerce.number().min(0, {
    message: "Price must be a positive number.",
  }),
  stock: z.coerce.number().min(0, {
    message: "Stock must be a positive number.",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  supplierId: z.coerce.number().min(1, {
    message: "Please select a supplier.",
  }),
  status: z.enum(["in-stock", "low-stock", "out-of-stock"]),
  imageUrl: z.string().url({ message: "Please enter a valid URL." }).optional(),
});

export function AddItemForm({ onFormSubmit }: { onFormSubmit: () => void }) {
  const { toast } = useToast();
  const { t } = useTranslation();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      sku: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      supplierId: undefined,
      status: "in-stock",
      imageUrl: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createItem(values);
      toast({
        title: t('addItemForm.toast.title'),
        description: t('addItemForm.toast.description', { name: values.name }),
      });
      onFormSubmit();
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Failed to add item",
        description: "Could not save the new item to the database.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 max-h-[70vh] overflow-y-auto p-1">
        <div className="grid md:grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{t('addItemForm.productName.label')}</FormLabel>
                <FormControl>
                    <Input placeholder={t('addItemForm.productName.placeholder')} {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{t('addItemForm.sku.label')}</FormLabel>
                <FormControl>
                    <Input placeholder={t('addItemForm.sku.placeholder')} {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('addItemForm.descriptionField.label')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('addItemForm.descriptionField.placeholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid md:grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{t('addItemForm.price.label')}</FormLabel>
                <FormControl>
                    <Input type="number" placeholder={t('addItemForm.price.placeholder')} {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{t('addItemForm.stock.label')}</FormLabel>
                <FormControl>
                    <Input type="number" placeholder={t('addItemForm.stock.placeholder')} {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
         <div className="grid md:grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{t('addItemForm.category.label')}</FormLabel>
                <FormControl>
                    <Input placeholder={t('addItemForm.category.placeholder')} {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="supplierId"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{t('addItemForm.supplier.label')}</FormLabel>
                <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={String(field.value)}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder={t('addItemForm.supplier.placeholder')} />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {suppliers.map(supplier => (
                        <SelectItem key={supplier.id} value={supplier.id}>
                        {supplier.name}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
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
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
             <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>{t('addItemForm.imageUrl.label')}</FormLabel>
                    <FormControl>
                        <Input placeholder={t('addItemForm.imageUrl.placeholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        <div className="flex justify-end pt-4">
             <Button type="submit">{t('addItemForm.submitButton')}</Button>
        </div>
      </form>
    </Form>
  );
}
