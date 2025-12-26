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
<<<<<<< HEAD
  clearAllPublicationErrors,
  deletePublication,
  getAllPublications,
  resetPublicationSlice,
} from "@/store/slices/publicationSlice";
=======
  clearAllResearchErrors,
  deleteResearch,
  getAllResearch,
  resetResearchSlice,
} from "@/store/slices/researchSlice";
import { BookOpen, ExternalLink } from "lucide-react";

>>>>>>> 4a73a3b (updated)
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
  const gotoManageResearch = () => {
    navigateTo("/manage/research");
  };
  const gotoAddResearch = () => {
    navigateTo("/add/research");
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
  const {
    research,
    loading: researchLoading,
    error: researchError,
    message: researchMessage,
  } = useSelector((state) => state.research);

  // State for delete operations
  const [appId, setAppId] = useState(null);
  const [researchId, setResearchId] = useState(null);

  // Delete handlers
  const handleDeleteSoftwareApp = (id) => {
    setAppId(id);
    dispatch(deleteSoftwareApplication(id));
  };
<<<<<<< HEAD
  const [PublicationId, setPublicationId] = useState(null);
  const handleDeletePublications = (id) => {
    setPublicationId(id);
    dispatch(deletePublication(id));
  };
=======

  const handleDeleteResearch = (id) => {
    setResearchId(id);
    dispatch(deleteResearch(id));
  };

>>>>>>> 4a73a3b (updated)
  const dispatch = useDispatch();

  useEffect(() => {
<<<<<<< HEAD
    dispatch(getAllPublications());
    dispatch(getAllSoftwareApplications());
    // Add other data fetches here if needed
  }, [dispatch]);
  useEffect(() => {
    // dispatch(getAllTimeline());
=======
    // Fetch data on component mount
    dispatch(getAllSoftwareApplications());
    dispatch(getAllResearch());

    // Error handling
>>>>>>> 4a73a3b (updated)
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
    if (publicationsMessage) {
      toast.success(publicationsMessage);
      setPublicationId(null);
      dispatch(resetPublicationSlice());
    }
    if (projectError) {
      toast.error(projectError);
      dispatch(clearAllProjectErrors());
    }
    if (researchError) {
      toast.error(researchError);
      dispatch(clearAllResearchErrors());
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
    if (researchMessage) {
      toast.success(researchMessage);
      setResearchId(null);
      dispatch(resetResearchSlice());
      dispatch(getAllResearch());
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
    researchError,
    researchMessage,
    projectError,
  ]);

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
                  <CardTitle>Research</CardTitle>
                  <CardTitle className="text-6xl">
                    {research?.length || 0}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="flex gap-2">
                  <Button onClick={gotoManageResearch} variant="outline">
                    Manage
                  </Button>
                  <Button onClick={gotoAddResearch}>
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
                            Type
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Status
                          </TableHead>
<<<<<<< HEAD
                          <TableHead className="hidden md:table-cell">
                            Start Date
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Collaborators
                          </TableHead>
=======
                          <TableHead className="md:table-cell">
                            Actions
                          </TableHead>
                          <TableHead className="text-right">Links</TableHead>
>>>>>>> 4a73a3b (updated)
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects && projects.length > 0 ? (
<<<<<<< HEAD
                          projects.map((element) => (
                            <TableRow className="bg-accent" key={element._id}>
                              <TableCell>
                                <div className="font-medium">
                                  {element.title}
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {element.type}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                <Badge variant="outline">
                                  {element.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {new Date(
                                  element.startDate
                                ).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {element.collaborators?.join(", ")}
                              </TableCell>
                            </TableRow>
                          ))
=======
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
>>>>>>> 4a73a3b (updated)
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

            {/* Research & Timeline Section */}
            <Tabs>
              <TabsContent className="grid min-[1050px]:grid-cols-2 gap-4">
                {/* Research Table */}
                <Card>
                  <CardHeader className="px-7">
                    <div className="flex justify-between items-center">
                      <CardTitle>Research Publications</CardTitle>
                      <Button onClick={gotoAddResearch} size="sm">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Add Research
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {research && research.length > 0 ? (
                          research.slice(0, 5).map((element) => {
                            return (
                              <TableRow className="bg-accent" key={element._id}>
                                <TableCell className="font-medium">
                                  <div className="font-medium">
                                    {element.title}
                                  </div>
                                  <div className="text-sm text-muted-foreground truncate max-w-xs">
                                    {element.description}
                                  </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  <Badge
                                    variant={
                                      element.status === "Published"
                                        ? "default"
                                        : element.status === "Ongoing"
                                        ? "secondary"
                                        : "outline"
                                    }
                                  >
                                    {element.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-center">
                                  <div className="flex justify-center gap-2">
                                    <Link
                                      to={`/update/research/${element._id}`}
                                    >
                                      <Button size="sm" variant="outline">
                                        Edit
                                      </Button>
                                    </Link>
                                    {researchLoading &&
                                    researchId === element._id ? (
                                      <SpecialLoadingButton
                                        content={"Deleting"}
                                        width={"w-20"}
                                      />
                                    ) : (
                                      <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() =>
                                          handleDeleteResearch(element._id)
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
                            <TableCell colSpan={3} className="text-center py-8">
                              <div className="flex flex-col items-center gap-2">
                                <BookOpen className="w-12 h-12 text-muted-foreground" />
                                <p className="text-muted-foreground">
                                  No research publications yet
                                </p>
                                <Button onClick={gotoAddResearch} size="sm">
                                  Add Your First Research
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
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
<<<<<<< HEAD
                            <TableCell className="text-3xl overflow-y-hidden">
                              You have not added any skill.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Publications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="md:table-cell">
                            Description
                          </TableHead>
                          <TableHead className="md:table-cell">
                            Document
                          </TableHead>
                          <TableHead className="md:table-cell text-center">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {publications && publications.length > 0 ? (
                          publications.map((pub) => (
                            <TableRow className="bg-accent" key={pub._id}>
                              <TableCell className="font-medium">
                                {pub.title}
                              </TableCell>
                              <TableCell className="md:table-cell">
                                {pub.description?.slice(0, 50)}...
                              </TableCell>
                              <TableCell className="md:table-cell">
                                {pub._id ? (
                                  <Link
                                    to={`/publications/${pub._id}`}
                                    className="text-blue-500 hover:underline"
                                  >
                                    View Document
                                  </Link>
                                ) : (
                                  <span className="text-gray-400">
                                    Loading ID...
                                  </span>
                                )}
                              </TableCell>
                              <TableCell className="md:table-cell text-center">
                                {publicationsLoading &&
                                PublicationId === pub._id ? (
                                  <SpecialLoadingButton
                                    content={"Deleting"}
                                    width={"w-fit"}
                                  />
                                ) : (
                                  <Button
                                    variant="destructive"
                                    onClick={() =>
                                      handleDeletePublications(pub._id)
                                    }
                                  >
                                    Delete
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              className="text-3xl overflow-y-hidden"
                              colSpan={4}
                            >
                              No publications found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="px-7 flex items-center justify-between flex-row">
                    <CardTitle>Timeline</CardTitle>
                    <Button onClick={gotoMangeTimeline} className="w-fit">
                      Manage Timeline
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          {/* Added missing Description header */}
                          <TableHead className="md:table-cell">
                            Description
                          </TableHead>
                          <TableHead className="md:table-cell">From</TableHead>
                          <TableHead className="md:table-cell text-right">
                            To
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeline && timeline.length > 0 ? (
                          timeline.map((element) => (
                            <TableRow className="bg-accent" key={element._id}>
                              <TableCell className="font-medium">
                                {element.title}
                              </TableCell>
                              <TableCell className="font-medium">
                                {/* Verify API actually returns 'description' (common typo: 'decription') */}
                                {element.description || "No description"}
                              </TableCell>
                              <TableCell className="md:table-cell">
                                {element.from}
                              </TableCell>
                              <TableCell className="md:table-cell text-right">
                                {element.to}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              className="text-3xl text-center"
                            >
                              No timeline entries found
=======
                            <TableCell colSpan={4} className="text-center py-8">
                              <div className="flex flex-col items-center gap-2">
                                <p className="text-muted-foreground">
                                  No software applications added
                                </p>
                                <Link to="/add/uses">
                                  <Button>Add Software</Button>
                                </Link>
                              </div>
>>>>>>> 4a73a3b (updated)
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
    </>
  );
};

export default Dashboard;
