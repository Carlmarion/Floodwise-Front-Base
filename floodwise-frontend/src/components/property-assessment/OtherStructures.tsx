import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Building2,
  Plus,
  Edit,
  Trash2,
  DoorOpen,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { InfoPopover } from "../shared/InfoPopover";
import { GDPRInfo } from "./GDPRInfo";
import { useState } from "react";
import type { AdditionalStructure } from "@/types/additionalStructure";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function OtherStructures() {
  // TODO: Replace with API call to fetch structures for current property
  const [additionalStructuresList, setAdditionalStructuresList] = useState<
    AdditionalStructure[]
  >([]);
  const [isAddingStructure, setIsAddingStructure] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [structureToDelete, setStructureToDelete] = useState<number | null>(
    null,
  );
  // TODO: Add loading and error states for API calls

  // TODO: Add useEffect to fetch structures on component mount
  // Note: Import useEffect from "react" when implementing
  // useEffect(() => {
  //   fetchStructuresForProperty(propertyId);
  // }, [propertyId]);

  // Form state for adding/editing
  const [formData, setFormData] = useState<AdditionalStructure>({
    name: "",
    type: "garage",
    isConnected: false,
    numberOfDoors: 0,
    airbricks: {},
  });

  const handleStartAdding = () => {
    setIsAddingStructure(true);
    setEditingIndex(null);
    setFormData({
      name: "",
      type: "garage",
      isConnected: false,
      numberOfDoors: 0,
      airbricks: {},
    });
  };

  const handleStartEditing = (index: number) => {
    setEditingIndex(index);
    setIsAddingStructure(false);
    setFormData(additionalStructuresList[index]);
  };

  const handleCancelForm = () => {
    setIsAddingStructure(false);
    setEditingIndex(null);
    setFormData({
      name: "",
      type: "garage",
      isConnected: false,
      numberOfDoors: 0,
      airbricks: {},
    });
  };

  const handleSaveStructure = () => {
    // TODO: Add form validation before API call
    // TODO: Call API to create/update structure
    // TODO: Handle API errors and show user feedback
    if (editingIndex !== null) {
      // Update existing structure
      const updated = [...additionalStructuresList];
      updated[editingIndex] = formData;
      setAdditionalStructuresList(updated);
      setEditingIndex(null);
    } else {
      // Add new structure
      setAdditionalStructuresList([...additionalStructuresList, formData]);
      setIsAddingStructure(false);
    }
    setFormData({
      name: "",
      type: "garage",
      isConnected: false,
      numberOfDoors: 0,
      airbricks: {},
    });
  };

  const handleUpdateFormField = (updates: Partial<AdditionalStructure>) => {
    setFormData({ ...formData, ...updates });
  };

  const handleOpenDeleteDialog = (index: number) => {
    setStructureToDelete(index);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // TODO: Call API to delete structure by ID
    // TODO: Handle API errors and show user feedback
    if (structureToDelete !== null) {
      setAdditionalStructuresList(
        additionalStructuresList.filter((_, i) => i !== structureToDelete),
      );
      setDeleteDialogOpen(false);
      setStructureToDelete(null);
    }
  };
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
          Other Structures
        </h2>
        <InfoPopover
          title="Why do we ask about other structures?"
          content="Some parts of your home can present additional challenges to effective flood resilience. Understanding the additional structures on your property helps us make sure we use the right components to protect the right things."
        />
      </div>
      <Card className="m-4">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="mr-2 size-5" />
            <span>Do you have any garages, sheds, or outbuildings?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-gray-600">
            If you are wishing to also protect your external structures, or if
            they are connected to your main building, here is the place to list
            them, what they are constituted of and to manage, edit them
          </p>

          {/* List of Added Structures */}
          {additionalStructuresList.length > 0 && (
            <div className="mb-4 space-y-3">
              <h3 className="text-lg font-semibold">
                Your additional structures
              </h3>
              <div className="space-y-2">
                {additionalStructuresList.map((structure, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-black p-3 text-white"
                  >
                    <span className="font-medium">
                      {structure.name || `Structure ${index + 1}`}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleStartEditing(index)}
                        disabled={isAddingStructure || editingIndex !== null}
                        className="text-white hover:bg-white/10"
                      >
                        <Edit className="size-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDeleteDialog(index)}
                        disabled={isAddingStructure || editingIndex !== null}
                        className="text-white hover:bg-white/10"
                      >
                        <Trash2 className="size-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add Structure Form */}
          {(isAddingStructure || editingIndex !== null) && (
            <Card className="mt-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {editingIndex !== null
                      ? "Edit Structure"
                      : "Add New Structure"}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCancelForm}
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <X className="size-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Name and Type Fields - Side by side on desktop */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      placeholder="e.g., Detached Garage"
                      value={formData.name}
                      onChange={(e) =>
                        handleUpdateFormField({ name: e.target.value })
                      }
                    />
                  </div>

                  {/* Type Select */}
                  <div className="space-y-2">
                    <Label>Structure Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) =>
                        handleUpdateFormField({
                          type: value as AdditionalStructure["type"],
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="garage">Garage</SelectItem>
                        <SelectItem value="shed">Shed</SelectItem>
                        <SelectItem value="outbuilding">Outbuilding</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Connected Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.isConnected}
                    onCheckedChange={(checked) =>
                      handleUpdateFormField({
                        isConnected: checked === true,
                      })
                    }
                  />
                  <Label className="cursor-pointer font-normal">
                    Connects to the main building
                  </Label>
                </div>

                {/* Number of Doors */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <DoorOpen className="size-4" />
                    <Label>Number of Doors</Label>
                  </div>
                  <Select
                    value={formData.numberOfDoors.toString()}
                    onValueChange={(value) =>
                      handleUpdateFormField({
                        numberOfDoors: parseInt(value),
                      })
                    }
                  >
                    <SelectTrigger className="w-fit">
                      <SelectValue placeholder="Select number of doors" />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={handleCancelForm}>
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    className="bg-black text-white hover:bg-black/90"
                    onClick={handleSaveStructure}
                  >
                    {editingIndex !== null
                      ? "Update Structure"
                      : "Add Structure"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Add Another Structure Button */}
          {!isAddingStructure && editingIndex === null && (
            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                className="h-16 w-fit"
                onClick={handleStartAdding}
              >
                <Plus className="mr-2 size-4" />
                Add another structure
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Additional Structure</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this additional structure? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              No, cancel
            </Button>
            <Button
              variant="default"
              className="bg-black text-white hover:bg-black/90"
              onClick={handleConfirmDelete}
            >
              Yes, Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="m-4">
        <GDPRInfo />
      </div>
    </>
  );
}
export { OtherStructures };
