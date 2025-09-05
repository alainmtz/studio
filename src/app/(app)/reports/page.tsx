"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function ReportsPage() {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('reports.title')}</CardTitle>
        <CardDescription>{t('reports.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg">
            <BarChart3 className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">{t('reports.comingSoon')}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
                {t('reports.comingSoonDescription')}
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
