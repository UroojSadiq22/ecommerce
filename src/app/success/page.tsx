"use client"
import { ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useCart } from "../context/cart-context";
import { useEffect } from "react";

export default function Success() {
  const { cartItems, clearCart } = useCart();

  useEffect(() => {
    const updateStockAndClearCart = async () => {
      if (cartItems.length === 0) return; // Prevent unnecessary API calls

      try {
        const stockUpdateResponse = await fetch("/api/stockUpdate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartItems }),
        });

        if (stockUpdateResponse.ok) {
          console.log("Stock updated successfully");
          clearCart();
        } else {
          const { error } = await stockUpdateResponse.json();
          console.error("Failed to update stock:", error);
        }
      } catch (error) {
        console.error("Error updating stock:", error);
      }
    };

    updateStockAndClearCart();
  }, [cartItems, clearCart]); // Runs once when the component mounts
  
  return (
    <div className="min-h-screen flex flex-col gap-8 justify-center items-center bg-gradient-to-br from-gray-100 via-gray-300 to-gray-400">
      <ThumbsUp size={48} color="#fbc913" strokeWidth={3} />
      <div className="flex flex-col items-center">
        <h1 className="md:text-2xl text-xl font-bold">
          Thank you for your purchase!
        </h1>
        <p className="md:text-lg text-sm text-gray-700">
          Your payment has been successfully processed.
        </p>
      </div>

      <Link
        href="/newarrivals"
        className="relative overflow-hidden group transition-all duration-300 ease-in-out px-8 py-4 rounded-3xl text-black bg-gray-200 hover:text-white"
      >
        <span className="absolute inset-0 bg-black transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
        <h1 className="relative z-10 flex items-center gap-2">
          Continue Shopping
        </h1>
      </Link>

      <Link
        href="/trackingshipment"
        className="relative overflow-hidden group transition-all duration-300 ease-in-out px-8 py-4 rounded-3xl text-black bg-gray-200 hover:text-white"
      >
        <span className="absolute inset-0 bg-black transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
        <h1 className="relative z-10 flex items-center gap-2">
          Tracking Shipment
        </h1>
      </Link>
    </div>
  );
}
