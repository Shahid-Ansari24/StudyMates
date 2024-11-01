const BASE_URL = process.env.REACT_APP_BASE_URL

export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSWORDTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/resetpassword",
}

// export const profileEndpoints = {}

// export const studentEndpoints = {}

// This to be change to courseEndPoints
export const categories = {
    CATEGORIES_API: BASE_URL + "course/showAllCategories",
}

