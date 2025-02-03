"use client";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "@/app/context/cart-context";
import TopPagepath from "@/components/top-pagepath";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Wishlist() {
  const paths = [
    { label: "Home", href: "/" },
    { label: "Wishlist", href: "/wishlist" },
  ];

  const { wishlistItems, removeWishlistItem, clearWishlist } = useCart();

  return (
    <main className="max-w-7xl mx-auto min-h-screen md:pt-28 pt-28 md:px-12 px-4 mb-14 flex flex-col ">
      <TopPagepath items={paths} />

      <motion.h1
        initial="hidden"
        animate="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
        }}
        className="font-integral font-extrabold text-4xl md:my-4 my-2"
      >
        Your Wishlist
      </motion.h1>

      {wishlistItems.length === 0 ? (
        <div className="text-gray-200 mt-10 flex flex-col justify-center items-center">
          <ShoppingBag className=" w-[10rem] h-[10rem]" />
          <h1 className="text-2xl font-bold">Your wishlist is empty</h1>
        </div>
      ) : (
        <div>
          <div className=" pt-10 h-full md:grid md:grid-cols-2 flex flex-col gap-8">
            {wishlistItems.map((product) => (
              <div
                key={product.id}
                className="bg-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg flex flex-row"
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

                <button
                  className="text-red-500 lg:p-4"
                  onClick={() => removeWishlistItem(product.id)}
                >
                  <X />
                </button>
              </div>
            ))}
          </div>
          <Button
            onClick={clearWishlist}
            variant="outline"
            className="mt-6 relative overflow-hidden group transition-all duration-300 ease-in-out md:px-14 p-6 rounded-3xl text-black bg-gray-200 hover:text-white"
          >
            <span className="absolute inset-0 bg-black transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
            <h1 className="relative z-10 flex items-center md:gap-8 gap-4">
              Clear Wishlist
            </h1>
          </Button>
        </div>
      )}
    </main>
  );
}
