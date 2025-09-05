import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function ReportsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports</CardTitle>
        <CardDescription>Generate and view reports on your inventory.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg">
            <BarChart3 className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Reporting Feature Coming Soon</h3>
            <p className="mt-2 text-sm text-muted-foreground">
                Detailed reports on inventory levels, movements, and history will be available here.
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
