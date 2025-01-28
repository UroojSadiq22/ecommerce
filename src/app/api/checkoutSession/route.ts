import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia", // Make sure to update this as needed
});

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  discountPercent?: number;
  rating?: number;
  color?: string | null;
  size?: string | null;
  stock: number;
};

type CartItem = Product & {
  quantity: number;
};

export async function POST(req: Request) {
  try {
    const { cartItems } = await req.json();
      // Create a Checkout session with items (use your actual product details)
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: cartItems.map((product:CartItem) => ({
          price_data: {
            currency: "usd", // Choose the correct currency
            product_data: {
              name: product.name, // Product name
            },
            unit_amount: Math.round(product.price * 100),  // Amount in cents (e.g., $20.00)
          },
          quantity: product.quantity,
          
        }
      )) ,
         
        mode: "payment", // Use "payment" for one-time purchases
        success_url: process.env.NODE_ENV === "production"
        ? "https://urooj-sadiq-ecommerce.vercel.app/success"
        : "http://localhost:3000/success",
        cancel_url: "https://urooj-sadiq-ecommerce.vercel.app/cart",
        
      });


      return NextResponse.json({ id: session.id });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      return NextResponse.json({ error: "message" }, { status: 500 });
    }
  }
