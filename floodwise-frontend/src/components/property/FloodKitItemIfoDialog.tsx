import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Earth } from "lucide-react";
import type { FloodKitItemData } from "@/types/property";
import { getIconForFloodKitItem } from "@/lib/utils";

interface FloodKitItemInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: FloodKitItemData;
}

function FloodKitItemInfoDialog({
  open,
  onOpenChange,
  item,
}: FloodKitItemInfoDialogProps) {
  const Icon = getIconForFloodKitItem(item.title);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            {item.title} Installation Instructions
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-1 flex-col space-y-4 overflow-y-auto">
          <video
            src={item.videoUrl}
            controls
            className="h-auto max-h-[400px] w-full rounded-lg"
          />
          <div>
            <h3 className="flex items-center gap-2 text-lg font-medium">
              <Icon className="h-5 w-5 shrink-0" />
              Installation Instructions
            </h3>
            <DialogDescription className="max-h-[200px] overflow-y-auto">
              {item.description}
            </DialogDescription>
          </div>
          <div className="instructions-element">
            <div className="flex items-center gap-2">
              <Earth className="h-4 w-4 shrink-0" />
              <h3>Additional Resources</h3>
            </div>
            <div className="space-y-2">
              <ul className="list-inside list-disc">
                <li>
                  {/* TODO: Add real links there instead of mocks */}
                  <a href={`/flood-kit-items/${item.id}/instructions.pdf`}>
                    Dowload detailed PDF instructions for {item.title}
                  </a>
                </li>
                <li>
                  <a href={`/flood-kit-items/${item.id}/manufacturer-website`}>
                    Manufacturers website
                  </a>
                </li>
                <li>
                  <a href={`/flood-kit-items/${item.id}/resources`}>
                    Having trouble installing? Check our resources center
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { FloodKitItemInfoDialog };
