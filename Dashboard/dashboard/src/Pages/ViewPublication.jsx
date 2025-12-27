import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePublication } from "@/store/slices/publicationSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Calendar,
  Users,
  Tag,
  Image as ImageIcon,
  Video,
  FileText,
  Building,
  User,
  Globe,
  ExternalLink,
  ArrowLeft,
  Edit,
} from "lucide-react";

const ViewPublication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { singlePublication, loading } = useSelector(
    (state) => state.publication
  );

  useEffect(() => {
    if (id) {
      dispatch(getSinglePublication(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading publication...</p>
        </div>
      </div>
    );
  }

  if (!singlePublication) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-700">
          Publication not found
        </h1>
        <Button
          onClick={() => navigate("/manage-publications")}
          className="mt-4"
        >
          Back to Publications
        </Button>
      </div>
    );
  }

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get status badge variant
  const getStatusVariant = (status) => {
    switch (status) {
      case "published":
      case "Completed":
        return "default";
      case "Ongoing":
        return "secondary";
      case "Hold":
        return "outline";
      case "Cancelled":
        return "destructive";
      case "Accepted":
        return "success";
      case "On-Review":
        return "warning";
      default:
        return "outline";
    }
  };

  // Get type badge variant
  const getTypeVariant = (type) => {
    switch (type) {
      case "Theatrical Production":
        return "purple";
      case "Research":
        return "blue";
      case "Workshop":
        return "green";
      case "Community Project":
        return "orange";
      case "Publication":
        return "red";
      default:
        return "outline";
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 sm:pl-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/manage-publications")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Publications
          </Button>
          <h1 className="text-3xl font-bold">View Publication</h1>
        </div>
        <Button
          onClick={() => navigate(`/update/publication/${id}`)}
          className="flex items-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Edit Publication
        </Button>
      </div>

      {/* Publication Banner */}
      {singlePublication.projectBanner?.url && (
        <div className="mb-8">
          <img
            src={singlePublication.projectBanner.url}
            alt="Publication banner"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Title and Badges */}
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant={getTypeVariant(singlePublication.type)}>
                  {singlePublication.type}
                </Badge>
                <Badge variant={getStatusVariant(singlePublication.status)}>
                  {singlePublication.status}
                </Badge>
                <Badge variant="outline">
                  {singlePublication.Platform || "IEEE Xplore"}
                </Badge>
              </div>
              <CardTitle className="text-3xl">
                {singlePublication.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Description
                </h3>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {singlePublication.description}
                </p>
              </div>

              <Separator />

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {singlePublication.Program && (
                  <div>
                    <h4 className="font-medium mb-1 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Program
                    </h4>
                    <p className="text-gray-700">{singlePublication.Program}</p>
                  </div>
                )}

                {singlePublication.institution && (
                  <div>
                    <h4 className="font-medium mb-1 flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Institution
                    </h4>
                    <p className="text-gray-700">
                      {singlePublication.institution}
                    </p>
                  </div>
                )}

                {singlePublication.role && (
                  <div>
                    <h4 className="font-medium mb-1 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Role
                    </h4>
                    <p className="text-gray-700">{singlePublication.role}</p>
                  </div>
                )}

                <div>
                  <h4 className="font-medium mb-1 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Platform
                  </h4>
                  <p className="text-gray-700">
                    {singlePublication.Platform || "IEEE Xplore"}
                  </p>
                </div>

                {/* Dates */}
                <div className="md:col-span-2 space-y-4">
                  <h4 className="font-medium mb-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Timeline
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium">
                        {formatDate(singlePublication.startDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">End Date</p>
                      <p className="font-medium">
                        {formatDate(singlePublication.endDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Collaborators */}
          {singlePublication.collaborators &&
            singlePublication.collaborators.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Collaborators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {singlePublication.collaborators.map(
                      (collaborator, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-base px-3 py-1.5"
                        >
                          {collaborator}
                        </Badge>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

          {/* Media */}
          {singlePublication.media && singlePublication.media.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {singlePublication.media.map((item, index) => (
                    <div key={index} className="group relative">
                      {item.type === "image" ? (
                        <>
                          <img
                            src={item.url}
                            alt={`Media ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <ImageIcon className="absolute top-2 right-2 w-5 h-5 text-white/70" />
                        </>
                      ) : (
                        <div className="w-full h-48 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                          <Video className="w-12 h-12 text-gray-400" />
                          <span className="text-sm text-gray-500 mt-2">
                            Video
                          </span>
                        </div>
                      )}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100"
                      >
                        <ExternalLink className="w-8 h-8 text-white" />
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tags */}
          {singlePublication.tags && singlePublication.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {singlePublication.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Publication Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="font-medium">
                  {formatDate(singlePublication.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-medium">
                  {formatDate(
                    singlePublication.updatedAt || singlePublication.createdAt
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Publication ID</p>
                <p className="font-mono text-sm">{singlePublication._id}</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => navigate(`/update/publication/${id}`)}
                className="w-full"
                variant="outline"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Publication
              </Button>
              <Button
                onClick={() => navigate("/manage-publications")}
                className="w-full"
                variant="outline"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to List
              </Button>
              {singlePublication.projectBanner?.url && (
                <Button
                  onClick={() =>
                    window.open(singlePublication.projectBanner.url, "_blank")
                  }
                  className="w-full"
                  variant="outline"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Banner
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t">
        <div className="text-sm text-gray-500">
          Publication ID: {singlePublication._id}
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => navigate("/manage-publications")}
          >
            Back to List
          </Button>
          <Button onClick={() => navigate(`/update/publication/${id}`)}>
            Edit Publication
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewPublication;
