"use client";
import { EditItemForm } from "@/components/edit-item-form";
import { ItemDetailsDialog } from "@/components/ui/item-details-dialog";
import { ConfirmDialog } from "@/components/confirm-dialog";
import Image from "next/image";
import Link from "next/link";
import {
  MoreHorizontal,
  PlusCircle,
  File,
  ListFilter,
} from "lucide-react";
import { useState, useEffect } from 'react';
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
import type { Item } from "@/data/items";
import { useTranslation } from "@/hooks/use-translation";
import { getInventoryItems } from "@/actions/inventory";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';


export default function InventoryPage() {
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvenance, setSelectedProvenance] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'price' | 'cost' | 'name'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { t } = useTranslation();
  const { toast } = useToast();
  // Fetch items from the database
  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const data = await getInventoryItems();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
      toast({ 
        variant: 'destructive', 
        title: t('inventory.fetchErrorTitle'), 
        description: t('inventory.fetchErrorDescription') 
      });  
    } finally {
      setIsLoading(false);
    }
  };


   // Handler for delete item
  const handleDeleteItem = async () => {
    if (deleteItemId == null) return;
    // TODO: implement deleteItem action and call here
    // await deleteItem(deleteItemId);
    setDeleteItemId(null);
    fetchItems();
  };
  // Handler for edit item form submit
  const handleEditSubmit = () => {
    setEditItem(null);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const getFilteredItems = (filter?: "in-stock" | "low-stock" | "out-of-stock") => {
    let filteredItems = filter ? items.filter(item => item.status === filter) : items;
    if (selectedCategory) {
      filteredItems = filteredItems.filter(item => item.category === selectedCategory);
    }
    if (selectedProvenance) {
      filteredItems = filteredItems.filter(item => item.provenance === selectedProvenance);
    }
    if (selectedBrand) {
      filteredItems = filteredItems.filter(item => item.brand === selectedBrand);
    }
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.sku.toLowerCase().includes(term) ||
        (item.brand && item.brand.toLowerCase().includes(term)) ||
        (item.provenance && item.provenance.toLowerCase().includes(term))
      );
    }
    filteredItems = [...filteredItems].sort((a, b) => {
      let valA, valB;
      if (sortBy === 'price') {
        valA = a.price;
        valB = b.price;
      } else if (sortBy === 'cost') {
        valA = a.cost ?? 0;
        valB = b.cost ?? 0;
      } else {
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
      }
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return filteredItems;
  };

  const renderItemCards = (filter?: "in-stock" | "low-stock" | "out-of-stock") => {
    const filteredItems = getFilteredItems(filter);
    
    if (isLoading) {
        return (
          <>
            <ConfirmDialog
              open={deleteItemId !== null}
              title={t('inventory.deleteItem')}
              description={t('inventory.deleteConfirm')}
              confirmText={t('common.delete')}
              cancelText={t('common.cancel')}
              onConfirm={handleDeleteItem}
              onCancel={() => setDeleteItemId(null)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i}>
                  <Skeleton className="aspect-video w-full rounded-t-lg" />
                  <CardContent className="p-4 grid gap-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-5 w-1/3" />
                  </CardContent>
                  <CardFooter className="p-4 flex items-center justify-between border-t">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-5 w-1/3" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        );
    }

    if (items.length === 0) {
        return <p className="text-center text-muted-foreground py-8">{t('inventory.noItems')}</p>
    }

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
                  src={item.images[0]?.url || `https://picsum.photos/seed/${item.sku}/320/180`}
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
                          <DropdownMenuItem onClick={() => setEditItem(item)}>{t('common.edit')}</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setDeleteItemId(Number(item.id))}>{t('common.delete')}</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                </div>
                 <Badge variant={item.status === 'out-of-stock' ? 'destructive' : 'secondary'} className={`w-fit ${item.status === 'low-stock' ? 'bg-yellow-400/20 text-yellow-600 dark:text-yellow-300' : item.status === 'in-stock' ? 'bg-green-400/20 text-green-700 dark:text-green-300' : ''}`}>
                    {t(`inventory.status.${(item.status ?? 'in-stock').replace('-', '')}` as any, { defaultValue: item.status ?? 'in-stock' })}
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
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder={t('inventory.search') || 'Buscar...'}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
            style={{ minWidth: 180 }}
          />
          <select
            value={selectedProvenance || ''}
            onChange={e => setSelectedProvenance(e.target.value || null)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="">{t('inventory.provenance') || 'Provenance'}</option>
            {Array.from(new Set(items.map(i => i.provenance).filter(Boolean))).map(prov => (
              <option key={prov} value={prov || ""}>{prov}</option>
            ))}
          </select>
          <select
            value={selectedBrand || ''}
            onChange={e => setSelectedBrand(e.target.value || null)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="">{t('inventory.brand') || 'Brand'}</option>
            {Array.from(new Set(items.map(i => i.brand).filter(Boolean))).map(brand => (
              <option key={brand} value={brand || ""}>{brand}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="name">{t('inventory.sortByName') || 'Sort by Name'}</option>
            <option value="price">{t('inventory.sortByPrice') || 'Sort by Price'}</option>
            <option value="cost">{t('inventory.sortByCost') || 'Sort by Cost'}</option>
          </select>
          <button
            type="button"
            className="border rounded px-2 py-1 text-sm"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
           <Button
             size="sm"
             variant="outline"
             className="h-8 gap-1"
             onClick={() => {
               const filtered = getFilteredItems(activeTab as any);
               localStorage.setItem('exportItems', JSON.stringify(filtered));
               window.open('/inventory/export', '_blank');
             }}
           >
             <File className="h-3.5 w-3.5" />
             <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
               {t('common.export')}
             </span>
           </Button>
          <Button size="sm" className="h-8 gap-1" onClick={() => setIsAddItemDialogOpen(true)}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              {t('inventory.addItem')}
            </span>
          </Button>
        </div>
      </div>
      <ConfirmDialog
        open={deleteItemId !== null}
        title={t('inventory.deleteItem')}
        description={t('inventory.deleteConfirm')}
        confirmText={t('common.delete')}
        cancelText={t('common.cancel')}
        onConfirm={handleDeleteItem}
        onCancel={() => setDeleteItemId(null)}
      />
  <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
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
                  <DropdownMenuCheckboxItem
                    key={cat}
                    checked={selectedCategory === cat}
                    onCheckedChange={(checked) => setSelectedCategory(checked ? cat : null)}
                  >
                    {cat}
                  </DropdownMenuCheckboxItem>
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
      <ItemDetailsDialog
        open={!!selectedItem}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
      <EditItemForm
        open={!!editItem}
        item={editItem}
        onFormSubmit={handleEditSubmit}
        onCancel={() => setEditItem(null)}
      />
      <AddItemForm
        open={isAddItemDialogOpen}
        onFormSubmit={() => {
          setIsAddItemDialogOpen(false);
          fetchItems();
        }}
        onCancel={() => setIsAddItemDialogOpen(false)}
      />
    </div>
  );
}
