import { useState } from "react";
import { YourFloodPlanDialog } from "./YourFloodPlanDialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Info,
  UserRound,
  FileUser,
  Sparkles,
  MapPin,
  Lightbulb,
} from "lucide-react";
import { ContactTab } from "./flood-plan-tabs/ContactTab";
import { Documents } from "./flood-plan-tabs/Documents";

function YourFloodPlan() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <YourFloodPlanDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <div className="flex flex-col gap-4 px-4">
        {/* Title with Icon */}
        <div className="flex items-center gap-2">
          <Info className="size-5 text-blue-600" />
          <h1 className="text-2xl font-bold">Your Flood Plan</h1>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500">
          This page gives you one place to gather the essentials you need for a
          flood emergency. Add important phone numbers, upload key documents,
          note medical needs, plan your evacuation route and safe spot, and
          review the basic actions to take such as shutting off electricity,
          water, and gas.
        </p>

        {/* Informative Button */}

        <Button
          variant="outline"
          onClick={() => setDialogOpen(true)}
          className="flex w-fit items-center gap-2"
        >
          <Lightbulb className="size-5 text-blue-600" /> How Your Flood Plan
          Works
        </Button>

        {/* Tabs */}
        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <UserRound className="size-5" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileUser className="size-5" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="utilities" className="flex items-center gap-2">
              <Sparkles className="size-5" />
              Utilities
            </TabsTrigger>
            <TabsTrigger value="evacuation" className="flex items-center gap-2">
              <MapPin className="size-5" />
              Evacuation
            </TabsTrigger>
          </TabsList>
          <TabsContent value="contact" className="mt-4">
            <ContactTab />
          </TabsContent>
          <TabsContent value="documents" className="mt-4">
            <Documents />
          </TabsContent>
          <TabsContent value="utilities" className="mt-4">
            <p className="text-sm text-gray-700">Utilities content goes here</p>
          </TabsContent>
          <TabsContent value="evacuation" className="mt-4">
            <p className="text-sm text-gray-700">
              Evacuation content goes here
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
export { YourFloodPlan };
