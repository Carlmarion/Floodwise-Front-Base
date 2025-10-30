import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

function Footer({ className }: FooterProps) {
  const dateToday = new Date();
  const dateTodayFormatted = dateToday.toISOString().split("T")[0];

  return (
    <footer
      className={cn("border-t border-gray-300 bg-muted/20 p-6", className)}
    >
      <div className="container mx-auto space-y-4">
        <div className="space-y-2 text-center">
          <p className="text-sm text-muted-foreground">
            Property assessment data is processed in accordance with GDPR
            regulations for flood purposes only.
          </p>
          <p className="text-sm text-muted-foreground">
            This information helps determine appropriate flood resilience
            measures and is not used for insurance underwriting.
          </p>
        </div>

        <div className="h-[0.5px] bg-gray-300"></div>

        <div className="flex flex-col gap-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-center">
          <div className="flex items-center justify-center gap-2">
            <span>Floodwise Portal v1.0</span>
            <span className="h-4 w-[0.5px] bg-border"></span>
            <span>Last updated: {dateTodayFormatted}</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms of Use
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
