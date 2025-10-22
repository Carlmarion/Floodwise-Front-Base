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
import { ArrowDown, ArrowUp } from "lucide-react";
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

function App() {
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <h1>Floodwise</h1>
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
            <CardDescription>This is a basic card component</CardDescription>
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
                  This is the dialog content area where you can put any content.
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
    </>
  );
}

export default App;
