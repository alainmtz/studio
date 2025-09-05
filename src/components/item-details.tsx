
"use client";

import Image from "next/image";
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
import { StockPredictor } from "@/components/stock-predictor";
import type { Item } from "@/data/items";
import { useTranslation } from "@/hooks/use-translation";


const activityLog = [
  { id: "1", date: "2024-05-10", user: "Admin", action: "Stock Added", quantity: "+50", details: "Initial stock registration" },
  { id: "2", date: "2024-05-12", user: "SalesBot", action: "Sale", quantity: "-5", details: "Order #54321" },
  { id: "3", date: "2024-05-15", user: "SalesBot", action: "Sale", quantity: "-10", details: "Order #54329" },
  { id: "4", date: "2024-05-20", user: "Warehouse Staff", action: "Inventory Check", quantity: "0", details: "Cycle count adjustment" },
  { id: "5", date: "2024-05-22", user: "SalesBot", action: "Sale", quantity: "-20", details: "Order #54355" },
];

const stockHistoryForAI = [
  { date: '2024-05-01', stockLevel: 100, sales: 5 },
  { date: '2024-05-02', stockLevel: 95, sales: 2 },
  { date: '2024-05-03', stockLevel: 93, sales: 8 },
  { date: '2024-05-04', stockLevel: 85, sales: 3 },
  { date: '2024-05-05', stockLevel: 82, sales: 5 },
  { date: '2024-05-06', stockLevel: 77, sales: 6 },
  { date: '2024-05-07', stockLevel: 71, sales: 4 },
  { date: '2024-05-08', stockLevel: 67, sales: 7 },
  { date: '2024-05-09', stockLevel: 60, sales: 5 },
  { date: '2024-05-10', stockLevel: 55, sales: 10 },
  { date: '2024-05-11', stockLevel: 45, sales: 8 },
  { date: '2024-05-12', stockLevel: 37, sales: 12 },
  { date: '2024-05-13', stockLevel: 25, sales: 10 },
  { date: '2024-05-14', stockLevel: 15, sales: 0 },
];

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

  return (
    <div className="grid gap-6 p-1">
      <div className="flex items-center">
        <h1 className="flex-1 text-2xl font-semibold">{item.name}</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">{t('common.edit')}</Button>
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
      </div>

      <div className="grid gap-6 md:grid-cols-5 lg:grid-cols-3">
        <div className="md:col-span-3 lg:col-span-2 grid gap-6">
           <Card>
                <CardContent className="p-4">
                    <div className="grid gap-4">
                        <Image
                            alt={item.images[0].alt}
                            className="aspect-square w-full rounded-lg object-cover border"
                            height="600"
                            width="600"
                            src={item.images[0].url}
                            data-ai-hint="product image"
                        />
                        <div className="grid grid-cols-3 gap-4">
                            {item.images.slice(1).map((image, index) => (
                                <button key={index} className="border hover:border-primary rounded-lg overflow-hidden">
                                <Image
                                    alt={image.alt}
                                    className="aspect-square w-full object-cover"
                                    height="120"
                                    width="120"
                                    src={image.url}
                                    data-ai-hint="product detail"
                                />
                                </button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="md:col-span-2 lg:col-span-1 grid auto-rows-max gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>{t('itemDetails.title')}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <div className="grid gap-2 text-sm">
                        <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-muted-foreground"/>
                            <span>{t('itemDetails.sku')}: {item.sku}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-muted-foreground"/>
                            <span>{t('itemDetails.category')}: {item.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground"/>
                            <span>{t('itemDetails.price')}: ${item.price.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-muted-foreground"/>
                            <span>{t('itemDetails.supplier')}: {item.supplier.name}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>{t('itemDetails.status')}:</span>
                        <Badge variant={item.status === 'out-of-stock' ? 'destructive' : 'secondary'} className={item.status === 'low-stock' ? 'bg-yellow-400/20 text-yellow-600 dark:text-yellow-300' : item.status === 'in-stock' ? 'bg-green-400/20 text-green-700 dark:text-green-300' : ''}>
                             {t(`inventory.status.${item.status.replace('-', '')}` as any)}
                        </Badge>
                    </div>
                    <div className="text-2xl font-bold">
                        {item.stock} <span className="text-sm font-normal text-muted-foreground">{t('inventory.inStock')}</span>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>{t('itemDetails.qrCode')}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                    <Image
                        alt="QR Code"
                        width="150"
                        height="150"
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${item.sku}`}
                        data-ai-hint="qr code"
                    />
                </CardContent>
            </Card>
        </div>
      </div>
      
      <StockPredictor itemHistory={stockHistoryForAI} />

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
                            <span>{t(`itemDetails.activityLog.actions.${log.action.replace(' ', '')}` as any)}</span>
                            <Badge variant="outline">{log.user}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{log.details}</p>
                        <p className="text-xs text-muted-foreground">{log.date}</p>
                    </div>
                    <div className={`text-lg font-semibold ${log.quantity.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {log.quantity}
                    </div>
                </div>
              ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
