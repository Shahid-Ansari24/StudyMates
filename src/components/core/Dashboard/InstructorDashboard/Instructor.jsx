import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getInstructorData } from '../../../../services/operation/profileAPI';

const Instructor = () => {

    const {token} = useSelector((state) => state.auth);

    const  [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourseDataWithStats = async () => {
            setLoading(true);
            const instructorApiData = await getInstructorData(token);
            // const result = await fetchInstructorCourses(token);

            console.log("instructorApiData---", instructorApiData);

            if(instructorApiData.length)
                setInstructorData(instructorApiData)

            // if(result)
            //     setCourses(result);

            setLoading(false);
        }    
        
        getCourseDataWithStats(); 
    }, [])

  return (
    <div className='text-white'>
      Hello
    </div>
  )
}

export default Instructor
