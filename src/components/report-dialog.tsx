import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogHeaderWithDescription } from "@/components/ui/dialog-header-with-description";
import { ReportForm } from "@/components/report-form";

export function ReportDialog({ open, onClose, defaultValues, onSubmit }: { open: boolean; onClose: () => void; defaultValues?: any; onSubmit: (values: any) => void }) {
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeaderWithDescription
          title="Report"
          description="Add or edit a report."
          titleKey="reportDialog.title"
          descriptionKey="reportDialog.description"
          defaultTitle="Report"
          defaultDescription="Add or edit a report."
        />
        <ReportForm defaultValues={defaultValues} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
