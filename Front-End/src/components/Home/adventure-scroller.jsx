import React from 'react';
import { Compass, Mountain, Camera, Tent, MapPin, Backpack, Plane, Ship, Car, Train } from 'lucide-react';

const AdventureScroller = () => {
  const adventures = [
    { icon: Compass, text: "Your next adventure starts here" },
    { icon: Mountain, text: "Your next adventure starts here" },
    { icon: Camera, text: "Your next adventure starts here" },
    { icon: Tent, text: "Your next adventure starts here" },
    { icon: MapPin, text: "Your next adventure starts here" },
    { icon: Backpack, text: "Your next adventure starts here" },
    { icon: Plane, text: "Your next adventure starts here" },
    { icon: Ship, text: "Your next adventure starts here" },
    { icon: Car, text: "Your next adventure starts here" },
    { icon: Train, text: "Your next adventure starts here" }
  ];

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50 py-6">
      <div className="relative">
        {/* Scrolling container */}
        <div className="flex animate-scroll whitespace-nowrap">
          {/* First set of items */}
          {adventures.map((item, index) => (
            <div key={index} className="inline-flex items-center mx-8 flex-shrink-0">
              <div className="bg-amber-900 p-3 rounded-lg mr-4 shadow-lg">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-amber-900 font-medium text-lg">
                {item.text}
              </span>
            </div>
          ))}
          
          {/* Duplicate set for seamless scrolling */}
          {adventures.map((item, index) => (
            <div key={`duplicate-${index}`} className="inline-flex items-center mx-8 flex-shrink-0">
              <div className="bg-amber-900 p-3 rounded-lg mr-4 shadow-lg">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-amber-900 font-medium text-lg">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default AdventureScroller;