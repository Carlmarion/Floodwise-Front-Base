import { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, Plus, Pencil, Trash2, File } from "lucide-react";

type Document = {
  id: string;
  title: string;
  description: string;
  file: File | null;
  fileName: string;
  fileSize: number;
  uploadedAt: Date;
};

function Documents() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isAddingDocument, setIsAddingDocument] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null as File | null,
  });

  const [editData, setEditData] = useState({
    title: "",
    description: "",
    file: null as File | null,
    fileName: "",
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData({ ...formData, file });
    }
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setEditData({ ...editData, file, fileName: file.name });
    }
  };

  const handleAddDocument = () => {
    // TODO: Add form validation
    // TODO: Call API to upload document and create document record
    // TODO: Handle API errors and show user feedback
    if (formData.title && formData.file) {
      const newDocument: Document = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: formData.title,
        description: formData.description,
        file: formData.file,
        fileName: formData.file.name,
        fileSize: formData.file.size,
        uploadedAt: new Date(),
      };
      setDocuments((prev) => [...prev, newDocument]);
      setFormData({
        title: "",
        description: "",
        file: null,
      });
      setIsAddingDocument(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      file: null,
    });
    setIsAddingDocument(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleStartEdit = (document: Document) => {
    setEditData({
      title: document.title,
      description: document.description,
      file: null,
      fileName: document.fileName,
    });
    setEditingId(document.id);
  };

  const handleSaveEdit = () => {
    // TODO: Call API to update document
    // TODO: Handle file replacement if new file is selected
    // TODO: Handle API errors and show user feedback
    if (editingId && editData.title) {
      setDocuments((prev) =>
        prev.map((doc) => {
          if (doc.id === editingId) {
            const updatedDoc = {
              ...doc,
              title: editData.title,
              description: editData.description,
            };
            if (editData.file) {
              updatedDoc.file = editData.file;
              updatedDoc.fileName = editData.fileName;
              updatedDoc.fileSize = editData.file.size;
            }
            return updatedDoc;
          }
          return doc;
        }),
      );
      setEditingId(null);
      setEditData({
        title: "",
        description: "",
        file: null,
        fileName: "",
      });
      if (editFileInputRef.current) {
        editFileInputRef.current.value = "";
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({
      title: "",
      description: "",
      file: null,
      fileName: "",
    });
    if (editFileInputRef.current) {
      editFileInputRef.current.value = "";
    }
  };

  const handleOpenDeleteDialog = (documentId: string) => {
    setDocumentToDelete(documentId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // TODO: Call API to delete document
    // TODO: Handle API errors and show user feedback
    if (documentToDelete) {
      setDocuments((prev) => prev.filter((doc) => doc.id !== documentToDelete));
      setDeleteDialogOpen(false);
      setDocumentToDelete(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="size-5" />
            Important Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            Upload and manage important documents such as insurance policies,
            property deeds, identification documents, and other critical papers
            these documents will be included in your downloadable and printable
            Flood Plan.
          </p>

          {/* Add Document Button */}
          {!isAddingDocument && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => setIsAddingDocument(true)}
                className="flex items-center gap-2"
              >
                <Plus className="size-4 shrink-0" />
                <span>Add Document</span>
              </Button>
            </div>
          )}

          {/* Add Document Form */}
          {isAddingDocument && (
            <div className="space-y-4 rounded-lg border p-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Home Insurance Policy"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <textarea
                  id="description"
                  placeholder="Add any additional notes about this document..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Document *</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="file"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  {formData.file && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <File className="size-4" />
                      <span>{formData.file.name}</span>
                      <span className="text-gray-400">
                        ({formatFileSize(formData.file.size)})
                      </span>
                    </div>
                  )}
                </div>
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
                  onClick={handleAddDocument}
                  className="w-fit bg-black text-white hover:bg-black/90"
                  disabled={!formData.title || !formData.file}
                >
                  Add Document
                </Button>
              </div>
            </div>
          )}

          {/* Documents List */}
          {documents.length > 0 && (
            <div className="space-y-3">
              {documents.map((document) => (
                <div
                  key={document.id}
                  className="flex items-start justify-between rounded-lg border bg-white p-4"
                >
                  {editingId === document.id ? (
                    /* Edit Mode */
                    <div className="flex w-full flex-col gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-title">Title *</Label>
                        <Input
                          id="edit-title"
                          value={editData.title}
                          onChange={(e) =>
                            setEditData({ ...editData, title: e.target.value })
                          }
                          className="h-8"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-description">
                          Description (optional)
                        </Label>
                        <textarea
                          id="edit-description"
                          value={editData.description}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              description: e.target.value,
                            })
                          }
                          className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-file">
                          Replace Document (optional)
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="edit-file"
                            type="file"
                            ref={editFileInputRef}
                            onChange={handleEditFileChange}
                            className="h-8 cursor-pointer"
                          />
                          {editData.file && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <File className="size-4" />
                              <span>{editData.fileName}</span>
                            </div>
                          )}
                        </div>
                        {!editData.file && (
                          <p className="text-xs text-gray-500">
                            Current: {document.fileName} (
                            {formatFileSize(document.fileSize)})
                          </p>
                        )}
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={handleCancelEdit}
                          className="w-fit"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSaveEdit}
                          className="w-fit bg-black text-white hover:bg-black/90"
                          disabled={!editData.title}
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  ) : (
                    /* Display Mode */
                    <>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <FileText className="size-5 text-gray-600" />
                          <h3 className="font-semibold">{document.title}</h3>
                        </div>
                        {document.description && (
                          <p className="text-sm text-gray-600">
                            {document.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <File className="size-3" />
                            <span>{document.fileName}</span>
                          </div>
                          <span>{formatFileSize(document.fileSize)}</span>
                          <span>
                            {document.uploadedAt.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-black hover:bg-gray-200"
                          onClick={() => handleStartEdit(document)}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-black hover:bg-gray-200"
                          onClick={() => handleOpenDeleteDialog(document.id)}
                        >
                          <Trash2 className="size-4 text-red-600" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {documents.length === 0 && !isAddingDocument && (
            <p className="text-center text-sm text-gray-400">
              No documents uploaded yet. Click "Add Document" to get started.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this document?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setDocumentToDelete(null);
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

export { Documents };
