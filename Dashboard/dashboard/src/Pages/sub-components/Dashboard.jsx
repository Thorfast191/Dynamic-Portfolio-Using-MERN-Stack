import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { clearAllSkillErrors } from "@/store/slices/skillSlice";
import {
  clearAllSoftwareAppErrors,
  deleteSoftwareApplication,
  getAllSoftwareApplications,
  resetSoftwareApplicationSlice,
} from "@/store/slices/softwareApplicationSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { clearAllTimelineErrors } from "@/store/slices/timelineSlice";
import { clearAllProjectErrors } from "@/store/slices/projectSlice";
import {
  clearAllPublicationErrors,
  deletePublication,
  getAllPublications,
  resetPublicationSlice,
} from "@/store/slices/publicationSlice";
import { BookOpen, ExternalLink, Eye, X } from "lucide-react";

const Dashboard = () => {
  const navigateTo = useNavigate();

  // Navigation functions
  const gotoManageSkills = () => {
    navigateTo("/manage/skills");
  };
  const gotoManageTimeline = () => {
    navigateTo("/manage/timeline");
  };
  const gotoManageProjects = () => {
    navigateTo("/manage/projects");
  };
  const gotoManagePublications = () => {
    navigateTo("/manage/publications");
  };
  const gotoAddPublication = () => {
    navigateTo("/add/publication");
  };

  // Selectors
  const { user } = useSelector((state) => state.user);
  const {
    skills,
    loading: skillLoading,
    error: skillError,
    message: skillMessage,
  } = useSelector((state) => state.skill);
  const {
    softwareApplications,
    loading: appLoading,
    error: appError,
    message: appMessage,
  } = useSelector((state) => state.softwareApplications);
  const {
    timeline,
    loading: timelineLoading,
    error: timelineError,
    message: timelineMessage,
  } = useSelector((state) => state.timeline);
  const {
    publications,
    loading: publicationsLoading,
    error: publicationsError,
    message: publicationsMessage,
  } = useSelector((state) => state.publication);
  const { projects, error: projectError } = useSelector(
    (state) => state.project
  );

  // State for delete operations
  const [appId, setAppId] = useState(null);
  const [publicationId, setPublicationId] = useState(null);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [showAttachments, setShowAttachments] = useState(false);

  // Delete handlers
  const handleDeleteSoftwareApp = (id) => {
    setAppId(id);
    dispatch(deleteSoftwareApplication(id));
  };

  const handleDeletePublication = (id) => {
    setPublicationId(id);
    dispatch(deletePublication(id));
  };

  const viewAttachments = (publication) => {
    // Debug: Check what's in the publication object
    console.log("View attachments - publication data:", publication);
    console.log("Paper attachment:", publication?.paperAttachment);
    console.log("Publication file:", publication?.publicationFile);
    console.log("Code attachment:", publication?.codeAttachment);
    console.log("Images:", publication?.images);

    setSelectedPublication(publication);
    setShowAttachments(true);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch data on component mount
    console.log("Dashboard mounted, fetching publications...");
    dispatch(getAllPublications());
    dispatch(getAllSoftwareApplications());
  }, [dispatch]);

  useEffect(() => {
    // Debug: Log publications when they change
    if (publications && publications.length > 0) {
      console.log("Publications fetched:", publications);
      console.log("First publication:", publications[0]);
      console.log(
        "First publication structure:",
        JSON.stringify(publications[0], null, 2)
      );
    }
  }, [publications]);

  useEffect(() => {
    // Error handling
    if (skillError) {
      toast.error(skillError);
      dispatch(clearAllSkillErrors());
    }
    if (appError) {
      toast.error(appError);
      dispatch(clearAllSoftwareAppErrors());
    }
    if (publicationsError) {
      toast.error(publicationsError);
      dispatch(clearAllPublicationErrors());
    }
    if (projectError) {
      toast.error(projectError);
      dispatch(clearAllProjectErrors());
    }
    if (timelineError) {
      toast.error(timelineError);
      dispatch(clearAllTimelineErrors());
    }

    // Success messages
    if (appMessage) {
      toast.success(appMessage);
      setAppId(null);
      dispatch(resetSoftwareApplicationSlice());
      dispatch(getAllSoftwareApplications());
    }
    if (publicationsMessage) {
      toast.success(publicationsMessage);
      setPublicationId(null);
      dispatch(resetPublicationSlice());
      dispatch(getAllPublications());
    }
    if (timelineMessage) {
      toast.success(timelineMessage);
    }
    if (skillMessage) {
      toast.success(skillMessage);
    }
  }, [
    dispatch,
    skillLoading,
    skillError,
    skillMessage,
    appLoading,
    appError,
    appMessage,
    publicationsLoading,
    publicationsError,
    publicationsMessage,
    timelineError,
    timelineLoading,
    timelineMessage,
    projectError,
  ]);

  // Helper function to check if publication has any attachments
  const hasAttachments = (publication) => {
    if (!publication) return false;

    const hasPaper =
      publication.paperAttachment?.url || publication.publicationFile?.url;
    const hasCode = publication.codeAttachment?.url;
    const hasImages = publication.images && publication.images.length > 0;

    console.log(`Checking attachments for ${publication.title}:`, {
      hasPaper,
      hasCode,
      hasImages,
    });

    return hasPaper || hasCode || hasImages;
  };

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            {/* Top Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-5">
              <Card className="sm:col-span-2">
                <CardHeader className="pb-3">
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {user.aboutMe}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button>Visit Portfolio</Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle>Projects</CardTitle>
                  <CardTitle className="text-6xl">
                    {projects?.length || 0}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button onClick={gotoManageProjects}>Manage Projects</Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle>Skills</CardTitle>
                  <CardTitle className="text-6xl">
                    {skills?.length || 0}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button onClick={gotoManageSkills}>Manage Skills</Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle>Publications</CardTitle>
                  <CardTitle className="text-6xl">
                    {publications?.length || 0}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="flex gap-2">
                  <Button onClick={gotoManagePublications} variant="outline">
                    Manage
                  </Button>
                  <Button onClick={gotoAddPublication}>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Add New
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Projects Table */}
            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7">
                    <div className="flex justify-between items-center">
                      <CardTitle>Recent Projects</CardTitle>
                      <Button onClick={gotoManageProjects} variant="outline">
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Stack
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="md:table-cell">
                            Actions
                          </TableHead>
                          <TableHead className="text-right">Links</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects && projects.length > 0 ? (
                          projects.slice(0, 5).map((element) => {
                            return (
                              <TableRow className="bg-accent" key={element._id}>
                                <TableCell>
                                  <div className="font-medium">
                                    {element.title}
                                  </div>
                                  <div className="text-sm text-muted-foreground md:hidden">
                                    {element.stack}
                                  </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {element.stack}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  <Badge
                                    className="text-xs"
                                    variant={
                                      element.deployed === "Yes"
                                        ? "default"
                                        : "secondary"
                                    }
                                  >
                                    {element.deployed}
                                  </Badge>
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  <Link to={`/update/project/${element._id}`}>
                                    <Button size="sm">Edit</Button>
                                  </Link>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    {element.projectLink && (
                                      <Link
                                        to={element.projectLink}
                                        target="_blank"
                                      >
                                        <Button size="sm" variant="outline">
                                          <ExternalLink className="w-4 h-4" />
                                        </Button>
                                      </Link>
                                    )}
                                    {element.githubLink && (
                                      <Link
                                        to={element.githubLink}
                                        target="_blank"
                                      >
                                        <Button size="sm" variant="outline">
                                          GitHub
                                        </Button>
                                      </Link>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8">
                              <div className="flex flex-col items-center gap-2">
                                <p className="text-muted-foreground">
                                  No projects found
                                </p>
                                <Button onClick={gotoManageProjects}>
                                  Add Your First Project
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Skills Grid */}
            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7">
                    <div className="flex justify-between items-center">
                      <CardTitle>Skills Overview</CardTitle>
                      <Button onClick={gotoManageSkills} variant="outline">
                        Manage Skills
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 gap-4">
                    {skills && skills.length > 0 ? (
                      skills.slice(0, 6).map((element) => {
                        return (
                          <Card
                            key={element._id}
                            className="hover:shadow-md transition-shadow"
                          >
                            <CardHeader>
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-lg">
                                  {element.title}
                                </CardTitle>
                                <Badge variant="outline">
                                  {element.proficiency}%
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardFooter>
                              <Progress
                                value={element.proficiency}
                                className="h-2"
                              />
                            </CardFooter>
                          </Card>
                        );
                      })
                    ) : (
                      <div className="col-span-2 text-center py-8">
                        <p className="text-muted-foreground mb-4">
                          No skills added yet
                        </p>
                        <Button onClick={gotoManageSkills}>
                          Add Your First Skill
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Publications & Timeline Section */}
            <Tabs>
              <TabsContent className="grid min-[1050px]:grid-cols-2 gap-4">
                {/* Publications Table */}
                <Card>
                  <CardHeader className="px-7">
                    <div className="flex justify-between items-center">
                      <CardTitle>Publications</CardTitle>
                      <Button onClick={gotoAddPublication} size="sm">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Add Publication
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Platform
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {publications && publications.length > 0 ? (
                          publications.slice(0, 5).map((element) => {
                            const hasAnyAttachments = hasAttachments(element);

                            return (
                              <TableRow className="bg-accent" key={element._id}>
                                <TableCell className="font-medium">
                                  <div className="font-medium">
                                    {element.title}
                                  </div>
                                  <div className="text-sm text-muted-foreground truncate max-w-xs">
                                    {element.description?.slice(0, 80)}
                                    {element.description?.length > 80
                                      ? "..."
                                      : ""}
                                  </div>
                                  {/* Show paper ID if available */}
                                  {element.paperId && (
                                    <div className="text-xs text-blue-600 mt-1">
                                      {element.paperId}
                                    </div>
                                  )}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  <Badge variant="outline">
                                    {element.platform || "Other"}
                                  </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  <Badge
                                    variant={
                                      element.status === "Published"
                                        ? "default"
                                        : element.status === "Ongoing"
                                        ? "secondary"
                                        : element.status === "Hold"
                                        ? "outline"
                                        : "destructive"
                                    }
                                  >
                                    {element.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-center">
                                  <div className="flex justify-center gap-2">
                                    <Link
                                      to={`/update/publication/${element._id}`}
                                    >
                                      <Button size="sm" variant="outline">
                                        Edit
                                      </Button>
                                    </Link>
                                    {/* View attachments if available */}
                                    {hasAnyAttachments && (
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => viewAttachments(element)}
                                        title="View Attachments"
                                      >
                                        <Eye className="w-4 h-4" />
                                      </Button>
                                    )}
                                    {publicationsLoading &&
                                    publicationId === element._id ? (
                                      <SpecialLoadingButton
                                        content={"Deleting"}
                                        width={"w-20"}
                                      />
                                    ) : (
                                      <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() =>
                                          handleDeletePublication(element._id)
                                        }
                                      >
                                        Delete
                                      </Button>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-8">
                              <div className="flex flex-col items-center gap-2">
                                <BookOpen className="w-12 h-12 text-muted-foreground" />
                                <p className="text-muted-foreground">
                                  {publicationsLoading
                                    ? "Loading publications..."
                                    : "No publications yet"}
                                </p>
                                <Button onClick={gotoAddPublication} size="sm">
                                  Add Your First Publication
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                  {publications && publications.length > 5 && (
                    <CardFooter className="flex justify-center">
                      <Button
                        onClick={gotoManagePublications}
                        variant="outline"
                        size="sm"
                      >
                        View All Publications ({publications.length})
                      </Button>
                    </CardFooter>
                  )}
                </Card>

                {/* Timeline Table */}
                <Card>
                  <CardHeader className="px-7 flex items-center justify-between flex-row">
                    <CardTitle>Timeline</CardTitle>
                    <Button onClick={gotoManageTimeline} className="w-fit">
                      Manage Timeline
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Period
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Description
                          </TableHead>
                          <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeline && timeline.length > 0 ? (
                          timeline.slice(0, 5).map((element) => (
                            <TableRow className="bg-accent" key={element._id}>
                              <TableCell className="font-medium">
                                {element.title}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                <div className="text-sm">
                                  {element.from} - {element.to}
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell max-w-xs truncate">
                                {element.description || "No description"}
                              </TableCell>
                              <TableCell className="text-right">
                                <Badge
                                  variant={
                                    element.type === "Work"
                                      ? "default"
                                      : element.type === "Education"
                                      ? "secondary"
                                      : "outline"
                                  }
                                >
                                  {element.type}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-8">
                              <div className="flex flex-col items-center gap-2">
                                <p className="text-muted-foreground">
                                  No timeline entries found
                                </p>
                                <Button onClick={gotoManageTimeline}>
                                  Add Timeline Entry
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Software Applications Table */}
            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Software Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead className="md:table-cell">Icon</TableHead>
                          <TableHead className="md:table-cell">
                            Category
                          </TableHead>
                          <TableHead className="md:table-cell text-center">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {softwareApplications &&
                        softwareApplications.length > 0 ? (
                          softwareApplications.slice(0, 8).map((element) => {
                            return (
                              <TableRow className="bg-accent" key={element._id}>
                                <TableCell className="font-medium">
                                  {element.name}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  <img
                                    className="w-7 h-7"
                                    src={element.svg?.url}
                                    alt={element.name}
                                  />
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  <Badge variant="outline">
                                    {element.category || "Uncategorized"}
                                  </Badge>
                                </TableCell>
                                <TableCell className="md:table-cell text-center">
                                  {appLoading && appId === element._id ? (
                                    <SpecialLoadingButton
                                      content={"Deleting"}
                                      width={"w-fit"}
                                    />
                                  ) : (
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() =>
                                        handleDeleteSoftwareApp(element._id)
                                      }
                                    >
                                      Delete
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-8">
                              <div className="flex flex-col items-center gap-2">
                                <p className="text-muted-foreground">
                                  No software applications added
                                </p>
                                <Link to="/add/uses">
                                  <Button>Add Software</Button>
                                </Link>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Attachments Modal */}
      {showAttachments && selectedPublication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-semibold">
                  Attachments for {selectedPublication.title || "Publication"}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedPublication.description || "No description"}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowAttachments(false);
                  setSelectedPublication(null);
                }}
                className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Paper Attachment - Check both possible field names */}
              {(selectedPublication.paperAttachment?.url ||
                selectedPublication.publicationFile?.url) && (
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-blue-100 p-2 rounded">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="font-medium text-lg">Paper Attachment</h4>
                  </div>
                  <p className="text-gray-600 mb-3">
                    Download the research paper/document
                  </p>
                  <a
                    href={
                      selectedPublication.paperAttachment?.url ||
                      selectedPublication.publicationFile?.url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View/Download Paper
                  </a>
                  <p className="text-xs text-gray-500 mt-2">
                    {(selectedPublication.paperAttachment?.name ||
                      selectedPublication.publicationFile?.name) &&
                      `File: ${
                        selectedPublication.paperAttachment?.name ||
                        selectedPublication.publicationFile?.name
                      }`}
                  </p>
                </div>
              )}

              {/* Code Attachment */}
              {selectedPublication.codeAttachment?.url && (
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-green-100 p-2 rounded">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                    </div>
                    <h4 className="font-medium text-lg">Code Attachment</h4>
                  </div>
                  <p className="text-gray-600 mb-3">
                    Download the source code/files
                  </p>
                  <a
                    href={selectedPublication.codeAttachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View/Download Code
                  </a>
                  <p className="text-xs text-gray-500 mt-2">
                    {selectedPublication.codeAttachment.name &&
                      `File: ${selectedPublication.codeAttachment.name}`}
                  </p>
                </div>
              )}

              {/* Images */}
              {selectedPublication.images &&
              selectedPublication.images.length > 0 ? (
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-purple-100 p-2 rounded">
                      <svg
                        className="w-5 h-5 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-medium text-lg">
                      Images ({selectedPublication.images.length})
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedPublication.images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img.url}
                          alt={`Publication image ${index + 1}`}
                          className="w-full h-40 object-cover rounded-lg"
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
              ) : null}

              {/* No Attachments Message */}
              {!(
                selectedPublication.paperAttachment?.url ||
                selectedPublication.publicationFile?.url
              ) &&
                !selectedPublication.codeAttachment?.url &&
                (!selectedPublication.images ||
                  selectedPublication.images.length === 0) && (
                  <div className="text-center py-8">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <BookOpen className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg">
                      No attachments available for this publication
                    </p>
                  </div>
                )}
            </div>

            {/* Publication Info Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                {selectedPublication.paperId && (
                  <div>
                    <span className="font-medium">Paper ID:</span>
                    <p className="text-gray-600">
                      {selectedPublication.paperId}
                    </p>
                  </div>
                )}
                {selectedPublication.platform && (
                  <div>
                    <span className="font-medium">Platform:</span>
                    <p className="text-gray-600">
                      {selectedPublication.platform}
                    </p>
                  </div>
                )}
                {selectedPublication.program && (
                  <div>
                    <span className="font-medium">Program:</span>
                    <p className="text-gray-600">
                      {selectedPublication.program}
                    </p>
                  </div>
                )}
                {selectedPublication.status && (
                  <div>
                    <span className="font-medium">Status:</span>
                    <Badge
                      variant={
                        selectedPublication.status === "Published"
                          ? "default"
                          : selectedPublication.status === "Ongoing"
                          ? "secondary"
                          : selectedPublication.status === "Hold"
                          ? "outline"
                          : "destructive"
                      }
                      className="mt-1"
                    >
                      {selectedPublication.status}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
