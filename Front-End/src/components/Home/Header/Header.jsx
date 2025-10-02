
import { Button } from "@/components/ui/button";
import banner from "../../../asset/hero.webp";

import Navbar from "./Navbar";
import PrimaryButton from "@/components/Lauout/Button";
import { Phone, User } from "lucide-react";



function Header() {
  
  return (
<div
  className=" relative  w-full bg-cover bg-bottom h-[70vh] md:h-[400px] lg:h-[800px]  px-4"
  style={{
    backgroundImage: `url(${banner})`,
  }}
>
     <Navbar />
     <div className="w-full h-full flex flex-col text-center gap-2 md:gap-4 mt-12 lg:mt-20">
      <div className="mx-auto max-w-lg  text-bold">
        <h1 className="Heading1" >NATURE’S WONDERS AWAIT</h1>
      </div>
      <div className="max-w-md  mx-auto ">
      <p className="paragraphText">Lorem ipsum dolor sit amet consectetur. Et sagittis sit odio urna. Varius ornare ut gravida </p>

      </div>


      
    
    <div className=" flex justify-center mt-4 ">
      <div className="   text-center  ">
      <PrimaryButton  text={"Choose Destinations"} />
      </div>
    
    </div>
     </div>
    
   

    </div>
  )
}

export default Header