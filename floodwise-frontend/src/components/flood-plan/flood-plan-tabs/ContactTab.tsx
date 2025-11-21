import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Phone,
  Plus,
  FileUser,
  BookUser,
  Wrench,
  Trash2,
  CircleCheckBig,
  Pencil,
  ChevronDown,
  Contact,
} from "lucide-react";
import { FamilyMembers } from "./FamilyMembers";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type ContactCategory = "personal" | "public" | "utility";

interface Contact {
  id: string;
  name: string;
  number: string;
  category: ContactCategory;
}

// TODO: Replace with API call to fetch contacts for current property
const mockedContacts: Contact[] = [
  {
    id: "1",
    name: "John Doe",
    number: "1234567890",
    category: "personal",
  },
  {
    id: "2",
    name: "Jane Doe",
    number: "1234567890",
    category: "public",
  },
  {
    id: "3",
    name: "John Smith",
    number: "1234567890",
    category: "utility",
  },
];

function ContactTab() {
  const [isAddingContact, setIsAddingContact] = useState(false);
  // TODO: Add loading and error states for API calls
  // TODO: Add useEffect to fetch contacts on component mount
  const [contacts, setContacts] = useState<Contact[]>(mockedContacts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ name: "", number: "" });
  const [formData, setFormData] = useState({
    category: "" as ContactCategory | "",
    name: "",
    number: "",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);
  const [isPersonalOpen, setIsPersonalOpen] = useState(true);
  const [isPublicOpen, setIsPublicOpen] = useState(true);
  const [isUtilityOpen, setIsUtilityOpen] = useState(true);

  const handleAddContact = () => {
    if (formData.category && formData.name && formData.number) {
      // TODO: Add form validation before API call
      // TODO: Call API to create contact
      // TODO: Handle API errors and show user feedback
      const newContact: Contact = {
        id: Date.now().toString(),
        name: formData.name,
        number: formData.number,
        category: formData.category,
      };
      setContacts([...contacts, newContact]);
      setFormData({ category: "", name: "", number: "" });
      setIsAddingContact(false);
    }
  };

  const handleCancel = () => {
    setFormData({ category: "", name: "", number: "" });
    setIsAddingContact(false);
  };

  const handleStartEdit = (contact: Contact) => {
    setEditingId(contact.id);
    setEditData({ name: contact.name, number: contact.number });
  };

  const handleSaveEdit = () => {
    if (editingId && editData.name && editData.number) {
      // TODO: Call API to update contact
      // TODO: Handle API errors and show user feedback
      setContacts(
        contacts.map((c) =>
          c.id === editingId
            ? { ...c, name: editData.name, number: editData.number }
            : c,
        ),
      );
      setEditingId(null);
      setEditData({ name: "", number: "" });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({ name: "", number: "" });
  };

  const handleOpenDeleteDialog = (contactId: string) => {
    setContactToDelete(contactId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // TODO: Call API to delete contact by ID
    // TODO: Handle API errors and show user feedback
    if (contactToDelete) {
      setContacts(contacts.filter((c) => c.id !== contactToDelete));
      setDeleteDialogOpen(false);
      setContactToDelete(null);
    }
  };

  const personalContacts = contacts.filter((c) => c.category === "personal");
  const publicContacts = contacts.filter((c) => c.category === "public");
  const utilityContacts = contacts.filter((c) => c.category === "utility");

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="size-5" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            Write down contact details for people you may need to speak to
            during and after a flood, be it public services or friends and
            family. Think about where you could stay if you need to leave your
            home, who you may need help from locally, and who may need you to
            check in on them.
          </p>

          {/* Add Contact Button */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => setIsAddingContact(true)}
              className="flex items-center gap-2"
            >
              <Plus className="size-4" />
              Add Contact
            </Button>
          </div>

          {/* Add Contact Form */}
          {isAddingContact && (
            <div className="space-y-4 rounded-lg border p-4">
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    category: value as ContactCategory,
                  })
                }
              >
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal Contact</SelectItem>
                  <SelectItem value="public">Public Contact</SelectItem>
                  <SelectItem value="utility">Utility Contact</SelectItem>
                </SelectContent>
              </Select>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <Input
                  placeholder="Number"
                  value={formData.number}
                  onChange={(e) =>
                    setFormData({ ...formData, number: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="w-fit"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddContact}
                  className="w-fit bg-black text-white hover:bg-black/90"
                  disabled={
                    !formData.category || !formData.name || !formData.number
                  }
                >
                  Add Contact
                </Button>
              </div>
            </div>
          )}

          {/* Contact Categories */}
          <div className="space-y-4">
            {/* Personal Contacts */}
            <Collapsible
              open={isPersonalOpen}
              onOpenChange={setIsPersonalOpen}
              className="rounded-lg bg-white p-4 text-black"
            >
              <CollapsibleTrigger className="mb-3 flex w-full items-center justify-between gap-2 hover:opacity-80">
                <div className="flex items-center gap-2">
                  <FileUser className="size-5" />
                  <h3 className="font-semibold">Personal Contacts</h3>
                </div>
                <ChevronDown
                  className={`size-5 transition-transform duration-200 ${
                    isPersonalOpen ? "rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent>
                {personalContacts.length > 0 ? (
                  <div className="space-y-2">
                    {/* Header */}
                    <div className="flex items-center justify-between rounded bg-gray-100 p-2 text-sm font-semibold">
                      <div className="grid flex-1 grid-cols-2 gap-4">
                        <span>Name</span>
                        <span>Phone Number</span>
                      </div>
                      <div className="ml-2 flex gap-1">
                        <div className="size-9" />
                        <div className="size-9" />
                      </div>
                    </div>
                    {/* Contacts */}
                    {personalContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="flex items-center justify-between rounded bg-white p-2 text-black"
                      >
                        {editingId === contact.id ? (
                          <>
                            <div className="grid flex-1 grid-cols-2 gap-4">
                              <Input
                                value={editData.name}
                                onChange={(e) =>
                                  setEditData({
                                    ...editData,
                                    name: e.target.value,
                                  })
                                }
                                className="h-8"
                              />
                              <Input
                                value={editData.number}
                                onChange={(e) =>
                                  setEditData({
                                    ...editData,
                                    number: e.target.value,
                                  })
                                }
                                className="h-8"
                              />
                            </div>
                            <div className="ml-2 flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-green-600 hover:bg-green-50"
                                onClick={handleSaveEdit}
                                disabled={!editData.name || !editData.number}
                              >
                                <CircleCheckBig className="size-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-600 hover:bg-red-50"
                                onClick={handleCancelEdit}
                              >
                                <Trash2 className="size-4 text-red-600" />
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="grid flex-1 grid-cols-2 items-center gap-4">
                              <p className="m-0 flex items-center font-medium">
                                {contact.name}
                              </p>
                              <p className="m-0 flex items-center text-sm text-gray-600">
                                {contact.number}
                              </p>
                            </div>
                            <div className="ml-2 flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-black hover:bg-gray-200"
                                onClick={() => handleStartEdit(contact)}
                              >
                                <Pencil className="size-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-black hover:bg-gray-200"
                                onClick={() =>
                                  handleOpenDeleteDialog(contact.id)
                                }
                              >
                                <Trash2 className="size-4 text-red-600" />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">
                    No personal contacts yet
                  </p>
                )}
              </CollapsibleContent>
            </Collapsible>

            {/* Public Contacts */}
            <Collapsible
              open={isPublicOpen}
              onOpenChange={setIsPublicOpen}
              className="rounded-lg bg-white p-4 text-black"
            >
              <CollapsibleTrigger className="mb-3 flex w-full items-center justify-between gap-2 hover:opacity-80">
                <div className="flex items-center gap-2">
                  <BookUser className="size-5" />
                  <h3 className="font-semibold">Public Contacts</h3>
                </div>
                <ChevronDown
                  className={`size-5 transition-transform duration-200 ${
                    isPublicOpen ? "rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent>
                {publicContacts.length > 0 ? (
                  <div className="space-y-2">
                    {/* Header */}
                    <div className="flex items-center justify-between rounded bg-gray-100 p-2 text-sm font-semibold">
                      <div className="grid flex-1 grid-cols-2 gap-4">
                        <span>Service</span>
                        <span>Phone Number</span>
                      </div>
                      <div className="ml-2 flex gap-1">
                        <div className="size-9" />
                        <div className="size-9" />
                      </div>
                    </div>
                    {/* Contacts */}
                    {publicContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="flex items-center justify-between rounded bg-white p-2 text-black"
                      >
                        {editingId === contact.id ? (
                          <>
                            <div className="grid flex-1 grid-cols-2 gap-4">
                              <Input
                                value={editData.name}
                                onChange={(e) =>
                                  setEditData({
                                    ...editData,
                                    name: e.target.value,
                                  })
                                }
                                className="h-8"
                              />
                              <Input
                                value={editData.number}
                                onChange={(e) =>
                                  setEditData({
                                    ...editData,
                                    number: e.target.value,
                                  })
                                }
                                className="h-8"
                              />
                            </div>
                            <div className="ml-2 flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-green-600 hover:bg-green-50"
                                onClick={handleSaveEdit}
                                disabled={!editData.name || !editData.number}
                              >
                                <CircleCheckBig className="size-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-600 hover:bg-red-50"
                                onClick={handleCancelEdit}
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="grid flex-1 grid-cols-2 items-center gap-4">
                              <p className="m-0 flex items-center font-medium">
                                {contact.name}
                              </p>
                              <p className="m-0 flex items-center text-sm text-gray-600">
                                {contact.number}
                              </p>
                            </div>
                            <div className="ml-2 flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-black hover:bg-gray-200"
                                onClick={() => handleStartEdit(contact)}
                              >
                                <Pencil className="size-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-black hover:bg-gray-200"
                                onClick={() =>
                                  handleOpenDeleteDialog(contact.id)
                                }
                              >
                                <Trash2 className="size-4 text-red-600" />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">
                    No public contacts yet
                  </p>
                )}
              </CollapsibleContent>
            </Collapsible>

            {/* Utility Contacts */}
            <Collapsible
              open={isUtilityOpen}
              onOpenChange={setIsUtilityOpen}
              className="rounded-lg bg-white p-4 text-black"
            >
              <CollapsibleTrigger className="mb-3 flex w-full items-center justify-between gap-2 hover:opacity-80">
                <div className="flex items-center gap-2">
                  <Wrench className="size-5" />
                  <h3 className="font-semibold">Utility Contacts</h3>
                </div>
                <ChevronDown
                  className={`size-5 transition-transform duration-200 ${
                    isUtilityOpen ? "rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent>
                {utilityContacts.length > 0 ? (
                  <div className="space-y-2">
                    {/* Header */}
                    <div className="flex items-center justify-between rounded bg-gray-100 p-2 text-sm font-semibold">
                      <div className="grid flex-1 grid-cols-2 gap-4">
                        <span>Name</span>
                        <span>Phone Number</span>
                      </div>
                      <div className="ml-2 flex gap-1">
                        <div className="size-9" />
                        <div className="size-9" />
                      </div>
                    </div>
                    {/* Contacts */}
                    {utilityContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="flex items-center justify-between rounded bg-white p-2 text-black"
                      >
                        {editingId === contact.id ? (
                          <>
                            <div className="grid flex-1 grid-cols-2 gap-4">
                              <Input
                                value={editData.name}
                                onChange={(e) =>
                                  setEditData({
                                    ...editData,
                                    name: e.target.value,
                                  })
                                }
                                className="h-8"
                              />
                              <Input
                                value={editData.number}
                                onChange={(e) =>
                                  setEditData({
                                    ...editData,
                                    number: e.target.value,
                                  })
                                }
                                className="h-8"
                              />
                            </div>
                            <div className="ml-2 flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-green-600 hover:bg-green-50"
                                onClick={handleSaveEdit}
                                disabled={!editData.name || !editData.number}
                              >
                                <CircleCheckBig className="size-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-600 hover:bg-red-50"
                                onClick={handleCancelEdit}
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="grid flex-1 grid-cols-2 items-center gap-4">
                              <p className="m-0 flex items-center font-medium">
                                {contact.name}
                              </p>
                              <p className="m-0 flex items-center text-sm text-gray-600">
                                {contact.number}
                              </p>
                            </div>
                            <div className="ml-2 flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-black hover:bg-gray-200"
                                onClick={() => handleStartEdit(contact)}
                              >
                                <Pencil className="size-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-black hover:bg-gray-200"
                                onClick={() =>
                                  handleOpenDeleteDialog(contact.id)
                                }
                              >
                                <Trash2 className="size-4 text-red-600" />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">
                    No utility contacts yet
                  </p>
                )}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </CardContent>
      </Card>

      {/* My Family Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Contact className="size-5" />
            My Family
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            Write down contact details of people from your family. These
            information will be part of your downloadable and printable Flood
            Plan.
          </p>
          <FamilyMembers />
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this contact?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setContactToDelete(null);
              }}
            >
              No
            </Button>
            <Button
              onClick={handleConfirmDelete}
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

export { ContactTab };
