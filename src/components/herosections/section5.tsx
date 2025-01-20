
"use client";

import React, { useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "../ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Customers() {
  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      review:
        "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
      rating: 5.0,
    },
    {
      id: 2,
      name: "Alex K.",
      review:
        "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
      rating: 5.0,
    },
    {
      id: 3,
      name: "James L.",
      review:
        "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
      rating: 5.0,
    },
  ];

  const [api, setApi] = useState<CarouselApi>();
 

  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));


  const renderStars = (rating: number) => {
    const filledStars = Math.floor(rating);
    return Array.from({ length: filledStars }, () => "⭐️").join(" ");
  };

  return (
    <section className="p-6 my-10 flex flex-col justify-center items-center gap-10">
      <div className=" w-full flex md:justify-around justify-center items-center md:gap-40">
        <h1 className="font-integral font-extrabold md:text-5xl text-3xl my-6">OUR HAPPY CUSTOMERS</h1>
        <div className="flex md:gap-6 gap-2">
          <button
            className="cursor-pointer"
            onClick={() => api && api.scrollPrev()}
          >
            <ArrowLeft />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => api && api.scrollNext()}
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{ align: "center", loop: true }}
        className="w-full max-w-md rounded-lg shadow-2xl"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {reviews.map((review) => (
            <CarouselItem
              key={review.id}
              className="w-[22rem] rounded-lg p-10"
            >
              <p className="text-xs">{renderStars(review.rating)}</p>
              <h1 className="font-bold text-lg my-2">
                {review.name} <span className="text-sm">✅</span>
              </h1>
              <p className="text-xs text-gray-400">{review.review}</p>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
