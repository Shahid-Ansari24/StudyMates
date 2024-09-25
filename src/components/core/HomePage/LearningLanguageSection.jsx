import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from "../../../assets/images/Know_your_progress.png";
import compare_with_others from "../../../assets/images/Compare_with_others.svg";
import plan_your_lessons from "../../../assets/images/Plan_your_lessons.svg";
import CTAButton from "../../../components/core/HomePage/Button.jsx";

const LearningLanguageSection = () => {
  return (
    <div>
      <div className='flex flex-col items-center gap-5 mb-10'>
        
        <div className='text-4xl font-semibold text-center'>
          Your Swiss Knife for
          <HighlightText text={"learning any language"}/>
        </div>
        <div className='text-center text-richblack-600 mx-auto text-base w-[65%] font-medium'>
          Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>
        
        <div className='flex flex-row items-center justify-center mt-5'>
          <img src={know_your_progress}
           alt="know your progress image" 
           className='object-contain -mr-32'/>
          <img src={compare_with_others}
           alt="know your progress image" 
           className='object-contain'/>
          <img src={plan_your_lessons}
           alt="know your progress image" 
           className='object-contain -ml-36'/>
        </div>

        <div className='w-fit'>
          <CTAButton active={true} linkTo={'/signup'}>
              <div>
                Learn More
              </div>
          </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection
