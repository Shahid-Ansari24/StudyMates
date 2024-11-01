import React from 'react'
import { useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";


const RenderCartCourses = () => {

    const {cart} = useSelector((state)=>state.cart)

  return (
    <div>
        {
            cart.map((course, index) => (
                <div>
                    <div>
                        <img src={course.thumbnail} alt="course thumbnail" />
                        <div>
                            <p>{course?.courseName}</p>
                            <p>{course?.category?.name}</p>
                            <div>
                                <span>4.8</span>
                                <ReactStars
                                count={5}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<FaStar />}
                                fullIcon={<FaStar />}/>

                                <span>
                                    {course?.ratingAndReviews?.length} Ratings
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button>
                            <RiDeleteBin5Line/>
                            Remove
                        </button>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default RenderCartCourses
