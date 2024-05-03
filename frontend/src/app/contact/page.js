import React from "react";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Form } from "@/components/ui/Form";

const ContactPage = () => {
  return (
    <div className="relative">
      <Header />
      <section className="min-h-screen w-full flex items-center">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 grid-cols-[1fr_1fr]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Contact us
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-m/relaxed dark:text-gray-400">
                  Need to get in touch with us? Fill in the form with your
                  enquiry and we will get back to you shortly.
                </p>
              </div>
            </div>
            <div className="mx-15">
              <Form />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactPage;