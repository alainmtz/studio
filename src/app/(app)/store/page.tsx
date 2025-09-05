import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

export default function StorePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Store</CardTitle>
        <CardDescription>A public-facing store for sales, with cart and warranty management.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Storefront Under Development</h3>
            <p className="mt-2 text-sm text-muted-foreground">
                Your integrated shop for sales, tickets, and warranties is being built.
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
