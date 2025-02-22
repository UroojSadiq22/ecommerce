// // "use client"
// // import React, { createContext, useContext, useState, ReactNode } from "react";

// // // Define types for product and cart item
// // type Product = {
// //   id: string;
// //   name: string;
// //   price: number;
// //   image: string;
// //   discountPercent?: number; // Changed to discountPercent for consistency
// //   rating?: number;
// //   color?: string | null; // Add color to the item
// //   size?: string | null; // Add size to the item
// // };

// // type CartItem = Product & {
// //   quantity: number; // Quantity of the product in the cart
// // };

// // type CartContextType = {
// //   cartItems: CartItem[];
// //   addItem: (product: Product) => void;
// //   incrementItem: (id:string) => void;
// //   decrementItem: (id:string) => void;
// //   removeItem: (id: string) => void;
// //   clearCart: () => void;
// //   getTotalItems: () => number;
// // };

// // // Create the context
// // const CartContext = createContext<CartContextType | undefined>(undefined);

// // // Provider component to wrap the app
// // export const CartProvider = ({ children }: { children: ReactNode }) => {
// //   const [cartItems, setCartItems] = useState<CartItem[]>([]);

// //   const addItem = (product: Product) => {
// //     setCartItems((prevItems) => {
// //       // Check if the product already exists in the cart
// //       const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);
      
// //       if (existingItemIndex !== -1) {
// //         // If item already in cart, update the quantity
// //         const updatedItems = [...prevItems];
// //         updatedItems[existingItemIndex].quantity += 1;  // Increase quantity by 1
// //         return updatedItems;
// //       }
  
// //       // If item not in cart, add a new item with quantity of 1
// //       return [...prevItems, { ...product, quantity: 1 }];
// //     });
// //   };
  

// //   const incrementItem = (id:string) => {
// //     setCartItems((prevItems) =>
// //       prevItems.map((item) =>
// //         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
// //       )
// //     );
// //   };

// //   const decrementItem = (id:string) => {
// //     setCartItems((prevItems) =>
// //       prevItems.map((item) =>
// //         item.id === id && item.quantity > 1
// //           ? { ...item, quantity: item.quantity - 1 }
// //           : item
// //       )
// //     );
// //   };

// //   const removeItem = (id: string) => {
// //     setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
// //   };

// //   const clearCart = () => {
// //     setCartItems([]);
// //   };


// //   const getTotalItems = () => {
// //     return cartItems.reduce((total, item) => total + item.quantity, 0);
// //   };

// //   return (
// //     <CartContext.Provider value={{ cartItems, addItem, incrementItem, decrementItem, removeItem, clearCart, getTotalItems }}>
// //       {children}
// //     </CartContext.Provider>
// //   );
// // };

// // // Custom hook to access the cart context
// // export const useCart = (): CartContextType => {
// //   const context = useContext(CartContext);
// //   if (!context) {
// //     throw new Error("useCart must be used within a CartProvider");
// //   }
// //   return context;
// // };

// "use client";
// import React, { createContext, useContext, useState, ReactNode } from "react";

// // Define types for product, cart, and wishlist items
// type Product = {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   discountPercent?: number;
//   rating?: number;
//   color?: string | null;
//   size?: string | null;
//   stock: number;
// };

// type CartItem = Product & {
//   quantity: number;
// };

// type WishlistItem = Product;

// type CartContextType = {
//   cartItems: CartItem[];
//   addToWishlist: (product: Product) => void;
//   wishlistItems: WishlistItem[];
//   addItem: (product: Product) => void;
//   incrementItem: (id: string) => void;
//   decrementItem: (id: string) => void;
//   removeItem: (id: string) => void;
//   clearCart: () => void;
//   getTotalItems: () => number;
//   getWishlistTotalItems: () => number;
//   clearWishlist: () => void;
//   removeWishlistItem: (id: string) => void;
// };

// // Create the context
// const CartContext = createContext<CartContextType | undefined>(undefined);

// // Provider component to wrap the app
// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

//   // Load cart and wishlist from localStorage on mount
//   useEffect(() => {
//     const storedCart = localStorage.getItem("cartItems");
//     const storedWishlist = localStorage.getItem("wishlistItems");

//     if (storedCart) {
//       setCartItems(JSON.parse(storedCart));
//     }
//     if (storedWishlist) {
//       setWishlistItems(JSON.parse(storedWishlist));
//     }
//   }, []);

//   // Save cart and wishlist to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   useEffect(() => {
//     localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
//   }, [wishlistItems]);

  
//   const addItem = (product: Product) => {
//     if (product.stock <= 0) {
//       // Add to wishlist if out of stock
//       setWishlistItems((prev) => {
//         const exists = prev.find((item) => item.id === product.id);
//         return exists ? prev : [...prev, product];
//       });
//       return;
//     }
  
//     // Add to cart if the product is in stock
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find((item) => item.id === product.id);
  
//       if (existingItem) {
//         // Increment quantity if stock permits
//         if (existingItem.quantity < product.stock) {
//           return prevItems.map((item) =>
//             item.id === product.id
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           );
//         }
//       } else {
//         // Add a new item to the cart
//         return [...prevItems, { ...product, quantity: 1 }];
//       }
  
//       return prevItems;
//     });
  
//     // Reduce stock for the product
//     product.stock -= 1;
//   };

//   const incrementItem = (id: string) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id && item.stock > item.quantity
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//     );
//   };

//   const decrementItem = (id: string) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   const addToWishlist = (product: Product) => {
//     setWishlistItems((prev) => {
//       const exists = prev.find((item) => item.id === product.id);
//       return exists ? prev : [...prev, product];
//     });
//   };

//   const removeItem = (id: string) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   const getTotalItems = () => {
//     return cartItems.reduce((total, item) => total + item.quantity, 0);
//   };

//   const getWishlistTotalItems = () => {
//     return wishlistItems.length
//   };

//   const removeWishlistItem = (id: string) => {
//     setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   const clearWishlist = () => {
//     setWishlistItems([]);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToWishlist,
//         wishlistItems,
//         addItem,
//         incrementItem,
//         decrementItem,
//         removeItem,
//         clearCart,
//         getTotalItems,
//         getWishlistTotalItems,
//         clearWishlist,
//         removeWishlistItem
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Custom hook to access the cart context
// export const useCart = (): CartContextType => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };
"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define types for product, cart, and wishlist items
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  discountPercent?: number;
  rating?: number;
  color?: string | null;
  size?: string | null;
  stock: number;
};

type CartItem = Product & {
  quantity: number;
};

type WishlistItem = Product;

type CartContextType = {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  addToWishlist: (product: Product) => void;
  addItem: (product: Product) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getWishlistTotalItems: () => number;
  clearWishlist: () => void;
  removeWishlistItem: (id: string) => void;
};

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component to wrap the app
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // Load cart & wishlist from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    const savedWishlist = localStorage.getItem("wishlistItems");
  
    if (savedCart) setCartItems(JSON.parse(savedCart) || []);
    if (savedWishlist) setWishlistItems(JSON.parse(savedWishlist) || []);
  }, []);

  // Save cart & wishlist to localStorage when they change
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);
  
  useEffect(() => {
    if (wishlistItems.length > 0) {
      localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
    }
  }, [wishlistItems]);
  

  const addItem = (product: Product) => {
    if (product.stock <= 0) {
      addToWishlist(product);
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          return prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }

      return prevItems;
    });
  };

  const incrementItem = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.stock > item.quantity
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementItem = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const addToWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      return exists ? prev : [...prev, product];
    });
  };

  const removeItem = (id: string) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getWishlistTotalItems = () => {
    return wishlistItems.length;
  };

  const removeWishlistItem = (id: string) => {
    setWishlistItems((prevItems) => {
      const updatedWishlistItems = prevItems.filter((item) => item.id !== id);
      localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlistItems));
      return updatedWishlistItems;
    });
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    localStorage.removeItem("wishlistItems");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToWishlist,
        addItem,
        incrementItem,
        decrementItem,
        removeItem,
        clearCart,
        getTotalItems,
        getWishlistTotalItems,
        clearWishlist,
        removeWishlistItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
