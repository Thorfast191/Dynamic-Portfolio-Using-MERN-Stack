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
const Dashboard = () => {
  const navigateTo = useNavigate();
  const gotoMangeSkills = () => {
    navigateTo("/manage/skills");
  };
  const gotoMangeTimeline = () => {
    navigateTo("/manage/timeline");
  };
  const gotoMangeProjects = () => {
    navigateTo("/manage/projects");
  };

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

  const [appId, setAppId] = useState(null);
  const handleDeleteSoftwareApp = (id) => {
    setAppId(id);
    dispatch(deleteSoftwareApplication(id));
  };
  const [PublicationId, setPublicationId] = useState(null);
  const handleDeletePublications = (id) => {
    setPublicationId(id);
    dispatch(deletePublication(id));
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPublications());
    dispatch(getAllSoftwareApplications());
    // Add other data fetches here if needed
  }, [dispatch]);
  useEffect(() => {
    // dispatch(getAllTimeline());
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
    if (appMessage) {
      toast.success(appMessage);
      setAppId(null);
      dispatch(resetSoftwareApplicationSlice());
      dispatch(getAllSoftwareApplications());
    }
    if (timelineError) {
      toast.error(timelineError);
      dispatch(clearAllTimelineErrors());
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
  ]);

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
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
                  <CardTitle>Projects Completed</CardTitle>
                  <CardTitle className="text-6xl">
                    {projects && projects.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button onClick={gotoMangeProjects}>Manage Projects</Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle>Skills</CardTitle>
                  <CardTitle className="text-6xl">
                    {skills && skills.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button onClick={gotoMangeSkills}>Manage Skill</Button>
                </CardFooter>
              </Card>
            </div>
            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Projects</CardTitle>
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
                          <TableHead className="hidden md:table-cell">
                            Start Date
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Collaborators
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects && projects.length > 0 ? (
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
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              You have not added any project.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7 gap-3">
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 gap-4">
                    {skills && skills.length > 0 ? (
                      skills.map((element) => {
                        return (
                          <Card key={element._id}>
                            <CardHeader>{element.title}</CardHeader>
                            <CardFooter>
                              <Progress value={element.proficiency} />
                            </CardFooter>
                          </Card>
                        );
                      })
                    ) : (
                      <p className="text-3xl">You have not added any skill.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Tabs>
              <TabsContent className="grid min-[1050px]:grid-cols-2 gap-4">
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
                          <TableHead className="md:table-cell text-center">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {softwareApplications &&
                        softwareApplications.length > 0 ? (
                          softwareApplications.map((element) => {
                            return (
                              <TableRow className="bg-accent" key={element._id}>
                                <TableCell className="font-medium">
                                  {element.name}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  <img
                                    className="w-7 h-7"
                                    src={element.svg && element.svg.url}
                                    alt={element.name}
                                  />
                                </TableCell>
                                <TableCell className="md:table-cell  text-center">
                                  {appLoading && appId === element._id ? (
                                    <SpecialLoadingButton
                                      content={"Deleting"}
                                      width={"w-fit"}
                                    />
                                  ) : (
                                    <Button
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
