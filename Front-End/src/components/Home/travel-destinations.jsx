import React from 'react';
import { ShoppingCart, Settings } from 'lucide-react';

const TravelDestinations = () => {
  const destinations = [
    {
      id: 1,
      name: "Birmingham",
      trips: "1 trip",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Crystal clear turquoise waters with boats"
    },
    {
      id: 2,
      name: "Manchester",
      trips: "1 trip",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "European city with historic buildings and boats"
    },
    {
      id: 3,
      name: "Phuket",
      trips: "1 trip",
      image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Wooden pier extending into crystal blue waters"
    },
    {
      id: 4,
      name: "Toulouse",
      trips: "1 trip",
      image: "https://images.unsplash.com/photo-1520637836862-4d197d17c89a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Mediterranean coastal town with mountains"
    }
  ];

  return (
   
   
      <div className="container  px-4 md:px-6 lg:px-8 mt-4  mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="Heading2">
              Top destination
            </h1>
            <p className="paragraphText-M">
              We are committed to delivering unforgettable camping trips, connecting you 
              with nature through professionally designed tours.
            </p>
          </div>
          <button className="text-red-500 hover:text-red-600 text-sm font-medium self-start sm:self-auto">
            View more
          </button>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-4 sm:p-5">
                <h3 className="Heading3">
                  {destination.name}
                </h3>
                <p className="paragraphText">
                  {destination.trips}
                </p>
              </div>
            </div>
          ))}
        </div>

     
      </div>
 
  );
};

export default TravelDestinations;