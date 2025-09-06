import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/use-translation";

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.string().min(2),
});

export function UserForm({ defaultValues, onSubmit }: { defaultValues?: any; onSubmit: (values: any) => void }) {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues,
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>{t('userForm.name.label', { defaultValue: 'Name' })}</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>{t('userForm.email.label', { defaultValue: 'Email' })}</FormLabel>
            <FormControl><Input type="email" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="role" render={({ field }) => (
          <FormItem>
            <FormLabel>{t('userForm.role.label', { defaultValue: 'Role' })}</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="flex justify-end pt-4 gap-2">
          <Button type="submit">{t('userForm.submitButton', { defaultValue: 'Save' })}</Button>
        </div>
      </form>
    </Form>
  );
}
