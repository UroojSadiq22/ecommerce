import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ellipsis, SlidersVertical } from "lucide-react";
import { reviews } from "@/app/data";

export default function Reviews() {
  // const reviews = [
  //   {
  //     id: 0,
  //     name: "Samantha D.",
  //     review:
  //       "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  //     rating: 4.5,
  //     datePosted: "August 14, 2023",
  //   },
  //   {
  //     id: 1,
  //     name: "Alex M.",
  //     review:
  //       "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  //     rating: 4.0,
  //     datePosted: "August 15, 2023",
  //   },
  //   {
  //     id: 2,
  //     name: "Ethan R.",
  //     review:
  //       "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  //     rating: 3.5,
  //     datePosted: "August 16, 2023",
  //   },
  //   {
  //     id: 3,
  //     name: "Olivia P.",
  //     review:
  //       "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  //     rating: 4.0,
  //     datePosted: "August 17, 2023",
  //   },
  //   {
  //     id: 3,
  //     name: "Liam K.",
  //     review:
  //       "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  //     rating: 4.0,
  //     datePosted: "August 18, 2023",
  //   },
  //   {
  //     id: 3,
  //     name: "Ava H.",
  //     review:
  //       "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  //     rating: 4.5,
  //     datePosted: "August 19, 2023",
  //   },
  // ];
  const renderStars = (rating: number) => {
    const filledStars = Math.floor(rating);
    return Array.from({ length: filledStars }, () => "⭐️").join(" ");
  };
  return (
    <Tabs defaultValue="reviews" className="md:mt-16 mt-10 w-full md:max-w-[90%]">
      <TabsList className="grid md:w-full grid-cols-3 bg-white onfocus:border-b">
        <TabsTrigger value="details">Product Details</TabsTrigger>
        <TabsTrigger value="reviews">Rating & Reviews</TabsTrigger>
        <TabsTrigger value="faqs">FAQs</TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="flex flex-col items-center">
        <div className="font-bold text-2xl">Working in progress....</div>
      </TabsContent>
      <TabsContent value="reviews" className="flex flex-col items-center">
        <div className="flex justify-between items-center w-full my-6">
          <h1 className="font-bold md:text-xl">
            All Reviews{" "}
            <span className="md:text-base text-xs font-normal text-gray-500">(451)</span>
          </h1>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="transition-all duration-300 ease-in-out p-2 rounded-full text-black bg-gray-300 hover:bg-gray-500"
            >
              <SlidersVertical/>
            </Button>
            <Button
              variant="outline"
              className="hidden md:block relative overflow-hidden group transition-all duration-300 ease-in-out px-6 py-2 rounded-3xl text-black bg-gray-200  hover:text-white"
            >
              <span className="absolute inset-0 bg-black transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
              <h1 className="relative z-10 flex items-center gap-2">Latest</h1>
            </Button>
            <Button
              variant="outline"
              className="relative overflow-hidden group transition-all duration-300 ease-in-out md:px-6 py-2 rounded-3xl text-black md:text-base text-xs bg-gray-200  hover:text-white"
            >
              <span className="absolute inset-0 bg-black transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
              <h1 className="relative z-10">
                Write a Review
              </h1>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 lg:mx-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className=" border-2 rounded-xl px-10 py-6 flex"
            >
              <div>
                <p className="text-xs">{renderStars(review.rating)}</p>
                <h1 className="font-bold text-lg my-2">
                  {review.name} <span className="text-sm">✅</span>
                </h1>
                <p className="text-xs text-gray-400">{review.review}</p>
                <p className="text-sm text-gray-700 mt-4">
                  {review.datePosted}
                </p>
              </div>
              <Ellipsis size={40} strokeWidth={3} />
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          className="relative overflow-hidden group transition-all duration-300 ease-in-out md:px-16 px-10 py-6 my-6 rounded-3xl text-black"
        >
          <span className="absolute inset-0 bg-gray-400 transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
          <h1 className="relative z-10 font-bold flex items-center gap-2">
            Load More Reviews
          </h1>
        </Button>
      </TabsContent>

      <TabsContent value="faqs" className="flex flex-col items-center">
        <div className="font-bold text-2xl">Working in progress....</div>
      </TabsContent>
    </Tabs>
  );
}
