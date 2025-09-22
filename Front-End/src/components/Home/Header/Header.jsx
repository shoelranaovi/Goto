
import { Button } from "@/components/ui/button";
import banner from "../../../asset/hero.webp";

import Navbar from "./Navbar";



function Header() {
  
  return (
<div
  className="relative  w-full bg-cover bg-bottom h-[70vh] md:h-[400px] lg:h-[800px]  px-4"
  style={{
    backgroundImage: `url(${banner})`,
  }}
>
     <Navbar />
     <div className="w-full h-full flex flex-col text-center mt-12 lg:mt-20">
      <h1 className="text-3xl md:text-4xl text-bold">NATURE’S WONDERS AWAIT</h1>
      <p className="pt-5">Lorem ipsum dolor sit amet consectetur. Et sagittis sit odio urna.</p>
      <p className="text-gray-700">Varius ornare ut gravida</p>
    <div className="flex justify-center pt-4">
    <Button className=" bg-orange-600 text-sm text-white px-6 py-1 rounded-2xl h-10 hover:bg-orange-500">Choose Destinations</Button>
    </div>
     </div>
    
   

    </div>
  )
}

export default Header