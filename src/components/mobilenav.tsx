import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

type NavLink = {
  name: string;
  path: string;
};

interface MobilenavProps {
  navLinks: NavLink[];
  pathname: string;
}

export default function Mobilenav({ navLinks, pathname }: MobilenavProps) {
  const shopDropdownLinks = [
    { name: "Men's Clothing", path: "/shop/mens" },
    { name: "Women's Clothing", path: "/shop/womens" },
    { name: "Kids Clothing", path: "/shop/kids" },
  ];

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <AlignJustify />
        </SheetTrigger>

        <SheetContent side="left" className="p-8 pt-10 h-full flex flex-col">
          <Accordion type="single" collapsible className="w-full">
            {navLinks.map((link) =>
              link.name === "Shop" ? (
                <AccordionItem key={link.name} value={link.name}>
                  <AccordionTrigger>{link.name}</AccordionTrigger>
                  <AccordionContent>
                    <ul>
                      {shopDropdownLinks.map((item) => (
                        <li key={item.name}>
                          <SheetClose asChild>
                            <Link
                              href={item.path}
                              className={`text-base ${
                                pathname === item.path
                                  ? "text-gray-400"
                                  : "hover:text-gray-400"
                              } transition-all duration-300`}
                              aria-current={
                                pathname === item.path ? "page" : undefined
                              }
                            >
                              {item.name}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <div className="flex flex-col mt-4" key={link.name}>
                  <SheetClose asChild>
                    <Link
                      href={link.path}
                      className={`text-base font-semibold ${
                        pathname === link.path
                          ? "text-gray-400"
                          : "hover:text-gray-400"
                      } transition-all duration-300`}
                      aria-current={pathname === link.path ? "page" : undefined}
                    >
                      {link.name}
                      <hr className="mt-4" />
                    </Link>
                  </SheetClose>
                </div>
              )
            )}
          </Accordion>
        </SheetContent>
      </Sheet>
    </div>
  );
}
