"use client";

import Link from "next/link";
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
import { Logo } from "@/components/icons";
import { useTranslation } from "@/hooks/use-translation";

export default function SignupPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted/40">
       <div className="grid gap-6">
        <div className="flex items-center justify-center gap-2 text-foreground">
          <Logo className="h-7 w-7" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Stockpile Manager
          </h1>
        </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{t('signup.title')}</CardTitle>
          <CardDescription>
            {t('signup.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">{t('signup.firstName')}</Label>
                <Input id="first-name" placeholder="Max" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">{t('signup.lastName')}</Label>
                <Input id="last-name" placeholder="Robinson" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">{t('signup.email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">{t('signup.password')}</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full" asChild>
                <Link href="/dashboard">{t('signup.createAccountButton')}</Link>
            </Button>
            <Button variant="outline" className="w-full">
              {t('signup.signUpWithGoogle')}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            {t('signup.haveAccount')}{" "}
            <Link href="/login" className="underline">
              {t('signup.logInLink')}
            </Link>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
