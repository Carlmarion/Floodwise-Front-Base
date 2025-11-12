import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink, Play } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { getIconForFloodKitItem } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import type { FloodKitItemData } from "@/types/floodKit";

interface FloodKitInstallationViewProps {
  items: FloodKitItemData[];
  selectedItemId: number | null;
  onClose: () => void;
  onSelectItem: (itemId: number) => void;
  completedSteps: Record<number, Record<number, boolean>>;
  onStepCompletionChange: (
    itemId: number,
    stepNumber: number,
    checked: boolean,
  ) => void;
}

function FloodKitInstallationView({
  items,
  selectedItemId,
  onClose,
  onSelectItem,
  completedSteps,
  onStepCompletionChange,
}: FloodKitInstallationViewProps) {
  const isMobile = useIsMobile();
  const [navigationDirection, setNavigationDirection] = React.useState<
    "forward" | "backward" | null
  >(null);

  const selectedItem = items.find((item) => item.id === selectedItemId);
  const currentIndex = selectedItem
    ? items.findIndex((item) => item.id === selectedItem.id)
    : -1;
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }, 50);
    return () => clearTimeout(timeout);
  }, [selectedItemId]);

  const goToPreviousItem = React.useCallback(() => {
    if (hasPrevious) {
      setNavigationDirection("backward");
      onSelectItem(items[currentIndex - 1].id);
    }
  }, [hasPrevious, currentIndex, items, onSelectItem]);

  const goToNextItem = React.useCallback(() => {
    if (hasNext) {
      setNavigationDirection("forward");
      onSelectItem(items[currentIndex + 1].id);
    }
  }, [hasNext, currentIndex, items, onSelectItem]);

  if (!selectedItem) return null;

  const itemSteps = completedSteps[selectedItem.id] || {};
  const totalSteps = selectedItem.installationSteps.length;
  const completedCount = Object.values(itemSteps).filter(Boolean).length;
  const progress = Math.round((completedCount / totalSteps) * 100);
  const Icon = getIconForFloodKitItem(selectedItem.title);

  // Animation variants based on direction
  const getAnimationVariants = () => {
    if (navigationDirection === "forward") {
      return {
        initial: { x: "100%", opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: "-100%", opacity: 0 },
      };
    } else if (navigationDirection === "backward") {
      return {
        initial: { x: "-100%", opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: "100%", opacity: 0 },
      };
    } else {
      return {
        initial: { y: "100%", opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: "100%", opacity: 0 },
      };
    }
  };

  const NavigationControls = () => (
    <>
      <div className="flex items-center justify-between gap-4">
        <Button
          onClick={goToPreviousItem}
          disabled={!hasPrevious}
          variant="outline"
          size={isMobile ? "lg" : "default"}
          className={isMobile ? "flex-1" : ""}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Badge variant="outline" className="shrink-0">
          Step {currentIndex + 1} of {items.length}
        </Badge>
        <Button
          onClick={goToNextItem}
          disabled={!hasNext}
          variant="outline"
          size={isMobile ? "lg" : "default"}
          className={isMobile ? "flex-1" : ""}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Step Indicators - Centered */}
      <div className="mt-2 flex items-center justify-center gap-2">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => {
              setNavigationDirection(
                idx > currentIndex ? "forward" : "backward",
              );
              onSelectItem(item.id);
            }}
            className={cn(
              "cursor-pointer rounded-full transition-all hover:opacity-80",
              idx === currentIndex
                ? isMobile
                  ? "h-4 w-12 bg-black"
                  : "h-4 w-10 bg-black"
                : "h-4 w-4 bg-gray-300 hover:bg-gray-400",
            )}
            aria-label={`Go to step ${idx + 1}`}
          />
        ))}
      </div>
    </>
  );

  return (
    <div className="flex h-full flex-col bg-white">
      <div
        className={cn(
          "flex flex-1 flex-col overflow-hidden",
          isMobile && "pb-28",
        )}
      >
        {/* Container wrapper for consistent width */}
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <div className={cn("border-b pb-4 pt-2", isMobile && "pl-4")}>
            <Button onClick={onClose} variant="outline" size="sm">
              <X className="h-4 w-4" />
              Back to Flood Kit
            </Button>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="border-x border-b p-4">
              <NavigationControls />
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className={cn(
            "flex-1 overflow-y-auto p-4 md:p-6",
            isMobile && "pb-28",
          )}
          ref={scrollContainerRef}
        >
          <div className="mx-auto max-w-4xl">
            <AnimatePresence mode="wait" custom={navigationDirection}>
              <motion.div
                key={selectedItem.id}
                {...getAnimationVariants()}
                transition={{
                  type: "spring",
                  damping: 30,
                  stiffness: 300,
                }}
              >
                {/* Item Header */}
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border bg-gray-100">
                    <Icon className="h-8 w-8 text-gray-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold">
                      {selectedItem.title}
                    </h1>
                    <p className="text-muted-foreground">
                      {selectedItem.size} • {selectedItem.rating}
                    </p>
                  </div>
                </div>

                {/* Cards */}
                <div className="mt-6 space-y-4">
                  {/* Progress Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Installation Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {completedCount === totalSteps && totalSteps > 0 && (
                        <Badge variant="success" className="mb-4">
                          Installed
                        </Badge>
                      )}
                      <div className="flex items-center justify-between">
                        <p className="text-3xl font-bold">{progress}%</p>
                        <Badge variant="outline">
                          {completedCount}/{totalSteps} Steps
                        </Badge>
                      </div>
                      <div className="relative mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Specifications Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Specifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Size</p>
                          <p className="font-medium">{selectedItem.size}</p>
                        </div>
                        {selectedItem.rating && (
                          <div>
                            <p className="text-sm text-gray-500">Priority</p>
                            <Badge variant="destructive">
                              {selectedItem.rating}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Installation Video Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Installation Video</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-gray-900 to-gray-700">
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white">
                          <Play className="h-16 w-16" />
                          <h4 className="text-lg font-semibold">
                            Step-by-step visual guide
                          </h4>
                          <p className="text-sm text-gray-300">
                            Duration: 4:30
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Installation Steps Card */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Installation Steps</CardTitle>
                        <Badge variant="outline">
                          {completedCount}/{totalSteps} completed
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedItem.installationSteps.map((step) => {
                          const isCompleted =
                            itemSteps[step.step] ?? step.isCompleted;
                          return (
                            <div
                              key={step.step}
                              className={cn(
                                "rounded-lg border p-4",
                                isCompleted
                                  ? "border-green-200 bg-green-50"
                                  : "border-gray-200 bg-white",
                              )}
                            >
                              <div className="flex items-start gap-3">
                                <Checkbox
                                  checked={isCompleted}
                                  onCheckedChange={(checked) =>
                                    onStepCompletionChange(
                                      selectedItem.id,
                                      step.step,
                                      checked === true,
                                    )
                                  }
                                  className="mt-1"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      variant="outline"
                                      className={cn(
                                        "shrink-0",
                                        isCompleted
                                          ? "border-green-600 text-green-600"
                                          : "border-gray-300 text-gray-600",
                                      )}
                                    >
                                      {step.step}
                                    </Badge>
                                    <h5
                                      className={cn(
                                        "font-semibold",
                                        isCompleted
                                          ? "text-green-700"
                                          : "text-gray-900",
                                      )}
                                    >
                                      Step {step.step}
                                    </h5>
                                  </div>
                                  <p
                                    className={cn(
                                      "mt-2 text-sm",
                                      isCompleted
                                        ? "text-green-700"
                                        : "text-muted-foreground",
                                    )}
                                  >
                                    {step.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Additional Resources Card */}
                  {selectedItem.videoUrl && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Additional Resources</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" asChild>
                          <a
                            href={selectedItem.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Manufacturer's Website
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Navigation - Fixed at Bottom */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white shadow-lg">
            <div className="p-3">
              <NavigationControls />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { FloodKitInstallationView };
