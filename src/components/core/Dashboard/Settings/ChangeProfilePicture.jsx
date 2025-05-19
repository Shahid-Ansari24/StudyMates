import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateProfilePicture } from '../../../../services/operation/profileAPI';
import { updateUser } from '../../../../slice/profileSlice';
import toast from 'react-hot-toast';

const ChangeProfilePicture = () => {
  const user = useSelector((state) => state.profile.user);
  const [file, setFile] = useState({file: null, link: null});
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    try{
      const fileURL = URL.createObjectURL(e.target.files[0])
      setFile({file: e.target.files[0], link: fileURL});
    }catch (error) {
      console.log(error)
    }
  }

  const selectHandler = () => {
    fileInputRef.current.click();
  }

  const submitHandler = async () => {
    const formData = new FormData();
    formData.append("displayPicture", file?.file);

    const image = await updateProfilePicture(formData, user.token);

    if(!image) return;
    
    dispatch(updateUser({image: image}))
  }

  useEffect(()=>console.log("display picture---", file), [file])

  return (
    <div>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        <div className='flex gap-2 items-center'>
          <img src={file?.link || user?.image} alt={`profile-${user?.firstName}`}
          className='aspect-square w-[70px] rounded-full object-cover' />
          <div>
            <p className='font-bold text-[1rem]'>Change Profile Picture</p>
            <div className='flex gap-4 mt-2'>
              <span className='px-3 py-1'>
                <input type="file" ref={fileInputRef} className='hidden' onChange={changeHandler}/>
                <button onClick={selectHandler} className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50">
                  Select
                </button>
              </span>
              <button className='cursor-pointer text-lg text-richblack-900 bg-yellow-100 font-semibold rounded-md px-3 py-1' onClick={submitHandler}>
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
