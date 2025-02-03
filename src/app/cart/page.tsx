"use client";

import TopPagepath from "../../components/top-pagepath";
import { ShoppingBag, Tag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/cart-context";
import Image from "next/image";
import { Slide, toast } from "react-toastify";
import Link from "next/link";
import { motion } from "framer-motion";

// Make sure to replace this with your Stripe publishable key
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Cart() {
  const paths = [
    { label: "Home", href: "/" },
    { label: "Cart", href: "/cart" },
  ];
  const { cartItems, removeItem, incrementItem, decrementItem, clearCart } =
    useCart();

    const handleIncrement = (id: string) => {
      const item = cartItems.find((cartItem) => cartItem.id === id);
    
      if (item) {
        if (item.quantity < item.stock) {
          incrementItem(id);
          toast.success("Item added successfully!", {
            position: "bottom-right",
            autoClose: 3000,
            transition: Slide,
          });
        } else {
          toast.error("Cannot add more items. Stock limit reached!", {
            position: "bottom-right",
            autoClose: 3000,
            transition: Slide,
          });
        }
      }
    };
    
  
    const handleDecrement = (id:string , quantity:number) => {
      if (quantity > 1) {
        decrementItem(id);
        toast.error("Item removed successfully!", {
          position: "bottom-right",
          autoClose: 3000,
          transition: Slide,
        });
      } else {
        removeItem(id);
    };
   }
  // Calculate prices
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.1; // 10% discount
  const deliveryCharges = 200; // Free delivery if subtotal > 100
  const total = subtotal - discount + deliveryCharges;

  // const [loading, setLoading] = useState(false);

  // const handleCheckout = async () => {
  //   setLoading(true);

  //   // Call your backend to create a checkout session
  //   const res = await fetch("/api/checkoutSession", {
  //     method: "POST",
  //   });

  //   const { id } = await res.json();

  //   // Redirect to Stripe Checkout
  //   const stripe = await stripePromise;
  //   const { error } = await stripe!.redirectToCheckout({ sessionId: id });

  //   if (error) {
  //     console.error("Error redirecting to checkout:", error);
  //   }

  //   setLoading(false);
  // };

  return (
    <main className="max-w-7xl mx-auto md:pt-28 pt-28 md:px-12 px-4 mb-14 flex flex-col ">
      <TopPagepath items={paths} />

      <motion.h1
        initial="hidden"
        animate="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
        }} className="font-integral font-extrabold text-4xl md:my-4 my-2">
        Your Cart
      </motion.h1>

      <div className="grid md:grid-cols-2 grid-cols-1 items-start gap-4">
        <div className="border-2 rounded-lg bg-gray-100">
          <div className="flex flex-col md:gap-2 md:flex-wrap md:justify-center">
            {cartItems.length === 0 ? (
              <div className="text-gray-200 flex justify-center items-center">
                <ShoppingBag className=" w-[10rem] h-[10rem]"/>
              </div>
            ) : (
              <div className="md:p-2">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between p-2"
                  >
                    <div className="flex gap-2">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={120}
                        height={120}
                      />
                      <div>
                        <h1 className="font-semibold max-w-[120px] md:text-xl text-lg lg:max-w-none lg:whitespace-normal lg:overflow-visible truncate">
                          {item.name}
                        </h1>
                        <p className=" max-w-[120px] lg:max-w-none lg:whitespace-normal lg:overflow-visible truncate">
                          Color: <span className="text-gray-500"> {item.color}</span>
                        </p>  
                        <p className=" max-w-[120px] lg:max-w-none lg:whitespace-normal lg:overflow-visible truncate">
                          Size: <span className="text-gray-500"> {item.size}</span>
                        </p> 


                        {/* {item.discount ? (
                          <>
                            <p className="text-lg">
                              $
                              {(
                                item.price -
                                (item.price * item.discount) / 100
                              ).toFixed(2)}
                            </p>
                            <div className="flex gap-4 items-center">
                              <p className="text-lg font-bold line-through text-gray-400">
                                ${item.price}
                              </p>
                              <p className="text-[10px] font-bold text-red-800 bg-red-200 rounded-full p-0.5 px-3">
                                -{item.discount}%
                              </p>
                            </div>
                          </>
                        ) : (
                          <p className="text-lg">${item.price}</p>
                        )} */}
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between h-[7rem]">
                      <button
                        className="text-red-500 lg:p-4"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 />
                      </button>
                      <Button
                        variant="outline"
                        className="relative overflow-hidden group transition-all duration-300 ease-in-out md:px-10 px-6 py-2 rounded-3xl text-black bg-gray-200 hover:text-white"
                      >
                        <span className="absolute inset-0 bg-black transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
                        <h1 className="relative z-10 flex items-center md:gap-8 gap-4">
                          <p
                            className="font-bold text-xl"
                            onClick={() => handleDecrement(item.id , item.quantity)}
                          >
                            -
                          </p>
                          <p className="text-sm">{item.quantity}</p>
                          <p
                            className="font-bold text-xl"
                            onClick={() => handleIncrement(item.id)}
                          >
                            +
                          </p>
                        </h1>
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  onClick={clearCart}
                  variant="outline"
                  className="m-2 relative overflow-hidden group transition-all duration-300 ease-in-out md:px-10 px-6 py-2 rounded-3xl text-black bg-gray-200 hover:text-white"
                >
                  <span className="absolute inset-0 bg-black transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
                  <h1 className="relative z-10 flex items-center md:gap-8 gap-4">
                    Clear Cart
                  </h1>
                </Button>
              </div>
            )}
          </div>
        </div>

        <motion.div
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
            }} className="flex flex-col md:mx-4 p-6 border-2 rounded-lg shadow-xl">
          <h1 className="font-bold text-lg mb-4">Order Summary</h1>
          <div className="flex justify-between">
            <h1>Subtotal</h1>
            <h1>${subtotal.toFixed(2)}</h1>
          </div>

          <div className="flex justify-between">
            <h1>Discount</h1>
            <h1>-${discount.toFixed(2)}</h1>
          </div>

          <div className="flex justify-between border-b-2 pb-4">
            <h1>Delivery Charges</h1>
            <h1>${deliveryCharges.toFixed(2)}</h1>
          </div>

          <div className="flex justify-between pt-4">
            <h1>Total</h1>
            <h1>${total.toFixed(2)}</h1>
          </div>

          <div className="flex md:gap-4 gap-2 py-4">
            <div className="md:w-[25rem] flex justify-start items-center px-4 md:bg-gray-200 text-black rounded-3xl">
              <Tag size={20} className="md:opacity-50 cursor-pointer" />
              <input
                placeholder="Search for products..."
                className="hidden md:block bg-gray-200 w-full p-2 focus-within:outline-none"
              />
            </div>

            <Button
              variant="outline"
              className="relative overflow-hidden group transition-all duration-300 ease-in-out md:px-10 px-6 py-2 rounded-3xl text-black bg-gray-200 hover:text-white"
            >
              <span className="absolute inset-0 bg-black transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
              <h1 className="relative z-10 flex items-center md:gap-8 gap-4">
                Apply
              </h1>
            </Button>
          </div>
          <Link
            href="/checkout"
            className="relative w-full overflow-hidden group transition-all duration-300 ease-in-out px-6 py-2 rounded-3xl text-black bg-gray-200 hover:text-white"
          >
            <span className="absolute inset-0 bg-black transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
            <h1 className="relative z-10 flex items-center gap-2">
               Go to Checkout
            </h1>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
