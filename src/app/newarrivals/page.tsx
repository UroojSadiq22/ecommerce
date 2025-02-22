"use client";

import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import Cards from "@/components/cards";
import Loader from "@/components/loader";
import TopPagepath from "@/components/top-pagepath";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersVertical } from "lucide-react";
import Filters from "@/components/filters";
import PaginationComponent from "@/components/paginationcomponent";
import { motion } from "framer-motion";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPercent?: number; // Matches "discountPercent" in schema
  isNew: boolean; // Matches "new" in schema
  colors: string[];
  sizes: string[];
  wearfor: "men" | "women" | "kids";
  imageUrl: string; // Matches the alias for image URL
  stock: number;
  Instock: boolean;
};

export default function Newarrivals() {
  const paths = [
    { label: "Home", href: "/" },
    { label: "New arrivals", href: "" },
  ];

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedWearFor, setSelectedWearFor] = useState<
    ("men" | "women" | "kids")[]
  >([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<
    [number, number]
  >([0, 500]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Update items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 768 ? 3 : 6);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          rating,
          colors,
          sizes,
          wearfor,
          stock,
          Instock
        }`;
      const data = await client.fetch(query);

      const itemsIsNew = data.filter(
        (product: Product) => product.isNew === true
      );

      setProducts(itemsIsNew); // Set discounted products
      setFilteredProducts(itemsIsNew); // Initial display
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const sizeMatch =
        selectedSizes.length === 0 ||
        selectedSizes.some((size) => product.sizes.includes(size));
      const colorMatch =
        selectedColors.length === 0 ||
        selectedColors.some((color) => product.colors.includes(color));
      const priceMatch =
        product.price >= selectedPriceRange[0] &&
        product.price <= selectedPriceRange[1];
      const wearForMatch =
        selectedWearFor.length === 0 ||
        selectedWearFor.includes(product.wearfor);

      return sizeMatch && colorMatch && priceMatch && wearForMatch;
    });

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page when filters change
  }, [
    products,
    selectedSizes,
    selectedColors,
    selectedPriceRange,
    selectedWearFor,
  ]);

  // Paginate products
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const noProductsFound = filteredProducts.length === 0;

  return (
    <main className="min-h-screen max-w-7xl mx-auto md:pt-28 pt-28 md:px-12 px-4 flex flex-col ">
      <div>
        <TopPagepath items={paths} />
      </div>

      <motion.h1
        initial="hidden"
        animate="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
        }}
        className="my-4 font-integral text-2xl font-extrabold"
      >
        Step Into Style: New Arrivals!
      </motion.h1>

      {/* <ImagesLayout /> */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <SlidersVertical />
          </SheetTrigger>

          <SheetContent
            side="bottom"
            className="h-[70%] rounded-t-3xl pt-8 overflow-y-auto"
          >
            <Filters
              selectedSizes={selectedSizes}
              setSelectedSizes={setSelectedSizes}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              selectedPriceRange={selectedPriceRange}
              setSelectedPriceRange={setSelectedPriceRange}
              selectedWearFor={selectedWearFor}
              setSelectedWearFor={setSelectedWearFor}
            />
          </SheetContent>
        </Sheet>
      </div>

      <div>
        {products.length > 0 ? (
          <div className="lg:grid lg:grid-cols-[3fr,9fr] gap-2 mt-4 items-start">
            <div className="hidden lg:block border-2 p-4 rounded-2xl">
              <Filters
                selectedSizes={selectedSizes}
                setSelectedSizes={setSelectedSizes}
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
                selectedPriceRange={selectedPriceRange}
                setSelectedPriceRange={setSelectedPriceRange}
                selectedWearFor={selectedWearFor}
                setSelectedWearFor={setSelectedWearFor}
              />
            </div>
            <div className="flex flex-col gap-4 items-center">
              {noProductsFound && (
                <div className="text-center text-red-500 font-bold my-4 h-[40rem]">
                  No products match the selected filters.
                </div>
              )}
              <Cards products={paginatedProducts} />
              <PaginationComponent
                currentPage={currentPage}
                totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>

      {/* 
      <div>
        <RelatedProducts />
      </div> */}
    </main>
  );
}
