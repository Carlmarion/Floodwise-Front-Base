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
import { PropertyInfoCard } from "./components/property/PropertyInfoCard";
import { GradientSeparator } from "./components/ui/gradientSeparator";
import { Footer } from "./components/layout";
import floodwiseLogo from "./assets/Floodwise-logo-text-white.png";
import { Header } from "./components/layout";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [propertyAssessmentOpen, setPropertyAssessmentOpen] = useState(false);
  const [floodPlanOpen, setFloodPlanOpen] = useState(false);

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
              <SidebarMenuButton>
                <Home className="h-4 w-4" />
                <span>Property Overview</span>
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
                    <SidebarMenuButton>
                      <CheckCircle className="h-4 w-4" />
                      <span>Verify Details</span>
                      {/* TODO: Fetch verify details data on click/navigation */}
                    </SidebarMenuButton>
                    <SidebarMenuButton>
                      <Building className="h-4 w-4" />
                      <span>Property Construction</span>
                      {/* TODO: Fetch property construction data on click/navigation */}
                    </SidebarMenuButton>
                    <SidebarMenuButton>
                      <Building2 className="h-4 w-4" />
                      <span>Other Structures</span>
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
        <Header title="Property Overview" />

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="container mx-auto">
            <h2 className="mb-4 text-2xl font-semibold">
              Welcome to your property overview
            </h2>
            <p className="mb-6 text-muted-foreground">
              Monitor here your property information, flood plan and more.
            </p>
            {/* TODO: Pass property data from API to PropertyInfoCard */}
            {/* TODO: Handle loading state while fetching property data */}
            {/* TODO: Handle error state if property fetch fails */}
            <PropertyInfoCard />
          </div>
        </div>
        <Footer />
      </main>
    </SidebarProvider>
  );
}

export default App;
