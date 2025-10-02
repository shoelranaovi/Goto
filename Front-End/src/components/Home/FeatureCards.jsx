

function FeatureCards() {
    
        const features = [
          {
            title: "24-hour Support",
            description: "It has survived not only five centuries, but also the leap"
          },
          {
            title: "No Hidden Fees",
            description: "It has survived not only five centuries, but also the leap"
          },
          {
            title: "Booking Flexibility",
            description: "It has survived not only five centuries, but also the leap"
          },
          {
            title: "Included Transfers",
            description: "It has survived not only five centuries, but also the leap"
          }
        ];
  return (
    <div className=" container mx-auto  flex relative  p-4 ">
        {/* decrative-image */}
        <div className="absolute flex flex-col items-center lg:flex-row -z-10  justify-around gap-10 w-full">
            <img className="" src="https://togo.uxper.co/wp-content/uploads/2025/04/tent-3.svg" alt="" />
            <img className="w-52" src="https://togo.uxper.co/wp-content/uploads/2025/04/tent-2.svg" alt="" />
        </div>

        <div className=" flex gap-4 relative  ">
            {/* roated-text */}
            <div className=" absolute hidden lg:inline  transform  rotate-90 top-28 -left-10 ">
            <div className=" w-32 h-px bg-black "></div>
       
               <h1 className="absolute -top-3 left-9 font-bold bg-white">Why us</h1>
            </div>
             {/* Feature Cards Grid */}
             <div className=" pl-2 lg:pl-16 flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <ItemCard feature={feature} index={index}  />
             
            ))}
          </div>
         
        
            
        </div>

    </div>
  )
}

export default FeatureCards


function ItemCard({feature, index}){
  return(
    <div 
    key={index}
    className="   p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
  >
    {/* Icon placeholder - using a simple circle */}
    <div className="w-12 h-12 bg-orange-100 rounded-full mb-4 flex items-center justify-center">
      <div className="w-6 h-6 bg-orange-400 rounded-full"></div>
    </div>
    
    <h3 className="Heading3">
      {feature.title}
    </h3>
    
    <p className="paragraphText ">
      {feature.description}
    </p>
  </div>

  )
}





