import { VerifyDetails } from "@/components/property-assessment/verify-details";
import { useLocation } from "react-router-dom";

function PropertyAssessment() {
  const location = useLocation();
  const path = location.pathname;
  if (path === "/property-assessment") {
    return <VerifyDetails />;
  }
  return (
    <div>
      <h1>Property Assessment</h1>
      <VerifyDetails />
    </div>
  );
}

export { PropertyAssessment };
