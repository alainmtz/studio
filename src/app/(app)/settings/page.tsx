
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
import { useTranslation } from "@/hooks/use-translation";

export default function SettingsPage() {
  const { t } = useTranslation();

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
              <Button>{t('common.save')}</Button>
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
          <form className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="db-host">{t('settings.database.host')}</Label>
                <Input id="db-host" placeholder="localhost" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="db-port">{t('settings.database.port')}</Label>
                <Input id="db-port" placeholder="5432" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="db-user">{t('settings.database.username')}</Label>
                <Input id="db-user" placeholder="admin" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="db-password">{t('settings.database.password')}</Label>
                <Input id="db-password" type="password" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">{t('settings.database.testConnection')}</Button>
              <Button>{t('common.save')}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
