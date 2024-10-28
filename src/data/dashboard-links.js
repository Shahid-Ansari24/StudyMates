import { ACCOUNT_TYPE } from "../utils/constant";
export const sidebarLinks = [
    {
        id: 1,
        name: "My Profile",
        path: "/Dashboard/My-Profile",
        icon: "VscAccount",
    },
    {
        id: 2,
        name: "Dashboard",
        path: "/Dashboard/Instructor",
        // type: ACCOUNT_TYPE.INSTRUCTOR,
        icon: "VscAccount",
    },
    {
        id: 3,
        name: "My Course",
        path: "/Dashboard/My-Course",
        icon: "VscVm",
    },
    {
        id: 4,
        name: "Add Course",
        path: "/Dashboard/Add-Course",
        // type:  ACCOUNT_TYPE.INSTRUCTOR,
        icon: "VscAdd",
    },
    {
        id: 5,
        name: "Enrolled Course",
        path: "/Dashboard/Enrolled_Course",
        // type:  ACCOUNT_TYPE.STUDENT,
        icon: "VscMortarBoard",
    },
    {
        id: 6,
        name: "Purchase History",
        path: "/Dashboard/Purchase-History",
        // type:  ACCOUNT_TYPE.STUDENT,
        icon: "VscHistory",
    },
]