import TopPagepath from "@/components/top-pagepath";

export default function BrandsPage() {
  const paths = [
    { label: "Home", href: "/" },
    { label: "Brands", href: "" },
  ];
  return (
    <main className="min-h-screen max-w-7xl mx-auto md:pt-28 pt-28 md:px-12 px-4 flex flex-col ">
      <div>
        <TopPagepath items={paths} />
      </div>

      <h1 className="my-4 font-integral text-2xl font-extrabold">
        Our Exclusive Brands!
      </h1>
      <p className="text-gray-500">Coming soon</p>
    </main>
  );
}
