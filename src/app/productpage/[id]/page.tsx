"use client";

import { client } from "@/sanity/lib/client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import ImagesLayout from "../imageslayout";
import TopPagepath from "@/components/top-pagepath";
import Loader from "@/components/loader";
import Reviews from "@/components/reviews";

type Product = {
  stock: number;
  rating: number;
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPercent?: number; // Matches "discountPercent" in schema
  isNew: boolean; // Matches "new" in schema
  colors: string[];
  sizes: string[];
  imageUrl: string; // Matches the alias for image URL
};

export default function ProductPage() {
  const { id } = useParams(); // Access the dynamic `id` from the URL
  const [product, setProduct] = useState<Product | null>(null); // State to store the fetched blog

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "products" && _id == $id][0]{
      _id,
      name,
      description,
      price,
      "imageUrl": image.asset->url,
      discountPercent,
      isNew,
      rating,
      colors,
      sizes,
      stock
      }`; // Fetch the blog based on the `id`
      try {
        const data: Product | null = await client.fetch(query, { id });
        setProduct(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    if (id) fetchProducts();
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  const galleryImages = [
    { src: product.imageUrl, alt: product.name },
    // Additional images can be added if available
  ];

  const paths = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "" },

    { label: product.name, href: `/product/${product._id}` },
  ];
  return (
    <div className="max-w-7xl mx-auto md:px-14 px-2 py-8 md:pt-28 pt-24 min-h-screen flex flex-col">
      <div>
        <TopPagepath items={paths} />
      </div>

      <ImagesLayout
        id={product._id}
        galleryImages={galleryImages}
        title={product.name}
        description={product.description}
        originalPrice={product.price}
        discount={product.discountPercent}
        rating={product.rating}
        colors={product.colors}
        sizes={product.sizes}
        stock={product.stock}
      />

        <Reviews id={product._id} />
      
    </div>
  );
}
