import{
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut,
    LuNotebook,
    LuFilePlus,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/dashboard",
    },
    {
        id: "02",
        label: "My Sessions",
        icon: LuNotebook,
        path: "/my-sessions",
    },
    {
        id: "03",
        label: "Create Session",
        icon: LuFilePlus,
        path: "/editor", // assuming this opens a blank new session
    },
     {
        id: "06",
        label: "Logout",
        icon: LuLogOut,
        path: "/logout",
    },
    
]