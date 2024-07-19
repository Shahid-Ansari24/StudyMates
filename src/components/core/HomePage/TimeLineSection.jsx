import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from '../../../assets/images/TimelineImage.png';

const timeline = [
    {
        logo: Logo1,
        heading: "Leadership",
        description: "Fully committed to the success company",
    },
    {
        logo: Logo2,
        heading: "Responsibility",
        description: "Students will always be our top priority",
    },
    {
        logo: Logo3,
        heading: "Flexibility",
        description: "The ability to switch is an important skills",
    },
    {
        logo: Logo4,
        heading: "Solve the problem",
        description: "Code your way to a solution",
    },
]

const TimeLineSection = () => {
  return (
    <div>
      <div className='flex flex-row justify-between items-center'>
        <div className='w-[45%]] flex-col p-5'>
            {
                timeline.map( (element, index) => {
                    return (
                        <div className='flex flex-row p-6' key={index}>
                            <div className='w-[50px] bg-white flex items-center'>
                                <img src={element.logo} alt="Logo Image" />
                            </div>
                            <div>
                                <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                <p className='text-base'>{element.description}</p>
                            </div>
                        </div>
                    )
                }
            )}
        </div>
        <div>
            <div className='relative shadow-blue-200'>
                <img src={timelineImage} alt="Timeline Image"
                className='shadow-white object-cover h-fit'/>

                <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-10'>
                    <div className='flex flex-row py-3 items-center border-caribbeangreen-300px-7'>
                        <p className='text-3xl font-bold px-5'>10</p>
                        <p className='text-caribbeangreen-300 text-sm px-5'>Years of Experience</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default TimeLineSection
