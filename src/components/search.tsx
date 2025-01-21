"use client";

import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { Search } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  discountPercent?: number;
  colors: string[];
  sizes: string[];
  imageUrl: string;
}

type SearchResults = {
  title: Product[];
  colors: Product[];
  sizes: Product[];
};

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResults>({
    title: [],
    colors: [],
    sizes: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await client.fetch(`*[_type == "products"]{
        _id, name, price, discountPercent, colors, sizes, "imageUrl": image.asset->url
      }`);
      setProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (query) {
      setSearchResults({
        title: products.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        ),
        colors: products.filter((p) =>
          p.colors.some((c) => c.toLowerCase().includes(query.toLowerCase()))
        ),
        sizes: products.filter((p) =>
          p.sizes.some((s) => s.toLowerCase().includes(query.toLowerCase()))
        ),
      });
    } else {
      setSearchResults({ title: [], colors: [], sizes: [] });
    }
  }, [query, products]);

  return (
    <div className="">
      <Sheet>
        <SheetTrigger asChild>
          <Search className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent
          side="right"
          className="md:p-8 pt-10 h-full flex flex-col overflow-y-auto"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
            className="w-full bg-gray-200 p-2 px-4 focus:outline-none rounded-3xl"
          />
          <h2 className="text-xl font-extrabold my-4">Search Results</h2>
          {Object.values(searchResults).every(
            (results) => results.length === 0
          ) ? (
            <p>No products found for &quot;{query}&quot;</p>
          ) : (
            <div className="space-y-6">
              {Object.entries(searchResults).map(
                ([category, items]) =>
                  items.length > 0 && (
                    <div key={category}>
                      <h3 className="text-lg text-gray-500 mb-2">
                        In {category}
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {items.map((product) => (
                          <SheetClose asChild key={product._id}>
                            <Link
                              href={`/productpage/${product._id}`}
                            >
                              <div className="border p-2 rounded-lg shadow-md flex gap-4">
                                <Image
                                  src={product.imageUrl}
                                  alt={product.name}
                                  width={50}
                                  height={50}
                                  className="rounded-md object-cover w-[50px] h-[50px]"
                                />
                                <div>
                                  <h3 className="font-bold line-clamp-2">
                                    {product.name}
                                  </h3>
                                  <div className="flex items-center justify-between">
                                    {product.discountPercent ? (
                                      <div className="flex items-center gap-2">
                                        <p className="font-bold text-lg text-green-600">
                                          $
                                          {(
                                            product.price -
                                            (product.price *
                                              product.discountPercent) /
                                              100
                                          ).toFixed(2)}
                                        </p>
                                        <p className="text-sm font-bold line-through text-gray-400">
                                          ${product.price.toFixed(2)}
                                        </p>
                                        <p className="text-xs font-bold text-red-800 bg-red-200 rounded-full px-2 py-1">
                                          -{product.discountPercent}%
                                        </p>
                                      </div>
                                    ) : (
                                      <p className="font-bold text-lg text-gray-800">
                                        ${product.price.toFixed(2)}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </div>
                  )
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
