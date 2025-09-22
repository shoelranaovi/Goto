import {
  CarFront,
  ChevronDown,
  CircleUser,
  Menu,
  Phone,
  ShoppingCart,
} from "lucide-react";
import color from "../../../asset/color.svg";
import banner from "../../../asset/destinations-banner.webp";
import { useState } from "react";

import MobileSidebar from "./MobileSideBar";
import { Button } from "@/components/ui/button";

const menuData = [
  {
    name: "Demo",
    items: [
      "Home 01",
      "Home 02",
      "Home 03",
      "Home 04",
      "Home 05",
      "Home 06",
      "Home 07",
      "Home 08",
      "Home 09",
      "Home 10",
      "Home 11",
      "Home 12",
    ],
  },
  {
    name: "Destinations",
    isMega: true,
    countries: [
      {
        name: "France",
        image:
          "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=80&h=60&fit=crop",
        cities: [
          {
            name: "Lyon",
            image:
              "https://images.unsplash.com/photo-1524041255072-7da0525d6b34?w=80&h=60&fit=crop",
          },
          {
            name: "Marseille",
            image:
              "https://images.unsplash.com/photo-1595960133515-de6b3b2e4db7?w=80&h=60&fit=crop",
          },
          {
            name: "Paris",
            image:
              "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=80&h=60&fit=crop",
          },
          {
            name: "Toulouse",
            image:
              "https://images.unsplash.com/photo-1549924231-f129b911e442?w=80&h=60&fit=crop",
          },
        ],
      },
      {
        name: "Thailand",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=60&fit=crop",
        cities: [
          {
            name: "Bangkok",
            image:
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=60&fit=crop",
          },
          {
            name: "Chiang Mai",
            image:
              "https://images.unsplash.com/photo-1523492631270-c7cb03866dd5?w=80&h=60&fit=crop",
          },
          {
            name: "Phuket",
            image:
              "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=80&h=60&fit=crop",
          },
        ],
      },
      {
        name: "United Kingdom",
        image:
          "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=80&h=60&fit=crop",
        cities: [
          {
            name: "Birmingham",
            image:
              "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=80&h=60&fit=crop",
          },
          {
            name: "Glasgow",
            image:
              "https://images.unsplash.com/photo-1486634279914-7c2e9e5fe092?w=80&h=60&fit=crop",
          },
          {
            name: "London",
            image:
              "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=80&h=60&fit=crop",
          },
          {
            name: "Manchester",
            image:
              "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?w=80&h=60&fit=crop",
          },
        ],
      },
      {
        name: "United States",
        image:
          "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=80&h=60&fit=crop",
        cities: [
          {
            name: "Chicago",
            image:
              "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=80&h=60&fit=crop",
          },
          {
            name: "Houston",
            image:
              "https://images.unsplash.com/photo-1575648362413-1f31c9d1c0be?w=80&h=60&fit=crop",
          },
          {
            name: "Los Angeles",
            image:
              "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=80&h=60&fit=crop",
          },
          {
            name: "New York City",
            image:
              "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=80&h=60&fit=crop",
          },
        ],
      },
    ],
  },
  {
    name: "Tour Listing",
    items: [
      "Left Filter – Grid",
      "Left Filter – List",
      "Half Maps – List",
      "Half Maps – Grid",
      "Top Filter – List",
      "Top Filter – Grid",
      "Tour Detail – Layout 1",
      "Tour Detail – Layout 2",
      "Tour Detail – Layout 3",
      "Tour Detail – Layout 4",
      "Tour Detail – Layout 5",
      "Tour Detail – Layout 6",
    ],
  },
  {
    name: "Pages",
    items: [
      "City Detail – Layout 1",
      "City Detail – Layout 2",
      "City Detail – Layout 3",
      "About Us",
      "Contact Us",
      "Career",
      "FAQ's",
      "Teams",
      "Privacy Policy",
      "Blog",
    ],
  },
];

function Navbar() {
  const [activeCountry, setActiveCountry] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenuItem, setExpandedMenuItem] = useState(null);
  const [expandedCountry, setExpandedCountry] = useState(null);
  console.log(menuData);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Reset expanded states when closing
    if (isMobileMenuOpen) {
      setExpandedMenuItem(null);
      setExpandedCountry(null);
    }
  };

  const toggleMenuItem = (index) => {
    setExpandedMenuItem(expandedMenuItem === index ? null : index);
    setExpandedCountry(null); // Reset country expansion when switching menu items
  };

  const toggleCountry = (countryName) => {
    setExpandedCountry(expandedCountry === countryName ? null : countryName);
  };

  return (
    <div className="conatiner mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between  h-16 ">
      <div className="flex items-center justify-center gap-2">
        {/* mobile-togle-button */}
        <div className=" lg:hidden p-1 text-bold ">
          <Menu
            onClick={toggleMobileMenu}
            className="hover:text-orange-400 transition-all  ease-in-out duration-300 cursor-pointer"
            size={24}
          />
        </div>
        {/* brandlogo */}
        <div className="pr-2 w-28 md:w-32 ">
          <img className="cursor-pointer" src={color} alt="logo" />
        </div>
        {/* navlist */}
        <div className="hidden lg:flex ml-2 gap-3">
          {menuData.map((item, index) =>
            // mega-dropdown
            item.isMega ? (
              <div key={index} className="flex  group relative   p-1 ">
                <div className="flex items-center  gap-2 cursor-pointer hover:text-orange-400 font-bold transition-all ease-in-out duration-300">
                  {" "}
                  {item.name} <ChevronDown className="w-4 h-4" />{" "}
                </div>
                <div
                  className=" absolute -left-52 top-full w-[90vw]
               h-[500px]
               opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-100
               transition-all ease-in-out duration-300 origin-top
               flex justify-center items-center"
                >
                  {/* overlay */}
                  <div className="bg-gray-100 w-full h-[90%] ml-10  px-6 py-4 flex justify-between">
                    {/* mega-leftside */}
                    <ul className="w-1/4 px-4 border-r-2">
                      {item.countries.map((item, index) => (
                        <li
                          onMouseEnter={() => setActiveCountry(item)}
                          className={`flex justify-between p-4 cursor-pointer transition ease-in-out duration-300 font-bold
                            ${
                              activeCountry?.name === item.name
                                ? "text-orange-500 "
                                : "hover:text-orange-400 "
                            }
                          `}
                          key={index}
                        >
                          {" "}
                          {item.name} <ChevronDown />{" "}
                        </li>
                      ))}
                      <div className="text-orange-400 text-center">
                        {" "}
                        <span className="border-b border-orange-400">
                          {" "}
                          View All
                        </span>
                      </div>
                    </ul>
                    {/* mega-main */}

                    <div className="w-2/4 p-4">
                      {activeCountry ? (
                        <div>
                          <h2 className="text-xl font-bold mb-2">
                            {activeCountry.name}
                          </h2>
                          <ul className="grid grid-cols-3 gap-4">
                            {activeCountry.cities?.map((city, idx) => (
                              <li
                                key={idx}
                                className="flex flex-col items-center cursor-pointer group hover:text-orange-500"
                              >
                                <img
                                  src={city.image}
                                  alt={city.name}
                                  className="w-16 h-16 object-cover rounded-full group-hover:scale-105  transform transition duration-300"
                                />
                                <span className="mt-2 text-sm ">
                                  {city.name}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <p className="text-gray-500">
                          Hover over a country to see related items
                        </p>
                      )}
                    </div>
                    {/* mega-right */}

                    <div className="w-1/4 p-4">
                      <div
                        className="relative h-[400px] w-[90%] bg-center bg-cover flex flex-col gap-6 items-center rounded-md p-4  justify-center text-white"
                        style={{
                          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(${banner})`,
                        }}
                      >
                        <h1 className="text-5xl px-4 align-text-top font-bold z-10">
                          Goto Travel Booking
                        </h1>
                        <p>The most complete Tour Management System</p>
                        <Button className="bg-orange-500 px-8 hover:bg-orange-400">
                          Get it Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={index}
                className="flex hover:text-orange-400 group relative p-1"
              >
                {/* Menu title */}
                <div className="flex items-center gap-2 cursor-pointer font-bold transition-all ease-in-out duration-300">
                  {item.name} <ChevronDown className="w-4 h-4" />
                </div>

                {/* Dropdown container */}
                <div
                  className="absolute top-8 left-0 w-[220px] bg-gray-200
                             opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-100
                             transition-all duration-300 ease-in-out origin-top
                             flex flex-col z-50"
                >
                  {item.items.map((subItem, idx) => (
                    <div
                      key={idx}
                      className="p-3 px-8 text-black  hover:text-orange-400 cursor-pointer transition"
                    >
                      {subItem}
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <ShoppingCart className="hidden lg:flex" />

        <CircleUser className="hidden lg:flex" />

        <Button className=" hidden md:flex   rounded-2xl bg-orange-600 hover:bg-orange-500 text-white gap-2 px-4">
          {" "}
          <Phone size={16} /> +00 232 6777{" "}
        </Button>
      </div>
      {/* mobile-toggle-sidebar */}
      <MobileSidebar
        menuData={menuData}
        isMobileMenuOpen={isMobileMenuOpen}
        expandedMenuItem={expandedMenuItem}
        expandedCountry={expandedCountry}
        toggleMobileMenu={toggleMobileMenu}
        toggleMenuItem={toggleMenuItem}
        toggleCountry={toggleCountry}
      />
    </div>
  );
}

export default Navbar;
