import { Button } from "../ui/button";
import type { FloodKitItemData } from "@/types/floodKit";
import { getIconForFloodKitItem } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface FloodKitItemProps {
  item: FloodKitItemData;
  onViewFullGuide?: () => void;
  completedSteps: Record<number, boolean>;
  onStepCompletionChange: (stepNumber: number, checked: boolean) => void;
}

function FloodKitItem({
  item,
  onViewFullGuide,
  completedSteps,
  onStepCompletionChange,
}: FloodKitItemProps) {
  const Icon = getIconForFloodKitItem(item.title);

  return (
    <>
      <Card
        className={cn(
          Object.values(completedSteps).every((step) => step === true) &&
            "border-0.5 rounded-md border-green-500 bg-green-500/10",
        )}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Checkbox
              checked={Object.values(completedSteps).every(
                (step) => step === true,
              )}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  item.installationSteps.forEach((step) => {
                    onStepCompletionChange(step.step, true);
                  });
                } else {
                  item.installationSteps.forEach((step) => {
                    onStepCompletionChange(step.step, false);
                  });
                }
              }}
              className={cn(
                "size-5",
                Object.values(completedSteps).every((step) => step === true) &&
                  "data-[state=checked]:border-black data-[state=checked]:bg-black data-[state=checked]:text-white",
              )}
            />
            <Icon className="h-5 w-5" />
            {item.title}
            <div className="ml-auto flex items-center gap-2">
              <Badge variant="default">
                {
                  Object.values(completedSteps).filter((step) => step === true)
                    .length
                }
                /{item.installationSteps.length} Steps
              </Badge>
              {Object.values(completedSteps).every((step) => step === true) ? (
                <Badge variant="success">Completed</Badge>
              ) : (
                <Badge variant="outline">Not Installed</Badge>
              )}
            </div>
          </CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <p className="text-sm text-muted-foreground">Size: {item.size}</p>
            <p className="text-sm text-muted-foreground">
              Rating: {item.rating}
            </p>
            {item.installationDate &&
            Object.values(completedSteps).every((step) => step === true) ? (
              <p className="text-sm text-muted-foreground">
                Installed:{" "}
                {new Date(item.installationDate).toLocaleDateString("en-GB")}
              </p>
            ) : null}
          </div>
          <div className="mt-2">
            {item.priority === "high" ? (
              <Badge variant="destructive" className="w-fit">
                High Priority
              </Badge>
            ) : item.priority === "medium" ? (
              <Badge
                variant="outline"
                className="w-fit border-orange-500 text-orange-600"
              >
                Medium Priority
              </Badge>
            ) : (
              <Badge variant="outline" className="w-fit">
                Low Priority
              </Badge>
            )}
          </div>
          <div className="mt-4 flex flex-col gap-2">
            {item.installationSteps.map((step) => (
              <div key={step.step} className="flex items-center gap-2">
                <Checkbox
                  checked={completedSteps[step.step] ?? false}
                  onCheckedChange={(checked) =>
                    onStepCompletionChange(step.step, checked === true)
                  }
                />
                <p
                  className={cn(
                    "text-sm",
                    completedSteps[step.step]
                      ? "text-green-600"
                      : "text-muted-foreground",
                  )}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          {onViewFullGuide && (
            <div className="mt-4">
              <Button
                onClick={onViewFullGuide}
                variant="outline"
                className="w-full"
              >
                View Full Installation Guide
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export { FloodKitItem };
