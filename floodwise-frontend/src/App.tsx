import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./components/ui/collapsible";
import "./index.css";
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./components/ui/sidebar";
import {
  HammerIcon,
  Home,
  HelpCircle,
  FileText,
  ClipboardList,
  User,
  CheckCircle,
  Building,
  Building2,
  DoorOpen,
  Wind,
  Droplets,
  Zap,
  Shield,
  Settings,
  Plus,
  BookOpen,
  Waves,
  RefreshCcw,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { GradientSeparator } from "./components/ui/gradientSeparator";
import { Footer } from "./components/layout";
import floodwiseLogo from "./assets/Floodwise-logo-text-white.png";
import { Header } from "./components/layout";
import { PropertyOverview } from "./pages/PropertyOverview";
import { Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MyFloodKit } from "./pages/MyFloodKit";
import { PropertyAssessment } from "./pages/PropertyAssessment";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [propertyAssessmentOpen, setPropertyAssessmentOpen] = useState(false);
  const [floodPlanOpen, setFloodPlanOpen] = useState(false);
  const location = useLocation();
  const routeTitles: Record<string, string> = {
    "/": "Property Overview",
    "/my-flood-kit": "My Flood Kit",
    "/property-assessment": "Property Assessment",
    "/flood-plan": "Flood Plan",
    "/faq-support": "FAQ & Support",
    "/account-management": "Account Management",
    "/property-assessment/verify-details":
      "Property Assessment - Verify Details",
    "/property-assessment/property-construction":
      "Property Assessment - Property Construction",
    "/property-assessment/other-structures":
      "Property Assessment - Other Structures",
  };
  // TODO: Add API call to fetch current user's property ID on mount
  // TODO: Add API call to fetch user profile/settings if needed
  // useEffect(() => {
  //   fetchUserProperty().then(setPropertyId).catch(handleError);
  // }, []);

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <Sidebar>
        <SidebarHeader className="px-6 pb-6 pt-6">
          <div className="flex justify-center">
            <img
              src={floodwiseLogo}
              alt="Floodwise-logo"
              className="h-20 w-auto"
            />
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            <GradientSeparator />
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/">
                  <Home className="h-4 w-4" />
                  <span>Property Overview</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/my-flood-kit">
                  <HammerIcon className="h-4 w-4" />
                  <span>My Flood Kit</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Collapsible
                open={propertyAssessmentOpen}
                onOpenChange={setPropertyAssessmentOpen}
              >
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <ClipboardList className="h-4 w-4" />
                    <span>Property Assessment</span>
                    {propertyAssessmentOpen ? (
                      <ChevronDown className="ml-auto h-4 w-4" />
                    ) : (
                      <ChevronRight className="ml-auto h-4 w-4" />
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-6 space-y-1">
                    {/* TODO: Add API calls to fetch property assessment data for each section */}
                    <SidebarMenuButton asChild>
                      <Link to="/property-assessment">
                        <CheckCircle className="h-4 w-4" />
                        <span>Verify Details</span>
                      </Link>
                      {/* TODO: Fetch verify details data on click/navigation */}
                    </SidebarMenuButton>
                    <SidebarMenuButton asChild>
                      <Link to="/property-assessment/property-construction">
                        <Building className="h-4 w-4" />
                        <span>Property Construction</span>
                      </Link>
                      {/* TODO: Fetch property construction data on click/navigation */}
                    </SidebarMenuButton>
                    <SidebarMenuButton asChild>
                      <Link to="/property-assessment/other-structures">
                        <Building2 className="h-4 w-4" />
                        <span>Other Structures</span>
                      </Link>
                      {/* TODO: Fetch other structures data on click/navigation */}
                    </SidebarMenuButton>
                    <SidebarMenuButton>
                      <DoorOpen className="h-4 w-4" />
                      <span>Ground Floor Doorways</span>
                      {/* TODO: Fetch doorway data on click/navigation */}
                    </SidebarMenuButton>
                    <SidebarMenuButton>
                      <Wind className="h-4 w-4" />
                      <span>Air Bricks</span>
                      {/* TODO: Fetch air bricks data on click/navigation */}
                    </SidebarMenuButton>
                    <SidebarMenuButton>
                      <Droplets className="h-4 w-4" />
                      <span>Ground Floor Plumbing</span>
                      {/* TODO: Fetch plumbing data on click/navigation */}
                    </SidebarMenuButton>
                    <SidebarMenuButton>
                      <Zap className="h-4 w-4" />
                      <span>Utility Connections</span>
                      {/* TODO: Fetch utility connections data on click/navigation */}
                    </SidebarMenuButton>
                    <SidebarMenuButton>
                      <Shield className="h-4 w-4" />
                      <span>Existing PFR</span>
                      {/* TODO: Fetch existing PFR data on click/navigation */}
                    </SidebarMenuButton>
                    <SidebarMenuButton>
                      <Settings className="h-4 w-4" />
                      <span>Installation</span>
                      {/* TODO: Fetch installation data on click/navigation */}
                    </SidebarMenuButton>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Collapsible open={floodPlanOpen} onOpenChange={setFloodPlanOpen}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <FileText className="h-4 w-4" />
                    <span>Flood Plan</span>
                    {floodPlanOpen ? (
                      <ChevronDown className="ml-auto h-4 w-4" />
                    ) : (
                      <ChevronRight className="ml-auto h-4 w-4" />
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-6 space-y-1">
                    {/* TODO: Add API calls to fetch flood plan data for each section */}
                    <SidebarMenuButton>
                      <Plus className="h-4 w-4" />
                      <span>Your Flood Plan</span>
                      {/* TODO: Fetch flood plan data on click/navigation */}
                    </SidebarMenuButton>
                    <SidebarMenuButton>
                      <BookOpen className="h-4 w-4" />
                      <span>Getting Prepared</span>
                      {/* TODO: Fetch getting prepared data on click/navigation */}
                    </SidebarMenuButton>
                    <SidebarMenuButton>
                      <Waves className="h-4 w-4" />
                      <span>During a Flood</span>
                      {/* TODO: Fetch during flood data on click/navigation */}
                    </SidebarMenuButton>
                    <SidebarMenuButton>
                      <RefreshCcw className="h-4 w-4" />
                      <span>After a Flood</span>
                      {/* TODO: Fetch after flood data on click/navigation */}
                    </SidebarMenuButton>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-4">
          <div className="space-y-3">
            <div className="space-y-1">
              <SidebarMenuButton>
                <HelpCircle className="h-4 w-4" />
                <span>FAQ & Support</span>
              </SidebarMenuButton>
              <SidebarMenuButton>
                <User className="h-4 w-4" />
                <span>Account Management</span>
              </SidebarMenuButton>
            </div>
            <div className="h-[0.5px] bg-gray-300"></div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>Emergency: 999</p>
              <p>EA Floodline: 0345 988 1188</p>
              <p>Support: 0800 123 4567</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content Area - pushed by the Sidebar */}
      <main className="flex min-w-0 flex-1 flex-col">
        <Header title={routeTitles[location.pathname] || "FloodWise"} />
        <Routes>
          <Route path="/" element={<PropertyOverview />} />
          <Route path="/my-flood-kit" element={<MyFloodKit />} />
          <Route
            path="/property-assessment/*"
            element={<PropertyAssessment />}
          />
        </Routes>
        <Footer />
      </main>
    </SidebarProvider>
  );
}

export default App;
