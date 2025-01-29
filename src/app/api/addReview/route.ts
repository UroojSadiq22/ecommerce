import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

// Define types for the request body
interface AddReviewRequest {
  productId: string;
  name: string;
  review: string;
  rating: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: AddReviewRequest = await request.json();

    const { productId, name, review, rating } = body;

    // Validate request data
    if (!productId || !name || !review || !rating) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const uniqueKey = `${productId}-${Date.now()}`;
    
    // Add review to the product in Sanity
    await client
      .patch(productId)
      .setIfMissing({ reviews: [] }) // Ensure the reviews field exists
      .append("reviews", [{ _key: uniqueKey, name, review, rating, datePosted: new Date().toLocaleDateString("en-CA")  }]) // Add the new review
      .commit();

    return NextResponse.json({ message: "Review added successfully!" });
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json(
      { message: "Failed to add review", error },
      { status: 500 }
    );
  }
}
