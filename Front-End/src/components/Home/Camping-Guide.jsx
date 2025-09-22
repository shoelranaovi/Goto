

import React from "react";
import CircularTextComponent from "../Lauout/RoatedText";
import ScrollCounterFramer from "../common/Count-components";
import { Button } from "../ui/button";




function CampingGuide() {
  console.log("hy")
  const compinItems = [
    {
      logo: "https://togo.uxper.co/wp-content/uploads/2025/04/happy-2-1.svg",
      text: "Happy campers",
      value: 45,
    },
    {
      logo: "https://togo.uxper.co/wp-content/uploads/2025/04/destination-1-1.svg",
      text: "Destinations",
      value: 60,
    },
    {
      logo: "https://togo.uxper.co/wp-content/uploads/2025/04/sold-out-1-1.svg",
      text: "Trips sold",

      value: 45,
    },
    {
      logo: "https://togo.uxper.co/wp-content/uploads/2025/04/buddy-2-1.svg",
      text: "Travel buddies",
      value: 150,
    },
  ];
  return (
    <div className="flex flex-col gap-4 mt-5 px-4   ">
      {/* Header */}
      <div className="flex  flex-col gap-3 pt-5 lg:px-4 lg:flex-row">
        <h1 className=" text-2xl lg:text-3xl font-bold lg:flex-1 ">
          Your trusted camping guide
        </h1>
        <p className="text-left  text-gray-600 lg:w-[400px] ">
          Lorem ipsum dolor sit amet consectetur. Et sagittis sit odio urna
        </p>
      </div>
      {/* main-content */}
      <div className="w-full mx-auto flex flex-col lg:flex-row gap-6  ">
        <div className="w-full lg:w-[40%] grid grid-cols-1 md:grid-cols-2 gap-6">
          {
            compinItems.map((item,index)=>(
              <Card key={index} value={item.value} src={item.logo} text={item.text} />
            ))
          }
        
        </div>
        <div className="bg-[#efedeca3] w-full flex flex-col pt-4 lg:flex-row lg:w-[60%] ">
          {/* text-part */}
          <div className="flex flex-col h-[300px] lg:h-[330px]   justify-between gap-2 lg:gap-2 py- px-8">
          <div className="mb-12">
          <h1 className="text-2xl font-bold" >Lorem ipsum dolor sit amet consectetur.</h1>
            <p className="text-sm">Lorem ipsum dolor sit ametfgfdgfd  consectetur. Pellentesquefc fdgf ac odio eu feugiat dui pretium id nulla.</p>
            <p className="text-sm" > In vitae nunc pellentesque congu sdfgds dsf sd e  feugiat nisl morbi congue. Dictumst id quam consequat leo.</p>
          </div>
            <div className="flex w-full justify-between  " >
              <Button  className="bg-orange-700 flex mt-12  justify-end rounded-2xl px-6 hover:bg-hover-400 text-white" > Learn More </Button>
              <div className="">
               <CircularTextComponent />
              </div>
            </div>


          </div>
          {/* image-part */}
          <div className=" w-full">
            <img className="w-full p-8 lg:p-1 lg:mt-3" src="https://togo.uxper.co/wp-content/uploads/2025/04/picture-1.webp" alt="image" />

          </div>
        </div>
      </div>
    </div>
  );
}

export default CampingGuide;

function Card({value,src,text}){
  console.log(value,src,text)
    return(
      <div className="bg-[#efedeca3] p-3 h-[170px] rounded-md   ">
      <div className="  h-full flex flex-col  ">
        <div className="bg-white p-3 flex justify-center  w-14 rounded-lg">
          <img
            src={src}
            alt="logo"
          />
        </div>
        <div className="flex flex-col  items-center pt-8 ">
          <h1 className="flex text-2xl font-bold">
            {" "}
            <ScrollCounterFramer value={value} /> K+{" "}
          </h1>
          <p>{text} </p>
        </div>
      </div>
    </div>
    )

}
