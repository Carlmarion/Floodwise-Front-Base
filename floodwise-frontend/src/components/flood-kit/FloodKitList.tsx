import * as React from "react";
import { Card, CardHeader } from "../ui/card";
import type { FloodKitItemData } from "../../types/floodKit";
import { Badge } from "../ui/badge";
import { Package, ChevronDown, ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { FloodKitItem } from "./FloodKitItem";
import { getIconForFloodKitItem, isItemInstalled } from "@/lib/utils";

interface Category {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  items: (FloodKitItemData & {
    location?: string;
    quantity?: number;
    cost?: number;
  })[];
}

// Helper function to categorize items
function categorizeItems(items: FloodKitItemData[]): Category[] {
  const categories: Record<string, Category> = {};

  items.forEach((item) => {
    const lowerTitle = item.title.toLowerCase();
    let categoryName = "Other";
    let Icon = Package;

    if (
      lowerTitle.includes("door") ||
      lowerTitle.includes("window") ||
      lowerTitle.includes("seal")
    ) {
      categoryName = "Doors & Windows";
      Icon = getIconForFloodKitItem(item.title);
    } else if (
      lowerTitle.includes("air brick") ||
      lowerTitle.includes("airbrick") ||
      lowerTitle.includes("vent")
    ) {
      categoryName = "Ventilation";
      Icon = getIconForFloodKitItem(item.title);
    } else if (
      lowerTitle.includes("toilet") ||
      lowerTitle.includes("bath") ||
      lowerTitle.includes("plumbing")
    ) {
      categoryName = "Plumbing";
      Icon = getIconForFloodKitItem(item.title);
    } else if (
      lowerTitle.includes("sandbag") ||
      lowerTitle.includes("barrier")
    ) {
      categoryName = "Barriers";
      Icon = getIconForFloodKitItem(item.title);
    }

    if (!categories[categoryName]) {
      categories[categoryName] = {
        name: categoryName,
        icon: Icon,
        items: [],
      };
    }

    // Add mock location, quantity, and cost for demo
    categories[categoryName].items.push({
      ...item,
      location: lowerTitle.includes("door")
        ? "Front Door"
        : lowerTitle.includes("toilet")
          ? "Bathroom"
          : lowerTitle.includes("air brick")
            ? "Exterior Wall"
            : "Various",
      quantity: 1,
      cost:
        item.priority === "high" ? 285 : item.priority === "medium" ? 150 : 75,
    });
  });

  return Object.values(categories);
}

export function FloodKitList({
  items,
  completedSteps,
  onViewFullGuide,
  onStepCompletionChange,
}: {
  items: FloodKitItemData[];
  completedSteps: Record<number, Record<number, boolean>>;
  onViewFullGuide: (itemId: number) => void;
  onStepCompletionChange: (
    itemId: number,
    stepNumber: number,
    checked: boolean,
  ) => void;
}) {
  const [expandedCategories, setExpandedCategories] = React.useState<
    Set<string>
  >(new Set());

  const categories = categorizeItems(items);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryName)) {
        next.delete(categoryName);
      } else {
        next.add(categoryName);
      }
      return next;
    });
  };

  return (
    <div className="space-y-3">
      {categories.map((category) => {
        if (category.items.length === 0) return null;

        const allInstalled = category.items.every((item) =>
          isItemInstalled(item, completedSteps),
        );
        const installedCount = category.items.filter((item) =>
          isItemInstalled(item, completedSteps),
        ).length;
        const isExpanded = expandedCategories.has(category.name);
        const CategoryIcon = category.icon;

        return (
          <Card key={category.name}>
            <Collapsible
              open={isExpanded}
              onOpenChange={() => toggleCategory(category.name)}
            >
              <CollapsibleTrigger asChild>
                <button className="w-full">
                  <CardHeader className="cursor-pointer border-b hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded border bg-gray-50">
                          <CategoryIcon className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">
                              {category.name}
                            </h3>
                            {allInstalled && (
                              <Badge
                                variant="outline"
                                className="border-green-600 bg-green-50 text-green-600"
                              >
                                Completed
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {category.items.length} items • {installedCount}{" "}
                            installed
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{category.items.length}</Badge>
                        {isExpanded ? (
                          <ChevronDown className="h-5 w-5" />
                        ) : (
                          <ChevronRight className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-4 p-4">
                  {category.items.map((item) => {
                    const itemSteps = completedSteps[item.id] || {};

                    return (
                      <FloodKitItem
                        key={item.id}
                        item={item}
                        completedSteps={itemSteps}
                        onStepCompletionChange={(stepNumber, checked) => {
                          onStepCompletionChange(item.id, stepNumber, checked);
                        }}
                        onViewFullGuide={() => onViewFullGuide(item.id)}
                      />
                    );
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        );
      })}
    </div>
  );
}
