import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import type { FloodKitItemData } from "@/types/floodKit";

type Step = {
  id: string;
  // URL-based steps
  path?: string;
  // Callback-based steps
  onClick?: () => void;
  // Item-based steps
  itemId?: number;
  getItemPath?: (itemId: number) => string;
  completed?: boolean;
};

function getStepType(step: Step): "url" | "callback" | "item" {
  if (step.path) {
    return "url";
  }
  if (step.onClick) {
    return "callback";
  }
  if (step.itemId !== undefined) {
    return "item";
  }
  return "url"; // default
}

function navigateToStep(
  step: Step,
  navigate: (path: string) => void,
  getItemPath?: (itemId: number) => string,
  items?: FloodKitItemData[],
) {
  const type = getStepType(step);
  switch (type) {
    case "url":
      if (step.path) {
        navigate(step.path);
      }
      break;
    case "callback":
      if (step.onClick) {
        step.onClick();
      }
      break;
    case "item":
      if (step.itemId && items && getItemPath) {
        const item = items.find((item) => item.id === step.itemId);
        if (item) {
          navigate(getItemPath(item.id));
        }
      }
      break;
    default:
      console.error(`Invalid step type: ${type}`);
      break;
  }
}

type StepIndicatorProps = {
  steps: Step[];
  currentStepId: string;
  className?: string;
  // Optional props for item-based steps
  items?: FloodKitItemData[];
  getItemPath?: (itemId: number) => string;
};

function StepIndicator({
  steps,
  currentStepId,
  className,
  items,
  getItemPath,
}: StepIndicatorProps) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const currentIndex = steps.findIndex((step) => step.id === currentStepId);
  const currentStepNumber = currentIndex >= 0 ? currentIndex + 1 : 1;
  const totalSteps = steps.length;

  const handleStepClick = (step: Step) => {
    navigateToStep(step, navigate, getItemPath, items);
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {/* Step count badge */}
      <Badge variant="outline" className="shrink-0">
        Step {currentStepNumber} of {totalSteps}
      </Badge>

      {/* Step indicators - dots/bars */}
      <div className="flex items-center justify-center gap-2">
        {steps.map((step, idx) => {
          const isActive = step.id === currentStepId;
          const isCompleted = step.completed ?? false;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => handleStepClick(step)}
              className={cn(
                "cursor-pointer rounded-full transition-all hover:opacity-80",
                isActive
                  ? isMobile
                    ? "h-4 w-12 bg-black"
                    : "h-4 w-10 bg-black"
                  : isCompleted
                    ? "h-4 w-4 bg-black"
                    : "h-4 w-4 bg-gray-300 hover:bg-gray-400",
              )}
              aria-label={`Go to step ${idx + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export { StepIndicator };
