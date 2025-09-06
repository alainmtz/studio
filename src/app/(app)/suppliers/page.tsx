
"use client";

// removed duplicate useState import
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
import { useEffect, useState } from "react";
import { getSuppliers, updateSupplier, deleteSupplier, type Supplier } from "@/data/suppliers";
import { SupplierForm } from "@/components/supplier-form";
import { SupplierDetailsDialog } from "@/components/supplier-details-dialog";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { getItems } from "@/data/items";
import { useTranslation } from "@/hooks/use-translation";


export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [viewProductsSupplier, setViewProductsSupplier] = useState<Supplier | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [itemsBySupplier, setItemsBySupplier] = useState<Record<number, number>>({});
    // View products handler
    const handleViewProducts = async (supplier: Supplier) => {
      setViewProductsSupplier(supplier);
      // Fetch items for this supplier
      const allItems = await getItems();
      const filtered = allItems.filter((item: any) => Number(item.supplier?.id) === supplier.id);
      setProducts(filtered);
    };
    const [editSupplier, setEditSupplier] = useState<Supplier | null>(null);
    const [deleteSupplierId, setDeleteSupplierId] = useState<number | null>(null);
  // Remove editForm state, handled by SupplierForm

    // Helper to always provide string values for inputs
    const safeValue = (val: any) => (val === undefined || val === null ? '' : String(val));
    const { t } = useTranslation();

    useEffect(() => {
      getSuppliers().then(setSuppliers).catch(() => setSuppliers([]));
      getItems().then(items => {
        const counts: Record<number, number> = {};
        items.forEach(item => {
          const sid = Number(item.supplier?.id);
          if (!isNaN(sid)) {
            counts[sid] = (counts[sid] || 0) + 1;
          }
        });
        setItemsBySupplier(counts);
      });
    }, []);

    // Edit supplier handlers
    const openEditDialog = (supplier: Supplier) => {
      setEditSupplier(supplier);
    };
    const handleEditSubmit = async (data: Partial<Supplier>) => {
      if (!editSupplier) return;
      await updateSupplier(editSupplier.id, data);
      setEditSupplier(null);
      getSuppliers().then(setSuppliers);
    };

    // Delete supplier handlers
    const handleDelete = async () => {
      if (deleteSupplierId == null) return;
      await deleteSupplier(deleteSupplierId);
      setDeleteSupplierId(null);
      getSuppliers().then(setSuppliers);
    };

  // Temporary test button for delete action
  const testDeleteSupplier = async () => {
    if (suppliers.length > 0) {
      const id = suppliers[0].id;
      await deleteSupplier(id);
      getSuppliers().then(setSuppliers);
      alert(`Deleted supplier with id ${id}`);
    } else {
      alert('No suppliers to delete.');
    }
  };
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
              {/* TEMP: Test Delete Supplier Button */}
              <Button size="sm" variant="destructive" className="h-8 gap-1" onClick={testDeleteSupplier}>
                Test Delete Supplier
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
                    {supplier.contact_person}
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
                    <DropdownMenuItem onClick={() => openEditDialog(supplier)}>{t('common.edit')}</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleViewProducts(supplier)}>{t('suppliers.viewProducts')}</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDeleteSupplierId(supplier.id)}>{t('common.delete')}</DropdownMenuItem>
      {/* View Products Dialog */}
      {viewProductsSupplier && (
        <Dialog open={!!viewProductsSupplier} onOpenChange={(open) => !open && setViewProductsSupplier(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('suppliers.productsFor', { name: viewProductsSupplier.name })}</DialogTitle>
              <DialogDescription>{t('suppliers.productsForDescription', { name: viewProductsSupplier.name })}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-2 py-2">
              {products.length === 0 ? (
                <p className="text-muted-foreground text-sm">{t('suppliers.noProducts')}</p>
              ) : (
                products.map((item) => (
                  <div key={item.id} className="border rounded p-2 flex flex-col gap-1">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-xs text-muted-foreground">SKU: {item.sku}</span>
                  </div>
                ))
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewProductsSupplier(null)}>{t('common.close')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
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
                <span>{itemsBySupplier[supplier.id] || 0} {t('suppliers.items')}</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedSupplier(supplier)}>{t('suppliers.viewDetails')}</Button>
            </CardFooter>
          </Card>
        ))}
      {/* Edit Supplier Dialog */}
      {editSupplier && (
        <Dialog open={!!editSupplier} onOpenChange={(open) => !open && setEditSupplier(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('suppliers.editSupplier')}</DialogTitle>
              <DialogDescription>{t('suppliers.editSupplierDescription')}</DialogDescription>
            </DialogHeader>
            <SupplierForm
              supplier={editSupplier}
              onSubmit={handleEditSubmit}
              onCancel={() => setEditSupplier(null)}
            />
          </DialogContent>
        </Dialog>
      )}

      <ConfirmDialog
        open={deleteSupplierId !== null}
        title={t('suppliers.deleteSupplier')}
        description={t('suppliers.deleteConfirm')}
        confirmText={t('common.delete')}
        cancelText={t('common.cancel')}
        onConfirm={handleDelete}
        onCancel={() => setDeleteSupplierId(null)}
      />
      </div>
    <div className="text-xs text-muted-foreground text-center">
  {t('suppliers.showing', { start: '1', end: String(suppliers.length), total: String(suppliers.length) })}
    </div>

      <SupplierDetailsDialog
        supplier={selectedSupplier}
        open={!!selectedSupplier}
        onClose={() => setSelectedSupplier(null)}
      />
    </div>
  );
}
