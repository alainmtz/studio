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

const suppliers = [
  { id: "1", name: "FutureTech Dynamics", contactPerson: "Dr. Evelyn Reed", email: "e.reed@futuretech.io", phone: "+1-202-555-0145", itemsSupplied: 12 },
  { id: "2", name: "Quantum Innovations", contactPerson: "Marcus Thorne", email: "marcus.t@qi.com", phone: "+1-202-555-0189", itemsSupplied: 5 },
  { id: "3", name: "Stellar Components Co.", contactPerson: "Lila Chen", email: "l.chen@stellarcomp.net", phone: "+1-202-555-0122", itemsSupplied: 34 },
  { id: "4", name: "Apex Machining", contactPerson: "Javier Morales", email: "javi@apexmach.com", phone: "+1-202-555-0167", itemsSupplied: 8 },
  { id: "5", name: "BioSynth Labs", contactPerson: "Dr. Aris Thorne", email: "aris.t@biosynth.dev", phone: "+1-202-555-0193", itemsSupplied: 21 },
];

export default function SuppliersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
          <div>
              <h1 className="text-2xl font-semibold">Suppliers</h1>
              <p className="text-muted-foreground">
                Manage your suppliers and their contact information.
              </p>
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
                  Add Supplier
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
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>View Products</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
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
                <span>{supplier.itemsSupplied} items</span>
              </div>
              <Button variant="outline" size="sm">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="text-xs text-muted-foreground text-center">
          Showing <strong>1-{suppliers.length}</strong> of <strong>{suppliers.length}</strong> suppliers
      </div>
    </div>
  );
}
