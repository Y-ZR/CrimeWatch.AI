"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { ResponsiveLine } from "@nivo/line";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[100dvh] relative">
      <Header />

      <main className="">
        <section className="min-h-screen w-full flex items-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 grid-cols-[1fr_1fr]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800">
                    Gemini 1.5 Pro
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    CrimeWatch.AI
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Leverage the power of Gemini to enhance security operations.
                    Our software provides real-time monitoring,
                    demeanor/behaviour recognition, and automated alerts to keep
                    your premises safe.
                  </p>
                </div>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-black text-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-300 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="/demo"
                >
                  Try Demo
                </Link>
              </div>
              <img
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src="/stock.jpeg"
                width="550"
              />
            </div>
          </div>
        </section>

        <section className="min-h-screen w-full flex items-center bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm dark:bg-gray-800 text-green-800">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Enhance Your Security with AI
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our AI-powered surveillance system offers advanced features to
                  detect and analyze incidents, providing you with the tools to
                  improve safety and security.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-20 lg:grid-cols-3 lg:gap-12">

              <div className="flex flex-col items-center gap-2 mb-8">
                <VideoIcon className="h-12 w-12 text-[#4B5AE5]" />
                <div className="space-y-2 text-center">
                  <h3 className="font-bold">Real-time Monitoring</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Monitor your premises in real-time with Gemini, 
                    with alerts and notifications for any suspicious activity.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 mb-8">
                <ShieldCheckIcon className="h-12 w-12 text-[#4B5AE5]" />
                <div className="space-y-2 text-center">
                  <h3 className="font-bold">Behavioural Recognition</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Identify suspicious activites with our behavioural
                    recognition technology using the Gemini's technology.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 mb-8">
                <AlertCircleIcon className="h-12 w-12 text-[#4B5AE5]" />
                <div className="space-y-2 text-center">
                  <h3 className="font-bold">Anomaly Detection</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Our system can detect unusual behavior or events, triggering
                    alerts for further investigation.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
              </div>

              <div className="flex flex-col items-center gap-2">
                <PieChartIcon className="h-11 w-11 text-[#4B5AE5]" />
                <div className="space-y-2 text-center">
                  <h3 className="font-bold">Advanced Analytics</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Gain insights into your security operations with advanced
                    analytics and reports.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
              </div>

            </div>
          </div>
        </section>

        <section className="min-h-screen w-full flex items-center">
          <div className="container grid gap-20 sm:px-10 md:grid-cols-2">
            <div className="flex justify-center space-y-4">
                <LineChart className="aspect-[2/1]" />
            </div>
            <div className="flex flex-col space-y-4 items-center justify-center">
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm dark:bg-gray-800 text-green-800">
                  Market Trends
                </div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text_5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Global Video Surveillance Market
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  The global video surveillance market is expected to be valued at USD 53.7 billion 
                  in 2023 and is projected to reach USD 83.3 billion by 2028. It is expected to grow 
                  at a CAGR of 9.2% from 2023 to 2028.
                </p>
                <p className="text-sm italic text-gray-500 text-right w-full">
                  Source: <Link 
                            href="https://www.securityworldmarket.com/uk/News/Business-News/video-surveillance-market-predicted-to-reach-over-83-billion-by-20281?utm_source=newsletter-swm-uk&utm_medium=email&utm_campaign=wk&utm_source=360Works%20CloudMail&utm_medium=email&utm_campaign=SWM%20UK%20230829" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="underline text-blue-500 hover:text-blue-800">
                            Security World Market
                          </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="min-h-screen w-full flex items-center">
          <div className="container grid gap-20 sm:px-10 md:grid-cols-2">
            <div className="flex flex-col space-y-4 items-center justify-center">
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm dark:bg-gray-800 text-green-800">
                  Security Trends
                </div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text_5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Escalating Security Concerns
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  In 2023, amidst escalating security concerns, particularly within retail sectors, 
                  the state allocated a substantial $267 million to reinforce police departments' capabilities. 
                </p>
                <p className="text-sm italic text-gray-500">
                  Source: <Link 
                            href="https://www.gov.ca.gov/2024/02/28/orc-survey-result/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="underline text-blue-500 hover:text-blue-800">
                            Office of the Governor of California
                          </Link>
                </p>
              </div>
            </div>
            <div className="flex justify-center ">
              <img
                alt="Security Trends"
                className="mx-auto overflow-hidden rounded-xl object-fill object-center w-[500px] h-[500px]"
                src="/security.gif"
              />
            </div>
          </div>
        </section>

        <section className="min-h-screen w-full flex items-center">
          <div className="container grid gap-20 sm:px-10 md:grid-cols-2">
            <div className="flex justify-center space-y-4">
                <LineChart className="aspect-[2/1]" />
            </div>
            <div className="flex flex-col space-y-4 items-center justify-center">
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm dark:bg-gray-800 text-green-800">
                  Crime Statistics
                </div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text_5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Crime Statistics
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  In 2023 alone, the city recorded 53 homicides, 31,428 larceny thefts, 
                  6,571 motor vehicle thefts, and 2,693 robberies, underscoring the gravity of the situation.
                </p>
                <p className="text-sm italic text-gray-500 text-right w-full">
                  Source: <Link 
                            href="https://www.securityworldmarket.com/uk/News/Business-News/video-surveillance-market-predicted-to-reach-over-83-billion-by-20281?utm_source=newsletter-swm-uk&utm_medium=email&utm_campaign=wk&utm_source=360Works%20CloudMail&utm_medium=email&utm_campaign=SWM%20UK%20230829" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="underline text-blue-500 hover:text-blue-800">
                            Security World Market
                          </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="min-h-screen w-full flex items-center border-b-2">
          <div className="container grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
            <div className="flex space-y-4 items-center">
              <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text_5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Traffic spikes should be exciting, not scary.
              </h2>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm dark:bg-gray-800 text-green-800">
                Security
              </div>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                Fully managed infrastructure designed to scale dynamically with
                your traffic, a global edge to ensure your site is fast for
                every customer, and the tools to monitor every aspect of your
                app.
              </p>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="/contact"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function AlertCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

function ShieldCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function VideoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 8-6 4 6 4V8Z" />
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  );
}

function PieChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  )
}

function LineChart(props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "2022", y: 48.7 },
              { x: "2023", y: 53.7 },
              { x: "2028", y: 83.3 },
            ],
          },
        ]}
        margin={{ top: 10, right: 20, bottom: 60, left: 60 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
          min: "40",
          max: "90",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
          legend: 'Year',
          legendOffset: 50,
          legendPosition: 'middle'
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
          legend: 'Market Value (in billion USD)',
          legendOffset: -55,
          legendPosition: 'middle'
        }}
        colors={["#2563eb"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          axis: {
            ticks: {
                text: {
                    fontSize: 15,
                }
            },
            legend: {
              text: {
                fontSize: 15,
              },
            },
          },
          
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltip={({ point }) => {
          return (
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-lg font-semibold text-gray-800">
                {point.data.y} billion USD
              </p>
              <p className="text-sm text-gray-500">{point.data.x}</p>
            </div>
          );
        }}
        role="application"
      />
    </div>
  )
}