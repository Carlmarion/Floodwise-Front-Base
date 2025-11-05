import * as React from "react";
import { FloodKitItemInfoDialog } from "./FloodKitItemIfoDialog";
import { Button } from "../ui/button";
import type { FloodKitItemData } from "@/types/property";
import { getIconForFloodKitItem } from "@/lib/utils";

interface FloodKitItemProps {
  item: FloodKitItemData;
}

function FloodKitItem({ item }: FloodKitItemProps) {
  const [open, setOpen] = React.useState(false);
  const Icon = getIconForFloodKitItem(item.title);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        {item.title}
      </Button>
      <FloodKitItemInfoDialog open={open} onOpenChange={setOpen} item={item} />
    </>
  );
}

export { FloodKitItem };
