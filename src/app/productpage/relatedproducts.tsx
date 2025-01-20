import Image from "next/image";
import { relatedProduct } from "@/app/data";

export default function RelatedProducts() {

   // Function to calculate the discounted price
   const getDiscountedPrice = (originalPrice: number, discount: number) => {
    return (originalPrice * (1 - discount / 100)).toFixed(2);
  };

  const renderStars = (rating: number) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;

    const stars = [
      ...Array(filledStars).fill("⭐️"), // Filled stars
      ...Array(halfStar).fill("☆"),
    ];

    return stars.join(" ");
  };

  return (
    <section className="md:p-6 flex flex-col justify-center items-center gap-10">
      <h1 className="font-integral font-extrabold md:text-5xl text-4xl my-6">YOU MIGHT ALSO LIKE</h1>
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="flex md:gap-2 md:flex-wrap md:justify-center">
          {relatedProduct.map((product, index) => (
            <div
              key={index}
              className="flex flex-col min-w-[75%] sm:min-w-[30%] md:min-w-[10%] bg-white p-4 rounded-lg"
            >
              <Image
                src={product.src}
                alt={product.alt}
                width={210}
                height={220}
              />
              <h1 className="font-bold text-sm mt-2">{product.title}</h1>
              <div className="flex items-center gap-5 my-1">
                <p className="text-xs">{renderStars(product.rating)}</p>
                <p className="text-xs">
                  {product.rating} <span className="text-gray-400">/5</span>
                </p>
              </div>
              <div className="flex items-center md:gap-4 gap-2">
                {/* Discounted price */}
                {product.discount.percentage > 0 ? (
                  <>
                    <p className="font-bold text-lg">
                      ${getDiscountedPrice(product.price, product.discount.percentage)}
                    </p>
                    <p className="text-lg font-bold line-through text-gray-400">
                      ${product.price}
                    </p>
                    <p className="text-[10px] font-bold text-red-800 bg-red-200 rounded-full p-0.5 px-3">
                      -{product.discount.percentage}%
                    </p>
                  </>
                ) : (
                  <p className="font-bold text-lg">${product.price}</p>
                )}
              
              </div>
             
            </div>
          ))}
        </div>
      </div>
     
    </section>
  );
}
