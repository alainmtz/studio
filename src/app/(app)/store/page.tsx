"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function StorePage() {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('store.title')}</CardTitle>
        <CardDescription>{t('store.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">{t('store.underDevelopment')}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
                {t('store.underDevelopmentDescription')}
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
