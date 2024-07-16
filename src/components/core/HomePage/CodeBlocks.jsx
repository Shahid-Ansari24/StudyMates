import React from 'react';
import CTAButton from '../HomePage/Button';
import HighlightText from './HighlightText';
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor
}) => {
  return (
    <div className={`flex ${position} w-8/12 my-20 justify-between gap-10 mx-auto`}>
      
      {/* Section 1 */}
      <div className='w-[50%] flex flex-col gap-0'>
        {heading}
        <div className='text-richblack-200 font-bold mt-4'>
          {subheading}
        </div>
        <div className='flex gap-7 mt-7'>
          <CTAButton active={ctabtn1.active} linkTo={ctabtn1.linkTo}>
            <div className='flex gap-2 items-center'>
              {ctabtn1.btnText}
              <FaArrowRight/>
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkTo={ctabtn2.linkTo}>
            <div className='flex gap-2 items-center'>
              {ctabtn2.btnText}
              <FaArrowRight/>
            </div>
          </CTAButton>
        </div>
      </div>

      {/* Section 2 */}
      <div className='h-fit flex flex-row text-[10px] w-[100%] py-4 lg:w-[500px]  text-base'> 
        {/* Pending -> BG gradient */}
        <div className='text-center flex flex-col w-[10%] text-richblack-400 font-bold'>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>
        <div className={`w-fit flex flex-col gap-2 font-bold ${codeColor}`}>
          <TypeAnimation
            sequence={[codeblock, 3000, ""]}
            repeat={Infinity}
            omitDeletionAnimation={true}
            style={
              {
                whiteSpace: "pre-line",
                display: "block",
              }
            }
          />
        </div>
      </div>
    </div>
  )
}

export default CodeBlocks
