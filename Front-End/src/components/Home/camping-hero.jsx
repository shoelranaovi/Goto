import { useState } from 'react';
import { Play, X } from 'lucide-react';
import video from "../../../src/asset/video.mp4"


export default function CampingHero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);


  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
     
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#2d3748cc] via-[#445a787f] to-[#a05a28cc]"></div>

        {/* Corner Labels */}
        <div className="absolute top-6 left-6 md:top-12 md:left-12 flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-white text-sm md:text-base font-medium tracking-wider">REC</span>
        </div>

        <div className="absolute top-6 right-6 md:top-12 md:right-12">
          <span className="text-white text-sm md:text-base font-medium tracking-widest">CAMPING</span>
        </div>

        <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12">
          <span className="text-white text-sm md:text-base font-medium tracking-widest">HOLIDAYS</span>
        </div>

        {/* Main Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-4 md:mb-6 leading-tight">
            Enjoy your travel
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-light tracking-wide max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur dictumst ante.
          </p>

          {/* Play Button */}
          <button
            onClick={openVideo}
            className="relative w-16 h-16 md:w-20 md:h-20 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl backdrop-blur-sm mt-8"
            aria-label="Play camping video"
          >
            <Play className="w-6 h-6 md:w-8 md:h-8 text-slate-700 ml-1 group-hover:text-slate-900 transition-colors duration-300" fill="currentColor" />
            <span className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping"></span>
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4 md:p-8">
          {/* Close Button */}
          <button
            onClick={closeVideo}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
            aria-label="Close video"
          >
            <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>

          {/* Responsive Video Container */}
          <div className="w-full max-w-4xl aspect-video">
         
            <iframe width="853" height="480" src="https://www.youtube.com/embed/OcM9s4mCFek" title="রটে বটে ঘটে না | Rote Bote Ghote Na | Hanif Sanket | Eid-ul-Azha Natok 2022" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      )}
    </>
  );
}
