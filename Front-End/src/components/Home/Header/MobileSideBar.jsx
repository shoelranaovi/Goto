import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronRight,
  CircleUser,
  Menu,
  Phone,
  ShoppingCart,
  X,
} from "lucide-react";
import { useState } from "react";

function MobileSidebar({
  menuData,
  isMobileMenuOpen,
  expandedMenuItem,
  expandedCountry,
  toggleMobileMenu,
  toggleMenuItem,
  toggleCountry,
}) {
  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="text-orange-500 font-bold text-lg">LOGO</div>
            <Button
              onClick={toggleMobileMenu}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            {menuData.map((item, index) => (
              <div key={index} className="border-b">
                <Button
                  className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => toggleMenuItem(index)}
                >
                  <span className="font-medium">{item.name}</span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedMenuItem === index ? "rotate-90" : ""
                    }`}
                  />
                </Button>

                {/* Submenu */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedMenuItem === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  {item.isMega ? (
                    // Destinations mega menu
                    <div className="bg-gray-50">
                      {item.countries.map((country, countryIdx) => (
                        <div key={countryIdx}>
                          <Button
                            className="flex items-center justify-between w-full p-3 pl-8 text-left hover:bg-gray-100 transition-colors"
                            onClick={() => toggleCountry(country.name)}
                          >
                            <span className="text-sm font-medium">
                              {country.name}
                            </span>
                            <ChevronRight
                              className={`w-3 h-3 transition-transform duration-200 ${
                                expandedCountry === country.name
                                  ? "rotate-90"
                                  : ""
                              }`}
                            />
                          </Button>

                          {/* Cities */}
                          <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              expandedCountry === country.name
                                ? "max-h-64"
                                : "max-h-0"
                            }`}
                          >
                            {country.cities?.map((city, cityIdx) => (
                              <div
                                key={cityIdx}
                                className="flex items-center gap-3 p-3 pl-12 hover:bg-gray-200 transition-colors cursor-pointer"
                              >
                                <img
                                  src={city.image}
                                  alt={city.name}
                                  className="w-8 h-8 object-cover rounded-full"
                                />
                                <span className="text-sm">{city.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <div className="p-3 pl-8">
                        <span className="text-orange-400 text-sm border-b border-orange-400 cursor-pointer">
                          View All
                        </span>
                      </div>
                    </div>
                  ) : (
                    // Regular submenu
                    <div className="bg-gray-50">
                      {item.items.map((subItem, subIdx) => (
                        <div
                          key={subIdx}
                          className="p-3 pl-8 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <span className="text-sm">{subItem}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex items-center gap-4 mb-3">
              <ShoppingCart size={20} className="text-gray-600" />
              <CircleUser size={20} className="text-gray-600" />
            </div>
            <Button className="w-full rounded-2xl bg-orange-700 hover:bg-orange-600 text-white gap-2 px-4 py-2 flex items-center justify-center transition-colors">
              <Phone size={16} /> +00 232 6777
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileSidebar;
