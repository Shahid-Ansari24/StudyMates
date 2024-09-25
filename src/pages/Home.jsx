import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import homePageBanner from "../assets/images/homePageBanner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection.jsx";
import ExploreMore from "../components/core/HomePage/ExploreMore.jsx";

// Pending -> Create Footer
const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto font-inter flex flex-col w-11/12 max-w-maxContent items-center justify-between text-white">
        <Link to="/signup">
          <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-1000 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-full">
            <div className="flex flex-row items-center shadow-2xl gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-4">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className="mt-4 text-center w-[70%] text-lg font-bold text-richblack-200">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkTo={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkTo={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="mx-3 my-11 shadow-blue-200 w-8/12">
          <video muted loop autoPlay className="w-full">
            <source src={homePageBanner} type="video/mp4" />
          </video>
        </div>

        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={"coding potential "} />
                with our online courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              linkTo: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkTo: "/signup",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>
          <html ln="en">
          <head>
            <title>StudyMates</title>
          </head>
          <body>
          <section>
            <h2>This is Your Developer Shahid</h2>
            <p>We love coding</p>
          </section>
          </body>`}
            codeColor={"text-yellow-25"}
          />
        </div>

        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={"coding potential "} />
                with our online courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              linkTo: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkTo: "/signup",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>
          <html ln="en">
          <head>
            <title>StudyMates</title>
          </head>
          <body>
          <section>
            <h2>This is Your Developer Shahid</h2>
            <p>We love coding</p>
          </section>
          </body>`}
            codeColor={"text-yellow-25"}
          />
        </div>

        <ExploreMore/>
      </div>

      {/* ----------- Section 2 ------------ */}
      <div className="bg-puregreys-5 text-richblack-700">
        <div className="homepage_bg h-[333px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto">
            <div className="h-[200px]"></div>
            <div className="flex flex-row gap-7 text-white">
              <CTAButton active={true} linkTo={"/signup"}>
                <div className="flex gap-1 items-center">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkTo={"/signup"}>
                <div className="flex gap-1 items-center">Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-10/12 max-w-maxContent flex flex-col item-center justify-between gap-7 ">
          <div className="flex flex-row gap-5 mb-10 mt-[95px] justify-between">
            <div className="text-4xl font-semibold w-[45%]">
              Get the Skills you need for a
              <HighlightText text={"Job that is in demand"} />
            </div>
            <div className="flex flex-row gap-10 w-[45%]">
              <div className="text-[16px] px-[40px]">
                The modern StudyMates is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
                <div className="flex mt-7">
                  <CTAButton active={true} linkTo={"/signup"}>
                    <div>Learn More</div>
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
          <TimeLineSection />

          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 */}
      <div className="w-11/12 mx-auto mx-w-maxContent flex flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white">
      
              <InstructorSection/>

              <h2 className="text-center text-4xl font-semibold mt-10">Review from Other Learners</h2>

              {/* Review Slider */}
      </div>

      {/* Section 4 (Footer) */}
    </div>
  );
};

export default Home;
