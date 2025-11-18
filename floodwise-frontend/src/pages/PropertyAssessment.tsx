import { VerifyDetails } from "@/components/property-assessment/VerifyDetails";
import { PropertyConstruction } from "@/components/property-assessment/PropertyConstruction";
import { OtherStructures } from "@/components/property-assessment/OtherStructures";
import { Routes, Route, Navigate } from "react-router-dom";

function PropertyAssessment() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/property-assessment/verify-details" replace />}
      />
      <Route path="/verify-details" element={<VerifyDetails />} />
      <Route path="/property-construction" element={<PropertyConstruction />} />
      <Route path="/other-structures" element={<OtherStructures />} />
    </Routes>
  );
}

export { PropertyAssessment };
