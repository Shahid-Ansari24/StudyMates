import {toast} from 'react-hot-toast';
import {setLoading, setToken} from "../../slice/authSlice";
import {apiConnector} from '../apiConnector';
import { endpoints } from '../apis';

const { RESETPASSWORDTOKEN_API,
    RESETPASSWORD_API,
    SENDOTP_API,
    SIGNUP_API
 } = endpoints;


export function sendOtp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", SENDOTP_API, {email})

            console.log("SENDOTP API RESPONSE----", response);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("OTP Send Successfully");
            navigate("/verify-email");

        } catch (error) {
            console.log("SENDOTP API ERROR----", error);
            toast.error("Could not send OTP");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate) {
    return async (dispatch) => {
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType, firstName, lastName, email, password, confirmPassword, otp, navigate
            })

            console.log("SIGN UP API RESPONSE----", response);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Password has been reset successfully");
            navigate("/ ");
        } catch (error) {
            console.log("SIGNUP API ERROR---", error);
            toast.error("Could not signup")
        }
    }
}

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