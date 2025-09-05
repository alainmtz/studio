import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";

export default function ProjectsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>Manage your electronic projects and associated stock items.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg">
            <Package className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No Projects Yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
                The projects section is under construction. Soon you'll be able to manage multi-user projects here.
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
