import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../feature/auth/authSlice";

export function getTotalProductsPerPage() {
    return 10;
}

export function getLoggeduserId(){
    return localStorage.getItem('CurrLoggedUserId');
}


export function gettoastOptions(){
    const toastOptions = {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
    return toastOptions;
}
