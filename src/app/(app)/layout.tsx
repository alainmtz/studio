import type { ReactNode } from "react";
import { AppLayout } from "@/components/app-layout";
import { LanguageProvider } from "@/hooks/use-translation";


export default function Layout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <AppLayout>{children}</AppLayout>
    </LanguageProvider>
  );
}
