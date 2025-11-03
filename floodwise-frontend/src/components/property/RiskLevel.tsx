import * as React from "react";
import { Settings, AlertTriangle, Waves, CloudRain } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Switch } from "../ui/switch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

type RiverLevel = {
  name: string;
  level: string;
  status: "Normal" | "Rising" | "Falling";
};

const mockRiskData = {
  heading: "Risk Level and Flood Alerts",
  activeAlertsHeading: "Active Alerts",
  weatherAlertHeading: "Weather Alert",
  weatherAlertTime: "15:30 Today",
  weatherAlertText:
    "Yellow Warning: Heavy rainfall expected in Thames Valley area. Monitor conditions and be prepared to activate flood plan.",
  riskSeverity: "MEDIUM" as const,
  combinedRiskScorePct: 42,
  alertSettingsHeading: "Alert Settings",
  alerts: {
    sms: true,
    email: true,
    push: true,
  },
  riverLevelsHeading: "River Levels",
  riverLevels: [
    { name: "Thames at Kingston", level: "1.2m", status: "Normal" },
    { name: "Thames at Teddington", level: "1.5m", status: "Rising" },
  ] as RiverLevel[],
  rainfallHeading: "Rainfall Forecast",
  rainfall24h: "15-25mm",
  rainfall48h: "35-50mm",
  lastUpdated: "14:45 today",
  subscriptionNote:
    "You're signed up for flood alerts in the Thames Central Warning Area",
};

function RiskLevel() {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [alerts, setAlerts] = React.useState({
    sms: mockRiskData.alerts.sms,
    email: mockRiskData.alerts.email,
    push: mockRiskData.alerts.push,
  });

  const progressValue = Math.max(
    0,
    Math.min(100, mockRiskData.combinedRiskScorePct),
  );

  const getRiskColorClass = (value: number): string => {
    if (value <= 20) return "[&_[data-slot='progress-indicator']]:bg-blue-600";
    if (value <= 40) return "[&_[data-slot='progress-indicator']]:bg-green-600";
    if (value <= 60)
      return "[&_[data-slot='progress-indicator']]:bg-yellow-500";
    if (value <= 80)
      return "[&_[data-slot='progress-indicator']]:bg-orange-500";
    return "[&_[data-slot='progress-indicator']]:bg-red-600";
  };

  const handleAlertToggle = (
    type: "sms" | "email" | "push",
    checked: boolean,
  ) => {
    setAlerts((prev) => ({ ...prev, [type]: checked }));
    // TODO: Add API call to update alert settings
    // Example: await updateAlertSettingsAPI({ [type]: checked });
    // TODO: Add error handling with try-catch
    // TODO: Add loading state during API call
    // TODO: Show success/error toast notifications
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{mockRiskData.heading}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Alerts Section */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-medium">
            <AlertTriangle className="h-4 w-4" />
            {mockRiskData.activeAlertsHeading}
          </div>
          <div className="text-sm text-muted-foreground">
            {mockRiskData.weatherAlertHeading}
          </div>
          <div className="text-xs text-muted-foreground">
            {mockRiskData.weatherAlertTime}
          </div>
          <p className="text-sm">{mockRiskData.weatherAlertText}</p>
        </div>

        {/* Risk score */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">
              {mockRiskData.riskSeverity}
            </span>
            <span className="text-sm text-muted-foreground">
              Combined risk score: {progressValue}%
            </span>
          </div>
          <div className={getRiskColorClass(progressValue)}>
            <Progress value={progressValue} />
          </div>
        </div>

        {/* Collapsible section: Alert Settings through Footer */}
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          {!isExpanded ? (
            <div className="flex justify-end">
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm">
                  Show more
                </Button>
              </CollapsibleTrigger>
            </div>
          ) : null}
          <CollapsibleContent className="space-y-4">
            {/* Alert Settings Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Settings className="h-3 w-3" />
                {mockRiskData.alertSettingsHeading}
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm">
                  View less
                </Button>
              </CollapsibleTrigger>
            </div>

            {/* Alert Settings */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">SMS Alerts:</div>
                <Switch
                  checked={alerts.sms}
                  onCheckedChange={(checked) =>
                    handleAlertToggle("sms", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Email Notifications:
                </div>
                <Switch
                  checked={alerts.email}
                  onCheckedChange={(checked) =>
                    handleAlertToggle("email", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Push Notifications:
                </div>
                <Switch
                  checked={alerts.push}
                  onCheckedChange={(checked) =>
                    handleAlertToggle("push", checked)
                  }
                />
              </div>
            </div>

            {/* River Levels & Rainfall Forecast - Combined in Black Box */}
            <div className="rounded-lg bg-black p-4 text-white">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* River Levels */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Waves className="h-4 w-4" />
                    {mockRiskData.riverLevelsHeading}
                  </div>
                  <div className="space-y-2">
                    {mockRiskData.riverLevels.map((r) => (
                      <div
                        key={r.name}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Waves className="h-3 w-3" />
                        <span>
                          {r.name}:{" "}
                          <span className="font-medium">{r.level}</span>{" "}
                          <span className="text-xs">{r.status}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rainfall Forecast */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <CloudRain className="h-4 w-4" />
                    {mockRiskData.rainfallHeading}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CloudRain className="h-3 w-3" />
                      <div>
                        <div className="text-xs text-gray-300">
                          Next 24 hours:
                        </div>
                        <div className="font-medium">
                          {mockRiskData.rainfall24h}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CloudRain className="h-3 w-3" />
                      <div>
                        <div className="text-xs text-gray-300">
                          Next 48 hours:
                        </div>
                        <div className="font-medium">
                          {mockRiskData.rainfall48h}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="space-y-2">
              <div className="flex flex-col items-end gap-1">
                <div className="text-xs text-muted-foreground">
                  Last updated: {mockRiskData.lastUpdated}
                </div>
                <div className="text-xs">✓ {mockRiskData.subscriptionNote}</div>
              </div>
              <div>
                <Button variant={"outline"}>Manage Alerts</Button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}

export { RiskLevel };
