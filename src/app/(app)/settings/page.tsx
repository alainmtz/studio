
"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SettingsPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="theme">Theme</Label>
              <ThemeToggle />
            </div>
            <div className="flex justify-start">
              <Button>Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Database</CardTitle>
          <CardDescription>
            Configure the connection to your database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="db-host">Host</Label>
                <Input id="db-host" placeholder="localhost" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="db-port">Port</Label>
                <Input id="db-port" placeholder="5432" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="db-user">Username</Label>
                <Input id="db-user" placeholder="admin" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="db-password">Password</Label>
                <Input id="db-password" type="password" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Test Connection</Button>
              <Button>Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
