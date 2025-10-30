import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import type { PropertyInfo, EditPropertyData } from "@/types/property";
import { editPropertySchema } from "@/types/property";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import EmojiPicker from "emoji-picker-react";
import type { EmojiClickData } from "emoji-picker-react";
import { cn } from "@/lib/utils";

interface EditPropertyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyInfo?: PropertyInfo;
  onSave?: (data: EditPropertyData) => void;
}

const EditPropertyModal: React.FC<EditPropertyModalProps> = ({
  open,
  onOpenChange,
  propertyInfo,
  onSave,
}) => {
  const defaultValues: EditPropertyData = propertyInfo
    ? {
        name: propertyInfo.name,
        emoji: propertyInfo.emoji,
      }
    : {
        name: "No property name yet",
        emoji: "🏠",
      };

  const form = useForm<EditPropertyData>({
    resolver: zodResolver(editPropertySchema),
    defaultValues,
  });

  React.useEffect(() => {
    if (propertyInfo) {
      form.reset({
        name: propertyInfo.name,
        emoji: propertyInfo.emoji,
      });
    }
  }, [propertyInfo, form]);

  // Close emoji picker when dialog closes
  React.useEffect(() => {
    if (!open) {
      setEmojiPickerOpen(false);
    }
  }, [open]);

  const onSubmit = async (data: EditPropertyData) => {
    // TODO: Add API call for property update
    // TODO: Add error handling with try-catch
    // TODO: Add loading state during API call
    // TODO: Show success/error toast notifications
    // try {
    //   setLoading(true);
    //   await updatePropertyAPI(propertyInfo?.id, data);
    //   onSave?.(data);
    //   showSuccessToast('Property updated successfully');
    //   onOpenChange(false);
    // } catch (error) {
    //   showErrorToast('Failed to update property');
    // } finally {
    //   setLoading(false);
    // }

    // Temporary: Call onSave directly (remove when API is implemented)
    if (onSave) {
      onSave(data);
    }
    onOpenChange(false);
  };

  const [emojiPickerOpen, setEmojiPickerOpen] = React.useState(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    form.setValue("emoji", emojiData.emoji);
    setEmojiPickerOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-h-[90vh] overflow-y-auto",
          emojiPickerOpen && "max-h-[90vh]",
        )}
      >
        <DialogHeader>
          <DialogTitle>Edit Property</DialogTitle>
          <DialogDescription>Edit the property information</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="123 Main St" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emoji"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emoji</FormLabel>
                    <FormControl>
                      <div className="flex justify-start">
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setEmojiPickerOpen(!emojiPickerOpen);
                            }
                          }}
                          className="flex h-10 w-20 cursor-pointer items-center justify-center rounded border border-input bg-background text-2xl transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          {field.value || "🏠"}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {emojiPickerOpen && (
              <div className="mt-4 flex justify-center overflow-hidden">
                <div className="origin-top scale-90">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              </div>
            )}
            <div className="mt-6 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-black text-white hover:bg-gray-800"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { EditPropertyModal };
