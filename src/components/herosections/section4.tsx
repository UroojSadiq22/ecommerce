import Image from "next/image";

export default function Dressstyle() {
  const dressstyles = [
    {
      id: 0,
      src: "/dressstyle1.png",
      alt: "casual",
      title: "Casual",
    },
    {
      id: 1,
      src: "/dressstyle2.png",
      alt: "formal",
      title: "Formal",
    },
    {
      id: 2,
      src: "/dressstyle3.png",
      alt: "party",
      title: "Party",
    },
    {
      id: 3,
      src: "/dressstyle4.png",
      alt: "gym",
      title: "Gym",
    },
  ];
  return (
    <section className="flex justify-center items-center">
      <div className="w-full max-w-5xl md:m-0 m-4 bg-gray-200 rounded-xl p-4 md:p-8">
        <h1 className="font-integral font-extrabold md:text-4xl text-3xl text-center mb-6">
          BROWSE BY DRESS STYLE
        </h1>

        {/* Grid container with full coverage */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          {dressstyles.map((i, index) => (
            <div
              key={index}
              
              className={`relative ${
                i.id === 2 ? "col-span-2" : ""
              } ${i.id === 1 ? "col-span-2" : ""} flex items-center justify-center`}
            >
              <Image
                src={i.src}
                alt={i.alt}
                width={110}
                height={110}
                className="object-cover w-full h-full rounded-xl"
              />
              <div className="absolute top-[10%] left-[5%]">
                <h1 className="font-bold text-xl mt-2">{i.title}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
