// // "use client";

// // import { Search } from "lucide-react";

// // export default function Searchbar() {
// //   return (
// //     <>
// //       <div className="md:w-[25rem] flex justify-start items-center px-2 md:bg-gray-200 text-black rounded-3xl">
// //       <Search size={20} className="md:opacity-50 cursor-pointer" />
// //       <input
// //           placeholder="Search for products..."
// //           className="hidden md:block bg-gray-200 p-2 focus-within:outline-none"
// //         />

// //       </div>
// //     </>
// //   );
// // }
// "use client";

// import { useState } from "react";
// import { Search } from "lucide-react";
// import { useRouter } from "next/navigation";

// export default function Searchbar() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const router = useRouter();

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     if (query.trim()) {
//       router.push(`/search?q=${query}`);
//     } else {
//       router.push(`/`); // Redirect to home or default page if query is empty
//     }
//   };

//   return (
//     <div className="md:w-[25rem] flex justify-start items-center px-2 md:bg-gray-200 text-black rounded-3xl">
//       <Search size={20} className="md:opacity-50 cursor-pointer" />
//       <input
//         type="text"
//         value={searchQuery}
//         onChange={handleSearch}
//         placeholder="Search for products..."
//         className="w-full bg-gray-200 p-2 focus:outline-none rounded-3xl"
//       />
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResponsiveSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showInput, setShowInput] = useState(false);

  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      router.push(`/search?q=${query}`);
    } else {
      router.push(`/`); // Redirect to home or default page if query is empty
    }
  };

  const handleClose = () => {
    setSearchQuery("");
    setShowInput(false)
  };

  const toggleInput = () => {
    setShowInput((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Search Icon */}
      <div className="flex items-center px-2 md:bg-gray-200 text-black rounded-3xl">
        <Search
          size={20}
          className="cursor-pointer md:opacity-50"
          onClick={toggleInput}
        />
        {/* Input field for desktop screens */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for products..."
          className="hidden lg:block w-full bg-gray-200 p-2 focus:outline-none rounded-3xl"
        />
      </div>

      {/* Fullscreen input field for small screens */}
      {showInput && (
        <div className="absolute -top-4 -right-24 min-w-full bg-white p-2 shadow-lg z-50">
          <div className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search for products..."
              className="max-w-[80%] p-2 focus:outline-none rounded-3xl bg-gray-200"
            />
            <button
              className="ml-2 text-sm text-gray-500"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
