import {
  MoreHorizontal,
  PlusCircle,
  File,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Suppliers</CardTitle>
                <CardDescription>
                Manage your suppliers and their contact information.
                </CardDescription>
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
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Supplier Name</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Phone</TableHead>
              <TableHead className="text-right">Items Supplied</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell className="font-medium">{supplier.name}</TableCell>
                <TableCell>{supplier.contactPerson}</TableCell>
                <TableCell className="hidden md:table-cell">{supplier.email}</TableCell>
                <TableCell className="hidden md:table-cell">{supplier.phone}</TableCell>
                <TableCell className="text-right">{supplier.itemsSupplied}</TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-5</strong> of <strong>{suppliers.length}</strong> suppliers
        </div>
      </CardFooter>
    </Card>
  );
}
