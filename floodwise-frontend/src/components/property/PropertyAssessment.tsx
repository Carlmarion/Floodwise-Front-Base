import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import type { PropertyDto } from "@/types/property";
import { PropertyDtoSchema } from "@/types/property";

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

  const buttonLabel =
    completed === 0
      ? "Start Assessment"
      : completed < TOTAL_ASSESSMENT_STEPS
        ? "Continue Assessment"
        : "Edit Assessment";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Assessment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Steps completed: {completed} / {TOTAL_ASSESSMENT_STEPS}
        </div>
        <Progress value={progress} />
        <Button>{buttonLabel}</Button>
      </CardContent>
    </Card>
  );
}

export { PropertyAssessment };
