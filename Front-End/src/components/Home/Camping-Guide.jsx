

import React from "react";
import CircularTextComponent from "../Lauout/RoatedText";
import ScrollCounterFramer from "../common/Count-components";
import { Button } from "../ui/button";
import PrimaryButton from "../Lauout/Button";




function CampingGuide() {
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
    <div className="container justify-center mx-auto flex flex-col gap-4 mt-5 px-4   ">
      {/* Header */}
      <div className="flex  flex-col gap-3 pt-5 lg:px-4 lg:flex-row">
        <h1 className=" Heading2 lg:flex-1 ">
          Your trusted camping guide
        </h1>
        <p className="text-left paragraphText  text-gray-600 lg:w-[400px] ">
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
          <div className="flex flex-col   justify-between gap-2 lg:gap-2 py- px-8">
          <div className="mb-6">
          <h1 className="Heading2" >Lorem ipsum dolor sit amet consectetur.</h1>
            <p className="paragraphText">Lorem ipsum dolor sit ametfgfdgfd  consectetur. Pellentesquefc fdgf ac odio eu feugiat dui pretium id nulla.</p>
            <p className="paragraphText" > In vitae nunc pellentesque congu sdfgds dsf sd e  feugiat nisl morbi congue. Dictumst id quam consequat leo.</p>
          </div>
            <div className="flex w-full  items-center justify-between  " >
              <div>
              <PrimaryButton text={"Learn More"} />

              </div>
             
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
        <div className="flex flex-col  items-center pt-4 ">
          <h1 className="flex Heading2">
            {" "}
            <ScrollCounterFramer value={value} /> K+{" "}
          </h1>
          <p className="paragraphText-M">{text} </p>
        </div>
      </div>
    </div>
    )

}
