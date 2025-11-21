import { useState } from "react";
import { mockUserData } from "@/lib/utils";
import { mockPropertyData } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  UserRound,
  Edit,
  CheckCircle,
  Building2,
  Plus,
  ArrowLeft,
} from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { GDPRInfo } from "./GDPRInfo";
import { GradientSeparator } from "@/components/ui/gradientSeparator";
import { Link } from "react-router-dom";
import { InfoPopover } from "../shared/InfoPopover";
const personalInfoFormSchema = z.object({
  firstName: z.string().min(1, "First name is required.").max(100),
  lastName: z.string().min(1, "Last name is required.").max(100),
  email: z.string().email("Invalid email address.").max(100),
  phoneNumber: z.string().min(1, "Phone number is required.").max(100),
  insureReference: z.string().max(100).optional(),
});

type PersonalInfoFormValues = z.infer<typeof personalInfoFormSchema>;

function VerifyDetails() {
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);

  const personalInfoForm = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues: {
      firstName: mockUserData.firstName,
      lastName: mockUserData.lastName,
      email: mockUserData.email,
      phoneNumber: mockUserData.phoneNumber,
      insureReference: mockUserData.insureReference || "",
    },
  });

  return (
    <>
      <div className="mb-4 mt-4 flex justify-start px-4">
        <Button variant="outline" asChild className="w-fit items-center">
          <Link to="/">
            <ArrowLeft className="mr-2 size-4" />
            back to your property
          </Link>
        </Button>
      </div>
      <div className="flex items-center justify-center gap-2 px-4">
        <h2 className="mb-4 mt-4 text-center text-2xl font-bold">
          First Let's Verify Your Details
        </h2>
        <InfoPopover
          title="Why do we need to verify your details?"
          content="We need to make sure that this is your policy and that your contact details and address are correct. We use your exact property location to access Environment Agency flood risk data, local water level monitoring, and ensure any flood defenses we recommend are suitable and get delivered quickly in a flood event."
        />
      </div>

      <Card className="m-4">
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <UserRound className="size-5 text-muted-foreground" />
              <CardTitle>Personal Information</CardTitle>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditingPersonalInfo(!isEditingPersonalInfo)}
            >
              <Edit className="size-4 text-muted-foreground" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...personalInfoForm}>
            {isEditingPersonalInfo ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-gray-500">Name</Label>
                  <div className="flex gap-2">
                    <FormField
                      control={personalInfoForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} placeholder="First name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={personalInfoForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} placeholder="Last name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-gray-500">Email Address</Label>
                  <FormField
                    control={personalInfoForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-gray-500">Phone Number</Label>
                  <FormField
                    control={personalInfoForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} type="tel" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-gray-500">Policy Number</Label>
                  <FormField
                    control={personalInfoForm.control}
                    name="insureReference"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      personalInfoForm.reset();
                      setIsEditingPersonalInfo(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={personalInfoForm.handleSubmit((data) => {
                      console.log("Save:", data);
                      setIsEditingPersonalInfo(false);
                    })}
                  >
                    <CheckCircle className="mr-2 size-4" />
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-gray-500">Name</Label>
                  <p className="break-words">
                    {personalInfoForm.watch("firstName")}{" "}
                    {personalInfoForm.watch("lastName")}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-gray-500">Email Address</Label>
                  <p className="break-words break-all">
                    {personalInfoForm.watch("email")}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-gray-500">Phone Number</Label>
                  <p className="break-words">
                    {personalInfoForm.watch("phoneNumber")}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-gray-500">Policy Number</Label>
                  <p className="break-words">
                    {personalInfoForm.watch("insureReference") || "—"}
                  </p>
                </div>
              </div>
            )}
          </Form>
        </CardContent>
      </Card>
      <Card className="m-4">
        <CardHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <div className="flex items-center gap-2">
                <Building2 className="size-5 text-muted-foreground" />
                <CardTitle>Property Information</CardTitle>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {mockPropertyData ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-gray-500">Address</Label>
                <p>
                  {mockPropertyData.address.addressLine}
                  {mockPropertyData.address.additionalAddressLine
                    ? `, ${mockPropertyData.address.additionalAddressLine}`
                    : ""}
                  , {mockPropertyData.address.city},{" "}
                  {mockPropertyData.address.postcode}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-gray-500">Property Type</Label>
                <p>
                  {mockPropertyData.attributes[0]?.value
                    ?.charAt(0)
                    .toUpperCase() +
                    mockPropertyData.attributes[0]?.value?.slice(1) || "—"}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p>
                If this card is empty, it means that we don't have any property
                information for you yet.
              </p>
              <p>
                Adding your property information will allow us to provide you
                accurate flood risk information and to prepare your flood kit.
              </p>
              <Button
                variant="default"
                size="lg"
                className="bg-black text-white"
              >
                <Plus className="mr-2 size-4" /> Add Property Information
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      {/* Validation/Edit  Buttons*/}
      <div className="mt-4 flex flex-col items-stretch gap-4 px-4 sm:flex-row sm:justify-center">
        <Button
          variant="outline"
          size="lg"
          onClick={() => setIsEditingPersonalInfo(true)}
          className="w-full sm:w-auto"
        >
          <Edit className="mr-2 size-4" /> Something's not right
        </Button>
        <Button
          variant="default"
          size="lg"
          className="w-full bg-black text-white sm:w-auto"
        >
          <CheckCircle className="mr-2 size-4" /> Look's good
        </Button>
      </div>
      <GradientSeparator className="mx-auto my-4 h-1 w-full max-w-96" />
      <div className="m-4">
        <GDPRInfo />
      </div>
    </>
  );
}

export { VerifyDetails };
