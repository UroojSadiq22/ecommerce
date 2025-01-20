import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";


type FiltersProps = {
  selectedSizes: string[];
  setSelectedSizes: (sizes: string[]) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  selectedPriceRange: [number, number];
  setSelectedPriceRange: (range: [number, number]) => void;
};

export default function Filters({
  selectedSizes,
  setSelectedSizes,
  selectedColors,
  setSelectedColors,
  selectedPriceRange,
  setSelectedPriceRange,
}: FiltersProps) {
  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

  // Map the color codes from Sanity to actual color labels and CSS classes
  const colorClasses = {
    Blue: "bg-blue-500",
    Red: "bg-red-600",
    Black: "bg-black",
    Yellow: "bg-yellow-500",
    Green: "bg-green-500",
    White: "bg-white",
  };

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };
  return (
    <div className="">
      <h1 className="text-xl font-integral font-extrabold">Filters</h1>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="filters">
          <AccordionTrigger className="font-bold text-base">
            Wear For
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              <h1>Mens Wear</h1>
              <h1>Womens Wear</h1>
              <h1>Kids Wear</h1>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="font-bold text-base">
            Price
          </AccordionTrigger>
          <AccordionContent>
            <div className="py-2">
              <Slider
                value={selectedPriceRange}
                onValueChange={setSelectedPriceRange}
                min={0}
                max={1000}
                step={10}
              />
              <div className="flex justify-between text-sm mt-2">
                <span>${selectedPriceRange[0]}</span>
                <span>${selectedPriceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="colors">
          <AccordionTrigger className="font-bold text-base">
            Colors
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-5 gap-2 pt-1 pb-4 px-1">
              {Object.keys(colorClasses).map((color, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 border-2 rounded-full mb-1 cursor-pointer ${
                    selectedColors.includes(color) ? "ring-2 ring-gray-500" : ""
                  } ${colorClasses[color as keyof typeof colorClasses]}`}
                  onClick={() => toggleColor(color)}
                ></div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size">
          <AccordionTrigger className="font-bold text-base">
            Size
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              {sizes.map((size, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`relative overflow-hidden group transition-all duration-300 ease-in-out rounded-3xl text-black md:text-base text-xs bg-gray-200 hover:text-white ${
                    selectedSizes.includes(size) ? "bg-gray-400" : ""
                  }`}
                  onClick={() => toggleSize(size)}
                >
                  <span className="absolute inset-0 bg-black transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
                  <h1 className="relative z-10">{size}</h1>
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
