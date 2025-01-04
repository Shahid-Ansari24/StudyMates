import toast from "react-hot-toast";
import { apiConnector } from '../apiConnector'
import { profileEndpoints } from "../apis";

const {
    GET_INSTRUCTOR_DATA_API,
    UPDATE_PROFILE_PICTURE,
    UPDATE_PROFILE_DATA
} = profileEndpoints;

// getUserDetails

// getUserEnrolledCourses

// getInstructorDetails
export async function getInstructorData(token) {
    // const toastId = toast.loading("Loading");
    let result = [];

    try {
        const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, 
            {
                Authorization: `Bearer ${token}`
            }
        )

        console.log("GET_INSTRUCTOR_DATA_RESPONSE---", response);
        result = response?.data?.courses;
    } catch (error) {
        console.log("GET_INSTRUCTOR_API ERROR---", error);
        toast.error("Could not Get Instructor Data")
    }
    // toast.dismiss(toastId);
    return result;
}

// update profile picture
export async function updateProfilePicture(formData, token) {
    try {
        const response = await apiConnector("PUT", UPDATE_PROFILE_PICTURE, formData, 
            {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        );

        return response?.image;
    } catch (error) {
        toast.error("Error while saving profile picture")
        console.log("some error occured while changing profile picture---", error)
    }
}

export async function updateProfile(formData, token) {
    try {
        const response = await apiConnector("PUT", UPDATE_PROFILE_DATA, formData, {
            Authorization: `Bearer ${token}`
        })
        toast.success("profile updated successfully")
        return response?.data.updatedUserDetails;
    } catch (error) {
        toast.error("Error while updating profile");
        console.log("Error while updating profile--", error);
    }
}