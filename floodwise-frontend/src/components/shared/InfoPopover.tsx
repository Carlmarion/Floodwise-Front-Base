import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";

export function InfoPopover({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className="touch-manipulation" aria-label={title}>
          <Info className="size-5 text-blue-500" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 border-2 border-gray-200 bg-white p-4"
        sideOffset={10}
        align="start"
      >
        <h3 className="text-sm font-bold">{title}</h3>
        <p className="text-sm text-gray-500">{content}</p>
      </PopoverContent>
    </Popover>
  );
}
