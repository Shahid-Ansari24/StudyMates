import {toast} from 'react-hot-toast';
import {setLoading, setToken} from "../../slice/authSlice";
import {apiConnector} from '../apiConnector';
import { endpoints } from '../apis';

export function login(email, password, navigate) {
    return async (dispatch) => {
        // const toastId = toast.loading("Loading")
        // dispatch(setLoading(true))
        // try {
        //     const response = await apiConnect("POST", LOGIN_API, {email, password})

        //     console.log("LOGIN RESPONSE---", response);
        // }
    }
}

export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const { RESETPASSWORDTOKEN_API } = endpoints;

            const response = await apiConnector("POST", RESETPASSWORDTOKEN_API, {email});

            console.log("resetPasswordToken response-------", response);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Reset Email Sent");
            setEmailSent(true);
        } catch (error) {
            console.log("RESET PASSWORD TOKEN ERROR", error);
            toast.error("Failed to send email for reseting password");
        }
        dispatch(setLoading(false));
    }
}

export function resetPassword(password, confirmPassword, token) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {
            const { RESETPASSWORD_API } = endpoints;
            const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token})

            console.log("RESET Password Response----", response);


            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Password has been reset successfully");
        } catch (error) {
            console.log("RESET PASSWORD TOKEN Error", error);
            toast.error("Unable to reset password");
        }
        dispatch(setLoading(false));
    }
}