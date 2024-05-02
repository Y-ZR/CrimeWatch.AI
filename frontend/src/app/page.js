"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

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
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center gap-2">
                <ShieldCheckIcon className="h-12 w-12" />
                <div className="space-y-2 text-center">
                  <h3 className="font-bold">Behavioural Recognition</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Identify suspicious activites with out behavioural
                    recognition technology using Gemini.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <VideoIcon className="h-12 w-12" />
                <div className="space-y-2 text-center">
                  <h3 className="font-bold">Object Tracking</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Track objects in real-time, allowing you to monitor activity
                    and respond to potential threats.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <AlertCircleIcon className="h-12 w-12" />
                <div className="space-y-2 text-center">
                  <h3 className="font-bold">Anomaly Detection</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Our system can detect unusual behavior or events, triggering
                    alerts for further investigation.
                  </p>
                </div>
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

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
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
