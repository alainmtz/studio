import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account and application settings.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg">
            <Settings className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Settings Page Coming Soon</h3>
            <p className="mt-2 text-sm text-muted-foreground">
                This is where you'll manage your preferences and configurations.
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
