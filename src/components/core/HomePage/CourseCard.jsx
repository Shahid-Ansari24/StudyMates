import React from "react";
import { BsPeopleFill } from "react-icons/bs";
import { TbCategory } from "react-icons/tb";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  return (
    <div className={`w-[360px] h-[300px] cursor-pointer ${currentCard === cardData.title ? "bg-offwhite text-black shadow-[#FFD60A_13px_13px_0px_0px]" : "bg-richblack-cardColor"}`}
    onClick={() => {setCurrentCard(cardData.title)}}>

      <div className="flex flex-col border-b-2 border-richblack-200 border-dashed h-[79%] px-6 py-6">
        <div className={`text-[20px] font-semibold ${currentCard === cardData.title ? "text-black" : "text-richblack-5"}`}>{cardData.title}</div>
        <div className={`text-[16px] py-2 ${currentCard === cardData.title ? "text-richblack-600" : "text-richblack-200"}`}>{cardData.description}</div>
      </div>
      <div className={`flex flex-row justify-between p-4 px-6 font-semibold ${currentCard === cardData.title ? "text-blue-300" : "text-richblack-200"}`}>
        <div className="flex flex-row items-center justify-center gap-2">
          <BsPeopleFill />
          {cardData.level}
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <TbCategory />
          {cardData.lessionNumber}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
