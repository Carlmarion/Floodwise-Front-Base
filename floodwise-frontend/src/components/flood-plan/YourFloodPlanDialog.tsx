import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Info,
  BookOpenCheck,
  Footprints,
  Eye,
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface YourFloodPlanDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function YourFloodPlanDialog({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: YourFloodPlanDialogProps = {}) {
  const location = useLocation();
  const isYourFloodPlanPage =
    location.pathname === "/flood-plan/your-flood-plan";
  const [internalOpen, setInternalOpen] = useState(false);

  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen =
    controlledOnOpenChange !== undefined
      ? controlledOnOpenChange
      : setInternalOpen;
  const [currentStep, setCurrentStep] = useState(1);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // Only auto-open if not controlled and on the correct page
    if (controlledOpen === undefined && isYourFloodPlanPage) {
      if (!dontShowAgain) {
        setInternalOpen(true);
        setCurrentStep(1);
      }
    } else if (controlledOpen === undefined && !isYourFloodPlanPage) {
      setInternalOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isYourFloodPlanPage]);

  const goToPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Info className="size-4" />
            <DialogTitle>How Your Flood Plan Works</DialogTitle>
          </div>
        </DialogHeader>
        <DialogDescription>
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-start gap-4"
              >
                <BookOpenCheck className="size-16 self-center" />
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-medium">
                    Capture information now
                  </h3>
                  <p className="text-sm text-gray-500">
                    First, we'll help you gather and record essential
                    information and things you'll need during a flood. This
                    means you won't be left scrambling when flood warnings
                    arrive and time is short.
                  </p>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-start gap-4"
              >
                <Footprints className="size-16 self-center" />
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-medium">
                    Follow Step-by-Step Guidance
                  </h3>
                  <p className="text-sm text-gray-500">
                    When a flood becomes likely, your plan provides clear,
                    prioritized actions for what to do during the event and how
                    to recover afterward.
                  </p>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-start gap-4"
              >
                <Eye className="size-16 self-center" />
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-medium">
                    View and update Anytime
                  </h3>
                  <p className="text-sm text-gray-500">
                    Your flood plan is always accessible from the Property
                    overview page or here, You can review it whenever you need,
                    update information as circulmstances change, and add notes
                    based on your own experiences. We recommend keeping a
                    printed version somewhere to reach in case your devices run
                    out of battery in a flood.
                  </p>
                </div>
                <div
                  className="mt-4 w-full rounded-lg border p-4"
                  style={{
                    backgroundColor: "#F0FDF4",
                    borderColor: "#BBF7D0",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <RefreshCcw className="size-5 text-green-700" />
                    <p className="text-sm text-green-700">
                      You plan saves automatically as you go and you can return
                      to it anytime.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* TODO: Save "don't show anymore" preference to localStorage when account-management/preferences page exists */}
          <div className="mt-4 flex items-center justify-end gap-2">
            <label
              htmlFor="dont-show-again"
              className="cursor-pointer text-sm text-gray-700"
            >
              Don't show anymore
            </label>
            <Checkbox
              id="dont-show-again"
              checked={dontShowAgain}
              onCheckedChange={(checked) => {
                setDontShowAgain(checked === true);
              }}
            />
          </div>
        </DialogDescription>
        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            disabled={currentStep === 1}
            className="size-10"
          >
            <ChevronLeft className="size-5" />
          </Button>
          <span className="text-sm text-gray-500">Step {currentStep} of 3</span>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            disabled={currentStep === 3}
            className="size-10"
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export { YourFloodPlanDialog };
