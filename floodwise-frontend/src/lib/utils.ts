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
