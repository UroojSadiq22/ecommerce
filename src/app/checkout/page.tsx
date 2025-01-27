"use client";

import { useCart } from "../context/cart-context";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Checkout() {
    const { cartItems } = useCart();
  const [loading, setloading] = useState(false); // Loading state


  const handlePayment = async () => {
    const stripe = await stripePromise;

    if (!stripe) {
      console.error("Stripe.js has not loaded properly.");
      return;
    }

    setloading(true); // Start loading

    try {
      
      // Create a Stripe Checkout session
      const response = await fetch("/api/checkoutSession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { id } = await response.json();

      if (id) {

        // Redirect to Stripe Checkout
        const { error } = await stripe.redirectToCheckout({ sessionId: id });
        if (error) {
          console.error("Error redirecting to checkout:", error);
          setloading(false); // Stop loading on error
        }
      } else {
        console.error("No session ID returned.");
        setloading(false); // Stop loading on error
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setloading(false); // Stop loading on error
    }
  };

  return (
    <main className="max-w-3xl mx-auto pt-28 px-4 mb-14 flex flex-col gap-6 min-h-screen">
      <h1 className="font-bold text-3xl">Checkout</h1>
      <p className="text-gray-500">
        Please review your order and proceed to payment.
      </p>

      <ul className="border p-4 rounded-lg">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between mb-2">
            <span>
              {item.name} (x{item.quantity})
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <Button onClick={handlePayment} disabled={loading} className="w-full">
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </main>
  );
}
