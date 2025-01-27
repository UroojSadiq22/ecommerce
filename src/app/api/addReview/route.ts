import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";

// Define types for the request body
interface AddReviewRequest {
  productId: string;
  name: string;
  review: string;
  rating: number;
}

// Sanity configuration
const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  useCdn: false,
  apiVersion: "2023-01-01",
  token: process.env.SANITY_API_TOKEN || "", // Secure API token
};

// Create a Sanity client
const sanityClient = createClient(config);

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
    await sanityClient
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
