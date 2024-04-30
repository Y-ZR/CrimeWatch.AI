import React from "react";
import { Header } from "@/components/ui/Header";

const Demo = () => {
  return (
    <div>
      <Header />
      <section className="min-h-screen w-full flex items-center">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 grid-cols-[1fr_1fr]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  <video controls>
                    <source src="/Sherlock.mp4" type="video/mp4"></source>
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Demo;
