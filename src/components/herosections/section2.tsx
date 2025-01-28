import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Cards from "../cards";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPercent?: number; // Matches "discountPercent" in schema
  isNew: boolean; // Matches "new" in schema
  colors: string[];
  sizes: string[];
  imageUrl: string; // Matches the alias for image URL
  rating?: number; // Optional field
  stock: number;
  Instock: boolean;
};

export default function Arrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "products"]{
        _id,
  name,
  description,
  price,
  "imageUrl": image.asset->url,
  discountPercent,
  isNew,
  colors,
  sizes,
  rating,
  wearfor,
  stock,
  Instock
       }`;
      const data = await client.fetch(query);

      const itemsIsNew = data.filter(
        (product: Product) => product.isNew === true
      );
      const topFourProducts = itemsIsNew.slice(0, 3);

      setProducts(data);
      setFilteredProducts(topFourProducts);
    };

    fetchProducts();
  }, []);

  return (
    <section className="md:p-6 flex flex-col justify-center items-center gap-10 border-b-2">
      <h1 className="font-integral font-extrabold md:text-5xl text-4xl my-6">
        NEW ARRIVALS
      </h1>

      <div className="overflow-x-auto scrollbar-hide">
        {products.length > 0 ? <Cards products={filteredProducts} /> : ""}
      </div>

      <Link
        href="/newarrivals"
        className="mb-10 border-2 relative overflow-hidden group transition-all duration-300 ease-in-out px-14 py-2 rounded-3xl text-black"
      >
        <span className="absolute inset-0 bg-gray-400 transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
        <h1 className="relative z-10 font-bold flex items-center gap-2">
          View All
        </h1>
      </Link>
    </section>
  );
}
