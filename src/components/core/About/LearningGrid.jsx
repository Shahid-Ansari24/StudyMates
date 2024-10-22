import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import CTAButton from '../HomePage/Button';

const LearningGridArray = [
    {
        order: -1,
        heading: "World-Class Learning for",
        highlightText: "Anyone, Anywhere",
        description: "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        btnText: "Learn More",
        btnLink: "/",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description: "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description: "Studynotion partners with more than 275+ leading universities and companies to bring"
    },
    {
        order: 3,
        heading: "Certification",
        description: "Studynotion partners with more than 275+ leading universities and companies to bring"
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description: "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
    },
    {
        order: 5,
        heading: "Ready to Work",
        description: "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
    }
]

const LearningGrid = () => {
  return (
    <div className='grid mx-auto lg:grid-cols-4 mb-10 p-5 lg:w-fit'>
      {
        LearningGridArray.map( (card, index) => {
            return (
                <div
                key={index}
                className={`${index === 0 && "lg: col-span-2 h-[280px] p-5"}
                ${card.order % 2 !== 1 ? (card.order < 0 ? "bg-transparent" : "bg-richblack-700 h-[280px] p-5") : "bg-richblack-800 h-[280px] p-5"}
                ${card.order === 3 && "lg:col-start-2 h-[280px]"}`} >
                    {
                        card.order < 0 ?    
                        (
                            <div className='lg:w-[90%] flex flex-col pb-5 gap-3'>
                                <div className='text-4xl font-semibold'>
                                    <h1>
                                        {card.heading}
                                        <HighlightText text={card.highlightText} />
                                    </h1>
                                </div>
                                <p className='font-medium'>
                                    {card.description}
                                </p>
                                <div className='w-fit'>
                                    <CTAButton active={true} linkTo={card.btnLink}>
                                        {card.btnText}
                                    </CTAButton>
                                </div>
                            </div>
                        ) :
                        (
                            <div className='flex flex-col gap-8 p-5'>
                                <h1 className='text-richblack-5 text-lg'>
                                    {card.heading}
                                </h1>
                                <p className='text-richblack-300 font-medium'>
                                    {card.description}
                                </p>
                            </div>
                        )
                    }
                </div>
            )
        })
      }
    </div>
  )
}

export default LearningGrid
