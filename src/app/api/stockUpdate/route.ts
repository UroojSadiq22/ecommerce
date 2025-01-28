// import { client } from "@/sanity/lib/client";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {

//   try {
//     const { cartItems } = await req.json();

//     for (const item of cartItems) {
//       const productId = item.id;

//       // Fetch the current stock from Sanity
//       const product = await client.fetch(
//         `*[_type == "products" && _id == $id][0]{stock}`,
//         { id: productId }
//       );

//       if (!product || product.stock === undefined) {
//         return NextResponse.json({ error: `Product with ID ${productId} not found` });
//       }

//       const newStock = product.stock - item.quantity;

//       if (newStock < 0) {
//         return NextResponse.json({ error: `Insufficient stock for product ID ${productId}` });
//       }

//       // Update the stock in Sanity
//       await client.patch(productId).set({ stock: newStock }).commit();
//     }

//     NextResponse.json({ message: "Stock updated successfully!" });
//   } catch (error) {
//     console.error("Error updating stock:", error);
//     NextResponse.json({ error: "Internal server error" });
//   }
// }
import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { cartItems } = await req.json();

    for (const item of cartItems) {
      const productId = item.id;

      // Fetch the current stock from Sanity
      const product = await client.fetch(
        `*[_type == "products" && _id == $id][0]{stock}`,
        { id: productId }
      );

      if (!product || product.stock === undefined) {
        return NextResponse.json({ error: `Product with ID ${productId} not found` }, { status: 404 });
      }

      const newStock = product.stock - item.quantity;

      if (newStock < 0) {
        return NextResponse.json({ error: `Insufficient stock for product ID ${productId}` }, { status: 400 });
      }
      const inStock = newStock > 0;
      // Update the stock in Sanity
      await client.patch(productId).set({ stock: newStock, Instock: inStock }).commit();
    }

    return NextResponse.json({ message: "Stock updated successfully!" });
  } catch (error) {
    console.error("Error updating stock:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
