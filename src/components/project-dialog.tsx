import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogHeaderWithDescription } from "@/components/ui/dialog-header-with-description";
import { ProjectForm } from "@/components/project-form";

export function ProjectDialog({ open, onClose, defaultValues, onSubmit }: { open: boolean; onClose: () => void; defaultValues?: any; onSubmit: (values: any) => void }) {
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeaderWithDescription
          title="Project"
          description="Add or edit a project."
          titleKey="projectDialog.title"
          descriptionKey="projectDialog.description"
          defaultTitle="Project"
          defaultDescription="Add or edit a project."
        />
        <ProjectForm defaultValues={defaultValues} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
