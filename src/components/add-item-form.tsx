
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
  supplierId: z.string().min(1, {
    message: "Please select a supplier.",
  }),
  status: z.enum(["in-stock", "low-stock", "out-of-stock"]),
  imageUrl: z.string().url({ message: "Please enter a valid URL." }).optional(),
});

export function AddItemForm({ onFormSubmit }: { onFormSubmit: () => void }) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      sku: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      supplierId: "",
      status: "in-stock",
      imageUrl: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("New item added:", values);
    toast({
      title: "Item Added",
      description: `The item "${values.name}" has been successfully added.`,
    });
    onFormSubmit();
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
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Laser-Guided Widget" {...field} />
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
                <FormLabel>SKU (Stock Keeping Unit)</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., LGW-001" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about the product"
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
                <FormLabel>Price</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="e.g., 49.99" {...field} />
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
                <FormLabel>Stock Quantity</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="e.g., 120" {...field} />
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
                <FormLabel>Category</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Widgets" {...field} />
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
                <FormLabel>Supplier</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a supplier" />
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
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="in-stock">In Stock</SelectItem>
                        <SelectItem value="low-stock">Low Stock</SelectItem>
                        <SelectItem value="out-of-stock">Out of Stock</SelectItem>
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
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                        <Input placeholder="https://picsum.photos/seed/..." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        <div className="flex justify-end pt-4">
             <Button type="submit">Add Item</Button>
        </div>
      </form>
    </Form>
  );
}
