import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/use-translation";

const projectSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
});

export function ProjectForm({ defaultValues, onSubmit }: { defaultValues?: any; onSubmit: (values: any) => void }) {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>{t('projectForm.name.label', { defaultValue: 'Project Name' })}</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem>
            <FormLabel>{t('projectForm.description.label', { defaultValue: 'Description' })}</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="flex justify-end pt-4 gap-2">
          <Button type="submit">{t('projectForm.submitButton', { defaultValue: 'Save' })}</Button>
        </div>
      </form>
    </Form>
  );
}
