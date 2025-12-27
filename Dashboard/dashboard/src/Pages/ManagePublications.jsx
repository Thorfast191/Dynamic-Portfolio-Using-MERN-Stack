import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllPublicationErrors,
  deletePublication,
  getAllPublications,
  resetPublicationSlice,
} from "@/store/slices/publicationSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BookOpen,
  Edit,
  Trash2,
  Eye,
  Search,
  Download,
  Calendar,
  FileText,
  Code,
  Image as ImageIcon,
  ExternalLink,
  AlertCircle,
} from "lucide-react";

const ManagePublications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { publications, loading, error, message } = useSelector(
    (state) => state.publication
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [publicationToDelete, setPublicationToDelete] = useState(null);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Ensure publications is always an array
  const safePublications = Array.isArray(publications) ? publications : [];

  // Fetch publications on mount
  useEffect(() => {
    console.log("Fetching publications...");
    dispatch(getAllPublications());
  }, [dispatch]);

  // Debug: Log publications when they change
  useEffect(() => {
    console.log("Publications data received:", safePublications);
    console.log("Number of publications:", safePublications.length);

    if (safePublications.length > 0) {
      console.log("First publication data:", safePublications[0]);
      console.log(
        "Keys in first publication:",
        Object.keys(safePublications[0])
      );
    }
  }, [safePublications]);

  // Handle errors and messages
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllPublicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetPublicationSlice());
      dispatch(getAllPublications());
    }
  }, [error, message, dispatch]);

  // Filter publications with safe access
  const filteredPublications = safePublications.filter((pub) => {
    if (!pub) return false;

    const title = pub.title || "";
    const description = pub.description || "";
    const paperId = pub.paperId || "";
    const platform = pub.platform || "";
    const program = pub.program || "";
    const status = pub.status || "";

    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paperId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || status === statusFilter;
    const matchesPlatform =
      platformFilter === "all" || platform === platformFilter;

    return matchesSearch && matchesStatus && matchesPlatform;
  });

  // Handle delete confirmation
  const handleDeleteClick = (publication) => {
    if (!publication?._id) {
      toast.error("Cannot delete: Publication ID is missing");
      return;
    }
    setPublicationToDelete(publication);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (publicationToDelete?._id) {
      dispatch(deletePublication(publicationToDelete._id));
    }
    setDeleteDialogOpen(false);
    setPublicationToDelete(null);
  };

  // View publication details
  const handleViewClick = (publication) => {
    if (!publication) return;
    console.log("Viewing publication:", publication);
    setSelectedPublication(publication);
    setViewDialogOpen(true);
  };

  // Get status badge variant
  const getStatusVariant = (status) => {
    if (!status) return "outline";

    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "published":
      case "completed":
        return "default";
      case "ongoing":
        return "secondary";
      case "hold":
        return "outline";
      case "cancel":
      case "cancelled":
        return "destructive";
      case "accepted":
        return "default";
      case "on-review":
        return "secondary";
      default:
        return "outline";
    }
  };

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";

      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  // Check if publication has attachments - based on your controller structure
  const hasAttachments = (publication) => {
    if (!publication) return false;

    // Check paper attachment (could be paperAttachment or publicationFile)
    const hasPaper =
      (publication.paperAttachment && publication.paperAttachment.url) ||
      (publication.publicationFile && publication.publicationFile.url);

    // Check code attachment
    const hasCode =
      publication.codeAttachment && publication.codeAttachment.url;

    // Check images
    const hasImages =
      publication.images &&
      Array.isArray(publication.images) &&
      publication.images.length > 0;

    return hasPaper || hasCode || hasImages;
  };

  // Export publications data
  const exportToCSV = () => {
    if (safePublications.length === 0) {
      toast.error("No publications to export");
      return;
    }

    const headers = [
      "Title",
      "Paper ID",
      "Platform",
      "Program",
      "Status",
      "Description",
      "Created At",
    ];

    const csvData = safePublications.map((pub) => [
      `"${pub.title || ""}"`,
      `"${pub.paperId || ""}"`,
      `"${pub.platform || ""}"`,
      `"${pub.program || ""}"`,
      `"${pub.status || ""}"`,
      `"${(pub.description || "").replace(/"/g, '""')}"`,
      `"${formatDate(pub.createdAt)}"`,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `publications_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast.success("Publications exported successfully");
  };

  // Get platform options from existing publications
  const getUniquePlatforms = () => {
    const platforms = new Set();
    safePublications.forEach((pub) => {
      if (pub.platform) platforms.add(pub.platform);
    });
    return Array.from(platforms);
  };

  // Get status options from existing publications
  const getUniqueStatuses = () => {
    const statuses = new Set();
    safePublications.forEach((pub) => {
      if (pub.status) statuses.add(pub.status);
    });
    return Array.from(statuses);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 sm:pl-20">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Manage Publications</h1>
            <p className="text-gray-500 mt-1">
              Total: {safePublications.length} publication
              {safePublications.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={exportToCSV}
              variant="outline"
              disabled={safePublications.length === 0}
              className="w-full sm:w-auto"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button
              onClick={() => navigate("/add/publication")}
              className="w-full sm:w-auto"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Add New Publication
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                  <Input
                    placeholder="Search publications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
              </div>

              {/* Platform Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Platform
                </label>
                <select
                  value={platformFilter}
                  onChange={(e) => setPlatformFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Platforms</option>
                  {getUniquePlatforms().map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                  <option value="IEEE">IEEE</option>
                  <option value="Springer">Springer</option>
                  <option value="Elsevier">Elsevier</option>
                  <option value="ACM">ACM</option>
                  <option value="ArXiv">ArXiv</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  {getUniqueStatuses().map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Publications Table */}
        <Card>
          <CardHeader>
            <CardTitle>Publications</CardTitle>
            <CardDescription>
              Showing {filteredPublications.length} of {safePublications.length}{" "}
              publication{safePublications.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p className="mt-2 text-gray-500">Loading publications...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Error Loading Publications
                </h3>
                <p className="text-gray-500 mb-4">{error}</p>
                <Button onClick={() => dispatch(getAllPublications())}>
                  Retry
                </Button>
              </div>
            ) : filteredPublications.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title & Description</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Paper ID
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Platform
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Status
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Created
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPublications.map((publication) => (
                      <TableRow
                        key={publication._id || Math.random().toString()}
                        className="hover:bg-gray-50"
                      >
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium text-gray-900">
                              {publication.title || "Untitled Publication"}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-2">
                              {publication.description ||
                                "No description provided"}
                            </div>
                            {/* Show program if available */}
                            {publication.program && (
                              <div className="text-xs text-blue-600 mt-1">
                                Program: {publication.program}
                              </div>
                            )}
                            {/* Show attachments indicator */}
                            {hasAttachments(publication) && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {(publication.paperAttachment?.url ||
                                  publication.publicationFile?.url) && (
                                  <Badge variant="outline" className="text-xs">
                                    <FileText className="w-3 h-3 mr-1" />
                                    Paper
                                  </Badge>
                                )}
                                {publication.codeAttachment?.url && (
                                  <Badge variant="outline" className="text-xs">
                                    <Code className="w-3 h-3 mr-1" />
                                    Code
                                  </Badge>
                                )}
                                {publication.images &&
                                  Array.isArray(publication.images) &&
                                  publication.images.length > 0 && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      <ImageIcon className="w-3 h-3 mr-1" />
                                      {publication.images.length} Image
                                      {publication.images.length !== 1
                                        ? "s"
                                        : ""}
                                    </Badge>
                                  )}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="text-sm font-mono text-gray-600">
                            {publication.paperId || "N/A"}
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Badge variant="outline" className="text-xs">
                            {publication.platform || "Other"}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Badge
                            variant={getStatusVariant(publication.status)}
                            className="text-xs"
                          >
                            {publication.status || "Unknown"}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="text-sm text-gray-600 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(publication.createdAt)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewClick(publication)}
                              title="View Details"
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Link to={`/update/publication/${publication._id}`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                title="Edit Publication"
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteClick(publication)}
                              title="Delete Publication"
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {safePublications.length === 0
                    ? "No publications added yet"
                    : "No publications found"}
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm ||
                  statusFilter !== "all" ||
                  platformFilter !== "all"
                    ? "Try changing your filters or search term"
                    : "Get started by adding your first publication"}
                </p>
                <Button onClick={() => navigate("/add/publication")}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Add Publication
                </Button>
              </div>
            )}
          </CardContent>
          {filteredPublications.length > 0 && (
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="text-sm text-gray-500">
                Showing {filteredPublications.length} of{" "}
                {safePublications.length} publications
              </div>
              <div className="text-sm text-gray-500">
                {filteredPublications.length === safePublications.length
                  ? "All publications"
                  : "Filtered results"}
              </div>
            </CardFooter>
          )}
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the publication "
              {publicationToDelete?.title || "Untitled"}"? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Publication"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Publication Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedPublication && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-xl">
                      {selectedPublication.title || "Untitled Publication"}
                    </DialogTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge
                        variant={getStatusVariant(selectedPublication.status)}
                        className="text-xs"
                      >
                        {selectedPublication.status || "Unknown"}
                      </Badge>
                      {selectedPublication.platform && (
                        <Badge variant="outline" className="text-xs">
                          {selectedPublication.platform}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedPublication.description ||
                      "No description provided"}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedPublication.paperId && (
                    <div>
                      <h4 className="font-medium mb-1 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Paper ID
                      </h4>
                      <p className="text-gray-700 font-mono text-sm">
                        {selectedPublication.paperId}
                      </p>
                    </div>
                  )}

                  {selectedPublication.platform && (
                    <div>
                      <h4 className="font-medium mb-1">Platform</h4>
                      <p className="text-gray-700">
                        {selectedPublication.platform}
                      </p>
                    </div>
                  )}

                  {selectedPublication.program && (
                    <div>
                      <h4 className="font-medium mb-1">Program</h4>
                      <p className="text-gray-700">
                        {selectedPublication.program}
                      </p>
                    </div>
                  )}
                </div>

                {/* Attachments */}
                <div className="space-y-4">
                  <h4 className="font-medium">Attachments</h4>

                  {/* Paper Attachment */}
                  {(selectedPublication.paperAttachment?.url ||
                    selectedPublication.publicationFile?.url) && (
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-blue-100 p-2 rounded">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium">Paper Attachment</h5>
                          <p className="text-sm text-gray-500">
                            {selectedPublication.paperAttachment?.name ||
                              selectedPublication.publicationFile?.name ||
                              "Research Paper"}
                          </p>
                        </div>
                        <a
                          href={
                            selectedPublication.paperAttachment?.url ||
                            selectedPublication.publicationFile?.url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Code Attachment */}
                  {selectedPublication.codeAttachment?.url && (
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-green-100 p-2 rounded">
                          <Code className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium">Code Attachment</h5>
                          <p className="text-sm text-gray-500">
                            {selectedPublication.codeAttachment.name ||
                              "Source Code"}
                          </p>
                        </div>
                        <a
                          href={selectedPublication.codeAttachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Images */}
                  {selectedPublication.images &&
                    Array.isArray(selectedPublication.images) &&
                    selectedPublication.images.length > 0 && (
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-purple-100 p-2 rounded">
                            <ImageIcon className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium">
                              Images ({selectedPublication.images.length})
                            </h5>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {selectedPublication.images.map((img, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={img.url}
                                alt={`Publication image ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                                onError={(e) => {
                                  e.target.src =
                                    "https://via.placeholder.com/300x200?text=Image+Not+Found";
                                }}
                              />
                              <a
                                href={img.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100"
                                title="View full size"
                              >
                                <Eye className="w-6 h-6 text-white" />
                              </a>
                              <div className="text-xs text-gray-500 truncate mt-1">
                                {img.name || `Image ${index + 1}`}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* No attachments message */}
                  {!hasAttachments(selectedPublication) && (
                    <div className="text-center py-8 border rounded-lg">
                      <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No attachments available</p>
                    </div>
                  )}
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-4 text-sm border-t pt-4">
                  <div>
                    <p className="font-medium">Created</p>
                    <p className="text-gray-600">
                      {formatDate(selectedPublication.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Last Updated</p>
                    <p className="text-gray-600">
                      {formatDate(
                        selectedPublication.updatedAt ||
                          selectedPublication.createdAt
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setViewDialogOpen(false)}
                >
                  Close
                </Button>
                <Link to={`/update/publication/${selectedPublication._id}`}>
                  <Button onClick={() => setViewDialogOpen(false)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Publication
                  </Button>
                </Link>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagePublications;
