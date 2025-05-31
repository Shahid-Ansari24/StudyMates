import toast from "react-hot-toast";
import { apiConnector } from '../apiConnector'
import { settingsEndpoints } from "../apis";

const {
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API
} = settingsEndpoints;

export const changePassword = async(body, token) => {
    try {
        const response = await apiConnector('POST', CHANGE_PASSWORD_API, body, {
            Authorization: `Bearer ${token}`,
        });

        if(!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Password has been updated successfully");
    } catch (error) {
        console.log("error: ", error);
        toast.error(error);
    }
};

export const deleteAccount = async (token) => {
    try {
        const response = await apiConnector('POST', DELETE_PROFILE_API, null, {
            Authorization: `Bearer ${token}`
        })

        if(!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("User has been deleted successfully");
    } catch (error) {
        console.log("error: ", error);
        toast.error(error);
    }
}