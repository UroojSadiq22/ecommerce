import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";


import { SlidersVertical } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Filters from "../../components/filters";

export default function CasualLayoutImages(){
    const onsale = [
        {
          id: 0,
          src: "/casual1.png",
          alt: "Gradient Graphic T-shirt",
          title: "Gradient Graphic T-shirt",
          rating: 3.5,
          originalPrice: 145,
        },
        {
          id: 1,
          src: "/casual2.png",
          alt: "Polo with Tipping Details",
          title: "Polo with Tipping Details",
          rating: 4.5,
          originalPrice: 180,
        },
    
        {
          id: 2,
          src: "/casual3.png",
          alt: "Black Stripped T-shirt",
          title: "Black Stripped T-shirt",
          rating: 5.0,
          originalPrice: 150,
          discount: 30,
        },
        {
          id: 3,
          src: "/arrival2.png",
          alt: "Skinny Fit Jeans",
          title: "Skinny Fit Jeans",
          rating: 3.5,
          originalPrice: 260,
          discount: 20,
        },
        {
          id: 4,
          src: "/arrival3.png",
          alt: "Checkered Shirt",
          title: "Checkered Shirt",
          rating: 4.5,
          originalPrice: 180,
        },
        {
          id: 5,
          src: "/arrival4.png",
          alt: "Sleeve Striped T-shirt",
          title: "Sleeve Striped T-shirt",
          rating: 4.5,
          originalPrice: 160,
          discount: 30,
        },
        {
          id: 6,
          src: "/topselling1.png",
          alt: "Vertical Striped Shirt",
          title: "Vertical Striped Shirt",
          rating: 5.0,
          originalPrice: 232,
          discount: 20, // Discount in percentage
        },
        {
          id: 7,
          src: "/topselling2.png",
          alt: "Courage Graphic T-shirt",
          title: "Courage Graphic T-shirt",
          rating: 4.0,
          originalPrice: 145,
        },
        {
          id: 8,
          src: "/topselling3.png",
          alt: "Loose Fit Bermuda Shorts",
          title: "Loose Fit Bermuda Shorts",
          rating: 3.0,
          originalPrice: 80,
        },
      ];
    
      const renderStars = (rating: number) => {
        const filledStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    
        const stars = [
          ...Array(filledStars).fill("⭐️"), // Filled stars
          ...Array(halfStar).fill("☆"),
        ];
    
        return stars.join(" ");
      };
    
      // Function to calculate the discounted price
      const getDiscountedPrice = (originalPrice: number, discount: number) => {
        return (originalPrice * (1 - discount / 100)).toFixed(2);
      };
    
    return(
        <div className="flex flex-col justify-center md:mx-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-semibold text-2xl md:my-4 my-2">Casual</h1>

            <div className="flex items-center gap-2">
              <p className="text-gray-400 md:text-lg text-xs">
                Showing 1-10 of 100 Products
              </p>
              {/* <h1 className="hidden md:block text-xs">
                Sort by: <Combobox />
              </h1> */}
            </div>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <SlidersVertical />
                </SheetTrigger>

                <SheetContent
                  side="bottom"
                  className="h-[70%] rounded-t-3xl pt-8 overflow-y-auto"
                >
                  <Filters />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="md:grid lg:grid-cols-3 flex flex-col items-center md:gap-0 gap-4">
            {onsale.map((product, index) => (
              <div key={index} className="bg-white mb-6 rounded-lg">
                <Image
                  src={product.src}
                  alt={product.alt}
                  width={250}
                  height={220}
                />
                <h1 className="font-bold text-sm mt-2">{product.title}</h1>
                <div className="flex items-center gap-5 my-1">
                  <p className="text-xs">{renderStars(product.rating)}</p>
                  <p className="text-xs">
                    {product.rating} <span className="text-gray-400">/5</span>
                  </p>
                </div>
                <div className="flex items-center md:gap-4 gap-2">
                  {/* Discounted price */}
                  {product.discount ? (
                    <>
                      <p className="font-bold text-lg">
                        $
                        {getDiscountedPrice(
                          product.originalPrice,
                          product.discount
                        )}
                      </p>
                      <p className="text-lg font-bold line-through text-gray-400">
                        ${product.originalPrice}
                      </p>
                      <p className="text-[10px] font-bold text-red-800 bg-red-200 rounded-full p-0.5 px-3">
                        -{product.discount}%
                      </p>
                    </>
                  ) : (
                    <p className="font-bold text-lg">
                      ${product.originalPrice}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Pagination>
            <PaginationContent className=" border-t py-4 flex justify-between w-full">
              <PaginationItem className=" border-2 rounded-xl">
                <PaginationPrevious href="#" />
              </PaginationItem>

              <div className="flex">
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>

                <PaginationItem className="hidden md:block">
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem className="hidden md:block">
                  <PaginationLink href="#">8</PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink href="#">9</PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink href="#">10</PaginationLink>
                </PaginationItem>
              </div>

              <PaginationItem className=" border-2 rounded-xl">
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
    )
}