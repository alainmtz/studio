
"use client"
import { useEffect, useState } from "react";
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
import { useTranslation } from "@/hooks/use-translation";
import { useToast } from "@/hooks/use-toast";
import { testDbConnection } from "@/actions/test-db-connection";

export default function SettingsPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [dbConfig, setDbConfig] = useState({
    host: "",
    port: "",
    user: "",
    password: "",
  });
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    const savedConfig = localStorage.getItem("dbConfig");
    if (savedConfig) {
      setDbConfig(JSON.parse(savedConfig));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setDbConfig((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("dbConfig", JSON.stringify(dbConfig));
    toast({
      title: "Settings Saved",
      description: "Database configuration has been saved locally.",
    });
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    toast({
        title: "Testing Connection...",
        description: "Attempting to connect to the database.",
    });
    try {
        const result = await testDbConnection();
        if (result.success) {
            toast({
                title: "Connection Successful",
                description: "Successfully connected to the database.",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Connection Failed",
                description: result.error,
            });
        }
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Connection Error",
            description: "An unexpected error occurred while testing the connection.",
        });
    } finally {
        setIsTesting(false);
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.appearance.title')}</CardTitle>
          <CardDescription>
            {t('settings.appearance.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="theme">{t('settings.appearance.theme')}</Label>
              <ThemeToggle />
            </div>
            <div className="flex justify-start">
              <Button type="button">{t('common.save')}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.database.title')}</CardTitle>
          <CardDescription>
            {t('settings.database.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="host">{t('settings.database.host')}</Label>
                <Input id="host" placeholder="localhost" value={dbConfig.host} onChange={handleInputChange}/>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="port">{t('settings.database.port')}</Label>
                <Input id="port" placeholder="3306" value={dbConfig.port} onChange={handleInputChange}/>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="user">{t('settings.database.username')}</Label>
                <Input id="user" placeholder="admin" value={dbConfig.user} onChange={handleInputChange}/>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">{t('settings.database.password')}</Label>
                <Input id="password" type="password" value={dbConfig.password} onChange={handleInputChange}/>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleTestConnection} disabled={isTesting}>
                {isTesting ? "Testing..." : t('settings.database.testConnection')}
              </Button>
              <Button onClick={handleSave}>{t('common.save')}</Button>
            </div>
            <p className="text-xs text-muted-foreground">
                Note: Settings are saved in your browser's local storage. You must add the final credentials to the .env file for the application to use them.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
