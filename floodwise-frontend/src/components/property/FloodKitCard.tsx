import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

import { Package } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { mockFloodKitItems } from "@/lib/utils";
import { Link } from "react-router-dom";

function FloodKitCard() {
  const floodKitItemsCount = mockFloodKitItems.length;
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Your personalized flood kit
          </CardTitle>
          <Badge variant="outline">{floodKitItemsCount} items</Badge>
        </div>
        <CardDescription>
          Your personal flood kit is a collection of items based on your
          property assessment. It contains all the necessary items to help you
          prepare for a flood.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 p-4">
        <p className="text-center text-sm text-gray-500">
          View your complete personalized flood kit with detailed installation
          instructions, preparation tracking and emergency checklist.
        </p>
        <Button className="bg-black text-white" size="lg">
          <Link to="/my-flood-kit">View Your Complete Kit</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
export { FloodKitCard };
