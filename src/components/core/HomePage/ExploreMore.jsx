import React, { useState } from 'react';
import { homePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText.jsx';
import CourseCard from './CourseCard.jsx';

const tabsName = [
    "Free",
    "New to Coding",
    "Most Popular",
    "Skill Paths",
    "Career Paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(homePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(homePageExplore[0].courses[0].title);

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = homePageExplore.filter( (course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0]?.courses[0].title);
    console.log("courses---",courses);
  }

  return (
    <div>
      <div className='text-4xl font-semibold text-center'>
        Unlock the 
        <HighlightText text={"Power of Code"}/>
      </div>

      <p className='text-center text-richblack-300 font-semibold text-lg mt-3'>
        Learn to build anything you can imagine
      </p>

      <div className='mt-5 flex flex-row rounded-full bg-richblack-800 mb-5 border-2 border-richblack-100 py-1 px-1'>
        {
          tabsName.map( (element, index) => {
            return (
              <div
              className={`text-[16px] flex flex-row items-center gap-2
              ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium"
                : "text-richblack-200"
              } rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`} key={index} 
              onClick={() => setMyCards(element)}>
                {element}
              </div>
            )
          })
        }
      </div>

      <div className='lg:h-[150px]'>

      {/* course card group */}

      <div className='absolute flex flex-row justify-between gap-10 w-[11/12] left-28 mt-4'>
        {
          courses.map( (element, index) => {
            return (
              <CourseCard
              key={index}
              cardData={element}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
              />
            )
          })
        }
      </div>

      </div>
    </div>
  )
}

export default ExploreMore
