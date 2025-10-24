import { useState } from "react";
import "./index.css";
import { Button } from "./components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";
import { Avatar, AvatarImage, AvatarFallback } from "./components/ui/avatar";
import reactLogo from "./assets/react.svg";
import { Badge } from "./components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./components/ui/breadcrumb";
import { Calendar } from "./components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./components/ui/carousel";
import { Checkbox } from "./components/ui/checkbox";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./components/ui/collapsible";
import { ArrowDown, ArrowUp, Home, Settings, User } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./components/ui/hover-card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "./components/ui/input-otp";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";
import { Progress } from "./components/ui/progress";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { ScrollArea } from "./components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Switch } from "./components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./components/ui/sheet";

import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "./components/ui/sidebar";
// Form schema
const formSchema = z.object({
  name: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  otp: z.string().min(6, {
    message: "OTP must be 6 digits.",
  }),
});

function App() {
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      otp: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
                <span className="text-sm font-bold">F</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold">Floodwise</h1>
                <p className="text-xs text-muted-foreground">Risk Management</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            <div className="p-4">
              <p className="text-xs text-muted-foreground">© 2024 Floodwise</p>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content Area */}
        <main className="flex flex-1 flex-col">
          {/* Header with Sidebar Trigger */}
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-4">
                  <SidebarTrigger />
                  <h2 className="text-lg font-semibold">Component Showcase</h2>
                </div>
                <Menubar className="border-0 bg-transparent">
                  <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>New</MenubarItem>
                      <MenubarItem>Open</MenubarItem>
                      <MenubarItem>Save</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Exit</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>Edit</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>Cut</MenubarItem>
                      <MenubarItem>Copy</MenubarItem>
                      <MenubarItem>Paste</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Find</MenubarItem>
                      <MenubarItem>Replace</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>View</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>Dashboard</MenubarItem>
                      <MenubarItem>Forms</MenubarItem>
                      <MenubarItem>Settings</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Help</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>Tools</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>Form Builder</MenubarItem>
                      <MenubarItem>Validation</MenubarItem>
                      <MenubarItem>Export</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Debug</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-8">
            <h1>Floodwise</h1>

            {/* Basic Form */}
            <div className="mt-8 max-w-md">
              <Card>
                <CardHeader>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <CardTitle className="cursor-pointer hover:text-primary">
                        Basic Form
                      </CardTitle>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">
                          Form Information
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          This form demonstrates shadcn UI components with React
                          Hook Form and Zod validation.
                        </p>
                        <div className="text-xs text-muted-foreground">
                          <p>• Name: Minimum 5 characters</p>
                          <p>• Email: Valid email format required</p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  <CardDescription>
                    Test form with name and email fields
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <FormLabel className="cursor-help">
                                  Name
                                </FormLabel>
                              </HoverCardTrigger>
                              <HoverCardContent>
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold">
                                    Name Field
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    Enter your full name or display name.
                                  </p>
                                  <div className="text-xs text-muted-foreground">
                                    <p>• Must be at least 5 characters</p>
                                    <p>
                                      • Can include spaces and special
                                      characters
                                    </p>
                                  </div>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                            <FormControl>
                              <Input placeholder="Enter your name" {...field} />
                            </FormControl>
                            <FormDescription>
                              This is your display name.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your email"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              We'll never share your email.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                          <FormItem>
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <FormLabel className="cursor-help">
                                  OTP Code
                                </FormLabel>
                              </HoverCardTrigger>
                              <HoverCardContent>
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold">
                                    One-Time Password
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    Enter the 6-digit code sent to your email.
                                  </p>
                                  <div className="text-xs text-muted-foreground">
                                    <p>• Must be exactly 6 digits</p>
                                    <p>• Check your email for the code</p>
                                  </div>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                            <FormControl>
                              <InputOTP maxLength={6} {...field}>
                                <InputOTPGroup>
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                  <InputOTPSlot index={2} />
                                  <InputOTPSlot index={3} />
                                  <InputOTPSlot index={4} />
                                  <InputOTPSlot index={5} />
                                </InputOTPGroup>
                              </InputOTP>
                            </FormControl>
                            <FormDescription>
                              Enter the 6-digit code from your email.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Submit</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Navigation Menu */}
            <div className="mt-8">
              <h2 className="mb-4 text-2xl font-semibold">Navigation Menu</h2>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      Getting Started
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                        <NavigationMenuLink>
                          <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">
                              Introduction
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Re-usable components built using Radix UI and
                              Tailwind CSS.
                            </p>
                          </div>
                        </NavigationMenuLink>
                        <NavigationMenuLink>
                          <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">
                              Installation
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              How to install dependencies and structure your
                              app.
                            </p>
                          </div>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                        <NavigationMenuLink>
                          <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">
                              Form Components
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Input, Button, Checkbox, and other form elements.
                            </p>
                          </div>
                        </NavigationMenuLink>
                        <NavigationMenuLink>
                          <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">
                              Layout Components
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Card, Dialog, Sheet, and other layout elements.
                            </p>
                          </div>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Popover Examples */}
            <div className="mt-8">
              <h2 className="mb-4 text-2xl font-semibold">Popover Examples</h2>
              <div className="flex gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">Open Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">
                          Popover Title
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          This is a popover with some content. You can put any
                          content here.
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <Button size="sm">Action 1</Button>
                        <Button size="sm" variant="outline">
                          Action 2
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">Settings</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Settings</h4>
                        <p className="text-sm text-muted-foreground">
                          Configure your application settings.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">
                            Dark Mode
                          </label>
                          <Checkbox />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">
                            Notifications
                          </label>
                          <Checkbox />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Button onClick={() => setCount((c) => c + 1)} variant="outline">
              Count {count}
            </Button>
            <Button onClick={() => setCount(0)} variant="outline">
              Reset
            </Button>

            <div className="mt-4">
              <Alert>
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  This is how the Alert component looks Like.
                </AlertDescription>
              </Alert>
            </div>
            <div className="mt-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>Alert Dialog Test</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Alert Dialog Test Title</AlertDialogTitle>
                    <AlertDialogDescription>
                      This is an example description
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      <Button>Cancel</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction>
                      <Button>Continue</Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className="mt-4">
              <Avatar>
                <AvatarImage src={reactLogo} alt="React Logo" />
                <AvatarFallback>RL</AvatarFallback>
              </Avatar>
            </div>
            <div className="mt-4">
              <Badge variant="default">Default Badge</Badge>
              <Badge variant="secondary" className="ml-2">
                Secondary
              </Badge>
              <Badge variant="outline" className="ml-2">
                Destructive
              </Badge>
            </div>
            <div className="mt-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Current Page</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="mt-4">
              <Calendar />
            </div>
            <div className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sample Card</CardTitle>
                  <CardDescription>
                    This is a basic card component
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card content goes here</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Do Nothing</Button>
                </CardFooter>
              </Card>
            </div>
            <div className="mx-auto mt-4 w-full max-w-xs">
              <Carousel className="w-full">
                <CarouselContent>
                  <CarouselItem>
                    <div className="p-4 text-center">Hello</div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-4 text-center">World</div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-4 text-center">Carousel</div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="mx-auto mt-4 flex w-full max-w-xs items-center gap-2">
              <p>click the checkbox</p>
              <Checkbox />
            </div>
            <div className="mx-auto mt-4 flex w-full max-w-xs items-center gap-2">
              <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    {isOpen ? (
                      <>
                        <ArrowUp className="size-4" /> collapse me
                      </>
                    ) : (
                      <>
                        <ArrowDown className="size-4" /> open me
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <span className="ml-2 text-sm text-muted-foreground">
                    Content visible
                  </span>
                </CollapsibleContent>
              </Collapsible>
            </div>
            <div className="mt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogPortal>
                  <DialogOverlay />
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Dialog Title</DialogTitle>
                      <DialogDescription>
                        This is a sample dialog with all components.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p>
                        This is the dialog content area where you can put any
                        content.
                      </p>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button>Save</Button>
                    </DialogFooter>
                  </DialogContent>
                </DialogPortal>
              </Dialog>
            </div>
            <div className="mt-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Progress Examples */}
            <div className="mt-8">
              <h2 className="mb-4 text-2xl font-semibold">Progress Examples</h2>

              {/* Simple test progress bar */}
              <div className="mb-4">
                <p className="mb-2 text-sm text-muted-foreground">
                  Test Progress Bar:
                </p>
                <div className="h-4 w-full rounded-full bg-gray-200">
                  <div
                    className="h-4 rounded-full bg-blue-600"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Basic Progress</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-3 w-full" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Loading Progress</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-3 w-full" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Upload Progress</span>
                    <span>90%</span>
                  </div>
                  <Progress value={90} className="h-3 w-full" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Installation Progress</span>
                    <span>30%</span>
                  </div>
                  <Progress value={30} className="h-3 w-full" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Form Completion</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} className="h-3 w-full" />
                </div>
              </div>
            </div>

            {/* Radio Group Examples */}
            <div className="mt-8">
              <h2 className="mb-4 text-2xl font-semibold">
                Radio Group Examples
              </h2>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">
                    Select your preferred theme:
                  </h3>
                  <RadioGroup defaultValue="light">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <label
                        htmlFor="light"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Light Theme
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <label
                        htmlFor="dark"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Dark Theme
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="system" />
                      <label
                        htmlFor="system"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        System Theme
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Choose your plan:</h3>
                  <RadioGroup defaultValue="free">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="free" id="free" />
                      <label
                        htmlFor="free"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Free Plan
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pro" id="pro" />
                      <label
                        htmlFor="pro"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Pro Plan - $9/month
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="enterprise" id="enterprise" />
                      <label
                        htmlFor="enterprise"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Enterprise Plan - $29/month
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium">
                    Notification preferences:
                  </h3>
                  <RadioGroup defaultValue="email">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email" />
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email notifications
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="push" id="push" />
                      <label
                        htmlFor="push"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Push notifications
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="none" />
                      <label
                        htmlFor="none"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        No notifications
                      </label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            {/* Sheet Examples */}
            <div className="mt-8">
              <h2 className="mb-4 text-2xl font-semibold">Sheet Examples</h2>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Basic Sheet</h3>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Open Sheet</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Basic Sheet</SheetTitle>
                        <SheetDescription>
                          This is a basic sheet component that slides in from
                          the right.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="py-4">
                        <p className="text-sm text-muted-foreground">
                          You can put any content here. The sheet will slide in
                          from the right and can be closed by clicking the X
                          button or clicking outside.
                        </p>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Settings Sheet</h3>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Open Settings</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Settings</SheetTitle>
                        <SheetDescription>
                          Configure your application settings here.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <label className="text-sm font-medium">
                              Dark Mode
                            </label>
                            <p className="text-xs text-muted-foreground">
                              Toggle between light and dark themes
                            </p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <label className="text-sm font-medium">
                              Notifications
                            </label>
                            <p className="text-xs text-muted-foreground">
                              Receive email notifications
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <label className="text-sm font-medium">
                              Auto-save
                            </label>
                            <p className="text-xs text-muted-foreground">
                              Automatically save your work
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Form Sheet</h3>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Open Form</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Contact Form</SheetTitle>
                        <SheetDescription>
                          Fill out this form to get in touch with us.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="py-4">
                        <form className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Name</label>
                            <Input placeholder="Enter your name" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input
                              placeholder="Enter your email"
                              type="email"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Message
                            </label>
                            <textarea
                              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Enter your message"
                            />
                          </div>
                          <Button className="w-full">Send Message</Button>
                        </form>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>

            {/* Switch Examples */}
            <div className="mt-8">
              <h2 className="mb-4 text-2xl font-semibold">Switch Examples</h2>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Dark Mode
                        </label>
                        <p className="text-sm text-muted-foreground">
                          Toggle between light and dark themes
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Notifications
                        </label>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Auto-save
                        </label>
                        <p className="text-sm text-muted-foreground">
                          Automatically save your work
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Feature Toggles</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Beta Features
                        </label>
                        <p className="text-sm text-muted-foreground">
                          Enable experimental features
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Analytics
                        </label>
                        <p className="text-sm text-muted-foreground">
                          Help us improve by sharing usage data
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Two-Factor Authentication
                        </label>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Select Examples */}
            <div className="mt-8">
              <h2 className="mb-4 text-2xl font-semibold">Select Examples</h2>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Choose your country:</h3>
                  <Select>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="jp">Japan</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Select your plan:</h3>
                  <Select>
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Choose a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free Plan</SelectItem>
                      <SelectItem value="pro">Pro Plan - $9/month</SelectItem>
                      <SelectItem value="enterprise">
                        Enterprise Plan - $29/month
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Select theme:</h3>
                  <Select>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Choose theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Scroll Area Examples */}
            <div className="mt-8">
              <h2 className="mb-4 text-2xl font-semibold">
                Scroll Area Examples
              </h2>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Terms and Conditions</h3>
                  <ScrollArea className="h-32 w-full rounded-md border p-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">1. Acceptance of Terms</h4>
                      <p className="text-sm text-muted-foreground">
                        By accessing and using this service, you accept and
                        agree to be bound by the terms and provision of this
                        agreement.
                      </p>
                      <h4 className="font-semibold">2. Use License</h4>
                      <p className="text-sm text-muted-foreground">
                        Permission is granted to temporarily download one copy
                        of the materials on our website for personal,
                        non-commercial transitory viewing only.
                      </p>
                      <h4 className="font-semibold">3. Disclaimer</h4>
                      <p className="text-sm text-muted-foreground">
                        The materials on our website are provided on an 'as is'
                        basis. We make no warranties, expressed or implied, and
                        hereby disclaim and negate all other warranties.
                      </p>
                      <h4 className="font-semibold">4. Limitations</h4>
                      <p className="text-sm text-muted-foreground">
                        In no event shall our company or its suppliers be liable
                        for any damages arising out of the use or inability to
                        use the materials on our website.
                      </p>
                      <h4 className="font-semibold">
                        5. Accuracy of Materials
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        The materials appearing on our website could include
                        technical, typographical, or photographic errors. We do
                        not warrant that any of the materials on its website are
                        accurate, complete, or current.
                      </p>
                      <h4 className="font-semibold">6. Links</h4>
                      <p className="text-sm text-muted-foreground">
                        We have not reviewed all of the sites linked to our
                        website and are not responsible for the contents of any
                        such linked site.
                      </p>
                      <h4 className="font-semibold">7. Modifications</h4>
                      <p className="text-sm text-muted-foreground">
                        We may revise these terms of service for its website at
                        any time without notice. By using this website, you are
                        agreeing to be bound by the then current version of
                        these terms of service.
                      </p>
                      <h4 className="font-semibold">8. Governing Law</h4>
                      <p className="text-sm text-muted-foreground">
                        These terms and conditions are governed by and construed
                        in accordance with the laws and you irrevocably submit
                        to the exclusive jurisdiction of the courts in that
                        state or location.
                      </p>
                    </div>
                  </ScrollArea>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Code Snippet</h3>
                  <ScrollArea className="h-40 w-full rounded-md border bg-gray-900 p-4">
                    <pre className="text-sm text-green-400">
                      <code>{`// React Component Example
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/users/' + userId);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

export default UserProfile;`}</code>
                    </pre>
                  </ScrollArea>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Long Article</h3>
                  <ScrollArea className="h-48 w-full rounded-md border p-4">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">
                        The Future of Web Development
                      </h4>
                      <p className="text-sm">
                        Web development has evolved dramatically over the past
                        decade, and the future looks even more promising. With
                        the advent of new frameworks, tools, and methodologies,
                        developers are now able to create more sophisticated and
                        user-friendly applications than ever before.
                      </p>
                      <p className="text-sm">
                        One of the most significant trends in modern web
                        development is the shift towards component-based
                        architectures. Frameworks like React, Vue, and Angular
                        have revolutionized how we think about building user
                        interfaces, making code more reusable and maintainable.
                      </p>
                      <p className="text-sm">
                        Another exciting development is the rise of serverless
                        computing and edge functions. These technologies allow
                        developers to run code closer to users, resulting in
                        faster load times and better user experiences. Companies
                        like Vercel, Netlify, and AWS have made these
                        technologies accessible to developers of all skill
                        levels.
                      </p>
                      <p className="text-sm">
                        The importance of performance optimization cannot be
                        overstated. With Core Web Vitals becoming a ranking
                        factor for Google, developers must focus on creating
                        fast, responsive applications. Techniques like code
                        splitting, lazy loading, and image optimization are now
                        essential skills for modern web developers.
                      </p>
                      <p className="text-sm">
                        Looking ahead, we can expect to see continued innovation
                        in areas like WebAssembly, which allows high-performance
                        applications to run in the browser, and Progressive Web
                        Apps (PWAs), which bridge the gap between web and native
                        applications. The future of web development is bright,
                        and those who stay current with these trends will be
                        well-positioned for success.
                      </p>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default App;
