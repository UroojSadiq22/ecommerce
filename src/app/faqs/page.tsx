import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    category: "Shipping & Delivery",
    items: [
      {
        question: "How long does shipping take?",
        answer:
          "Shipping times vary depending on your location and chosen method. Standard shipping takes 5-7 business days.",
      },
      {
        question: "Do you offer international shipping?",
        answer:
          "Yes! We ship worldwide. Shipping fees and delivery times are calculated at checkout.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Once your order is shipped, you&apos;ll receive a tracking number via email.",
      },
      ,
      {
        question: "What should I do if my order is delayed?",
        answer:
          "If your order hasn&apos;t arrived within the estimated time, please check the tracking details. If there are issues, contact our support team for assistance.",
      },
    ],
  },
  {
    category: "Orders & Payments",
    items: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept Visa, MasterCard, Amex, PayPal, and Apple Pay.",
      },
      {
        question: "Can I modify or cancel my order?",
        answer:
          "Orders can be modified or canceled within 1 hour of placing them.",
      },
      {
        question: "What if I receive the wrong or a damaged item?",
        answer:
          "If you receive an incorrect or damaged item, please contact us within 48 hours of delivery with photos. We&apos;ll arrange a replacement or refund.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "We accept returns within 30 days of delivery for unused items in original packaging. Some items (e.g., clearance or intimate wear) may be non-returnable.",
      },
      {
        question: " How do I initiate a return?",
        answer:
          "Go to the Returns & Refunds section in your account, request a return, and follow the instructions for shipping the item back.",
      },
      {
        question: "When will I receive my refund?",
        answer:
          "Refunds are processed within 5-7 business days after receiving the returned item.",
      },
    ],
  },
  {
    category: "Other Questions",
    items: [
      {
        question: " How can I contact customer support?",
        answer:
          "You can reach us via: 📧 Email: support@shop.com 📞 Phone: +1 (123) 456-7890 💬 Live Chat: Available on our website",
      },
      {
        question: "Do you offer gift cards?",
        answer:
          "Yes! We offer digital gift cards in various amounts. They can be purchased online and emailed to recipients.",
      },
    ],
  },
];

export default function FAQs() {
  return (
    <main className="min-h-screen max-w-7xl mx-auto md:pt-28 pt-28 md:px-12 px-4 flex flex-col ">
      <h2 className="text-3xl font-bold text-center">FAQs</h2>
      {faqs.map((section, i) => (
        <div key={i} className="mb-6">
          <h3 className="text-xl font-semibold mb-4 mt-8">{section.category}</h3>
          <Accordion type="single" collapsible className="space-y-4">
            {section.items.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${i}-${index}`}
                className="border border-gray-300 rounded-lg shadow-lg"
              >
                {faq && (
                  <AccordionTrigger className="text-lg font-medium px-4 py-3">
                    {faq.question}
                  </AccordionTrigger>
                )}
                {faq && (
                  <AccordionContent className="px-4 pb-3 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </main>
  );
}
