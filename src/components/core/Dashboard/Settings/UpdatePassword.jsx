import React, {useState} from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../../common/IconBtn';
import { useSelector } from 'react-redux';
import toast from "react-hot-toast";
import { changePassword } from '../../../../services/operation/SettingAPI';



const UpdatePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [updatePasswordData, setUpdatePasswordData] = useState({
    oldPassword: '',
    newPassword: '',
  })
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const {oldPassword, newPassword} = updatePasswordData;
    if(oldPassword === newPassword) {
      toast.error("New password is same as old password");
      return;
    }

    await changePassword({oldPassword, newPassword, confirmPassword: newPassword}, token)
  }
  return (
    <>
    <form className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
      <div>
        <h2 className="text-lg font-semibold text-richblack-5 mb-2">Password</h2>
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="relative flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="oldPassword" className="lable-style">
              Current Password
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              id="oldPassword"
              placeholder="Enter Current Password"
              className="form-style"
              value={updatePasswordData.oldPassword}
              onChange={(e) => setUpdatePasswordData(prev => ({...prev, oldPassword: e.target.value}))}
            />
            <span
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute right-24 top-[38px] z-[10] cursor-pointer"
            >
              {showOldPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>
          <div className="relative flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="newPassword" className="lable-style">
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              placeholder="Enter New Password"
              className="form-style"
              value={updatePasswordData.newPassword}
              onChange={(e) => setUpdatePasswordData(prev => ({...prev, newPassword: e.target.value}))}
            />
            <span
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-24 top-[38px] z-[10] cursor-pointer"
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-3">
        <button
          onClick={() => {
            navigate("/dashboard/my-profile")
          }}
          className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
        >
          Cancel
        </button>
        <IconBtn type="submit" onClick={handleSubmit} text="Update" customClasses="text-center font-semibold px-6 py-3 rounded-md font-bold bg-yellow-50 text-black ms-2" />
      </div>
    </form>
  </>
  )
}

export default UpdatePassword
