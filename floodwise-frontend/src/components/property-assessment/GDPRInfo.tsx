import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Info, UserLock } from "lucide-react";

function GDPRInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Info className="mr-2 size-5" />
          Please Note
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start justify-between gap-4">
          <p className="flex-1 text-gray-500">
            No information you provide in this assessment will be shared with
            your insurer. This data is used solely by Floodwise to provide you
            with appropriate guidance and emergency property protection.
          </p>
        </div>
        {/* TODO: Add privacy policy link */}
        <div className="mt-4 flex items-end justify-end">
          <Button variant="outline" size="sm" asChild>
            <Link to="/privacy-policy" className="flex items-center gap-2">
              <UserLock className="size-4" /> Privacy Policy
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export { GDPRInfo };
