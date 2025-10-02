import React from 'react';
import { Heart, MapPin, Clock, Star } from 'lucide-react';

const PopularTours = () => {
  const tours = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Elephant Jungle Sanctuary Half-Day Visit with Meal",
      location: "Phuket",
      duration: "0 - 3 hours",
      description: "Embark on a guided adventure to Elephant Jungle...",
      rating: 5,
      reviews: 1,
      price: 50,
      currency: "$"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d25d56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Doi Inthanon National Park Eco-Friendly Tour",
      location: "Chiang Mai",
      duration: "3 - 6 hours",
      description: "Go on this full-day tour of Doi Inthanon...",
      rating: 4.5,
      reviews: 1,
      price: 35,
      currency: "$"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1563492065-af3523481087?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Grand Palace, Wat Pho, and Wat Arun Guided Tour",
      location: "Bangkok",
      duration: "3 - 6 hours",
      description: "Enjoy Bangkok's rich history and spiritual heritage with...",
      rating: 4.5,
      reviews: 1,
      price: 18,
      currency: "$"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Private Walking Tour with a Local",
      location: "France",
      duration: "3 - 6 hours",
      description: "Get a welcome to Toulouse from a friendly...",
      rating: 0,
      reviews: 0,
      price: 220,
      currency: "$"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Museum and Historical Sites Tour",
      location: "Paris",
      duration: "4 - 8 hours",
      description: "Discover the rich cultural heritage and history...",
      rating: 4.8,
      reviews: 12,
      price: 85,
      currency: "$"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Sailing Adventure with Lunch",
      location: "Santorini",
      duration: "6 - 8 hours",
      description: "Experience the stunning beauty of the Greek islands...",
      rating: 4.7,
      reviews: 8,
      price: 120,
      currency: "$"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Historic City Walking Experience",
      location: "Rome",
      duration: "2 - 4 hours",
      description: "Walk through centuries of history in the eternal city...",
      rating: 4.9,
      reviews: 25,
      price: 45,
      currency: "$"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Niagara Falls Adventure Tour",
      location: "Canada",
      duration: "5 - 7 hours",
      description: "Experience the power and beauty of one of nature's...",
      rating: 4.6,
      reviews: 15,
      price: 95,
      currency: "$"
    }
  ];



  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="Heading2">
          Our popular tours
        </h2>
        <button className="text-orange-500 hover:text-orange-600 font-medium text-sm md:text-base">
          View all tours
        </button>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tours.map((tour) => (
          <Card item={tour} />
         
        ))}
      </div>
    </div>
  );
};

export default PopularTours;


function Card({item}){
  const renderStars = (rating, reviews) => {
    if (reviews === 0) {
      return (
        <div className="flex items-center text-sm text-gray-500">
          <Star className="w-4 h-4 mr-1" />
          <span>0 (0)</span>
        </div>
      );
    }

    return (
      <div className="flex items-center">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(rating)
                  ? 'text-orange-500 fill-orange-500'
                  : i < rating
                  ? 'text-orange-500 fill-orange-500 opacity-50'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="ml-1 text-sm text-gray-600">
          {rating} ({reviews})
        </span>
      </div>
    );
  };
  return(
    <div
    key={item.id}
    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
  >
    {/* Image Container */}
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      
      {/* Heart Icon */}
      <button className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors">
        <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
      </button>

      {/* Play Button for videos (optional) */}
      <button className="absolute top-3 left-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors opacity-0 group-hover:opacity-100">
        <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
          <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent ml-0.5"></div>
        </div>
      </button>
    </div>

    {/* Content */}
    <div className="p-4">
      {/* Title */}
      <h3 className="Heading3">
        {item.title}
      </h3>

      {/* Location and Duration */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 text-xs md:text-sm text-gray-600">
        <div className="flex items-center">
          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
          <span className="truncate">{item.location}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
          <p className="paragraphText">{item.duration}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-xs md:text-sm mb-3 line-clamp-2">
        {item.description}
      </p>

      {/* Rating and Price */}
      <div className="flex items-center justify-between">
        {renderStars(item.rating, item.reviews)}
        
        <div className="text-right">
          <span className="text-xs text-gray-500 mr-1">from</span>
          <span className="font-bold text-lg text-gray-900">
            {item.currency}{item.price}
          </span>
        </div>
      </div>
    </div>
  </div>
  )

}