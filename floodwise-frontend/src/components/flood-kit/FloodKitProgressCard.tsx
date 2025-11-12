import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Play } from "lucide-react";

interface FloodKitProgressCardProps {
  installedItems: number;
  totalItems: number;
  onViewFullGuide: (itemId: number) => void;
  getNextUninstalledItem: () => number | null;
}

function FloodKitProgressCard({
  installedItems,
  totalItems,
  onViewFullGuide,
  getNextUninstalledItem,
}: FloodKitProgressCardProps) {
  const protectedPercentage = Math.round((installedItems / totalItems) * 100);

  const handleStartInstallation = () => {
    const nextItemId = getNextUninstalledItem();
    if (nextItemId) {
      onViewFullGuide(nextItemId);
    }
  };

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        {installedItems > 0 ? (
          <Button
            onClick={handleStartInstallation}
            className="w-full bg-black py-6 text-base text-white hover:bg-gray-900"
          >
            <Play className="mr-2 h-5 w-5" />
            Continue the Installation
          </Button>
        ) : (
          <Button
            onClick={handleStartInstallation}
            className="w-full bg-black py-6 text-base text-white hover:bg-gray-900"
          >
            <Play className="mr-2 h-5 w-5" />
            Start the Installation
          </Button>
        )}
        {/* Overall Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Overall Protection Progress</span>
            <span className="text-muted-foreground">
              {installedItems} of {totalItems} installed
            </span>
          </div>
          <Progress value={protectedPercentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}

export { FloodKitProgressCard };
