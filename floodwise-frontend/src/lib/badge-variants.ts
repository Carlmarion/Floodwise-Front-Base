import { cva } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center justify-center border px-2 py-1 text-xs font-semibold tracking-wider w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-[color,box-shadow] overflow-hidden [&>*]:leading-[1.1] [&>*]:align-middle",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-red-600 bg-transparent text-red-600 [a&]:hover:bg-red-50 focus-visible:ring-destructive/20",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        success:
          "border-transparent bg-green-500 text-white [a&]:hover:bg-green-600 focus-visible:ring-green-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
export { badgeVariants };
