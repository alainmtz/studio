import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Package } from "lucide-react";
import type { Supplier } from "@/data/suppliers";
import { useTranslation } from "@/hooks/use-translation";

export function SupplierDetailsDialog({ supplier, open, onClose }: {
  supplier: Supplier | null;
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  if (!supplier) return null;
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{supplier.name}</DialogTitle>
          <DialogDescription>
            {t('suppliers.dialog.description', { name: supplier.name })}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right text-muted-foreground">{t('suppliers.dialog.contact')}</p>
            <p className="col-span-3 font-medium flex items-center gap-2">
              <User className="h-4 w-4" /> {supplier.contact_person}
            </p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right text-muted-foreground">{t('suppliers.dialog.email')}</p>
            <a href={`mailto:${supplier.email}`} className="col-span-3 hover:underline flex items-center gap-2">
              <Mail className="h-4 w-4" /> {supplier.email}
            </a>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right text-muted-foreground">{t('suppliers.dialog.phone')}</p>
            <p className="col-span-3 flex items-center gap-2">
              <Phone className="h-4 w-4" /> {supplier.phone}
            </p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right text-muted-foreground">{t('suppliers.dialog.itemsSupplied')}</p>
            <p className="col-span-3 flex items-center gap-2">
              <Package className="h-4 w-4" /> {supplier.items_supplied}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t('common.close')}
          </Button>
          <Button>{t('suppliers.viewProducts')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
