"use client";

import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { Heart, Search } from "lucide-react";
import { useCart } from "@/app/context/cart-context";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPercent?: number;
  isNew: boolean;
  colors: string[];
  sizes: string[];
  imageUrl: string;
  rating?: number;
  stock: number;
};

export default function Wishlist() {
  const { wishlistItems, getWishlistTotalItems } = useCart();
  const wishlistTotalItems = getWishlistTotalItems();
  return (
    <div className="">
      <Sheet>
        <SheetTrigger asChild>
          <Heart className="cursor-pointer" />

          {/* {wishlistTotalItems > 0 && (
            <span className="absolute md:top-8 top-11 md:right-48 right-12 bg-red-500 text-white rounded-full md:h-5 md:w-5 w-4 h-4 flex items-center justify-center">
              {wishlistTotalItems}
            </span>
          )} */}
        </SheetTrigger>
        <SheetContent
          side="right"
          className="md:p-8 pt-10 h-full flex flex-col overflow-y-auto"
        >
          <h2 className="text-xl font-extrabold my-4">Your Wishlist</h2>
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg flex flex-row"
            >
              {/* Product Image */}
              <Link href={`/productpage/${product.id}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={100}
                  height={200}
                  className="rounded-md object-cover h-[120px]"
                />
              </Link>

              {/* Product Details */}
              <div className="flex flex-col flex-1 p-4 ">
                <h1 className="font-bold text-lg text-gray-800">
                  {product.name}
                </h1>

                {/* Pricing */}
                <div className="flex items-center justify-between">
                  {product.discountPercent ? (
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-lg text-green-600">
                        $
                        {(
                          product.price -
                          (product.price * product.discountPercent) / 100
                        ).toFixed(2)}
                      </p>
                      <p className="text-sm font-bold line-through text-gray-400">
                        ${product.price.toFixed(2)}
                      </p>
                      <p className="text-xs font-bold text-red-800 bg-red-200 rounded-full px-2 py-1">
                        -{product.discountPercent}%
                      </p>
                    </div>
                  ) : (
                    <p className="font-bold text-lg text-gray-800">
                      ${product.price.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </SheetContent>
      </Sheet>
    </div>
  );
}
