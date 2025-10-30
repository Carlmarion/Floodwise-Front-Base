import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import type { PropertyInfo } from "@/types/property";
import { EditPropertyModal } from "./EditPropertyModal";
import { useState } from "react";

interface PropertyInfoCardProps extends React.ComponentProps<"div"> {
  propertyInfo?: PropertyInfo;
}

function PropertyInfoCard({
  className,
  propertyInfo: propPropertyInfo,
  ...props
}: PropertyInfoCardProps) {
  const [editPropertyModalOpen, setEditPropertyModalOpen] = useState(false);

  const defaultPropertyInfo: PropertyInfo = {
    id: "1234567890",
    emoji: "🏠",
    name: "123 Main St, Anytown, USA",
    address: "123 Main St, Anytown, USA",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    authority: "Anytown City Council",
    flood_zone: "Zone 1",
    coordinates: {
      latitude: 40.7128,
      longitude: -74.006,
    },
  };

  const propertyInfo = propPropertyInfo ?? defaultPropertyInfo;
  return (
    <Card className={cn("bg-white", className)} {...props}>
      <CardHeader className="flex flex-row items-start gap-3">
        <span className="text-3xl">{propertyInfo.emoji}</span>
        <div className="flex flex-col gap-1">
          <CardTitle className="font-bold">{propertyInfo.name}</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            {propertyInfo.city}, {propertyInfo.state} {propertyInfo.zip}
          </CardDescription>
        </div>
        <div className="ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setEditPropertyModalOpen(true)}
          >
            <Pencil className="h-12 w-12" />
          </Button>
        </div>
        <EditPropertyModal
          open={editPropertyModalOpen}
          onOpenChange={setEditPropertyModalOpen}
          propertyInfo={propertyInfo}
          onSave={(data) => {
            // TODO: Add API call to update property name and emoji
            // await updatePropertyAPI(propertyInfo.id, data);
            // Then refresh property info from API or update local state
            // TODO: Update local state optimistically or refetch from API
            console.log("Property data to save:", data);
          }}
        />
      </CardHeader>
      <CardContent>
        <div className="flex w-full flex-row items-start justify-between gap-6">
          <div className="flex flex-col gap-1">
            <CardDescription className="text-sm text-gray-500">
              Local Authority
            </CardDescription>
            <p>{propertyInfo.authority}</p>
          </div>
          <div className="flex flex-col gap-1">
            <CardDescription className="text-sm text-gray-500">
              Flood Zone
            </CardDescription>
            <Badge variant="outline">{propertyInfo.flood_zone}</Badge>
          </div>
        </div>
        <div className="mt-4 flex w-full flex-row items-start justify-between gap-6">
          <div className="flex flex-col gap-1">
            <CardDescription className="text-sm text-gray-500">
              Coordinates
            </CardDescription>
            <p>
              {propertyInfo.coordinates.latitude},{" "}
              {propertyInfo.coordinates.longitude}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export { PropertyInfoCard };
