import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import about1 from '../assets/images/AboutUs/about1.webp';
import about2 from '../assets/images/AboutUs/about2.webp';
import about3 from '../assets/images/AboutUs/about3.webp';
import FoundingStory from '../assets/images/AboutUs/FoundingStory.png'
import Quote from '../components/core/About/Quote';
import StatsComponent from '../components/core/About/Stats';
import LearningGrid from '../components/core/About/LearningGrid';
import ContactFormSection from '../components/core/About/ContactFormSection';

const About = () => {
  return (
    <div className='text-white'>
      {/* section 1 */}
      <section className='bg-richblack-700 lg:h-[70vh] mb-[20vh]'>
        <div className='w-10/12 max-w-maxContent mx-auto'>
            <header className=' pt-[3rem] text-center'>
                <p className='font-bold px-[18%] text-[2.4rem]'>
                  Driving Innovation in Online Education for a 
                  <HighlightText text={'Brighter Future'}/>
                </p>
                <p className='font-bold text-richblack-200 lg:w-[70%] mx-auto mt-3'>
                Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                </p>
            </header>
            <div className='flex flex-wrap mx-auto gap-3 mt-10 justify-between'>
                <img src={about1}/>
                <img src={about2}/>
                <img src={about3} />
            </div>
        </div>
      </section>

      {/* section 2 */}
      <section className='pb-[10vh] border-b-2 border-richblack-600'>
        <div className='w-10/12 max-w-maxContent mx-auto text-4xl font-bold text-center'>
            <Quote/>
        </div>
      </section>

      {/* section 3 */}
      <section className='flex flex-col mt-[8rem] w-10/12 max-w-maxContent mx-auto'>
        <div className='flex gap-10 justify-between mb-10'>
          {/* Founding Story Left Box */}
          <div className='basis-2/4 flex flex-col gap-10'>
            <h1 className='text-4xl font-bold text-[#FF512F]'>Our Founding Story</h1>

            <p className='font-bold text-richblack-300'>
            Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
            </p>

            <p className='font-bold text-richblack-300'>
            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
            </p>
          </div>
          {/* Founding Story Right Box */}
          <div className='basis-1/3'>
            <img src={FoundingStory} alt="Founding story image" />
          </div>
        </div>

        {/* vision and mission parent div */}
        <div className='flex my-[8rem] justify-between'>
          {/* left box */}
          <div className='basis-[37%] font-bold'>
            <h1 className='text-4xl mb-5 text-[#FF512F]'>
              Our Vision
            </h1>
            <p className='text-richblack-300'>
            With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
            </p>
          </div>
          {/* right box */}
          <div className='basis-[37%] font-bold'>
            <h1 className='text-4xl mb-5 text-richblue-100'>
              Our Mission
            </h1>
            <p className='text-richblack-300'>
            Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* section 4 */}
      <StatsComponent />

      {/* section 5 */}
      <section className='flex flex-col items-center justify-between gap-3 mb-[5rem]'>
        <LearningGrid/>
        <ContactFormSection />
      </section>  


      <section>
        <div>
          Review from other Learners
        </div>
      </section>

    </div>
  )
}

export default About
