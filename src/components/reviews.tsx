import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { Slide, toast } from "react-toastify";
import { motion } from "framer-motion";

interface Review {
  id: string;
  name: string;
  review: string;
  rating: number;
  datePosted: string;
}

export default function Reviews({ id }: { id: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    name: "",
    review: "",
    rating: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const renderStars = (rating: number) => {
    const filledStars = Math.floor(rating);
    return Array.from({ length: filledStars }, () => "⭐️").join(" ");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating: number) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async () => {
    if (!newReview.name || !newReview.review || !newReview.rating) {
      toast.info("Please fill in all fields!", {
        position: "bottom-right",
        autoClose: 3000,
        transition: Slide,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/addReview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: id,
          ...newReview,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message, {
          position: "bottom-right",
          autoClose: 3000,
          transition: Slide,
        });

        setReviews((prev) => [
          {
            id: String(Date.now()),
            name: newReview.name,
            review: newReview.review,
            rating: newReview.rating,
            datePosted: new Date().toLocaleDateString("en-CA"),
          },
          ...prev,
        ]);
        setNewReview({ name: "", review: "", rating: 0 });
      } else {
        toast.error(result.message, {
          position: "bottom-right",
          autoClose: 3000,
          transition: Slide,
        });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }

    setIsSubmitting(false);
  };

  // Fetch reviews from Sanity on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const query = `*[_type == "products" && _id == $productId]{
          reviews[] {
            _key,
            name,
            review,
            rating,
            datePosted
          }
        }`;

        const data = await client.fetch(
          query,
          { productId: id },
          { cache: "no-store" }
        );

        if (data.length > 0) {
          setReviews(data[0].reviews || []);
        } else {
          console.error("No reviews found for this product.");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [id]);

  return (
    <div className="my-6">
      {/* Input Form for New Review */}
      <motion.div
        initial="hidden"
        animate="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
        }}
        className="my-4 p-6 border rounded-lg"
      >
        <h2 className="text-lg font-bold mb-4">Write a Review</h2>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={newReview.name}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded-md"
        />
        <textarea
          name="review"
          placeholder="Your Review"
          value={newReview.review}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              onClick={() => handleRatingChange(i)}
              className={`text-2xl mb-4 ${
                i <= newReview.rating ? "text-yellow-500" : "text-gray-400"
              }`}
            >
              ★
            </button>
          ))}
        </div>
        <Button
          variant="outline"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="relative overflow-hidden group transition-all duration-300 ease-in-out md:px-6 py-6 rounded-3xl text-black md:text-base text-xs bg-gray-200 hover:text-white"
        >
          <span className="absolute inset-0 bg-black transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
          <h1 className="relative z-10">
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </h1>
        </Button>
      </motion.div>

      <motion.h1
        initial="hidden"
        animate="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: 70 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        }}
        className="font-bold md:text-xl lg:my-8 my-2"
      >
        All Reviews{" "}
        <span className="md:text-base text-xs font-normal text-gray-500">
          ({reviews.length})
        </span>
      </motion.h1>
      {/* Render Reviews */}
      <motion.div
        initial="hidden"
        animate="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
        }}
        className="grid md:grid-cols-2 gap-4"
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-2 rounded-xl shadow-lg flex justify-between"
          >
            <div className="p-4 lg:px-8">
              <p className="text-sm text-gray-400">{review.datePosted}</p>
              <p className="text-xs my-2">{renderStars(review.rating)}</p>
              <h1 className="font-bold">
                {review.name} <span className="text-sm">✅</span>
              </h1>
              <p className=" text-gray-700">{review.review}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
