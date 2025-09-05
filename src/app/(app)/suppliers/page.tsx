
"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  PlusCircle,
  File,
  Mail,
  Phone,
  User,
  Package,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { suppliers, type Supplier } from "@/data/suppliers";
import { useTranslation } from "@/hooks/use-translation";


export default function SuppliersPage() {
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
    const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
          <div>
              <h1 className="text-2xl font-semibold">{t('suppliers.title')}</h1>
              <p className="text-muted-foreground">
                {t('suppliers.description')}
              </p>
          </div>
          <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-8 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  {t('common.export')}
                  </span>
              </Button>
              <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  {t('suppliers.addSupplier')}
                  </span>
              </Button>
          </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <Card key={supplier.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="grid gap-1">
                  <CardTitle>{supplier.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {supplier.contactPerson}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">{t('common.toggleMenu')}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{t('common.actions')}</DropdownMenuLabel>
                    <DropdownMenuItem>{t('common.edit')}</DropdownMenuItem>
                    <DropdownMenuItem>{t('suppliers.viewProducts')}</DropdownMenuItem>
                    <DropdownMenuItem>{t('common.delete')}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm">
                <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${supplier.email}`} className="hover:underline">{supplier.email}</a>
                </div>
                <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{supplier.phone}</span>
                </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Package className="h-4 w-4" />
                <span>{supplier.itemsSupplied} {t('suppliers.items')}</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedSupplier(supplier)}>{t('suppliers.viewDetails')}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="text-xs text-muted-foreground text-center">
          {t('suppliers.showing', { start: 1, end: suppliers.length, total: suppliers.length })}
      </div>

       {selectedSupplier && (
        <Dialog
          open={!!selectedSupplier}
          onOpenChange={(open) => !open && setSelectedSupplier(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedSupplier.name}</DialogTitle>
              <DialogDescription>
                {t('suppliers.dialog.description', { name: selectedSupplier.name })}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right text-muted-foreground">{t('suppliers.dialog.contact')}</p>
                <p className="col-span-3 font-medium flex items-center gap-2">
                  <User className="h-4 w-4" /> {selectedSupplier.contactPerson}
                </p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right text-muted-foreground">{t('suppliers.dialog.email')}</p>
                 <a href={`mailto:${selectedSupplier.email}`} className="col-span-3 hover:underline flex items-center gap-2">
                    <Mail className="h-4 w-4" /> {selectedSupplier.email}
                 </a>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right text-muted-foreground">{t('suppliers.dialog.phone')}</p>
                <p className="col-span-3 flex items-center gap-2">
                  <Phone className="h-4 w-4" /> {selectedSupplier.phone}
                </p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right text-muted-foreground">{t('suppliers.dialog.itemsSupplied')}</p>
                <p className="col-span-3 flex items-center gap-2">
                   <Package className="h-4 w-4" /> {selectedSupplier.itemsSupplied}
                </p>
              </div>
            </div>
            <DialogFooter>
                <Button
                    variant="outline"
                    onClick={() => setSelectedSupplier(null)}
                >
                    {t('common.close')}
                </Button>
                <Button>{t('suppliers.viewProducts')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
