import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogHeaderWithDescription } from "@/components/ui/dialog-header-with-description";
import { UserForm } from "@/components/user-form";

export function UserDialog({ open, onClose, defaultValues, onSubmit }: { open: boolean; onClose: () => void; defaultValues?: any; onSubmit: (values: any) => void }) {
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeaderWithDescription
          title="User"
          description="Add or edit a user."
          titleKey="userDialog.title"
          descriptionKey="userDialog.description"
          defaultTitle="User"
          defaultDescription="Add or edit a user."
        />
        <UserForm defaultValues={defaultValues} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
