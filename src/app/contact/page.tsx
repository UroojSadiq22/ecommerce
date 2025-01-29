import { Button } from "@/components/ui/button";
import { Headset, Mail, MessageCircleMore } from "lucide-react";
import React from "react";

export default function CustomerSupport() {
  return (
    <main className="min-h-screen max-w-7xl mx-auto md:pt-28 pt-28 md:px-12 px-4 flex flex-col ">
      <h1 className="font-integral font-extrabold md:text-4xl text-3xl text-center md:mb-10 mb-6">
        Customer Support
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl">
          <p className="text-gray-600 text-center mb-6 lg:text-base text-sm">
            We&apos;re here to assist you with any questions or concerns you may
            have. Please fill out the form below with your issue and our support
            team will get back to you as soon as possible.
          </p>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Enter the subject"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Describe your issue or question"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                required
              ></textarea>
            </div>

            <div className="flex justify-center mt-6">
              <Button
                variant="outline"
                className="relative w-full overflow-hidden group transition-all duration-300 ease-in-out md:px-10 p-6 rounded-3xl text-white bg-black hover:text-black"
              >
                <span className="absolute inset-0 bg-gray-200 transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
                <h1 className="relative z-10 flex items-center md:gap-8 gap-4">
                  Submit Request
                </h1>
              </Button>
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:h-36 bg-gray-100 p-6 rounded-lg shadow-md">
            <Mail className="text-gray-500 md:w-10 md:h-10 w-20 h-20" />
            <div>
              <h3 className="text-xl font-semibold">Email Support</h3>
              <p className="text-gray-700 text-sm lg:text-base">
                For any inquiries, feel free to reach us at{" "}
                <a href="mailto:support@shop.com" className="text-blue-500">
                  support@shop.com
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center md:h-36 bg-gray-100 p-6 rounded-lg shadow-md">
            <MessageCircleMore className="text-gray-500 w-20 h-20" />
            <div>
              <h3 className="text-xl font-semibold">
                Live Chat{" "}
                <span className="text-xs text-gray-400">(coming soon)</span>
              </h3>
              <p className="text-gray-700 text-sm lg:text-base">
                Need immediate assistance? Chat with our support team in
                real-time by clicking the chat icon at the bottom right of your
                screen.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center md:h-36 bg-gray-100 p-6 rounded-lg shadow-md">
            <Headset className="text-gray-500 w-20 h-20" />
            <div>
              <h3 className="text-xl font-semibold">Availability</h3>
              <p className="text-gray-700 text-sm lg:text-base">
                Our customer support team is available Monday to Friday, from 9
                AM to 6 PM. We aim to respond to all inquiries within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-12">
        <h2 className="text-2xl font-semibold">FAQs</h2>
        <p className="text-gray-700">
          For faster solutions, check out our{" "}
          <a href="/faqs" className="text-blue-500">
            Frequently Asked Questions (FAQ)
          </a>{" "}
          page where you&apos;ll find answers to common queries.
        </p>
      </div>
    </main>
  );
}
