// "use client";

// import { useCart } from "../context/cart-context";
// import { Button } from "@/components/ui/button";
// import { loadStripe } from "@stripe/stripe-js";
// import { useState } from "react";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );

// export default function Checkout() {
//   const { cartItems, clearCart } = useCart();
//   const [loading, setloading] = useState(false); // Loading state

//   const handlePayment = async () => {
//     const stripe = await stripePromise;

//     if (!stripe) {
//       console.error("Stripe.js has not loaded properly.");
//       return;
//     }

//     setloading(true);

//     try {
//       const stockUpdateResponse = await fetch("/api/stockUpdate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ cartItems }),
//       });

//       if (stockUpdateResponse.ok) {
//         console.log("Stock updated successfully");
//         clearCart(); // Clear the cart
//       } else {
//         const { error } = await stockUpdateResponse.json();
//         console.error("Failed to update stock:", error);
//       }

//       setloading(false); // Stop loading

//       // Create a Stripe Checkout session
//       const response = await fetch("/api/checkoutSession", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ cartItems }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create checkout session");
//       }

//       const { id } = await response.json();

//       if (id) {
//         // Redirect to Stripe Checkout
//         const { error } = await stripe.redirectToCheckout({ sessionId: id });
//         if (error) {
//           console.error("Error redirecting to checkout:", error);
//           setloading(false); // Stop loading on error
//         }
//       } else {
//         console.error("No session ID returned.");
//         setloading(false); // Stop loading on error
//       }
//     } catch (error) {
//       console.error("Checkout error:", error);
//       setloading(false); // Stop loading on error
//     }
//   };

//   return (
//     <main className="max-w-3xl mx-auto pt-28 px-4 mb-14 flex flex-col gap-6 min-h-screen">
//       <h1 className="font-bold text-3xl">Checkout</h1>
//       <p className="text-gray-500">
//         Please review your order and proceed to payment.
//       </p>

//       <ul className="border p-4 rounded-lg">
//         {cartItems.map((item) => (
//           <li key={item.id} className="flex justify-between mb-2">
//             <span>
//               {item.name} (x{item.quantity})
//             </span>
//             <span>${(item.price * item.quantity).toFixed(2)}</span>
//           </li>
//         ))}
//       </ul>

//       <Button onClick={handlePayment} disabled={loading} className="w-full">
//         {loading ? "Processing..." : "Pay Now"}
//       </Button>
//     </main>
//   );
// }
"use client";

import { useCart } from "../context/cart-context";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  // Shipping form state
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    phone: "",
    addressLine1: "",
    cityLocality: "",
    stateProvince: "",
    postalCode: "",
    countryCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.error("Stripe.js has not loaded properly.");
      return;
    }

    setLoading(true);

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

      // Create a Stripe Checkout session
      const response = await fetch("/api/checkoutSession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems, shippingDetails }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { id } = await response.json();

      if (id) {
        localStorage.setItem(
          "shippingDetails",
          JSON.stringify(shippingDetails)
        );
        const { error } = await stripe.redirectToCheckout({ sessionId: id });
        if (error) console.error("Error redirecting to checkout:", error);
      } else {
        console.error("No session ID returned.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen max-w-7xl mx-auto md:pt-28 pt-28 pb-10 md:px-12 px-4 ">
      <motion.h1
        initial="hidden"
        animate="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
        }}
        className="font-integral font-extrabold md:text-4xl text-3xl"
      >
        Checkout
      </motion.h1>
      <p className="text-gray-500">
        Please enter your shipping details and proceed to payment.
      </p>

      <div className="flex flex-col-reverse lg:flex-row items-start gap-6 my-10">
        {/* Shipping Details Form */}
        <motion.form
          initial="hidden"
          animate="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
          }}
          className="border p-4 rounded-lg space-y-4 w-full shadow-xl"
        >
          {[
            "name",
            "phone",
            "addressLine1",
            "cityLocality",
            "stateProvince",
            "postalCode",
            "countryCode",
          ].map((field) => (
            <div key={field}>
              <input
                type="text"
                name={field}
                value={shippingDetails[field as keyof typeof shippingDetails]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full p-3 border rounded-md shadow-sm focus:ring focus:ring-indigo-400"
                required
              />
            </div>
          ))}
        </motion.form>

        {/* Cart Items Summary */}
        <div className="border p-4 rounded-lg w-full bg-gray-100">
          <h2 className="font-bold text-2xl">Order Summary</h2>
          <ul className="mt-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between mb-2">
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Button
        onClick={handlePayment}
        disabled={loading}
        variant="outline"
        className="md:w-auto w-full relative overflow-hidden group transition-all duration-300 ease-in-out md:px-16 p-6 rounded-3xl text-white bg-black hover:text-black"
      >
        <span className="absolute inset-0 bg-gray-200 transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
        <h1 className="relative z-10 flex items-center md:gap-8 gap-4">
          {loading ? "Processing..." : "Pay Now"}
        </h1>
      </Button>
    </main>
  );
}
