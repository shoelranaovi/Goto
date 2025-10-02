import { MapPin, Coffee, CreditCard, CheckCircle } from "lucide-react";
import PrimaryButton from "../Lauout/Button";

export default function AdventureBooking() {
  const steps = [
    {
      icon: MapPin,
      title: "Explore & Select tour",
      description:
        "Lorem ipsum dolor sit amet consectetur. Pellentesque urna tortor bibendum.",
    },
    {
      icon: Coffee,
      title: "Fill information",
      description:
        "Lorem ipsum dolor sit amet consectetur. Pellentesque urna tortor bibendum.",
    },
    {
      icon: CreditCard,
      title: "Make payment",
      description:
        "Lorem ipsum dolor sit amet consectetur. Pellentesque urna tortor bibendum.",
    },
    {
      icon: CheckCircle,
      title: "Get confirm & Finish",
      description:
        "Lorem ipsum dolor sit amet consectetur. Pellentesque urna tortor bibendum.",
    },
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="Heading2">How to book your adventure?</h1>
        <p className="paragraphText-M">
          Booking your dream camping tour has never been easier!
        </p>
        <p className="paragraphText-M">Follow these four super simple steps.</p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <div key={index} className="group">
              {/* Step Card */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                {/* Icon Container */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-amber-700" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="Heading3">{step.title}</h3>
                  <p className="paragraphText">{step.description}</p>
                </div>
              </div>

              {/* Connector Line (hidden on mobile, visible on larger screens) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block">
                  <div className="flex justify-center mt-8">
                    <div className="w-24 h-0.5 bg-gradient-to-r from-amber-300 to-orange-300"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Connector Lines */}
      <div className="lg:hidden">
        {steps.map(
          (_, index) =>
            index < steps.length - 1 && (
              <div key={index} className="flex justify-center my-6">
                <div className="w-0.5 h-12 bg-gradient-to-b from-amber-300 to-orange-300"></div>
              </div>
            )
        )}
      </div>

      {/* CTA Section */}
      <div className=" flex   mt-16">
        <PrimaryButton text={"Start Your Adventure"} />
      </div>
    </div>
  );
}
