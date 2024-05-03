"use client";
import React from "react";
import {
  CircleAlert,
  Check,
  X,
  UserRoundCheck,
  CircleCheck,
  ListCollapse,
  Clock3,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import HeatMap from "@uiw/react-heat-map";
import { useToast } from "@/components/ui/use-toast";

const Demo = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const { toast } = useToast();

  // hardcoded data (to be removed)
  const data = {
    suspicious_activity: true,
    events: {
      1: {
        description:
          "A woman wearing a pink and blue sari is seen taking a laptop from a shelf and putting it into her bag. She looks around cautiously before doing so, suggesting she is aware that she is engaging in suspicious activity. This behavior is indicative of shoplifting, as she is concealing merchandise with the intention of leaving the store without paying for it.",
        time: "00:11-00:14",
      },
    },
  };

  const detailedData = {
    deeper_analysis: {
      1: {
        description:
          "Suspicious behavior noted. The suspect is seen glancing around frequently before taking an item from the shelf.",
        time: "00:11:18",
      },
    },
    suggestions: {
      1: "Increase monitoring: Enhance surveillance in high-risk areas where items are more frequently shoplifted.",
      2: "Staff training: Train employees on identifying suspicious behavior and on safe approaches to confronting potential shoplifters.",
    },
  };

  const value = [
    { date: "2016/01/11", count: 2 },
    { date: "2016/04/12", count: 2 },
    { date: "2016/05/01", count: 5 },
    { date: "2016/05/02", count: 5 },
    { date: "2016/05/03", count: 1 },
    { date: "2016/05/04", count: 11 },
    { date: "2016/05/08", count: 32 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.pause();
        console.log("Video paused");
      }
    }, 15000); // hardcoded time (to pause video)
    return () => clearTimeout(timer);
  }, []);

  // call basic video analysis api when the video is first played
  useEffect(() => {
    // Function to call the API
    const fetchBasicVideoAnalysis = async () => {
      try {
        const response = await axios.get(
          "http://13.78.161.149:8000/get_video_analysis/"
        );
        console.log("API response:", response.data);
      } catch (error) {
        console.error("API call failed:", error);
      }
    };

    // Event handler for when video plays
    const handlePlay = () => {
      console.log("Video is being played, calling API...");
      fetchBasicVideoAnalysis();
    };

    // Adding event listener to the video element
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("play", handlePlay);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (videoElement) {
        videoElement.removeEventListener("play", handlePlay);
      }
    };
  }, []);

  // typewriter effect
  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  var typewriterIdx = 1;
  async function typeWriterEffect(str, updateFunction, delayMs = 50) {
    let localIdx = 0; // Local index for each call to typeWriterEffect

    return new Promise((resolve) => {
      function doType() {
        if (localIdx > str.length) {
          resolve(); // Resolve promise when finished
          return;
        }

        updateFunction(str.slice(0, localIdx)); // Use passed function to update UI
        localIdx++;
        setTimeout(doType, delayMs); // Continue after a delay
      }

      doType();
    });
  }

  const handleViewAnalysis = async () => {
    const firstDescription = data.events["1"].description;
    const firstTimestamp = data.events["1"].time;

    // Use different update functions for description and timestamp
    await typeWriterEffect(firstDescription, setAnalysis);
    await typeWriterEffect(firstTimestamp, setTimestamp);
  };

  const handlePause = () => {
    if (!videoRef.current.ended) {
      setIsPaused(true);
    }
    console.log("Video has been paused.");
  };
  const handlePlay = () => {
    setIsPaused(false);
  };

  useEffect(() => {
    if (isPaused) {
      handleViewAnalysis();
    }
  }, [isPaused]);

  return (
    <div>
      <Header />
      <section className="min-h-screen w-full flex items-center">
        <div className="container px-24 md:px-22">
          <div className="grid gap-6 grid-cols-[1fr_1fr]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  <video
                    autoPlay={true}
                    muted
                    playsInline
                    ref={videoRef}
                    style={{
                      height: "500px",
                      borderRadius: "10px",
                    }}
                    onPause={handlePause}
                    onPlay={handlePlay}
                  >
                    <source src="/shoplifting.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
            <div>
              <div>
                {isPaused ? (
                  <Alert className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <CircleAlert className="h-6 w-6" color="#FF0000" />
                      <AlertTitle className="text-red-500 mx-1 my-1">
                        Suspicious Activity Detected
                      </AlertTitle>
                    </div>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="h-7">
                          View details
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Detailed Analysis</SheetTitle>
                          <SheetDescription>
                            A detailed analysis of the suspicious activity has
                            been generated. View details here:
                          </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                          <div className="">
                            <Label htmlFor="name" className="text-right">
                              Detailed Description
                            </Label>
                            <Textarea
                              isReadOnly
                              value={
                                detailedData.deeper_analysis[1].description
                              }
                              classNames={{
                                base: "w-full",
                                input: ["text-zinc-600", "text-xs"],
                              }}
                            />
                          </div>
                          <div className="mt-4">
                            <Label htmlFor="username" className="text-right">
                              Suggestion 1
                            </Label>
                            <Textarea
                              isReadOnly
                              value={detailedData.suggestions[1]}
                              classNames={{
                                base: "w-full",
                                input: ["text-zinc-600", "text-xs"],
                              }}
                              style={{
                                background: "transparent",
                                border: "none",
                              }}
                            />
                          </div>
                          <div className="mt-1">
                            <Label htmlFor="username" className="text-right">
                              Suggestion 2
                            </Label>
                            <Textarea
                              isReadOnly
                              value={detailedData.suggestions[2]}
                              classNames={{
                                base: "w-full",
                                input: ["text-zinc-600", "text-xs"],
                              }}
                              style={{
                                background: "transparent",
                                border: "none",
                              }}
                            />
                          </div>
                        </div>
                        <SheetFooter>
                          <SheetClose asChild>
                            <Button
                              className="mt-7"
                              variant="outline"
                              onClick={() => {
                                toast({
                                  description: "Details saved to database!",
                                });
                              }}
                            >
                              Save to database
                            </Button>
                          </SheetClose>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                    {/* <Button className="h-7">View details</Button> */}
                  </Alert>
                ) : (
                  <Alert className="flex items-center">
                    <UserRoundCheck className="h-6 w-6" color="#16A34A" />
                    <AlertTitle className="text-green-600 flex-1 mx-1 my-1">
                      No Suspicious Activity Detected
                    </AlertTitle>
                  </Alert>
                )}
              </div>
              <div className="my-4">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                  </CardHeader>
                  {isPaused ? (
                    <div>
                      <CardContent>
                        <div className="flex items-center my-3">
                          <div className="px-1">
                            <ListCollapse color="#FF0000" />
                          </div>
                          <div className="mx-3">Description: </div>
                          <Textarea
                            isReadOnly
                            value={analysis}
                            classNames={{
                              base: "w-full",
                              input: ["text-zinc-600", "text-xs"],
                            }}
                            onValueChange={(analysis) => setAnalysis(analysis)}
                            style={{
                              background: "transparent",
                              border: "none",
                            }}
                          />
                        </div>
                        <div className="flex items-center mt-10">
                          <div className="px-1 my-5">
                            <Clock3 color="#FF0000" />
                          </div>
                          <div className="mx-3">Timestamp: </div>
                          <Textarea
                            isReadOnly
                            value={timestamp}
                            classNames={{
                              base: "w-full border-none",
                              input: [
                                "text-zinc-600",
                                "text-s",
                                "bg-transparent",
                                "border-none",
                              ],
                            }}
                            onValueChange={(timestamp) =>
                              setTimestamp(timestamp)
                            }
                            style={{ background: "transparent" }}
                          />
                        </div>
                      </CardContent>
                    </div>
                  ) : (
                    <div>
                      <CardContent>
                        <div className="flex items-center">
                          <RotatingLines
                            height="30"
                            width="30"
                            radius="9"
                            color="black"
                          />
                          <div className="mx-3">Analysis in progress...</div>
                        </div>
                        <div className="flex items-center my-3">
                          <div className="px-1">
                            <CircleCheck color="#16A34A" />
                          </div>
                          <div className="mx-3">All systems normal</div>
                        </div>
                        <div className="flex items-center my-3">
                          <div className="px-1">
                            <CircleCheck color="#16A34A" />
                          </div>
                          <div className="mx-3">No abnormalities detected</div>
                        </div>
                      </CardContent>
                    </div>
                  )}
                  <CardContent className="grid gap-4">
                    <div className=" flex items-center space-x-4 rounded-md border p-4">
                      <div className="flex-1 space-y-1">
                        <div className="text-sm font-medium leading-none">
                          Activity:
                        </div>
                        <HeatMap
                          value={value}
                          width={600}
                          style={{
                            color: "#ad001d",
                            "--rhm-rect-active": "red",
                          }}
                          startDate={new Date("2016/01/01")}
                          panelColors={{
                            0: "#008000",
                            2: "#9ACD32",
                            4: "#FFBF00",
                            10: "#FF4500",
                            20: "#FF0000",
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Demo;
