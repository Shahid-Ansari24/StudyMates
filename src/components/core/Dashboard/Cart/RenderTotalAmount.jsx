import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'


const RenderTotalAmount = () => {

    const {total} = useSelector((state)=>state.cart)
    const handleBuyCourse = () => {
        console.log("buy button clicked");
        // const courses = cart.map((course) => course._id)
    }

  return (
    <div>
      <p>Total:</p>
      <p>Rs {total}</p>

      <IconBtn
      text="Buy Now"
      onClick={handleBuyCourse}
      customClasses={"w-full justify-center"}/>
    </div>
  )
}

export default RenderTotalAmount
