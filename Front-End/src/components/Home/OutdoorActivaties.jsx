import React from 'react';
import { Button } from '../ui/button';
import PrimaryButton from '../Lauout/Button';

const OutdoorActivities = () => {
  return (
    <div className="  p-4 md:p-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Kayaking image */}
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
              <img
                src="https://plus.unsplash.com/premium_photo-1661893427047-16f6ddc173f6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Kayaking on calm water"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Paddle reflection image */}
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
              <img
                src="https://media.istockphoto.com/id/2211744332/photo/kayaker-paddling-glacier-bay-antarctica.jpg?s=1024x1024&w=is&k=20&c=GSWUVnKy4l_7N201vjMa8qac7NRQ19UaDv85Gne-BjY="
                alt="Paddle reflection in golden water"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            <div>
              <h1 className="Heading">
                Exciting outdoor activities we offer
              </h1>
            </div>

            {/* Activities grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kayaking */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="Heading3">Kayaking</h3>
                  <p className="paragraphText">Lorem ipsum dolor sit amet consectetur.</p>
                </div>
              </div>

              {/* Climbing */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-6m0 0l5 6m-5-6v18" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="Heading3">Climbing</h3>
                  <p className="paragraphText">Lorem ipsum dolor sit amet consectetur.</p>
                </div>
              </div>

              {/* Hiking */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="Heading3">Hiking</h3>
                  <p className="paragraphText">Lorem ipsum dolor sit amet consectetur.</p>
                </div>
              </div>

              {/* Mountain biking */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="Heading3">Mountain biking</h3>
                  <p className="paragraphText">Lorem ipsum dolor sit amet consectetur.</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-start">
  <PrimaryButton text="Explore Now" />
</div>

            {/* Decorative airplane */}
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutdoorActivities;