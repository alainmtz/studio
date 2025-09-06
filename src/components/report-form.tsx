import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/use-translation";

const reportSchema = z.object({
  title: z.string().min(2),
  summary: z.string().optional(),
});

export function ReportForm({ defaultValues, onSubmit }: { defaultValues?: any; onSubmit: (values: any) => void }) {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(reportSchema),
    defaultValues,
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem>
            <FormLabel>{t('reportForm.title.label', { defaultValue: 'Report Title' })}</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="summary" render={({ field }) => (
          <FormItem>
            <FormLabel>{t('reportForm.summary.label', { defaultValue: 'Summary' })}</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="flex justify-end pt-4 gap-2">
          <Button type="submit">{t('reportForm.submitButton', { defaultValue: 'Save' })}</Button>
        </div>
      </form>
    </Form>
  );
}
