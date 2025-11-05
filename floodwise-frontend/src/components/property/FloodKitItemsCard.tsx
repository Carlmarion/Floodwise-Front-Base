import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import type { FloodKitItemData } from "@/types/property";
import { Package } from "lucide-react";
import { Badge } from "../ui/badge";
import { FloodKitItem } from "./FloodKitItem";

const mockFloodKitItems = [
  {
    id: 1,
    title: "Sandbags",
    description: "Essential for blocking water entry points",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Door Seal",
    description: "Seal your doors to prevent water from entering your property",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Air Brick cover",
    description:
      "Cover your air bricks to prevent water from entering your property",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "Toilet Protector",
    description: "Protect your toilet from water damage",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    imageUrl: "https://via.placeholder.com/150",
  },
];

function FloodKitItemsCard() {
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
      <CardContent className="space-y-2">
        {mockFloodKitItems.map((item) => (
          <FloodKitItem key={item.id} item={item as FloodKitItemData} />
        ))}
      </CardContent>
    </Card>
  );
}
export { FloodKitItemsCard };
