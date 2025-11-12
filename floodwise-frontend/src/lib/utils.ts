import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Package,
  DoorOpen,
  Bath,
  Wind,
  Plug,
  Droplets,
  Shield,
  type LucideIcon,
} from "lucide-react";
import type { FloodKitItemData } from "@/types/floodKit";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns the appropriate icon component for a flood kit item based on its title.
 * Uses simple keyword matching (case-insensitive).
 */
export function getIconForFloodKitItem(title: string): LucideIcon {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("door") || lowerTitle.includes("seal")) {
    return DoorOpen;
  }
  if (lowerTitle.includes("air brick") || lowerTitle.includes("airbrick")) {
    return Wind;
  }
  if (lowerTitle.includes("toilet") || lowerTitle.includes("bath")) {
    return Bath;
  }
  if (lowerTitle.includes("plumbing") || lowerTitle.includes("pipe")) {
    return Droplets;
  }
  if (lowerTitle.includes("utility") || lowerTitle.includes("connection")) {
    return Plug;
  }
  if (lowerTitle.includes("sandbag") || lowerTitle.includes("sand")) {
    return Shield;
  }
  return Package; // Default icon
}

/**
 * Checks if a flood kit item is fully installed.
 * An item is considered installed if:
 * 1. item.installed is true
 * 2. All steps in completedSteps are completed
 */
export function isItemInstalled(
  item: FloodKitItemData,
  completedSteps: Record<number, Record<number, boolean>>,
): boolean {
  const steps = completedSteps[item.id] || {};
  return (
    item.installed &&
    Object.values(steps).every((completed) => completed === true)
  );
}

export const mockFloodKitItems = [
  {
    id: 1,
    title: "Sandbags",
    description: "Essential for blocking water entry points",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    imageUrl: "https://via.placeholder.com/150",
    size: "10 bags",
    installed: false,
    rating: "High",
    priority: "high" as const,
    installationSteps: [
      {
        step: 1,
        description: "Place sandbags in a pyramid shape against doorways",
        isCompleted: false,
      },
      {
        step: 2,
        description: "Overlap each bag by half its length",
        isCompleted: false,
      },
      {
        step: 3,
        description: "Ensure bags are tightly packed",
        isCompleted: false,
      },
    ],
  },
  {
    id: 2,
    title: "Door Seal",
    description: "Seal your doors to prevent water from entering your property",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    imageUrl: "https://via.placeholder.com/150",
    size: "From 1.5m to 2.5m",
    installed: true,
    installationDate: new Date("2024-01-15"),
    rating: "Medium",
    priority: "medium" as const,
    installationSteps: [
      {
        step: 1,
        description: "Clean the door frame surface",
        isCompleted: true,
      },
      {
        step: 2,
        description: "Apply sealant along the bottom edge",
        isCompleted: true,
      },
      {
        step: 3,
        description: "Press seal firmly into place",
        isCompleted: true,
      },
    ],
  },
  {
    id: 3,
    title: "Air Brick cover",
    description:
      "Cover your air bricks to prevent water from entering your property",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    imageUrl: "https://via.placeholder.com/150",
    size: "From 215mm to 440mm",
    installed: false,
    rating: "High",
    priority: "high" as const,
    installationSteps: [
      {
        step: 1,
        description: "Measure the air brick dimensions",
        isCompleted: false,
      },
      {
        step: 2,
        description: "Cut cover to size if needed",
        isCompleted: false,
      },
      {
        step: 3,
        description: "Secure cover over air brick",
        isCompleted: false,
      },
    ],
  },
  {
    id: 4,
    title: "Toilet Protector",
    description: "Protect your toilet from water damage",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    imageUrl: "https://via.placeholder.com/150",
    size: "Custom fit required",
    installed: false,
    rating: "Low",
    priority: "low" as const,
    installationSteps: [
      {
        step: 1,
        description: "Remove toilet lid",
        isCompleted: false,
      },
      {
        step: 2,
        description: "Place protector over toilet bowl",
        isCompleted: false,
      },
      {
        step: 3,
        description: "Secure with provided fasteners",
        isCompleted: false,
      },
    ],
  },
];

export const mockPropertyData = {
  id: 1,
  customerId: 1,
  isAssessmentCompleted: false,
  address: {
    id: 1,
    propertyId: 1,
    addressLine: "123 Main Street",
    additionalAddressLine: "Apartment 4B",
    city: "London",
    county: "Greater London",
    postcode: "SW1A 1AA",
  },
  attributes: [
    {
      id: 1,
      propertyId: 1,
      isAssessmentCompleted: true,
      questionCode: "PROPERTY_TYPE",
      value: "Semi-detached",
      answeredAt: new Date("2024-01-15"),
      additionalAttributes: [],
    },
  ],
};

export const mockUserData = {
  id: 1,
  sid: "550e8400-e29b-41d4-a716-446655440000",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phoneNumber: "+336334455667",
  insureReference: "1234567890",
  password: null,
  isReminderActive: true,
  isNotificationActive: true,
  properties: [mockPropertyData],
};
