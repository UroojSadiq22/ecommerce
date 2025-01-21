"use client"
import Image from "next/image";
import CountUp from "react-countup";
import Section1 from "./herosections/section1";
import Section2 from "./herosections/section2";
import Section3 from "./herosections/section3";
import Section4 from "./herosections/section4";
import Section5 from "./herosections/section5";
import Link from "next/link";

const stats = [
  {
    id:0,
    num: 200,
    text: "International Brands",
  },
  {
    id:1,

    num: 2000,
    text: "High-Quality Products",
  },
  {
    id:2,
    num: 30000,
    text: "Happy Customers",
  },
];
export default function Hero() {
  
  return (
    <>
      <section className="w-full h-full overflow-x-hidden bg-gray-100 md:pt-10 pt-20">
        <div className="flex lg:flex-row-reverse flex-col-reverse justify-around border-l-2">
            <div className="relative z-20">
            <Image
            src="/cover1.jpg"
            alt="cover"
            width={400}
            height={160}
            className="w-full"
          />
          <Image
            src="/star.png"
            alt="cover"
            width={60}
            height={50}
            className="absolute animate-pulse top-24 right-5"
          />
          <Image
            src="/star.png"
            alt="cover"
            width={40}
            height={30}
            className="absolute animate-pulse md:bottom-72 bottom-32 left-0"
          />
            </div>
         
          <div className="flex flex-col justify-start w-full lg:w-[50%] gap-6 md:mt-32 mt-6 md:p-10 p-4">
            <h1 className="font-integral font-extrabold md:text-6xl text-5xl">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>
            <p>
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individulity and cater to your sense of
              style
            </p>
            <Link
              href="/onsale"
              className="md:w-[15rem] w-full relative overflow-hidden group bg-black transition-all duration-300 ease-in-out px-4 py-4 rounded-3xl text-white"
            >
              <span className="absolute inset-0 bg-gray-400 transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
              <h1 className="relative z-10 font-bold flex justify-center gap-2">
                Shop Now
              </h1>
            </Link>
            <div className="md:hidden grid grid-cols-2  gap-4 m-4">
              {stats.map((item) => {
                return (
                  <>
                     <div
                    key={item.id}
                    className={`flex flex-col justify-center ${item.id === 0 ? "pr-2 border-r-2" : ""} ${item.id === 2 ? "col-span-2" : ""}`}
                  >
                    <CountUp
                      end={item.num}
                      duration={5}
                      delay={2}
                      suffix="+"
                      className="text-3xl font-bold"
                    />
                    
                    <p className="leading-snug text-gray-400 lg:text-md text-xs">
                      {item.text}
                    </p>
                     {/* <div className="w-0.5 h-8 bg-gray-900"></div> */}
                  </div>
                 
                  </>
               
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </>
  );
}
