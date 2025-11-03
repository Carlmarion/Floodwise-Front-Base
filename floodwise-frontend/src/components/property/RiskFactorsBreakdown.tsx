import * as React from "react";
import {
  AlertTriangle,
  Waves,
  Droplets,
  ArrowDown,
  CircleDot,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

type RiskLevel = "high" | "medium" | "low" | "very-low";

interface RiskFactor {
  id: string;
  source: string;
  level: RiskLevel;
  description?: string;
}

const getRiskLevelText = (level: RiskLevel): string => {
  switch (level) {
    case "high":
      return "High Risk";
    case "medium":
      return "Medium Risk";
    case "low":
      return "Low Risk";
    case "very-low":
      return "Very Low Risk";
  }
};

const getRiskIcon = (source: string) => {
  if (
    source.toLowerCase().includes("river") ||
    source.toLowerCase().includes("sea")
  ) {
    return Waves;
  }
  if (source.toLowerCase().includes("surface")) {
    return Droplets;
  }
  if (source.toLowerCase().includes("groundwater")) {
    return ArrowDown;
  }
  if (source.toLowerCase().includes("reservoir")) {
    return CircleDot;
  }
  return Droplets; // Default icon
};

const mockRiskFactors: RiskFactor[] = [
  {
    id: "1",
    source: "Rivers & Sea",
    level: "high",
    description:
      "This property is located within a high-risk flood zone for river and coastal flooding. The area is prone to flooding during periods of heavy rainfall, high tides, and storm surges.",
  },
  {
    id: "2",
    source: "Surface Water",
    level: "medium",
    description:
      "Surface water flooding can occur when heavy rainfall overwhelms drainage systems. This risk is moderate due to the local drainage infrastructure and terrain slope.",
  },
  {
    id: "3",
    source: "Groundwater",
    level: "low",
    description:
      "Groundwater flooding risk is low for this property. This occurs when the water table rises above ground level, typically after prolonged periods of rainfall.",
  },
  {
    id: "4",
    source: "Reservoirs",
    level: "very-low",
    description:
      "There is a very low risk of flooding from reservoirs in your area. Reservoir flooding is extremely rare and typically only occurs during exceptional circumstances.",
  },
];

function RiskFactorsBreakdown({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Card className={cn("border border-black", className)} {...props}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          <CardTitle>Risk Factors Breakdown</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {mockRiskFactors.map((factor) => {
            const Icon = getRiskIcon(factor.source);
            return (
              <div key={factor.id} className="space-y-2">
                <div className="flex items-start gap-2">
                  <Icon className="mt-0.5 h-4 w-4" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-medium">{factor.source}</div>
                      <Badge
                        variant="outline"
                        className={
                          factor.level === "high"
                            ? "border-red-600 text-red-600"
                            : factor.level === "medium"
                              ? "border-orange-400 text-orange-400"
                              : factor.level === "low"
                                ? "border-green-600 text-green-600"
                                : "border-gray-600 text-gray-600"
                        }
                      >
                        {getRiskLevelText(factor.level)}
                      </Badge>
                    </div>
                    {factor.description && (
                      <div className="text-xs text-muted-foreground">
                        {factor.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export { RiskFactorsBreakdown };
