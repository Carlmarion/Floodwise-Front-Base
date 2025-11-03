import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import type { PropertyDto } from "@/types/property";
import { PropertyDtoSchema } from "@/types/property";
import { Badge } from "../ui/badge";

const TOTAL_ASSESSMENT_STEPS = 10;

const mockProperty: PropertyDto = PropertyDtoSchema.parse({
  id: 1,
  customerId: 123,
  isAssessmentCompleted: false,
  address: {
    id: 10,
    propertyId: 1,
    addressLine: "123 Main St",
    additionalAddressLine: null,
    city: "Anytown",
    county: "Anyshire",
    postcode: "A1 2BC",
  },
  attributes: Array.from({ length: 3 }).map((_, i) => ({
    id: i + 1,
    propertyId: 1,
    isAssessmentCompleted: false,
    questionCode: `Q_${i + 1}`,
    value: "Yes",
    answeredAt: null,
    additionalAttributes: [],
  })),
});

function PropertyAssessment() {
  const completed = mockProperty.attributes.length;
  const progress = Math.min(
    100,
    Math.round((completed / TOTAL_ASSESSMENT_STEPS) * 100),
  );
  const percentageCompleted = Math.round(
    (completed / TOTAL_ASSESSMENT_STEPS) * 100,
  );

  const badgeLabel =
    completed === 0
      ? "Not Started"
      : completed === TOTAL_ASSESSMENT_STEPS
        ? "Completed"
        : "In Progress";

  const buttonLabel =
    completed === 0
      ? "Start Assessment"
      : completed < TOTAL_ASSESSMENT_STEPS
        ? "Continue Assessment"
        : "Edit Assessment";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Property Assessment</CardTitle>
        <Badge variant="outline">{badgeLabel}</Badge>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {completed} / {TOTAL_ASSESSMENT_STEPS} steps
          </div>
          <div className="text-sm text-muted-foreground">
            {percentageCompleted}% completed
          </div>
        </div>
        <Progress value={progress} />
        <Button className="w-full bg-black text-white" size="lg">
          {buttonLabel}
        </Button>
      </CardContent>
    </Card>
  );
}

export { PropertyAssessment };
