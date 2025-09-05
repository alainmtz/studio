"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function ProjectsPage() {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('projects.title')}</CardTitle>
        <CardDescription>{t('projects.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg">
            <Package className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">{t('projects.noProjects')}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
                {t('projects.noProjectsDescription')}
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
