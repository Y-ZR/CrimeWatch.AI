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
import { Textarea } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "axios";
import { getVideoBasicAnalysis } from "../APIEndpoints";
import { RotatingLines } from "react-loader-spinner";
import HeatMap from "@uiw/react-heat-map";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Demo = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [isPaused, setIsPaused] = useState(false);

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
    }, 6000); // hardcoded time (to pause video)
    return () => clearTimeout(timer);
  }, []);

  // call basic video analysis api when the video is first played
  useEffect(() => {
    // Function to call the API
    const fetchBasicVideoAnalysis = async () => {
      try {
        const response = await axios.get(getVideoBasicAnalysis);
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
  async function typeWriterEffect(str) {
    if (typewriterIdx > str.length) {
      setGenerationComplete(true);
      typewriterIdx = 1;
      return;
    }

    setAnalysis(str.slice(0, typewriterIdx));
    typewriterIdx++;
    await delay(50);
    typeWriterEffect(str);
  }
  const handleViewAnalysis = async () => {
    const firstDescription = data.events["1"].description;
    typeWriterEffect(firstDescription);
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
                    controls
                    autoplay
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
                    <Button className="h-7" onClick={handleViewAnalysis}>
                      View
                    </Button>
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
                            variant="faded"
                            labelPlacement="outside"
                            value={analysis}
                            classNames={{
                              base: ["w-full", "h-full"],
                              input: [
                                "text-zinc-600",
                                "text-xs",
                                "border-black",
                              ],
                              inputWrapper: "",
                            }}
                            onValueChange={(analysis) => setAnalysis(analysis)}
                          />
                        </div>
                        <div className="flex items-center my-3">
                          <div className="px-1">
                            <Clock3 color="#FF0000" />
                          </div>
                          <div className="mx-3">Time:</div>
                        </div>
                      </CardContent>
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
                                0: "#f4decd",
                                2: "#e4b293",
                                4: "#d48462",
                                10: "#c2533a",
                                20: "#ad001d",
                                30: "#000",
                              }}
                            />
                          </div>
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
                                0: "#f4decd",
                                2: "#e4b293",
                                4: "#d48462",
                                10: "#c2533a",
                                20: "#ad001d",
                                30: "#000",
                              }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  )}
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
