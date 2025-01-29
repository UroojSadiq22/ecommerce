"use client"
import { Button } from "@/components/ui/button";
import { Facebook, Github, Instagram, Mail, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const payments = [
  { src: "/Visa.png", alt: "visa" },
  { src: "/Mastercard.png", alt: "master card" },
  { src: "/Paypal.png", alt: "paypal" },
  { src: "/ Pay.png", alt: ".pay" },
  { src: "/G Pay.png", alt: "google pay" },
];

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <section className="bg-black md:w-[80%] w-[90%] rounded-lg flex lg:flex-row flex-col justify-between absolute z-20 left-1/2 transform -translate-x-1/2 py-6 md:px-8 px-4">
        <h1 className="font-integral font-extrabold md:text-4xl lg:mb-0 mb-6 text-white text-3xl lg:w-[50%]">
          STAY UP TO DATE ABOUT OUR LATEST OFFERS
        </h1>
        <div className="flex flex-col gap-4 w-full max-w-sm items-center">
          <div className="md:w-[24rem] flex justify-start items-center px-2 bg-white text-black rounded-3xl">
            <Mail size={20} className="opacity-50 cursor-pointer" />
            <input
              type="email"
              placeholder="Enter your email address"
              className="p-2 rounded-md"
            />
          </div>
          <Button
            variant="outline"
            className="relative w-full rounded-3xl overflow-hidden group transition-all duration-300 ease-in-out px-4 py-2"
          >
            <span className="absolute inset-0 bg-gray-400 transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
            <h1 className="relative z-10 flex items-center gap-2">
              Subscribe to Newsletter
            </h1>
          </Button>
        </div>
      </section>
      <main className="flex flex-col justify-center md:p-14 p-4 relative bottom-0 left-0 right-0 z-10 lg:h-[70%] bg-gray-200 md:mt-24 mt-48">
        <div className="flex md:flex-row flex-col justify-around items-center lg:gap-0 gap-8">
          <div className="flex flex-col lg:mt-20 mt-40 md:w-[25%] w-[80%] md:justify-center md:items-start items-center md:gap-6 gap-2">
            <div className="text-3xl font-bold">
              <h1 className="font-integral font-extrabold text-4xl">SHOP.CO</h1>
            </div>
            <p className="text-xs md:text-start text-center">
              We have clothes that suits your style and which you&apos;re proud
              to wear. From women to men.
            </p>

            <div className="flex gap-4 list-none border border-transparent">
              <li className="lg:p-2 p-1 bg-white hover:bg-black cursor-pointer hover:text-white rounded-full border border-black transition-colors duration-300 ease-in-out">
                <Twitter />
              </li>

              <li className="lg:p-2 p-1 bg-white hover:bg-black cursor-pointer hover:text-white rounded-full border border-black transition-colors duration-300 ease-in-out">
                <Facebook />
              </li>
              <li className="lg:p-2 p-1 bg-white hover:bg-black cursor-pointer hover:text-white rounded-full border border-black transition-colors duration-300 ease-in-out">
                <Instagram />
              </li>

              <li className="lg:p-2 p-1 bg-white hover:bg-black cursor-pointer hover:text-white rounded-full border border-black transition-colors duration-300 ease-in-out">
                <Github />
              </li>
            </div>
          </div>

          <div className="lg:flex lg:flex-row grid grid-cols-2 lg:gap-24 md:mt-28 mt-8">
            <div className="flex flex-col justify-center">
              <h1 className="font-bold text-xl md:mb-8 mb-6">Company</h1>
              <div className="flex flex-col gap-2 ">
                <Link href="/about">
                  <p className="cursor-pointer hover:text-gray-400" onClick={handleScrollToTop}>
                    About
                  </p>
                </Link>
                <p className="cursor-pointer hover:text-gray-400">Features</p>
                <p className="cursor-pointer hover:text-gray-400">Works</p>
                <p className="cursor-pointer hover:text-gray-400">Resources</p>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="font-bold text-xl md:mb-8 mb-6">Help</h1>
              <div className="flex flex-col gap-2 ">
                <Link href="/contact">
                  <p className="cursor-pointer hover:text-gray-400" onClick={handleScrollToTop}>
                    {" "}
                    Customer Support
                  </p>
                </Link>
                <Link href="/faqs">
                  <p className="cursor-pointer hover:text-gray-400" onClick={handleScrollToTop}>FAQ</p>
                </Link>

                <p className="cursor-pointer hover:text-gray-400">
                  Terms & Conditions
                </p>
                <p className="cursor-pointer hover:text-gray-400">
                  Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center m-6 mt-10 text-sm flex flex-col justify-center items-center">
          <div className="w-full h-0.5 bg-gray-500 m-4"></div>
          <div className="w-full flex md:flex-row flex-col justify-between items-center md:gap-0 gap-4">
            <div>
              <p>Shop.co © 2000-2023, All Rights Reserved.</p>
            </div>

            <div className="flex flex-row justify-center items-center gap-2">
              {payments.map((i, index) => (
                <div
                  key={index}
                  className="bg-white w-14 h-8 flex items-center justify-center rounded-xl"
                >
                  <Image src={i.src} alt={i.alt} width={40} height={40} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
