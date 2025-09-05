"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/hooks/use-translation";

export default function ProfilePage() {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('profile.title')}</CardTitle>
        <CardDescription>
          {t('profile.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">{t('profile.firstName')}</Label>
              <Input id="first-name" defaultValue="John" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">{t('profile.lastName')}</Label>
              <Input id="last-name" defaultValue="Doe" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{t('profile.email')}</Label>
            <Input id="email" type="email" defaultValue="john.doe@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">{t('profile.bio')}</Label>
            <Textarea
              id="bio"
              placeholder={t('profile.bioPlaceholder')}
              defaultValue="I am a software engineer specializing in building amazing web applications."
            />
          </div>
          <div className="flex justify-end">
            <Button>{t('common.save')}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
