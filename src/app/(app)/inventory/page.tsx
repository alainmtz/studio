
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MoreHorizontal,
  PlusCircle,
  File,
  ListFilter,
} from "lucide-react";
import { useState } from 'react';

import { Badge } from "@/components/ui/badge";
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
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ItemDetails } from "@/components/item-details";
import { AddItemForm } from "@/components/add-item-form";
import { items, type Item } from "@/data/items";
import { useTranslation } from "@/hooks/use-translation";


export default function InventoryPage() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const { t } = useTranslation();

  const renderItemCards = (filter?: "in-stock" | "low-stock" | "out-of-stock") => {
    const filteredItems = filter ? items.filter(item => item.status === filter) : items;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="cursor-pointer hover:bg-accent transition-colors" onClick={() => setSelectedItem(item)}>
            <CardHeader className="p-0">
                <Image
                  alt="Product image"
                  className="aspect-video w-full rounded-t-lg object-cover"
                  height="180"
                  width="320"
                  src={`https://picsum.photos/seed/${item.sku}/320/180`}
                  data-ai-hint="product image"
                />
            </CardHeader>
            <CardContent className="p-4 grid gap-2">
                <div className="flex items-start justify-between">
                    <div className="grid gap-0.5">
                        <CardTitle className="text-base hover:underline">{item.name}</CardTitle>
                        <CardDescription className="text-xs">{item.sku}</CardDescription>
                    </div>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                          <DropdownMenuLabel>{t('common.actions')}</DropdownMenuLabel>
                          <DropdownMenuItem>{t('common.edit')}</DropdownMenuItem>
                          <DropdownMenuItem>{t('common.delete')}</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                </div>
                 <Badge variant={item.status === 'out-of-stock' ? 'destructive' : 'secondary'} className={`w-fit ${item.status === 'low-stock' ? 'bg-yellow-400/20 text-yellow-600 dark:text-yellow-300' : item.status === 'in-stock' ? 'bg-green-400/20 text-green-700 dark:text-green-300' : ''}`}>
                    {t(`inventory.status.${item.status.replace('-', '')}` as any)}
                 </Badge>
            </CardContent>
            <CardFooter className="p-4 flex items-center justify-between border-t">
                <div className="text-lg font-semibold">
                    ${item.price.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">
                    {item.stock} {t('inventory.inStock')}
                </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{t('inventory.title')}</h1>
          <p className="text-muted-foreground">{t('inventory.description')}</p>
        </div>
        <div className="flex items-center gap-2">
           <Button size="sm" variant="outline" className="h-8 gap-1" asChild>
            <Link href="/inventory/export" target="_blank">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {t('common.export')}
              </span>
            </Link>
          </Button>
          <Button size="sm" className="h-8 gap-1" onClick={() => setIsAddItemDialogOpen(true)}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              {t('inventory.addItem')}
            </span>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">{t('inventory.tabs.all')}</TabsTrigger>
            <TabsTrigger value="in-stock">{t('inventory.tabs.inStock')}</TabsTrigger>
            <TabsTrigger value="low-stock">{t('inventory.tabs.lowStock')}</TabsTrigger>
            <TabsTrigger value="out-of-stock">{t('inventory.tabs.outOfStock')}</TabsTrigger>
          </TabsList>
           <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    {t('inventory.filterByCategory')}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t('inventory.filterByCategory')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Array.from(new Set(items.map(i => i.category))).map(cat => (
                  <DropdownMenuCheckboxItem key={cat}>{cat}</DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <TabsContent value="all">
          {renderItemCards()}
        </TabsContent>
        <TabsContent value="in-stock">
          {renderItemCards("in-stock")}
        </TabsContent>
        <TabsContent value="low-stock">
          {renderItemCards("low-stock")}
        </TabsContent>
        <TabsContent value="out-of-stock">
          {renderItemCards("out-of-stock")}
        </TabsContent>
      </Tabs>
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <ItemDetails item={selectedItem} />
            </DialogContent>
        </Dialog>
      )}
       <Dialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t('addItemForm.title')}</DialogTitle>
            <DialogDescription>
              {t('addItemForm.description')}
            </DialogDescription>
          </DialogHeader>
          <AddItemForm onFormSubmit={() => setIsAddItemDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
