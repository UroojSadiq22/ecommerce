import Image from "next/image";
import { motion } from "framer-motion";
import TopPagepath from "@/components/top-pagepath";

const brands = [
  { src: "/versacebrand1.png", alt: "brand1" },
  { src: "/zarabrand2.png", alt: "brand2" },
  { src: "/guccibrand3.png", alt: "brand3" },
  { src: "/pradabrand4.png", alt: "brand4" },
  { src: "/calvinkleinbrand5.png", alt: "brand5" },
];

export default function Brands() {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const paths = [
    { label: "Home", href: "/" },
    { label: "Brands", href: "" },
  ];
  return (
    <main className="min-h-screen md:pt-28 pt-28 md:px-12 px-4 flex flex-col ">
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
        Our Exclusive Brands
      </motion.h1>
      <section className="bg-black p-6">
        <div className="md:flex md:flex-row justify-center grid grid-cols-3 lg:gap-24 gap-10">
          {brands.map((i, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={itemVariants}
            >
              <Image src={i.src} alt={i.alt} width={120} height={120} />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
