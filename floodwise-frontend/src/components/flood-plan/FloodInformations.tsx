import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { InfoPopover } from "@/components/shared/InfoPopover";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ShieldAlert,
  Fish,
  CloudRain,
  Waves,
  ChevronLeft,
  ChevronRight,
  TriangleAlert,
  Bell,
  CheckCircle2,
  ArrowRight,
  Search,
  AlertTriangle,
  ExternalLink,
  Info,
  HelpCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

function FloodInformations() {
  const [currentStep, setCurrentStep] = useState(1);
  const [floodWarningStatus, setFloodWarningStatus] = useState<
    "yes" | "not-available" | null
  >(null);
  const [understandsFloodRisk, setUnderstandsFloodRisk] = useState(false);
  const [hasCompletedSection, setHasCompletedSection] = useState(false);
  const [hasAttemptedComplete, setHasAttemptedComplete] = useState(false);
  const navigate = useNavigate();
  const goToPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCheckAgain = () => {
    setHasCompletedSection(false);
  };

  return (
    <>
      <div className="mb-4 mt-4 flex justify-start px-4">
        <Button variant="outline" asChild className="w-fit items-center">
          <Link to="/" className="flex items-center">
            <ArrowLeft className="mr-2 size-4" />
            back to your property
          </Link>
        </Button>
      </div>
      <div className="flex items-center justify-center gap-2 px-4">
        <h2 className="mb-4 mt-4 text-center text-2xl font-bold">
          Your Flood Plan
        </h2>

        <InfoPopover
          title="Why a flood plan?"
          content="A flood plan isn't mandatory but highly recommended in case of a flood emergency. Knowing what can happen, what to do and where to go will help you stay safe and informed."
        />
      </div>
      <div className="mb-4 ml-4 mr-4 mt-2 flex flex-col gap-2">
        <p className="text-sm leading-relaxed text-gray-500">
          Here you will have information about the risks in your area and how to
          prepare for a flood emergency. We will help you understand the risks,
          know where to find information and know what to do in case of a flood
          event.
        </p>
      </div>
      <div className="ml-4 mr-4 flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-3">
                <ShieldAlert className="size-8" />
                <h2 className="text-2xl font-bold">
                  Understanding your flood risk
                </h2>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {hasCompletedSection && understandsFloodRisk ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Completion Card */}
                <div className="rounded-lg border-2 border-green-200 bg-green-50 p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <CheckCircle2 className="size-8 text-green-600" />
                    <h3 className="text-2xl font-bold text-green-900">
                      Section Complete!
                    </h3>
                  </div>
                  <p className="mb-6 text-sm leading-relaxed text-green-700">
                    Now you are ready to jump onto the next steps towards your
                    preparedness for a flood event
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      variant="outline"
                      onClick={handleCheckAgain}
                      className="flex items-center justify-center"
                    >
                      <HelpCircle className="mr-2 size-4" />I want to check
                      again the steps
                    </Button>
                    <Button
                      onClick={() => navigate("/flood-plan/getting-prepared")}
                      className="flex items-center justify-center bg-black text-white hover:bg-black/90"
                    >
                      <ArrowRight className="mr-2 size-4" />
                      Get me to the next Step
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Why Understanding Flood Risk Matters */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">
                        Why Understanding Flood Risk Matters
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-700">
                        First, we want to make sure you understand your flood
                        risk. This is the most important step you can take to
                        protect you, your family and your home from flooding.
                        This means understanding the different sources of
                        flooding and how likely each is to affect your home, and
                        how your home is likely to be impacted should a flood
                        materialise.
                      </p>
                      <p className="text-sm leading-relaxed text-gray-700">
                        The most common sources of flooding are the sea, rivers
                        and surface water flooding. Your home could be at risk
                        from one or more of these sources at the same time.
                      </p>
                    </div>

                    {/* Three Flood Type Boxes */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      {/* River Flooding */}
                      <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                        <div className="mb-3 flex items-center gap-2">
                          <Fish className="size-6 text-blue-600" />
                          <h4 className="font-bold text-blue-900">
                            River Flooding
                          </h4>
                        </div>
                        <p className="text-sm text-blue-700">
                          Occurs when rivers overflow their banks due to heavy
                          rainfall or snowmelt upstream.
                        </p>
                      </div>

                      {/* Surface Water */}
                      <div className="rounded-lg border-2 border-cyan-200 bg-cyan-50 p-4">
                        <div className="mb-3 flex items-center gap-2">
                          <CloudRain className="size-6 text-cyan-600" />
                          <h4 className="font-bold text-cyan-900">
                            Surface Water
                          </h4>
                        </div>
                        <p className="text-sm text-cyan-700">
                          Results from intense rainfall that cannot drain away
                          through overwhelmed drainage systems.
                        </p>
                      </div>

                      {/* Coastal Flooding */}
                      <div className="rounded-lg border-2 border-sky-200 bg-sky-50 p-4">
                        <div className="mb-3 flex items-center gap-2">
                          <Waves className="size-6 text-sky-600" />
                          <h4 className="font-bold text-sky-900">
                            Coastal Flooding
                          </h4>
                        </div>
                        <p className="text-sm text-sky-700">
                          Caused by high tides, storm surges, or extreme weather
                          conditions affecting coastal areas.
                        </p>
                      </div>
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
                    className="space-y-6"
                  >
                    {/* Title and Description */}
                    <div className="space-y-3">
                      <h2 className="text-2xl font-bold">
                        Environment Agency Flood Alerts & Warnings
                      </h2>
                      <p className="text-sm leading-relaxed text-gray-700">
                        The Environment Agency operates a flood warning system
                        that provides advance notice of potential river and
                        coastal flooding in some of the highest risk areas.
                        Understanding and signing up to receive these warnings
                        and what actions to take is crucial for your safety and
                        property protection.
                      </p>
                    </div>

                    {/* Three Flood Warning Boxes */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      {/* Flood Alert */}
                      <div className="rounded-lg border-2 border-yellow-200 bg-yellow-50 p-4">
                        <div className="mb-3 flex items-center gap-2">
                          <TriangleAlert className="size-6 text-yellow-600" />
                          <h4 className="font-bold text-yellow-900">
                            Flood Alert
                          </h4>
                        </div>
                        <p className="mb-2 text-sm text-yellow-700">
                          Flooding is possible. Be prepared.
                        </p>
                        <p className="text-xs font-semibold text-yellow-700">
                          Met Office: Yellow Warning
                        </p>
                      </div>

                      {/* Flood Warning */}
                      <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-4">
                        <div className="mb-3 flex items-center gap-2">
                          <TriangleAlert className="size-6 text-orange-600" />
                          <h4 className="font-bold text-orange-900">
                            Flood Warning
                          </h4>
                        </div>
                        <p className="mb-2 text-sm text-orange-700">
                          Flooding is expected. Immediate action required.
                        </p>
                        <p className="text-xs font-semibold text-orange-700">
                          Met Office: Amber Warning
                        </p>
                      </div>

                      {/* Severe Flood Warning */}
                      <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
                        <div className="mb-3 flex items-center gap-2">
                          <TriangleAlert className="size-6 text-red-600" />
                          <h4 className="font-bold text-red-900">
                            Severe Flood Warning
                          </h4>
                        </div>
                        <p className="mb-2 text-sm text-red-700">
                          Severe flooding. Danger to life.
                        </p>
                        <p className="text-xs font-semibold text-red-700">
                          Met Office: Red Warning
                        </p>
                      </div>
                    </div>

                    {/* Sign up for flood warnings box */}
                    <div className="rounded-lg border p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <Bell className="size-5" />
                        <h3 className="font-semibold">
                          Sign up for flood warnings
                        </h3>
                      </div>
                      <p className="mb-4 text-sm leading-relaxed text-gray-700">
                        Register for the Environment Agency's free flood
                        warnings by visiting GOV.UK or calling Floodline on 0345
                        988 1188. Warnings are sent by phone, text, or email and
                        cover specific areas at risk.
                      </p>

                      <h3 className="mb-3 text-base font-semibold">
                        Please confirm your flood warning status
                      </h3>

                      <div className="flex flex-col gap-2 sm:flex-row">
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start bg-white text-black hover:bg-gray-100",
                            floodWarningStatus === "yes" &&
                              "bg-black text-white hover:bg-black hover:text-white",
                          )}
                          onClick={() => {
                            // TODO: Call API to save flood warning registration status
                            setFloodWarningStatus("yes");
                          }}
                        >
                          <CheckCircle2 className="mr-2 size-4" />
                          Yes, I've signed up for flood warnings
                        </Button>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start bg-white text-black hover:bg-gray-100",
                            floodWarningStatus === "not-available" &&
                              "bg-black text-white hover:bg-black hover:text-white",
                          )}
                          onClick={() => {
                            // TODO: Call API to save flood warning status (not available)
                            setFloodWarningStatus("not-available");
                          }}
                        >
                          <ArrowRight className="mr-2 size-4" />
                          They're not available in my area
                        </Button>
                      </div>

                      {/* Success box - shown when "Yes" is selected */}
                      {floodWarningStatus === "yes" && (
                        <div className="mt-4 rounded-lg border-2 border-green-200 bg-green-50 p-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="size-5 text-green-600" />
                            <p className="text-sm font-semibold text-green-900">
                              Great! We'll also flag EA warnings and alerts in
                              your area.
                            </p>
                          </div>
                        </div>
                      )}
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
                    className="space-y-6"
                  >
                    {/* Title and Description */}
                    <div className="space-y-3">
                      <h2 className="text-2xl font-bold">
                        Environment Agency Flood Risk Tools
                      </h2>
                      <p className="text-sm leading-relaxed text-gray-700">
                        The Government provides two essential free online tools
                        to help you understand your specific flood risk and stay
                        informed about current flooding situations.
                      </p>
                    </div>

                    {/* Two Tool Boxes */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {/* Check Your Flood Risk */}
                      <div className="rounded-lg border-2 border-sky-200 bg-sky-50 p-4 md:col-span-1">
                        <div className="mb-3 flex items-center gap-2">
                          <Search className="size-6 text-sky-600" />
                          <h4 className="font-bold text-sky-900">
                            Check Your Flood Risk
                          </h4>
                        </div>
                        <p className="mb-3 text-xs text-sky-700">
                          Find your long-term flood risk by postcode
                        </p>
                        <p className="mb-3 text-sm text-sky-700">
                          This tool provides detailed flood risk information for
                          any address in England, including:
                        </p>
                        <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-sky-700">
                          <li>
                            Risk levels for rivers, sea, surface water, and
                            reservoirs
                          </li>
                          <li>
                            Flood depth and speed information where available
                          </li>
                          <li>Historical flooding data for your area</li>
                          <li>Flood defenses that protect your property</li>
                        </ul>
                        <div className="mb-3">
                          <span className="text-sm font-semibold text-sky-700">
                            Use it:
                          </span>
                          <p className="text-sm text-sky-700">
                            occasionally to refresh yourself on the long-term
                            flood risk from different sources to your property.
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="flex w-full items-center justify-center !border-2 !border-sky-700 bg-white !text-sky-700 hover:bg-gray-100 [&>svg]:!text-sky-700"
                          asChild
                        >
                          <a
                            href="https://check-long-term-flood-risk.service.gov.uk/postcode"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center"
                          >
                            <ExternalLink className="mr-2 size-4" />
                            Check Your Flood Risk
                          </a>
                        </Button>
                      </div>

                      {/* Check for Flooding */}
                      <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-4">
                        <div className="mb-3 flex items-center gap-2">
                          <AlertTriangle className="size-6 text-orange-600" />
                          <h4 className="font-bold text-orange-900">
                            Check for Flooding
                          </h4>
                        </div>
                        <p className="mb-3 text-xs text-orange-700">
                          Current flood warnings and river levels
                        </p>
                        <p className="mb-3 text-sm text-orange-700">
                          This tool shows real-time flooding information across
                          England, including:
                        </p>
                        <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-orange-700">
                          <li>Active flood alerts and warnings</li>
                          <li>Current river and sea levels</li>
                          <li>5-day flood forecasts</li>
                          <li>Recently updated flood information</li>
                        </ul>
                        <div className="mb-3">
                          <span className="text-sm font-semibold text-orange-700">
                            Use it:
                          </span>
                          <p className="text-sm text-orange-700">
                            regularly to stay informed about current conditions
                            and any active warnings in your area, particular
                            during periods of bad weather.
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="flex w-full items-center justify-center !border-2 !border-orange-700 bg-white !text-orange-700 hover:bg-gray-100 [&>svg]:!text-orange-700"
                          asChild
                        >
                          <a
                            href="https://check-for-flooding.service.gov.uk/?v=map-live&lyr=mv,ts,tw,ta&ext=-10.075548,49.323443,6.223881,56.043657&fid=flood.031FWFDU10"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center"
                          >
                            <ExternalLink className="mr-2 size-4" />
                            Check for Flooding
                          </a>
                        </Button>
                      </div>

                      {/* Detailed Risk Assessments Box */}
                      <div className="col-span-1 rounded-lg border-2 border-yellow-200 bg-yellow-50 p-4 md:col-span-2">
                        <div className="mb-3 flex items-center gap-2">
                          <Info className="size-6 text-yellow-600" />
                          <h4 className="font-bold text-yellow-900">
                            Detailed Risk Assessments
                          </h4>
                        </div>
                        <p className="mb-3 text-sm text-yellow-700">
                          The EA data indicates the risk to a particular
                          location, but does not provide an assessment of the
                          risk to your specific property, which can be impacted
                          by features of the property and the presence of
                          resilience measures.
                        </p>
                        <p className="text-sm text-yellow-700">
                          Floodwise's property assessment is focussed on
                          identifying appropriate emergency measures and should
                          not replace a detailed flood risk assessment for at
                          risk properties, but we partner with several
                          organisations who can provide them. See 'Your
                          Property' or contact our team for details.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Title and Description */}
                    <div className="space-y-3">
                      <h2 className="text-2xl font-bold">Being Prepared</h2>
                      <p className="text-sm leading-relaxed text-gray-700">
                        Understanding flood risk can be confusing, but there are
                        loads of resources available to help:
                      </p>
                    </div>

                    {/* Three Resource Boxes */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      {/* CIWEM's Be Flood Ready */}
                      <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                        <h4 className="mb-3 font-bold text-blue-900">
                          CIWEM's Be Flood Ready
                        </h4>
                        <p className="mb-4 text-sm text-blue-700">
                          Comprehensive guide to understanding flood risk and
                          preparation strategies.
                        </p>
                        <Button
                          variant="outline"
                          className="flex w-full items-center justify-center !border-2 !border-blue-700 bg-white !text-blue-700 hover:bg-gray-100 [&>svg]:!text-blue-700"
                          asChild
                        >
                          <a
                            href="https://www.befloodready.uk/before-a-flood/understanding-flood-risk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center"
                          >
                            <ExternalLink className="mr-2 size-4" />
                            Visit Resource
                          </a>
                        </Button>
                      </div>

                      {/* National Flood Forum */}
                      <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4">
                        <h4 className="mb-3 font-bold text-green-900">
                          National Flood Forum
                        </h4>
                        <p className="mb-4 text-sm text-green-700">
                          'Ready for Flooding' booklet with practical advice and
                          preparation tips.
                        </p>
                        <Button
                          variant="outline"
                          className="flex w-full items-center justify-center !border-2 !border-green-700 bg-white !text-green-700 hover:bg-gray-100 [&>svg]:!text-green-700"
                          asChild
                        >
                          <a
                            href="https://nationalfloodforum.org.uk/wp-content/uploads/2016/12/Ready-For-Flooding-26-11-14.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center"
                          >
                            <ExternalLink className="mr-2 size-4" />
                            View Booklet
                          </a>
                        </Button>
                      </div>

                      {/* The Flood Hub */}
                      <div className="rounded-lg border-2 border-indigo-200 bg-indigo-50 p-4">
                        <h4 className="mb-3 font-bold text-indigo-900">
                          The Flood Hub
                        </h4>
                        <p className="mb-4 text-sm text-indigo-700">
                          Understanding Flood Risk article with expert insights
                          and analysis
                        </p>
                        <Button
                          variant="outline"
                          className="flex w-full items-center justify-center !border-2 !border-indigo-700 bg-white !text-indigo-700 hover:bg-gray-100 [&>svg]:!text-indigo-700"
                          asChild
                        >
                          <a
                            href="https://thefloodhub.co.uk/blog/understanding-flood-risk/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center"
                          >
                            <ExternalLink className="mr-2 size-4" />
                            Read Article
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* Confirmation Checkbox Box */}
                    <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={understandsFloodRisk}
                          onCheckedChange={(checked) => {
                            setUnderstandsFloodRisk(checked === true);
                            if (checked === true) {
                              setHasAttemptedComplete(false);
                            }
                          }}
                          className="mt-1"
                        />
                        <label
                          className="flex-1 cursor-pointer text-sm text-gray-700"
                          onClick={() => {
                            const newValue = !understandsFloodRisk;
                            setUnderstandsFloodRisk(newValue);
                            if (newValue) {
                              setHasAttemptedComplete(false);
                            }
                          }}
                        >
                          Please tick to confirm that you understand the EA's
                          warning levels, have checked the flood risks and for
                          alerts in your area, and feel comfortable with your
                          understanding of your flood risk
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Navigation Buttons */}
            {!(hasCompletedSection && understandsFloodRisk) && (
              <div className="mt-6 flex items-center justify-between border-t pt-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevious}
                  disabled={currentStep === 1}
                  className="size-10"
                >
                  <ChevronLeft className="size-5" />
                </Button>
                <span className="text-sm text-gray-500">
                  Step {currentStep} of 4
                </span>
                {currentStep === 4 ? (
                  <div className="flex flex-col items-end gap-1">
                    <div
                      onClick={() => {
                        if (!understandsFloodRisk) {
                          setHasAttemptedComplete(true);
                        }
                      }}
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (understandsFloodRisk) {
                            setHasCompletedSection(true);
                          }
                        }}
                        disabled={!understandsFloodRisk}
                        className={cn(
                          "flex w-auto items-center justify-center pb-2 pl-2 pr-2 pt-2",
                          understandsFloodRisk &&
                            "bg-black text-white hover:bg-black/90 hover:text-white",
                        )}
                      >
                        <CheckCircle2 className="size-5" />
                        Complete This Section
                      </Button>
                    </div>
                    {hasAttemptedComplete && !understandsFloodRisk && (
                      <p className="text-xs text-red-600">
                        Please tick the confirmation checkbox above to complete
                        section
                      </p>
                    )}
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToNext}
                    className="size-10"
                  >
                    <ChevronRight className="size-5" />
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
export { FloodInformations };
