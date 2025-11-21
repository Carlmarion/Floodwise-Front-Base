import { Routes, Route, Navigate } from "react-router-dom";
import { FloodInformations } from "@/components/flood-plan/FloodInformations";

function FloodPlan() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/flood-informations" replace />} />
      <Route path="/flood-informations" element={<FloodInformations />} />
    </Routes>
  );
}
export { FloodPlan };
