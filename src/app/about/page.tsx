import Image from "next/image";

export default function About() {
  return (
    <main className="min-h-screen md:pt-28 pt-28 flex flex-col items-center">
      {" "}
      {/* About Header */}
      <div className="text-center mb-12">
        <h1 className="font-integral font-extrabold text-4xl text-gray-800 mb-4">
          About Us
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We are a team dedicated to providing you with the best clothing
          options for every style. From casual wear to sophisticated designs, we
          have something for everyone.
        </p>
      </div>
      {/* Our Mission */}
      <div className="w-full h-[50rem] text-center md:text-left bg-[url('/bgabout.jpg')] bg-cover bg-center bg-no-repeat p-4 pt-20 lg:p-20">
        <div className="backdrop-blur-3xl border-2 p-2 md:p-16 lg:px-28 rounded-lg md:w-[40%] text-black">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="lg:text-lg text-sm text-gray-800">
            Our mission is to provide high-quality clothing that makes you feel
            confident and comfortable. We want to revolutionize fashion by
            making it inclusive and accessible to everyone.
          </p>
        </div>
      </div>
      {/* Our Values */}
      <div className=" mt-16 max-w-7xl w-full">
        <h2 className="font-integral font-extrabold text-3xl text-gray-800 mb-6 text-center">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-3 grid-cols-1 lg:gap-16 gap-10 px-2">
          <div className="p-8 text-center border-2 shadow-lg ">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Quality</h3>
            <p className="text-gray-600">
              We prioritize quality in every aspect of our work, from the
              materials we use to the final product you receive.
            </p>
          </div>
          <div className="p-8 text-center border-2 shadow-lg ">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Customer-Centric
            </h3>
            <p className="text-gray-600">
              Our customers are at the heart of everything we do. We’re
              committed to providing exceptional customer service and
              experience.
            </p>
          </div>
          <div className="p-8 text-center border-2 shadow-lg ">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Sustainability
            </h3>
            <p className="text-gray-600">
              We believe in sustainable practices that minimize environmental
              impact, ensuring that our clothes are both stylish and
              eco-friendly.
            </p>
          </div>
        </div>
      </div>
      {/* Team */}
      <div className="text-center my-16">
        <h2 className="font-integral font-extrabold text-3xl text-gray-800 mb-10">
          Meet Our Team
        </h2>
        <div className="flex md:flex-row flex-col items-center gap-16">
          <div className="flex flex-col items-center">
            <Image
              src="/team1.jpg"
              alt="Team Member 1"
              width={200}
              height={200}
              className="rounded-full object-cover shadow-lg mb-4 w-[15rem] h-[15rem]"
            />
            <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
          <div className="flex flex-col items-center md:mt-16">
            <Image
              src="/team2.jpg"
              alt="Team Member 2"
              width={200}
              height={200}
              className="rounded-full object-cover shadow-lg mb-4 w-[15rem] h-[15rem]"
            />
            <h3 className="text-xl font-semibold text-gray-800">Jane Smith</h3>
            <p className="text-gray-600">Creative Director</p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/team3.jpg"
              alt="Team Member 3"
              width={200}
              height={200}
              className="rounded-full object-cover shadow-lg mb-4 w-[15rem] h-[15rem]"
            />
            <h3 className="text-xl font-semibold text-gray-800">Michael Lee</h3>
            <p className="text-gray-600">Head of Marketing</p>
          </div>
        </div>
      </div>
    </main>
  );
}
