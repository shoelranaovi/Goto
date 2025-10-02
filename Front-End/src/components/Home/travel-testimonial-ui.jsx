import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TravelTestimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const testimonials = [
    {
      id: 1,
      name: "Sarah Mitchell",
      location: "New York, USA",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      content: "The Himalayan trek was a life-changing experience! Our guide was exceptional, the mountain views were breathtaking, and the local hospitality was heartwarming. Every sunrise felt like a gift from nature itself.",
      placeImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Marcus Chen",
      location: "Singapore",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      content: "Exploring the ancient temples of Kyoto was absolutely mesmerizing. The blend of history, culture, and natural beauty exceeded all expectations. The cherry blossoms made it even more magical!",
      placeImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Emma Thompson",
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      content: "The Northern Lights tour in Iceland was pure magic! Dancing auroras, stunning landscapes, and incredible hot springs. Our guide's knowledge of the area made the experience truly unforgettable.",
      placeImage: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=600&h=400&fit=crop"
    },
    {
      id: 4,
      name: "Diego Rodriguez",
      location: "Barcelona, Spain",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      content: "Surfing in Bali was an absolute dream come true! Perfect waves, beautiful beaches, and the most welcoming local community. The sunset surf sessions will forever hold a special place in my heart.",
      placeImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop"
    },
    {
      id: 5,
      name: "Amara Okonkwo",
      location: "Lagos, Nigeria",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop",
      content: "The safari in Tanzania was beyond words! Witnessing the Great Migration, seeing lions in their natural habitat, and camping under the African stars was the adventure of a lifetime.",
      placeImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop"
    },
    {
      id: 6,
      name: "Lucas Silva",
      location: "Rio de Janeiro, Brazil",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
      content: "Backpacking through Patagonia was the most challenging yet rewarding experience. Glacier hiking, pristine lakes, and mountain peaks that touch the sky. Every step was worth the effort!",
      placeImage: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=600&h=400&fit=crop"
    },
    {
      id: 7,
      name: "Yuki Tanaka",
      location: "Tokyo, Japan",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
      content: "The road trip through New Zealand's South Island was spectacular! From Milford Sound to Mount Cook, every turn revealed a new postcard-perfect scene. The adventure activities were thrilling!",
      placeImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop"
    },
    {
      id: 8,
      name: "Oliver Schmidt",
      location: "Munich, Germany",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop",
      content: "Diving in the Great Barrier Reef was like entering another world. The vibrant coral, exotic fish, and crystal-clear waters created memories I'll cherish forever. Absolutely phenomenal!",
      placeImage: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=600&h=400&fit=crop"
    },
    {
      id: 9,
      name: "Priya Sharma",
      location: "Mumbai, India",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      content: "The Greek Island hopping adventure was pure bliss! Santorini sunsets, crystal waters of Mykonos, and the rich history of Athens. Every island had its own unique charm and beauty.",
      placeImage: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&h=400&fit=crop"
    },
    {
      id: 10,
      name: "James Anderson",
      location: "Sydney, Australia",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop",
      content: "Trekking through the rainforests of Costa Rica was an incredible eco-adventure. Zip-lining through the canopy, spotting exotic wildlife, and visiting pristine waterfalls made this trip unforgettable!",
      placeImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=400&fit=crop"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Scattered dots and shapes */}
        <div className="absolute top-10 left-20 w-2 h-2 bg-orange-300 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-32 right-40 w-3 h-3 bg-yellow-400 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-20 left-32 w-2 h-2 bg-orange-400 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute top-1/4 right-20 w-4 h-4 bg-yellow-300 rounded-full opacity-30"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-orange-300 rounded-full opacity-50"></div>
        
        {/* Small decorative lines */}
        <div className="absolute top-20 left-1/3 w-8 h-0.5 bg-orange-300 opacity-40 rotate-45"></div>
        <div className="absolute bottom-40 right-1/3 w-6 h-0.5 bg-yellow-400 opacity-30 -rotate-12"></div>
        <div className="absolute top-1/2 left-10 w-10 h-0.5 bg-orange-400 opacity-20 rotate-12"></div>
        
        {/* Leaf-like shapes */}
        <div className="absolute top-16 right-1/4">
          <svg width="40" height="40" viewBox="0 0 40 40" className="text-orange-300 opacity-20">
            <path d="M20 5 Q25 15 20 25 Q15 15 20 5" fill="currentColor"/>
          </svg>
        </div>
        <div className="absolute bottom-24 left-1/4">
          <svg width="30" height="30" viewBox="0 0 30 30" className="text-yellow-400 opacity-25">
            <path d="M15 3 Q18 10 15 20 Q12 10 15 3" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Hat Decoration - Bottom Right */}
      <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 lg:right-32">
        <svg width="180" height="150" viewBox="0 0 180 150" className="w-32 h-28 md:w-44 md:h-38 lg:w-52 lg:h-44">
          <ellipse cx="90" cy="100" rx="70" ry="20" fill="none" stroke="#d97706" strokeWidth="2" className="opacity-40"/>
          <path d="M 40 100 Q 90 60 140 100" fill="none" stroke="#d97706" strokeWidth="2" className="opacity-40"/>
          <circle cx="90" cy="75" r="3" fill="#d97706" className="opacity-30"/>
          <path d="M 70 85 Q 90 70 110 85" fill="none" stroke="#d97706" strokeWidth="1.5" className="opacity-30"/>
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-6xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Column - Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Polaroid-style frame */}
                <div className="bg-white p-3 md:p-4 shadow-2xl transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 hover:shadow-3xl">
                  <img 
                    key={testimonials[currentSlide].id}
                    src={testimonials[currentSlide].placeImage}
                    alt="Travel destination"
                    className="w-72 h-48 md:w-80 md:h-56 lg:w-96 lg:h-64 object-cover transition-all duration-500 hover:brightness-110"
                  />
                  <div className="mt-2 text-center text-gray-600 text-sm italic">
                    Memories from {testimonials[currentSlide].location}
                  </div>
                </div>
                
                {/* Decorative tape effect */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-yellow-200 opacity-70 -rotate-6 shadow-md"></div>
                <div className="absolute -bottom-2 right-4 w-10 h-5 bg-orange-200 opacity-60 rotate-12 shadow-md"></div>
              </div>
            </div>

            {/* Right Column - Testimonial */}
            <div className="relative">
              <div key={testimonials[currentSlide].id} className="bg-white/80 pb-2 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl hover:bg-white/90 transition-all duration-500 border border-orange-100">
                <p className="paragraphText pb-4 transition-colors duration-300">
                  "{testimonials[currentSlide].content}"
                </p>
                
                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonials[currentSlide].image}
                    alt={testimonials[currentSlide].name}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-orange-200"
                  />
                  <div>
                    <h3 className="Heading2">
                      {testimonials[currentSlide].name}
                    </h3>
                    <p className="paragraphText">
                      {testimonials[currentSlide].location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3 mt-6 justify-center lg:justify-start">
                <button 
                  onClick={prevSlide}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl hover:scale-110 hover:bg-orange-500 transition-all duration-300 group"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300" />
                </button>
                
                {/* Slide Indicators */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentSlide 
                          ? 'w-8 h-2 bg-orange-500' 
                          : 'w-2 h-2 bg-gray-300 hover:bg-orange-300'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={nextSlide}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl hover:scale-110 hover:bg-orange-500 transition-all duration-300 group"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </button>
              </div>

              {/* Slide Counter */}
              <div className="text-center lg:text-left mt-4 text-sm text-gray-600">
                <span className="font-semibold text-orange-600">{currentSlide + 1}</span> / {testimonials.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelTestimonial;