import { FloodKitCard } from "@/components/property/FloodKitCard";
import { PropertyAssessment } from "@/components/property/PropertyAssessment";
import { PropertyInfoCard } from "@/components/property/PropertyInfoCard";
import { RiskFactorsBreakdown } from "@/components/property/RiskFactorsBreakdown";
import { RiskLevel } from "@/components/property/RiskLevel";

function PropertyOverview() {
  return (
    <div className="flex-1 overflow-auto p-4 md:p-6">
      <div className="container mx-auto">
        <h2 className="mb-4 text-2xl font-semibold">
          Welcome to your property overview
        </h2>
        <p className="mb-6 text-muted-foreground">
          Monitor here your property information, flood plan and more.
        </p>
        {/* TODO: Pass property data from API to PropertyInfoCard */}
        {/* TODO: Handle loading state while fetching property data */}
        {/* TODO: Handle error state if property fetch fails */}
        <PropertyInfoCard />
        <span className="block h-4"></span>
        <PropertyAssessment />
        <span className="block h-4"></span>
        <RiskLevel />
        <span className="block h-4"></span>
        <RiskFactorsBreakdown />
        <span className="block h-4"></span>
        <FloodKitCard />
      </div>
    </div>
  );
}

export { PropertyOverview };
