import * as React from "react";
import { FloodKitInstallationView } from "../components/flood-kit/FloodKitInstallationView";
import { FloodKitList } from "../components/flood-kit/FloodKitList";
import { FloodKitProgressCard } from "../components/flood-kit/FloodKitProgressCard";
import { mockFloodKitItems, isItemInstalled } from "@/lib/utils";
import type { FloodKitItemData } from "@/types/floodKit";

function MyFloodKit() {
  // TODO: Replace with API call - fetch floodKitItems from database on mount
  // TODO: Add loading state (useState<boolean>) and error handling
  // TODO: Consider using React Query or SWR for data fetching and caching
  const [floodKitItems, setFloodKitItems] = React.useState<FloodKitItemData[]>(
    () => mockFloodKitItems as FloodKitItemData[],
  );
  void setFloodKitItems; // Reserved for future API integration
  const [selectedItemId, setSelectedItemId] = React.useState<number | null>(
    null,
  );

  // State resides in the parent component to avoid props drilling since it also exists in the floodkit installation view and the item component
  // TODO: completedSteps may come from API/database instead of initializing from item data
  // TODO: Consider fetching user's step completion state separately or as part of items response
  const [completedSteps, setCompletedSteps] = React.useState<
    Record<number, Record<number, boolean>>
  >(() => {
    // Initialize from item data
    const initial: Record<number, Record<number, boolean>> = {};
    floodKitItems.forEach((item) => {
      const itemSteps: Record<number, boolean> = {};
      item.installationSteps.forEach((step) => {
        itemSteps[step.step] = step.isCompleted;
      });
      initial[item.id] = itemSteps;
    });
    return initial;
  });

  // TODO: Add API call to persist step completion to database
  // TODO: Consider optimistic updates with rollback on error
  // TODO: May need to debounce/throttle rapid checkbox clicks
  const handleStepCompletion = React.useCallback(
    (itemId: number, stepNumber: number, checked: boolean) => {
      setCompletedSteps((prev) => ({
        ...prev,
        [itemId]: {
          ...(prev[itemId] || {}),
          [stepNumber]: checked,
        },
      }));
      // TODO: API call here - e.g., updateStepCompletion(itemId, stepNumber, checked)
    },
    [],
  );

  // TODO: Add API call to persist item installed state and installationDate to database
  // TODO: Consider optimistic updates with rollback on error
  // TODO: May need to handle partial failures (item updated but steps not)
  // TODO: API call here - e.g., updateItemInstallationStatus(itemId, installed, installationDate, allSteps)

  const getNextUninstalledItem = React.useCallback((): number | null => {
    const highPriorityUninstalled = floodKitItems.find(
      (item) =>
        item.priority === "high" && !isItemInstalled(item, completedSteps),
    );
    if (highPriorityUninstalled) {
      return highPriorityUninstalled.id;
    }

    const uninstalledItem = floodKitItems.find(
      (item) => !isItemInstalled(item, completedSteps),
    );
    if (uninstalledItem) {
      return uninstalledItem.id;
    }

    return null;
  }, [floodKitItems, completedSteps]);

  // Calculate installed items count
  const installedItems = React.useMemo(
    () =>
      floodKitItems.filter((item) => isItemInstalled(item, completedSteps))
        .length,
    [floodKitItems, completedSteps],
  );
  const totalItems = floodKitItems.length;

  if (selectedItemId) {
    return (
      <div className="flex-1 overflow-hidden">
        <FloodKitInstallationView
          items={floodKitItems}
          selectedItemId={selectedItemId}
          onClose={() => setSelectedItemId(null)}
          onSelectItem={setSelectedItemId}
          completedSteps={completedSteps}
          onStepCompletionChange={handleStepCompletion}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto p-4 md:p-6">
      <div className="container mx-auto space-y-6">
        <FloodKitProgressCard
          installedItems={installedItems}
          totalItems={totalItems}
          getNextUninstalledItem={getNextUninstalledItem}
          onViewFullGuide={(itemId) => setSelectedItemId(itemId)}
        />
        <FloodKitList
          items={floodKitItems}
          completedSteps={completedSteps}
          onViewFullGuide={(itemId) => setSelectedItemId(itemId)}
          onStepCompletionChange={handleStepCompletion}
        />
      </div>
    </div>
  );
}

export { MyFloodKit };
