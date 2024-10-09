import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import about1 from '../assets/images/AboutUs/about1.webp';
import about2 from '../assets/images/AboutUs/about2.webp';
import about3 from '../assets/images/AboutUs/about3.webp';
import Quote from '../components/core/About/Quote';

const About = () => {
  return (
    <div className='mt-[100px] text-white'>
      {/* section 1 */}
      <section>
        <div>
            <header>
                Driving Innovation in Online Education for a 
                <HighlightText text={'Brighter Future'}/>
                <p>
                Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                </p>
            </header>
            <div className='flex mx-auto gap-x-3'>
                <img src={about1}/>
                <img src={about2}/>
                <img src={about3} />
            </div>
        </div>
      </section>

      {/* section 2 */}
      <section>
        <div>
            <Quote/>
        </div>
      </section>
    </div>
  )
}

export default About
