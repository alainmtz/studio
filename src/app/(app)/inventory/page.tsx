
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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ItemDetails } from "@/components/item-details";

const items = [
  { id: "1", name: "Laser-Guided Widget", sku: "LGW-001", stock: 120, price: 49.99, status: "in-stock", category: "Widgets", description: "A high-precision widget with laser guidance for optimal performance.", supplier: { id: "1", name: "FutureTech Dynamics" }, images: [{ url: 'https://picsum.photos/seed/LGW-001/600/600', alt: 'Main view' }] },
  { id: "2", name: "Hyper-Flux Capacitor", sku: "HFC-002", stock: 15, price: 199.99, status: "low-stock", category: "Capacitors", description: "A state-of-the-art capacitor designed for temporal displacement and high-energy applications. Features a self-regulating energy core and a durable titanium-alloy casing.", supplier: { id: "1", name: "FutureTech Dynamics" }, images: [ { url: 'https://picsum.photos/seed/HFC-002-1/600/600', alt: 'Main view' }, { url: 'https://picsum.photos/seed/HFC-002-2/600/600', alt: 'Side view' }, { url: 'https://picsum.photos/seed/HFC-002-3/600/600', alt: 'In-use' }] },
  { id: "3", name: "Quantum Sprocket", sku: "QS-003", stock: 0, price: 99.99, status: "out-of-stock", category: "Sprockets", description: "A sprocket that operates on quantum principles, allowing for near-frictionless rotation.", supplier: { id: "2", name: "Quantum Innovations" }, images: [{ url: 'https://picsum.photos/seed/QS-003/600/600', alt: 'Main view' }] },
  { id: "4", name: "Nano-Enhanced Gear", sku: "NEG-004", stock: 75, price: 29.99, status: "in-stock", category: "Gears", description: "A gear infused with nanobots for self-repair and enhanced durability.", supplier: { id: "4", name: "Apex Machining" }, images: [{ url: 'https://picsum.photos/seed/NEG-004/600/600', alt: 'Main view' }] },
  { id: "5", name: "Chrono-Stabilizer Unit", sku: "CSU-005", stock: 30, price: 349.99, status: "in-stock", category: "Stabilizers", description: "A device that stabilizes temporal fields, essential for any time-traveling apparatus.", supplier: { id: "1", name: "FutureTech Dynamics" }, images: [{ url: 'https://picsum.photos/seed/CSU-005/600/600', alt: 'Main view' }] },
  { id: "6", name: "Plasma-Infused Screw", sku: "PIS-006", stock: 8, price: 2.99, status: "low-stock", category: "Fasteners", description: "A screw coated in a thin layer of plasma for superior grip and heat resistance.", supplier: { id: "3", name: "Stellar Components Co." }, images: [{ url: 'https://picsum.photos/seed/PIS-006/600/600', alt: 'Main view' }] },
];

export type Item = (typeof items)[0];

export default function InventoryPage() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

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
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                </div>
                 <Badge variant={item.status === 'out-of-stock' ? 'destructive' : 'secondary'} className={`w-fit ${item.status === 'low-stock' ? 'bg-yellow-400/20 text-yellow-600 dark:text-yellow-300' : item.status === 'in-stock' ? 'bg-green-400/20 text-green-700 dark:text-green-300' : ''}`}>
                    {item.status.replace('-', ' ')}
                 </Badge>
            </CardContent>
            <CardFooter className="p-4 flex items-center justify-between border-t">
                <div className="text-lg font-semibold">
                    ${item.price.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">
                    {item.stock} in stock
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
          <h1 className="text-2xl font-semibold">Inventory</h1>
          <p className="text-muted-foreground">Manage your products and view their inventory status.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Item
            </span>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="in-stock">In-stock</TabsTrigger>
            <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
            <TabsTrigger value="out-of-stock">Out of stock</TabsTrigger>
          </TabsList>
           <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter by Category
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by category</DropdownMenuLabel>
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
    </div>
  );
}
