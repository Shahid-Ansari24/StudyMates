import React, { useState } from 'react'
import ProgressBar from "@ramonak/react-progress-bar";


const EnrolledCourses = () => {

  const [enrolledCourses, setEnrolledCourses] = useState([])

  return (
    <div className='text-white'>
        <div>Enrolled Courses</div>
        {
          !enrolledCourses ? (<div>
            Loading...
          </div>)
          : (
            !enrolledCourses.length ? (
              <p>You have not enrolled in any course yet</p>
            )
            : (
              <div>
                <div>
                  <p>Course Name</p>
                  <p>Durations</p>
                  <p>Progress</p>
                </div>
                {
                  enrolledCourses.map((course, index) => {
                    <div key={index}>
                      <div>
                        <img src={course.thumbnail} alt="course thumbnail" />
                        <div>
                          <p>
                            {course.courseName}
                          </p>
                          <p>
                            {course.courseDescription}
                          </p>
                        </div>
                      </div>

                      <div>
                        {course?.totalDuration}
                      </div>
                      <div>
                        <p>Progress: {course.progressPercentage} || 0</p>
                        <ProgressBar completed={course.progressPercentage || 0}
                          height='8px'
                          isLabelVisible={false}/>
                      </div>
                    </div>
                  })
                }
              </div>
            )
          )
        }
    </div>
  )
}

export default EnrolledCourses
