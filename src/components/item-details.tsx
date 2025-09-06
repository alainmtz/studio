
"use client";

import Image from "next/image";
// ...existing code...
import { MoreVertical, Truck, Package, Tag, DollarSign, QrCode, FileText, User, ShoppingCart, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { StockPredictor } from "@/components/stock-predictor";
import { EditItemForm } from "@/components/edit-item-form";
import type { Item } from "@/data/items";
import { useEffect, useState } from "react";
import { getStockHistory, getActivityLog, type StockHistoryEntry, type ActivityLogEntry } from "@/actions/inventory";
import { useTranslation } from "@/hooks/use-translation";



const getActionIcon = (action: string) => {
    switch (action) {
        case 'Stock Added':
            return <Package className="h-4 w-4 text-green-500" />;
        case 'Sale':
            return <ShoppingCart className="h-4 w-4 text-blue-500" />;
        case 'Inventory Check':
            return <FileText className="h-4 w-4 text-gray-500" />;
        default:
            return <ArrowRight className="h-4 w-4" />;
    }
}

export function ItemDetails({ item }: { item: Item }) {
  const { t } = useTranslation();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [stockHistory, setStockHistory] = useState<StockHistoryEntry[]>([]);
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>([]);
  useEffect(() => {
    async function fetchData() {
      setStockHistory(await getStockHistory(item.id));
      setActivityLog(await getActivityLog(item.id));
    }
    fetchData();
  }, [item.id]);

  return (
    <div className="flex flex-col gap-8 p-2">
      {/* Header and Edit Button */}
      <Card className="mb-4">
        <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
          <div>
            <CardTitle className="text-2xl font-semibold">{item.name}</CardTitle>
            <CardDescription className="text-muted-foreground">{item.sku}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(true)}>{t('common.edit')}</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t('common.actions')}</DropdownMenuLabel>
                <DropdownMenuItem>{t('itemDetails.exportAsPdf')}</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600 dark:text-red-500">{t('common.delete')}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t('editItemForm.title', { defaultValue: 'Edit Item' })}</DialogTitle>
            <DialogDescription>{t('editItemForm.description', { defaultValue: 'Update item details below.' })}</DialogDescription>
          </DialogHeader>
          {/* @ts-ignore */}
          <EditItemForm item={item} onFormSubmit={() => setIsEditDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Images and Details */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardContent className="p-4 flex flex-col gap-4">
              <Image
                alt={item.images[0].alt}
                className="aspect-square w-full rounded-lg object-cover border shadow"
                height={400}
                width={400}
                src={item.images[0].url}
                data-ai-hint="product image"
              />              
              <div className="flex flex-wrap gap-4 mt-4">
                <Badge variant={item.status === 'out-of-stock' ? 'destructive' : 'secondary'}>{t(`inventory.status.${(item.status ?? 'in-stock').replace('-', '')}` as any, { defaultValue: item.status ?? 'in-stock' })}</Badge>
                <span className="text-lg font-semibold">${item.price.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground">{item.stock} {t('inventory.inStock')}</span>
                <span className="text-sm text-muted-foreground">{t('itemDetails.supplier')}: {item.supplier.name}</span>
              </div>
              {/* Stock Predictor below main image */}
              <div className="mt-4">
                <StockPredictor itemHistory={stockHistory} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {item.images.slice(1).map((image, index) => (
                  <button key={index} className="border hover:border-primary rounded-lg overflow-hidden">
                    <Image
                      alt={image.alt}
                      className="aspect-square w-full object-cover"
                      height={80}
                      width={80}
                      src={image.url}
                      data-ai-hint="product detail"
                    />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: QR, Predictor, Activity Log */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('itemDetails.qrCode')}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <Image
                alt="QR Code"
                width={150}
                height={150}
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${item.sku}`}
                data-ai-hint="qr code"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t('itemDetails.activityLog.title')}</CardTitle>
              <CardDescription>{t('itemDetails.activityLog.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {activityLog.map((log) => (
                  <div key={log.id} className="grid grid-cols-[auto,1fr,auto] items-center gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-background">
                      {getActionIcon(log.action)}
                    </div>
                    <div className="grid gap-0.5">
                      <div className="font-medium flex items-center gap-2">
                        <span>{t(`itemDetails.activityLog.actions.${log.action.replace(' ', '')}` as any, { defaultValue: log.action })}</span>
                        <Badge variant="outline">{log.user}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{log.details}</p>
                      <p className="text-xs text-muted-foreground">{log.date}</p>
                    </div>
                    <div className={`text-lg font-semibold ${log.quantity > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}> 
                      {log.quantity > 0 ? `+${log.quantity}` : log.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
