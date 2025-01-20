// "use client";

// import { client } from "@/sanity/lib/client";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// type Product = {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   discountPercent?: number;
//   isNew: boolean;
//   colors: string[];
//   sizes: string[];
//   imageUrl: string;
//   rating?: number;
// };

// export default function Search() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [searchResults, setSearchResults] = useState<Product[]>([]);
//   const searchParams = useSearchParams();
//   const query = searchParams.get("q") || "";

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const query = `*[_type == "products"]{
//         _id,
//         name,
//         description,
//         price,
//         "imageUrl": image.asset->url,
//         discountPercent,
//         isNew,
//         colors,
//         sizes
//       }`;
//       const data = await client.fetch(query);
//       setProducts(data);
//       setSearchResults(data); // Initially set searchResults to all products
//     };
//     fetchProducts();
//   }, []);

//   // Update search results when the query changes
//   useEffect(() => {
//     if (query) {
//       const filteredProducts = products.filter((product) =>
//         product.name.toLowerCase().includes(query.toLowerCase())
//       );
//       setSearchResults(filteredProducts);
//     } else {
//       setSearchResults(products);
//     }
//   }, [query, products]); // Re-run filtering whenever products or query change

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold">Search Results</h2>
//       {searchResults.length === 0 ? (
//         <p>No products found for "{query}"</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {searchResults.map((product) => (
//             <div key={product._id} className="border p-4 rounded-lg shadow-md">
//               <h3 className="font-bold">{product.name}</h3>
//               <p>{product.description}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPercent?: number;
  isNew: boolean;
  colors: string[];
  sizes: string[];
  imageUrl: string;
  rating?: number;
};

export default function Search() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<{
    title: Product[];
    colors: Product[];
    sizes: Product[];
  }>({ title: [], colors: [], sizes: [] });
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

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
        sizes
      }`;
      const data = await client.fetch(query);
      setProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (query) {
      const filteredResults = {
        title: products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        ),
        colors: products.filter((product) =>
          product.colors.some((color) =>
            color.toLowerCase().includes(query.toLowerCase())
          )
        ),
        sizes: products.filter((product) =>
          product.sizes.some((size) =>
            size.toLowerCase().includes(query.toLowerCase())
          )
        ),
      };
      setSearchResults(filteredResults);
    } else {
      setSearchResults({ title: [], colors: [], sizes: [] });
    }
  }, [query, products]);

  return (
    <div className="md:p-8 p-4 md:pt-28 pt-32">
      <h2 className="text-xl font-extrabold font-integral mb-4">
        Search Results
      </h2>
      {Object.values(searchResults).every((results) => results.length === 0) ? (
        <p>No products found for "{query}"</p>
      ) : (
        <div className="space-y-6">
          {searchResults.title.length > 0 && (
            <div>
              <h3 className="text-lg text-gray-500 mb-2">In Title</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {searchResults.title.map((product) => (
                  <Link key={product._id} href={`/productpage/${product._id}`}>
                    <div className="border p-2 rounded-lg shadow-md flex gap-4 flex-1 h-[100px]">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-md object-cover w-[50px] h-[50px]"
                      />
                      <div>
                        <h3 className="font-bold">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          {product.discountPercent ? (
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-lg text-green-600">
                                $
                                {(
                                  product.price -
                                  (product.price * product.discountPercent) /
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
                ))}
              </div>
            </div>
          )}

          {searchResults.colors.length > 0 && (
            <div>
              <h3 className="text-lg text-gray-500 mb-2">In Colors</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {searchResults.colors.map((product) => (
                  <Link key={product._id} href={`/productpage/${product._id}`}>
                    <div className="border p-2 rounded-lg shadow-md flex gap-4 flex-1 h-[100px]">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-md object-cover w-[50px] h-[50px]"
                      />
                      <div>
                        <h3 className="font-bold">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          {product.discountPercent ? (
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-lg text-green-600">
                                $
                                {(
                                  product.price -
                                  (product.price * product.discountPercent) /
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
                ))}
              </div>
            </div>
          )}

          {searchResults.sizes.length > 0 && (
            <div>
              <h3 className="text-lg text-gray-500 mb-2">In Sizes</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {searchResults.sizes.map((product) => (
                  <Link key={product._id} href={`/productpage/${product._id}`}>
                    <div className="border p-2 rounded-lg shadow-md flex gap-4 flex-1 h-[100px]">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-md object-cover w-[50px] h-[50px]"
                      />
                      <div>
                        <h3 className="font-bold">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          {product.discountPercent ? (
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-lg text-green-600">
                                $
                                {(
                                  product.price -
                                  (product.price * product.discountPercent) /
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
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
