import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

const ChangeProfilePicture = () => {
  const user = useSelector((state) => state.profile.user);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const changeHandler = (e) => {
    try{
      const fileURL = URL.createObjectURL(e.target.files[0])
      setFile(fileURL);
    }catch (error) {
      console.log(error)
    }
  }

  const selectHandler = () => {
    fileInputRef.current.click();
  }

  const submitHandler = () => {

  }

  useEffect(()=>console.log(file), [])

  return (
    <div>
      <div className='flex justify-between bg-richblack-800 border-2 border-white py-7 px-10'>
        <div className='flex gap-2 items-center'>
          <img src={file ? file : user?.image} alt={`profile-${user?.firstName}`}
          className='aspect-square w-[70px] rounded-full object-cover' />
          <div>
            <p className='font-bold text-[1rem]'>Change Profile Picture</p>
            <div className='flex gap-4 mt-2'>
              <span className='border-2 border-white px-3 py-1'>
                <input type="file" ref={fileInputRef} className='hidden' onChange={changeHandler}/>
                <button onClick={selectHandler} className='outline-0'>
                  Select
                </button>
              </span>
              <button className='border-2 border-white px-3 py-1' onClick={submitHandler}>
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangeProfilePicture
