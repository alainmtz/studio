import Image from "next/image";
import Link from "next/link";
import {
  MoreHorizontal,
  PlusCircle,
  File,
  ListFilter,
} from "lucide-react";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const items = [
  { id: "1", name: "Laser-Guided Widget", sku: "LGW-001", stock: 120, price: 49.99, status: "in-stock", category: "Widgets" },
  { id: "2", name: "Hyper-Flux Capacitor", sku: "HFC-002", stock: 15, price: 199.99, status: "low-stock", category: "Capacitors" },
  { id: "3", name: "Quantum Sprocket", sku: "QS-003", stock: 0, price: 99.99, status: "out-of-stock", category: "Sprockets" },
  { id: "4", name: "Nano-Enhanced Gear", sku: "NEG-004", stock: 75, price: 29.99, status: "in-stock", category: "Gears" },
  { id: "5", name: "Chrono-Stabilizer Unit", sku: "CSU-005", stock: 30, price: 349.99, status: "in-stock", category: "Stabilizers" },
  { id: "6", name: "Plasma-Infused Screw", sku: "PIS-006", stock: 8, price: 2.99, status: "low-stock", category: "Fasteners" },
];

export default function InventoryPage() {
  return (
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
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                In Stock
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Low Stock</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Out of Stock
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
      <TabsContent value="all">
        <Card>
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
            <CardDescription>
              Manage your products and view their inventory status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Stock
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        width="64"
                        src={`https://picsum.photos/seed/${item.sku}/64/64`}
                        data-ai-hint="product image"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link href={`/inventory/${item.id}`} className="hover:underline">
                        {item.name}
                      </Link>
                      <div className="text-sm text-muted-foreground">{item.sku}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'out-of-stock' ? 'destructive' : 'secondary'} className={item.status === 'low-stock' ? 'bg-yellow-400/20 text-yellow-600 dark:text-yellow-300' : item.status === 'in-stock' ? 'bg-green-400/20 text-green-700 dark:text-green-300' : ''}>
                        {item.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {item.stock}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-6</strong> of <strong>{items.length}</strong> products
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
