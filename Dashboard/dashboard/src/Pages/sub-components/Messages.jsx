import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  clearAllMessageErrors,
  deleteMessage,
  getAllMessages,
  resetMessagesSlice,
} from "@/store/slices/messageSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";
const Messages = () => {
  const { messages, loading, error, message } = useSelector(
    (state) => state.messages
  );

  const dispatch = useDispatch();
  const [messageId, setMessageId] = useState("");

  useEffect(() => {
    console.log("Fetching messages...");
    dispatch(getAllMessages());
  }, [dispatch]);

  useEffect(() => {
    console.log("Current messages:", messages);
  }, [messages]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }
    if (message && messageId) {
      toast.success(message);
      dispatch(resetMessagesSlice());
      dispatch(getAllMessages());
    }
  }, [dispatch, error, message, messageId]);

  const handleMessageDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  };

  return (
    <>
      <div className="min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20">
        <Tabs>
          <TabsContent>
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                {messages && messages.length > 0 ? (
                  messages.map((element) => {
                    return (
                      <Card key={element._id} className="grid gap-2 p-4">
                        <CardDescription className="text-slate-950 p-2 text-lg">
                          <span className="font-bold mr-2">Sender Name:</span>
                          {element.senderName}
                        </CardDescription>
                        <CardDescription className="text-slate-950 p-2 text-lg">
                          <span className="font-bold mr-2">Subject:</span>
                          {element.subject}
                        </CardDescription>
                        <CardDescription className="text-slate-950 p-2 text-lg">
                          <span className="font-bold mr-2">Message:</span>
                          {element.message}
                        </CardDescription>
                        <CardFooter className="justify-end pt-4">
                          {loading && messageId === element._id ? (
                            <SpecialLoadingButton
                              content={"Deleting"}
                              width={"w-32"}
                            />
                          ) : (
                            <Button
                              className="w-32"
                              onClick={() => handleMessageDelete(element._id)}
                            >
                              Delete
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    );
                  })
                ) : (
                  <CardHeader className="text-3xl font-semibold">
                    No Messages Found!
                  </CardHeader>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Messages;
