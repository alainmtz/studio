import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ItemDetails } from "@/components/item-details";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import type { Item } from "@/data/items";

interface ItemDetailsDialogProps {
  open: boolean;
  item: Item | null;
  onClose: () => void;
}

export const ItemDetailsDialog: React.FC<ItemDetailsDialogProps> = ({ open, item, onClose }) => {
  if (!item) return null;
    return (
      <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              <VisuallyHidden>
                {item?.name || "Item Details"}
              </VisuallyHidden>
            </DialogTitle>
          </DialogHeader>
          <ItemDetails item={item} />
        </DialogContent>
      </Dialog>
    );
};
