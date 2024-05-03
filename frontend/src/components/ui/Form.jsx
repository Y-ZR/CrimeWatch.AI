"use client";

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Form = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 w-full min-h-[400px] border">
      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" type="email" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700" htmlFor="subject">
            Response Type
          </label>
          <Select defaultValue="math">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="math">Request Demo</SelectItem>
              <SelectItem value="science">Get In Touch</SelectItem>
              <SelectItem value="english">Feedback / Suggestions</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700" htmlFor="questions">
            What can we help you with?
          </label>
          <Textarea
            className="w-full h-24 p-2 rounded-md border border-gray-300"
            id="questions"
            placeholder="Enter your questions here..."
          />
        </div>
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};
