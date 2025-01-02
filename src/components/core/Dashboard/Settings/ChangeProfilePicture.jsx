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
      <div className='flex justify-between bg-richblack-800 border-2 border-white py-7 px-10'>
        <div className='flex gap-2 items-center'>
          <img src={file?.link || user?.image} alt={`profile-${user?.firstName}`}
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
