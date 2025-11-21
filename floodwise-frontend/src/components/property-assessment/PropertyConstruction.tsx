import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BrickWall,
  ShieldX,
  ShieldAlert,
  ShieldCheck,
  ShieldPlus,
  ChevronLeft,
  ChevronRight,
  Wind,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { GDPRInfo } from "./GDPRInfo";
import { InfoPopover } from "../shared/InfoPopover";

const MATERIALS = [
  "Solid Brick",
  "Brick Cavity",
  "Solid Stone",
  "Timber Frame + Cladding",
  "Concrete Panels",
  "Other",
] as const;

type ConditionType = "Poor" | "Fair" | "Good" | "Excellent";

interface ConditionData {
  title: ConditionType;
  icon: typeof ShieldX;
  description: string;
}

const CONDITIONS: ConditionData[] = [
  {
    title: "Poor",
    icon: ShieldX,
    description:
      "The walls show significant damage, cracks, or deterioration. Water can easily infiltrate through visible gaps and structural weaknesses.",
  },
  {
    title: "Fair",
    icon: ShieldAlert,
    description:
      "The walls have some minor issues or wear. There may be small cracks or signs of aging that could potentially allow water infiltration.",
  },
  {
    title: "Good",
    icon: ShieldCheck,
    description:
      "The walls are in good condition, no cracks and no visible sign of damage, water cannot normally infiltrate.",
  },
  {
    title: "Excellent",
    icon: ShieldPlus,
    description:
      "The walls are in excellent condition with no visible damage. They provide strong protection against water infiltration.",
  },
];

function PropertyConstruction() {
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [conditionIndex, setConditionIndex] = useState(1); // 0-3, default to "Fair"
  const [hasAirbricks, setHasAirbricks] = useState<boolean | null>(null);
  const [airbricks, setAirbricks] = useState({
    singleAirbrick: 0,
    doubleAirbrick: 0,
    weepVent: 0,
    irregularAirbrick: 0,
  });

  const handleUpdateAirbrick = (
    type: keyof typeof airbricks,
    value: number,
  ) => {
    setAirbricks({
      ...airbricks,
      [type]: value > 0 ? value : 0,
    });
  };
  return (
    <>
      <div className="mb-4 mt-4 flex justify-start px-4">
        <Button variant="outline" asChild className="w-fit items-center">
          <Link to="/" className="flex items-center">
            <ArrowLeft className="mr-2 size-4" />
            back to your property
          </Link>
        </Button>
      </div>
      <div className="flex items-center justify-center gap-2 px-4">
        <h2 className="mb-4 mt-4 text-center text-2xl font-bold">
          Groundfloor Construction (Main Property)
        </h2>

        <InfoPopover
          title="Why do we ask about property construction?"
          content="Different building materials and construction methods have varying levels of flood resilience. Understanding your property's construction helps us recommend the most appropriate emergency flood defences."
        />
      </div>
      <Card className="m-4">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BrickWall className="mr-2 size-5" />
            <span>Primary Groundfloor Material</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            What's the primary material of the groundfloor walls?
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {MATERIALS.map((material) => (
              <Button
                key={material}
                variant="outline"
                className={cn(
                  "h-12 border-gray-300 bg-white text-black hover:bg-gray-100",
                  selectedMaterial === material &&
                    "bg-black text-white hover:bg-black hover:text-white",
                )}
                onClick={() => setSelectedMaterial(material)}
              >
                {material}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Condition of Groundfloor Walls Section - Only shows when material is selected */}
      {selectedMaterial && (
        <Card className="m-4">
          <CardHeader>
            <CardTitle>Condition of {selectedMaterial}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={conditionIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex w-full flex-col items-center space-y-4"
                >
                  {/* Large Icon */}
                  {(() => {
                    const Icon = CONDITIONS[conditionIndex].icon;
                    const iconColors = [
                      "text-red-500", // Poor
                      "text-orange-500", // Fair
                      "text-green-500", // Good
                      "text-blue-500", // Excellent
                    ];
                    return (
                      <Icon
                        className={`size-16 ${iconColors[conditionIndex]}`}
                      />
                    );
                  })()}

                  {/* Condition Title */}
                  <h3 className="text-center text-2xl font-bold">
                    {CONDITIONS[conditionIndex].title}
                  </h3>

                  {/* Description */}
                  <p className="max-w-md text-center text-sm text-gray-600">
                    {CONDITIONS[conditionIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <div className="flex w-full items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setConditionIndex(Math.max(0, conditionIndex - 1))
                  }
                  disabled={conditionIndex === 0}
                  className="size-10"
                >
                  <ChevronLeft className="size-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setConditionIndex(Math.min(3, conditionIndex + 1))
                  }
                  disabled={conditionIndex === 3}
                  className="size-10"
                >
                  <ChevronRight className="size-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Airbricks Section - Only shows when material is selected */}
      {selectedMaterial && (
        <Card className="m-4">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wind className="mr-2 size-5" />
              <span>Do you have any air bricks?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Yes/No Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "bg-white text-black hover:bg-gray-100",
                    hasAirbricks === true &&
                      "bg-black text-white hover:bg-black hover:text-white",
                  )}
                  onClick={() => setHasAirbricks(true)}
                >
                  Yes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "bg-white text-black hover:bg-gray-100",
                    hasAirbricks === false &&
                      "bg-black text-white hover:bg-black hover:text-white",
                  )}
                  onClick={() => setHasAirbricks(false)}
                >
                  No
                </Button>
              </div>

              {/* Airbricks Input Fields - Only shows when Yes is selected */}
              {hasAirbricks === true && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-sm">Single Airbrick</Label>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={airbricks.singleAirbrick || ""}
                        onChange={(e) =>
                          handleUpdateAirbrick(
                            "singleAirbrick",
                            parseInt(e.target.value) || 0,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Double Airbrick</Label>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={airbricks.doubleAirbrick || ""}
                        onChange={(e) =>
                          handleUpdateAirbrick(
                            "doubleAirbrick",
                            parseInt(e.target.value) || 0,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Weep Vent</Label>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={airbricks.weepVent || ""}
                        onChange={(e) =>
                          handleUpdateAirbrick(
                            "weepVent",
                            parseInt(e.target.value) || 0,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Irregular Airbrick</Label>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={airbricks.irregularAirbrick || ""}
                        onChange={(e) =>
                          handleUpdateAirbrick(
                            "irregularAirbrick",
                            parseInt(e.target.value) || 0,
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="m-4">
        <GDPRInfo />
      </div>
    </>
  );
}
export { PropertyConstruction };
