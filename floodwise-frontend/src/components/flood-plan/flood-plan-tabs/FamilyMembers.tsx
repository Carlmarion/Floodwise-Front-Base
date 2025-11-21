import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import {
  UserPlus,
  Phone,
  Calendar as CalendarIcon,
  X,
  Cake,
  Heart,
} from "lucide-react";

type FamilyMember = {
  id: string;
  name: string;
  lastName: string;
  dateOfBirth: Date | null;
  phoneNumber: string;
  hasMedicalCondition: boolean;
  medicalConditionNote: string;
};

type FamilyFormData = {
  name: string;
  lastName: string;
  dateOfBirth: Date | null;
  phoneNumber: string;
  hasMedicalCondition: boolean;
  medicalConditionNote: string;
};

function FamilyMembers() {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [isAddingFamilyMember, setIsAddingFamilyMember] = useState(false);
  const [familyFormData, setFamilyFormData] = useState<FamilyFormData>({
    name: "",
    lastName: "",
    dateOfBirth: null,
    phoneNumber: "",
    hasMedicalCondition: false,
    medicalConditionNote: "",
  });
  const [editingFamilyMemberId, setEditingFamilyMemberId] = useState<
    string | null
  >(null);
  const [familyMemberDeleteDialogOpen, setFamilyMemberDeleteDialogOpen] =
    useState(false);
  const [familyMemberToDelete, setFamilyMemberToDelete] = useState<{
    id: string;
    name: string;
    lastName: string;
  } | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const calculateAge = (dateOfBirth: Date | null): number | null => {
    if (!dateOfBirth) return null;
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleAddFamilyMember = () => {
    // TODO: Add form validation
    // TODO: Call API to create family member
    // TODO: Handle API errors and show user feedback
    if (familyFormData.name && familyFormData.lastName) {
      const newFamilyMember = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ...familyFormData,
      };
      setFamilyMembers((prev) => [...prev, newFamilyMember]);
      setFamilyFormData({
        name: "",
        lastName: "",
        dateOfBirth: null,
        phoneNumber: "",
        hasMedicalCondition: false,
        medicalConditionNote: "",
      });
      setIsAddingFamilyMember(false);
    }
  };

  const handleCancelFamilyForm = () => {
    setFamilyFormData({
      name: "",
      lastName: "",
      dateOfBirth: null,
      phoneNumber: "",
      hasMedicalCondition: false,
      medicalConditionNote: "",
    });
    setIsAddingFamilyMember(false);
  };

  const handleEditFamilyMember = (memberId: string) => {
    const member = familyMembers.find((m) => m.id === memberId);
    if (member) {
      setFamilyFormData(member);
      setEditingFamilyMemberId(memberId);
    }
  };

  const handleSaveFamilyMemberEdit = (memberId: string) => {
    const member = familyMembers.find((m) => m.id === memberId);
    if (member && familyFormData.name && familyFormData.lastName) {
      setFamilyMembers((prev) =>
        prev.map((m) =>
          m.id === memberId
            ? {
                ...m,
                ...familyFormData,
              }
            : m,
        ),
      );
      setEditingFamilyMemberId(null);
      setFamilyFormData({
        name: "",
        lastName: "",
        dateOfBirth: null,
        phoneNumber: "",
        hasMedicalCondition: false,
        medicalConditionNote: "",
      });
    }
  };

  const handleCancelFamilyMemberEdit = () => {
    setEditingFamilyMemberId(null);
    setFamilyFormData({
      name: "",
      lastName: "",
      dateOfBirth: null,
      phoneNumber: "",
      hasMedicalCondition: false,
      medicalConditionNote: "",
    });
  };

  const handleOpenDeleteFamilyMemberDialog = (
    memberId: string,
    name: string,
    lastName: string,
  ) => {
    setFamilyMemberToDelete({ id: memberId, name, lastName });
    setFamilyMemberDeleteDialogOpen(true);
  };

  const handleConfirmDeleteFamilyMember = () => {
    if (familyMemberToDelete) {
      setFamilyMembers((prev) =>
        prev.filter((m) => m.id !== familyMemberToDelete.id),
      );
      setFamilyMemberDeleteDialogOpen(false);
      setFamilyMemberToDelete(null);
    }
  };

  return (
    <>
      {/* Add Family Member Button */}
      {!isAddingFamilyMember && (
        <Button
          variant="outline"
          onClick={() => setIsAddingFamilyMember(true)}
          className="flex items-center gap-2"
        >
          <UserPlus className="size-5" />
          <span>Add family member</span>
        </Button>
      )}

      {/* Add Family Member Form */}
      {isAddingFamilyMember && (
        <div className="space-y-4 rounded-lg border p-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Name"
              value={familyFormData.name}
              onChange={(e) =>
                setFamilyFormData({
                  ...familyFormData,
                  name: e.target.value,
                })
              }
            />
            <Input
              placeholder="Lastname"
              value={familyFormData.lastName}
              onChange={(e) =>
                setFamilyFormData({
                  ...familyFormData,
                  lastName: e.target.value,
                })
              }
            />
          </div>

          {/* Age/Date of Birth and Phone Number */}
          <div className="grid grid-cols-2 gap-4">
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 size-4" />
                  {familyFormData.dateOfBirth ? (
                    format(familyFormData.dateOfBirth, "PPP")
                  ) : (
                    <span>Select date of birth</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto bg-white p-0"
                align="start"
                side="top"
                sideOffset={8}
              >
                <Calendar
                  mode="single"
                  selected={familyFormData.dateOfBirth || undefined}
                  onSelect={(date) => {
                    setFamilyFormData({
                      ...familyFormData,
                      dateOfBirth: date || null,
                    });
                    setCalendarOpen(false);
                  }}
                  captionLayout="dropdown"
                  fromYear={1900}
                  toYear={new Date().getFullYear()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Input
              placeholder="Phone number"
              value={familyFormData.phoneNumber}
              onChange={(e) =>
                setFamilyFormData({
                  ...familyFormData,
                  phoneNumber: e.target.value,
                })
              }
            />
          </div>

          {/* Medical Condition */}
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Medical condition:</label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={
                    familyFormData.hasMedicalCondition ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() =>
                    setFamilyFormData({
                      ...familyFormData,
                      hasMedicalCondition: true,
                    })
                  }
                  className={
                    familyFormData.hasMedicalCondition
                      ? "bg-black text-white hover:bg-black/90"
                      : ""
                  }
                >
                  Yes
                </Button>
                <Button
                  type="button"
                  variant={
                    !familyFormData.hasMedicalCondition ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() =>
                    setFamilyFormData({
                      ...familyFormData,
                      hasMedicalCondition: false,
                      medicalConditionNote: "",
                    })
                  }
                  className={
                    !familyFormData.hasMedicalCondition
                      ? "bg-black text-white hover:bg-black/90"
                      : ""
                  }
                >
                  No
                </Button>
              </div>
            </div>

            {familyFormData.hasMedicalCondition && (
              <textarea
                placeholder="Write here any important information about the medical condition of this family member, things to remember, etc."
                value={familyFormData.medicalConditionNote}
                onChange={(e) =>
                  setFamilyFormData({
                    ...familyFormData,
                    medicalConditionNote: e.target.value,
                  })
                }
                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                rows={4}
              />
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleCancelFamilyForm}
              className="w-fit"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddFamilyMember}
              className="w-fit bg-black text-white hover:bg-black/90"
              disabled={!familyFormData.name || !familyFormData.lastName}
            >
              Add Family Member
            </Button>
          </div>
        </div>
      )}

      {/* Family Members Grid */}
      {familyMembers.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Family Members</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {familyMembers.map((member) => {
              const age = calculateAge(member.dateOfBirth);
              const isEditing = editingFamilyMemberId === member.id;
              const editData = isEditing
                ? familyFormData
                : {
                    name: member.name,
                    lastName: member.lastName,
                    dateOfBirth: member.dateOfBirth,
                    phoneNumber: member.phoneNumber,
                    hasMedicalCondition: member.hasMedicalCondition,
                    medicalConditionNote: member.medicalConditionNote,
                  };

              return (
                <div
                  key={member.id}
                  className="group relative border border-black bg-white p-4 transition-all hover:scale-[1.01] hover:bg-gray-100"
                >
                  {/* Delete button - appears on hover when not editing */}
                  {!isEditing && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDeleteFamilyMemberDialog(
                          member.id,
                          member.name,
                          member.lastName,
                        );
                      }}
                      className="absolute right-2 top-2 flex size-5 items-center justify-center opacity-0 transition-opacity hover:bg-gray-200 group-hover:opacity-100"
                    >
                      <X className="size-4" />
                    </button>
                  )}

                  {isEditing ? (
                    /* Edit Mode */
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          value={editData.name}
                          onChange={(e) =>
                            setFamilyFormData({
                              ...familyFormData,
                              name: e.target.value,
                            })
                          }
                          placeholder="Name"
                          className="h-8"
                        />
                        <Input
                          value={editData.lastName}
                          onChange={(e) =>
                            setFamilyFormData({
                              ...familyFormData,
                              lastName: e.target.value,
                            })
                          }
                          placeholder="Lastname"
                          className="h-8"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="h-8 w-full justify-start text-left text-xs font-normal"
                            >
                              <CalendarIcon className="mr-2 size-3" />
                              {editData.dateOfBirth
                                ? format(editData.dateOfBirth, "PPP")
                                : "DOB"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto bg-white p-0"
                            align="start"
                            side="top"
                            sideOffset={8}
                          >
                            <Calendar
                              mode="single"
                              selected={editData.dateOfBirth || undefined}
                              onSelect={(date) => {
                                setFamilyFormData({
                                  ...familyFormData,
                                  dateOfBirth: date || null,
                                });
                              }}
                              captionLayout="dropdown"
                              fromYear={1900}
                              toYear={new Date().getFullYear()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <Input
                          value={editData.phoneNumber}
                          onChange={(e) =>
                            setFamilyFormData({
                              ...familyFormData,
                              phoneNumber: e.target.value,
                            })
                          }
                          placeholder="Phone"
                          className="h-8"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="text-xs">Medical:</label>
                        <div className="flex gap-1">
                          <Button
                            type="button"
                            variant={
                              editData.hasMedicalCondition
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() =>
                              setFamilyFormData({
                                ...familyFormData,
                                hasMedicalCondition: true,
                              })
                            }
                            className={
                              editData.hasMedicalCondition
                                ? "bg-black text-white hover:bg-black/90"
                                : ""
                            }
                          >
                            Yes
                          </Button>
                          <Button
                            type="button"
                            variant={
                              !editData.hasMedicalCondition
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() =>
                              setFamilyFormData({
                                ...familyFormData,
                                hasMedicalCondition: false,
                                medicalConditionNote: "",
                              })
                            }
                            className={
                              !editData.hasMedicalCondition
                                ? "bg-black text-white hover:bg-black/90"
                                : ""
                            }
                          >
                            No
                          </Button>
                        </div>
                      </div>

                      {editData.hasMedicalCondition && (
                        <textarea
                          placeholder="Condition"
                          value={editData.medicalConditionNote}
                          onChange={(e) =>
                            setFamilyFormData({
                              ...familyFormData,
                              medicalConditionNote: e.target.value,
                            })
                          }
                          className="min-h-[60px] w-full border border-input bg-background px-2 py-1 text-xs"
                          rows={2}
                        />
                      )}

                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCancelFamilyMemberEdit}
                          className="h-6 text-xs"
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleSaveFamilyMemberEdit(member.id)}
                          className="h-6 bg-black text-xs text-white hover:bg-black/90"
                          disabled={
                            !familyFormData.name || !familyFormData.lastName
                          }
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    /* Display Mode */
                    <div
                      className="cursor-pointer space-y-2"
                      onClick={() => {
                        setFamilyFormData(member);
                        handleEditFamilyMember(member.id);
                      }}
                    >
                      {/* Name */}
                      <p className="text-base font-normal text-black">
                        {member.name.toUpperCase()}{" "}
                        {member.lastName.toUpperCase()}
                      </p>

                      {/* Birthdate and Age */}
                      {member.dateOfBirth && age !== null && (
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Cake className="size-4" />
                          <span>
                            {format(member.dateOfBirth, "dd/MM/yyyy")} - {age}{" "}
                            years old
                          </span>
                        </div>
                      )}

                      {/* Phone */}
                      {member.phoneNumber && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="size-4" />
                          <span>{member.phoneNumber}</span>
                        </div>
                      )}

                      {/* Medical Condition */}
                      {member.hasMedicalCondition && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <Heart className="size-4 text-red-600" />
                            <p className="text-xs font-semibold text-red-600">
                              Medical Condition
                            </p>
                          </div>
                          {member.medicalConditionNote && (
                            <p className="mt-1 text-xs text-gray-600">
                              {member.medicalConditionNote}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Family Member Delete Confirmation Dialog */}
      <Dialog
        open={familyMemberDeleteDialogOpen}
        onOpenChange={setFamilyMemberDeleteDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to remove {familyMemberToDelete?.name}{" "}
              {familyMemberToDelete?.lastName} from your family list?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setFamilyMemberDeleteDialogOpen(false);
                setFamilyMemberToDelete(null);
              }}
            >
              No
            </Button>
            <Button
              onClick={handleConfirmDeleteFamilyMember}
              className="bg-black text-white hover:bg-black/90"
            >
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export { FamilyMembers };
