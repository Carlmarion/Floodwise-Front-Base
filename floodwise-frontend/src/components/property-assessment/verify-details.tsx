import { useState } from "react";
import { mockUserData } from "@/lib/utils";
import { mockPropertyData } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserRound, Edit, CheckCircle, Building2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const personalInfoFormSchema = z.object({
  firstName: z.string().min(1, "First name is required.").max(100),
  lastName: z.string().min(1, "Last name is required.").max(100),
  email: z.string().email("Invalid email address.").max(100),
  phoneNumber: z.string().min(1, "Phone number is required.").max(100),
  insureReference: z.string().max(100).optional(),
});

const propertyInfoFormSchema = z.object({
  propertyAddress: z.string().min(5, "Property address is required.").max(70),
  propertyType: z.string().optional().nullable(),
});

type PersonalInfoFormValues = z.infer<typeof personalInfoFormSchema>;
type PropertyInfoFormValues = z.infer<typeof propertyInfoFormSchema>;
function VerifyDetails() {
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [isEditingProperty, setIsEditingProperty] = useState(false);

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

  const propertyInfoForm = useForm<PropertyInfoFormValues>({
    resolver: zodResolver(propertyInfoFormSchema),
    defaultValues: {
      propertyAddress: `${mockPropertyData.address.addressLine}${
        mockPropertyData.address.additionalAddressLine
          ? `, ${mockPropertyData.address.additionalAddressLine}`
          : ""
      }, ${mockPropertyData.address.city}, ${mockPropertyData.address.postcode}`,
      propertyType: mockPropertyData.attributes[0]?.value || null,
    },
  });

  return (
    <>
      <Card>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-gray-500">Name</Label>
                  <p>
                    {personalInfoForm.watch("firstName")}{" "}
                    {personalInfoForm.watch("lastName")}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-gray-500">Email Address</Label>
                  <p>{personalInfoForm.watch("email")}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-gray-500">Phone Number</Label>
                  <p>{personalInfoForm.watch("phoneNumber")}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-gray-500">Policy Number</Label>
                  <p>{personalInfoForm.watch("insureReference") || "—"}</p>
                </div>
              </div>
            )}
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Building2 className="size-5 text-muted-foreground" />
              <CardTitle>Property Information</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditingProperty(!isEditingProperty)}
            >
              <Edit className="size-4 text-muted-foreground" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...propertyInfoForm}>
            {isEditingProperty ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-gray-500">Address</Label>
                  <FormField
                    control={propertyInfoForm.control}
                    name="propertyAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="Property Address" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-gray-500">Property Type</Label>
                  <FormField
                    control={propertyInfoForm.control}
                    name="propertyType"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || undefined}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Property Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Semi-detached">
                              Semi-detached
                            </SelectItem>
                            <SelectItem value="Detached">Detached</SelectItem>
                            <SelectItem value="Terraced">Terraced</SelectItem>
                            <SelectItem value="Bungalow">Bungalow</SelectItem>
                            <SelectItem value="Cottage">Cottage</SelectItem>
                            <SelectItem value="Flat">Flat</SelectItem>
                            <SelectItem value="Mobile Home">
                              Mobile Home
                            </SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
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
                      propertyInfoForm.reset();
                      setIsEditingProperty(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={propertyInfoForm.handleSubmit((data) => {
                      console.log("Save property:", data);
                      setIsEditingProperty(false);
                    })}
                  >
                    <CheckCircle className="mr-2 size-4" />
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-gray-500">Address</Label>
                  <p>{propertyInfoForm.watch("propertyAddress")}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-gray-500">Property Type</Label>
                  <p>{propertyInfoForm.watch("propertyType") || "—"}</p>
                </div>
              </div>
            )}
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

export { VerifyDetails };
