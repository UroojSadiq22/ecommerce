// import Link from "next/link";
// import Image from "next/image";
// import { Button } from "./ui/button";
// import { ShoppingCart } from "lucide-react";
// import { useCart } from "@/app/context/cart-context";
// import { Slide, toast } from "react-toastify"; // Import toastify for notifications

// type Product = {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   discountPercent?: number; // Matches "discountPercent" in schema
//   isNew: boolean; // Matches "new" in schema
//   colors: string[];
//   sizes: string[];
//   imageUrl: string; // Matches the alias for image URL
//   rating?: number; // Optional field
// };

// type CardsProps = {
//   products: Product[]; // Accept products as a prop
// };

// export default function Cards({ products }: CardsProps) {
//   const { cartItems, addItem } = useCart();

//   const handleAddToCart = (product: Product) => {
//     const existingItem = cartItems.find((item) => item.id === product._id);

//     if (existingItem) {
//       // Show a toast message when the item already exists in the cart
//       toast.info("This item is already in the cart!", {
//         position: "top-center",
//         autoClose: 3000,
//         transition: Slide,
//       });
//     } else {
//       addItem({
//         id: product._id, // Rename _id to id
//       name: product.name,
//       price: product.price,
//       image: product.imageUrl, // Rename imageUrl to image
//       discountPercent: product.discountPercent, // Keep this as it matches
//       rating: product.rating, // Include if needed in the cart
//       });

//       toast.success("Item added to the cart!", {
//         position: "top-center",
//         autoClose: 3000,
//         transition: Slide,
//       });
//     }
//   };

//   return (
//     <div className="w-[80%] mx-auto md:grid lg:grid-cols-3 md:grid-cols-2 flex flex-col items-center md:gap-0 gap-4">
//       {products.map((product) => (
//         <div key={product._id} className=" mb-8 rounded-lg p-4">
//           <Link href={`/productpage/${product._id}`}>
//             <Image
//               src={product.imageUrl}
//               alt={product.name}
//               width={250}
//               height={220}
//               className="rounded-md object-cover"
//             />
//           </Link>
//           <div className="flex justify-between">
//             <div>
//               <h1 className="font-bold text-sm mt-2">{product.name}</h1>
//               <div className="flex items-center gap-5 my-1">
//                 {product.rating && <p className="text-xs">⭐ {product.rating}/5</p>}
//               </div>
//             </div>

//             <Button
//               onClick={() => handleAddToCart(product)}
//               variant="outline"
//               className="m-2 relative overflow-hidden group transition-all duration-300 ease-in-out py-2 rounded-3xl text-black bg-gray-200 hover:text-white"
//             >
//               <span className="absolute inset-0 bg-black transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
//               <h1 className="relative z-10 flex items-center md:gap-8 gap-4">
//                 <ShoppingCart size={18} />
//               </h1>
//             </Button>
//           </div>

//           <div className="flex items-center md:gap-4 gap-2">
//             {/* Discounted price */}
//             {product.discountPercent ? (
//               <>
//                 <p className="font-bold text-lg">
//                   $
//                   {(
//                     product.price -
//                     (product.price * product.discountPercent) / 100
//                   ).toFixed(2)}
//                 </p>
//                 <p className="text-lg font-bold line-through text-gray-400">
//                   ${product.price.toFixed(2)}
//                 </p>
//                 <p className="text-[10px] font-bold text-red-800 bg-red-200 rounded-full p-0.5 px-3">
//                   -{product.discountPercent}%
//                 </p>
//               </>
//             ) : (
//               <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/cart-context";
import { Slide, toast } from "react-toastify";

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

type CardsProps = {
  products: Product[];
};

export default function Cards({ products }: CardsProps) {
  const { cartItems, addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product._id);

    if (existingItem) {
      toast.info("This item is already in the cart!", {
        position: "bottom-right",
        autoClose: 3000,
        transition: Slide,
      });
    } else {
      addItem({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        discountPercent: product.discountPercent,
        rating: product.rating,
      });

      toast.success("Item added to the cart!", {
        position: "bottom-right",
        autoClose: 3000,
        transition: Slide,
      });
    }
  };

  return (
    <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg flex flex-col"
        >
          {/* Product Image */}
          <Link href={`/productpage/${product._id}`}>
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={300}
              height={300}
              className="rounded-md object-cover w-full h-[300px]"
            />
          </Link>

          {/* Product Details */}
          <div className="flex flex-col flex-1 mt-4 p-4 ">
            <h1 className="font-bold text-lg text-gray-800">{product.name}</h1>

            {product.rating && (
              <p className="text-sm text-gray-500 mt-1">⭐ {product.rating}/5</p>
            )}

            {/* Pricing */}
            <div className="flex items-center justify-between">
              {product.discountPercent ? (
                <div className="flex items-center gap-2">
                  <p className="font-bold text-lg text-green-600">
                    $
                    {(
                      product.price -
                      (product.price * product.discountPercent) / 100
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

          {/* Add to Cart Button */}
          <Button
            onClick={() => handleAddToCart(product)}
            className=" w-full py-2 flex items-center justify-center text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ShoppingCart size={20} className="mr-2" />
            Add to Cart
          </Button>
        </div>
      ))}
    </div>
  );
}
