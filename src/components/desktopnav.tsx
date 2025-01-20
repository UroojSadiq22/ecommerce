import Link from "next/link";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger} from "@/components/ui/navigation-menu";

type NavLink = {
    name: string;
    path: string;
  };
  type ShopDropdownLinks = {
    name: string;
    path: string;
  };
  
  interface DesktopnavProps {
    navLinks: NavLink[];
    pathname: string;
    shopDropdownLinks: ShopDropdownLinks[];
  }

export default function Desktopnav({ navLinks, pathname, shopDropdownLinks }:DesktopnavProps){
   
  return(
        <div className="hidden lg:flex justify-around items-center space-x-6">
        {navLinks.map((link) => (
          <ul key={link.name}>
            <li>
              {link.name === "Shop" ? (
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        aria-current={
                          pathname === link.path ? "page" : undefined
                        }
                        className="font-normal text-base p-1 transition duration-300 ease-in-out relative group hover:bg-white"
                      >
                        <span
                          className={`${
                            pathname === link.path
                              ? "font-bold"
                              : "hover:text-[#DB4444]"
                          }`}
                        >
                          {link.name}
                        </span>
                        <span
                          className={`absolute left-0 bottom-0 h-[2px] transition-all duration-300 ease-in-out ${
                            pathname === link.path
                              ? "w-full bg-black"
                              : "w-0 bg-transparent group-hover:w-full group-hover:bg-black"
                          }`}
                        ></span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid grid-cols-1 md:w-[400px] lg:w-[200px]">
                          {shopDropdownLinks.map((option, index) => (
                            <li
                              key={index}
                              className={
                                "p-2 cursor-pointer hover:bg-gray-300 "
                              }
                            >
                              <Link
                                href={option.path}
                                className="p-2 transition duration-300 ease-in-out relative group"
                                aria-current={
                                  pathname === option.path
                                    ? "page"
                                    : undefined
                                }
                              >
                                <span>{option.name}</span>
                                <span
                                  className={`absolute left-0 bottom-0 h-[2px] transition-all duration-300 ease-in-out ${
                                    pathname === option.path
                                      ? "w-full bg-black"
                                      : "w-0 bg-transparent group-hover:w-full group-hover:bg-black"
                                  }`}
                                ></span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ) : (
                
                <Link
                  href={link.path}
                  className="p-1 transition duration-300 ease-in-out relative group"
                  aria-current={pathname === link.path ? "page" : undefined}
                >
                  <span
                    className={`${
                      pathname === link.path
                        ? "font-bold"
                        : "hover:text-[#DB4444]"
                    }`}
                  >
                    {link.name}
                  </span>
                  <span
                    className={`absolute left-0 bottom-0 h-[2px] transition-all duration-300 ease-in-out ${
                      pathname === link.path
                        ? "w-full bg-black"
                        : "w-0 bg-transparent group-hover:w-full group-hover:bg-black"
                    }`}
                  ></span>
                </Link>
              )}
            </li>
          </ul>
        ))}
      </div>
    )
}