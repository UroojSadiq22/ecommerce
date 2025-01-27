"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "../context/cart-context";
import { Slide, toast } from "react-toastify";

type ImagesLayoutProps = {
  id: string;
  galleryImages: { src: string; alt: string }[];
  title: string;
  description: string;
  originalPrice: number;
  discount?: number;
  rating: number;
  colors: string[];
  sizes: string[];
  stock: number;
};

export default function ImagesLayout({
  id,
  galleryImages,
  title,
  description,
  originalPrice,
  discount,
  rating,
  colors,
  sizes,
  stock,
}: ImagesLayoutProps) {
  const getDiscountedPrice = (originalPrice: number, discount: number) => {
    return (originalPrice * (1 - discount / 100)).toFixed(2);
  };

  const renderStars = (rating: number) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;

    const stars = [
      ...Array(filledStars).fill("⭐️"), // Filled stars
      ...Array(halfStar).fill("☆"),
    ];

    return stars.join(" ");
  };

  const { cartItems, addItem } = useCart();

  const handleAddToCart = () => {
    const existingItem = cartItems.find((item) => item.id === id);

    if (existingItem) {
      // Show a toast message when the item already exists in the cart
      toast.info("This item is already in the cart!", {
        position: "bottom-left", // Use a string for the position
        autoClose: 3000,
        transition: Slide,
      });
    } else {
      addItem({
        id: id, // Example unique ID based on the title
        name: title,
        price: originalPrice, // Ensure the price is a number
        image: galleryImages[0].src,
        discountPercent: discount || 0,
        rating,
        color: selectedColor, // Pass selected color
        size: selectedSize,
        stock,
      });

      toast.success("Item added to the cart!", {
        position: "bottom-right", // Use a string for the position
        autoClose: 3000,
        transition: Slide, // Optional transition effect
      });
    }
  };

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <main className="flex lg:flex-row flex-col mt-4">
      {/* <div className="grid md:grid-cols-[1fr,4fr] grid-cols-1 gap-4 mb-4"> */}
      {/* <div className="flex md:flex-col items-center gap-2  order-2 md:order-none">
          {galleryImages.map((i, index) => (
            <div
              key={index}
              className={`rounded-xl cursor-pointer ${
                selectedImage === i.src ? "border-4 border-black" : ""
              }`}
              onClick={() => setSelectedImage(i.src)}
            >
              <Image
                src={i.src}
                alt={i.alt}
                width={180}
                height={180}
                className="rounded-md"
              />
            </div>
          ))}
        </div> */}
      <div className="flex md:flex-row flex-col items-center">
        <div className="w-full h-full bg-gray-200 rounded-lg shadow-lg">
          <Image
            src={galleryImages[0].src}
            alt={galleryImages[0].alt}
            width={700}
            height={500}
            className="rounded-md "
          />
        </div>
        {/* </div> */}

        <div className="md:px-6 w-full">
          <div className="flex flex-col gap-2 border-b-2 pb-4">
            {/* Discounted price */}
            <h1 className="font-integral font-extrabold lg:text-3xl text-2xl">
              {title}
            </h1>
            <div className="flex items-center gap-4">
              <p className="text-xs">{renderStars(rating)}</p>
              <p className="text-xs">
                {rating} <span className="text-gray-400">/5</span>
              </p>
            </div>

            <div className="flex gap-4 items-center">
              {discount ? (
                <>
                  <p className="font-bold text-xl">
                    ${getDiscountedPrice(originalPrice, discount || 0)}
                  </p>
                  <p className="text-xl font-bold line-through text-gray-400">
                    ${originalPrice}
                  </p>
                  <p className="text-xs font-bold text-red-800 bg-red-200 rounded-full p-0.5 px-3">
                    -{discount}%
                  </p>
                </>
              ) : (
                <p className="font-bold text-lg">${originalPrice}</p>
              )}
            </div>
            <p className="md:text-sm text-xs text-gray-400">{description}</p>
          </div>
        </div>
      </div>

      <div className="w-full">
        <h1 className="text-base my-2">Select Colors</h1>
        <div className="flex gap-4 border-b-2 pb-4">
          {colors.map((color, index) => (
            <div
              key={index}
              className="w-10 h-10 rounded-full cursor-pointer relative"
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)} // Set selected color
            >
              {selectedColor === color && (
                <span className="absolute top-[12%] right-[14%] text-white text-xl">
                  ✔️
                </span> // Tick mark
              )}
            </div>
          ))}
        </div>

        <h1 className="text-base my-2">Choose Size</h1>
        <div className="flex md:gap-4 gap-2 border-b-2 pb-4">
          {sizes.map((size, index) => (
            <Button
              key={index}
              variant="outline"
              className={`relative overflow-hidden group transition-all duration-300 ease-in-out px-6 py-2 rounded-3xl text-black hover:text-white ${
                selectedSize === size
                  ? "bg-blue-500 text-white border-2 border-blue-500" // Change background color and text color when selected
                  : "bg-gray-200 text-black hover:bg-gray-300" // Default background and hover color
              }`}
              onClick={() => setSelectedSize(size)} // Set selected size
            >
              <span
                className={`absolute inset-0 bg-black transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100 ${
                  selectedSize === size ? "scale-x-100" : ""
                }`}
              ></span>
              <h1 className="relative z-10 flex items-center gap-2">{size}</h1>
            </Button>
          ))}
        </div>

        <div className="flex md:gap-4 gap-2 pt-4">
          <Button
            variant="outline"
            className="relative overflow-hidden group transition-all duration-300 ease-in-out md:px-10 px-6 py-2 rounded-3xl text-black bg-gray-200 hover:text-white"
          >
            <span className="absolute inset-0 bg-black transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
            <h1 className="relative z-10 flex items-center md:gap-8 gap-4">
              <p className="font-bold text-xl">-</p>
              <p className="text-sm">1</p>
              <p className="font-bold text-xl">+</p>
            </h1>
          </Button>
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className="relative w-full overflow-hidden group transition-all duration-300 ease-in-out px-6 py-2 rounded-3xl text-black bg-gray-200 hover:text-white"
          >
            <span className="absolute inset-0 bg-black transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
            <h1 className="relative z-10 flex items-center gap-2">
              Add to Cart
            </h1>
          </Button>
        </div>
      </div>
    </main>
  );
}
