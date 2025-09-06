import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ReactNode } from "react";
import { useTranslation } from "@/hooks/use-translation";

interface DialogHeaderWithDescriptionProps {
  title: string;
  description?: string;
  titleKey?: string;
  descriptionKey?: string;
  defaultTitle?: string;
  defaultDescription?: string;
  children?: ReactNode;
}

export function DialogHeaderWithDescription({
  title,
  description,
  titleKey,
  descriptionKey,
  defaultTitle,
  defaultDescription,
  children,
}: DialogHeaderWithDescriptionProps) {
  const { t } = useTranslation();
  return (
    <DialogHeader>
      <DialogTitle>
        {titleKey ? t(titleKey, { defaultValue: defaultTitle || title }) : title}
      </DialogTitle>
      {(descriptionKey || description) && (
        <DialogDescription>
          {descriptionKey ? t(descriptionKey, { defaultValue: defaultDescription || description }) : description}
        </DialogDescription>
      )}
      {children}
    </DialogHeader>
  );
}
