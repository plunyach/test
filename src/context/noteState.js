import React, { useEffect, useState } from "react";
import NoteContext from "./noteContext";

const Notestate = ({ children }) => {
    const [isHome, setIsHome] = useState(false);
    const [isWishList, setIsWishList] = useState(false);
    const [isCart, setIsCart] = useState(false);
    const [successfullLogin, setSuccessfullLogin] = useState(false);
    const [redirectToProfile, setRedirectToProfile] = useState(false)
    const [userToken, setUserToken] = useState("");
    const [userResponse, setUserResponse] = useState([])
    const [isAccount, setIsAccount] = useState(false)
    const [activeCoupon, setActiveCoupon] = useState({
        status: "",
        code: ""
    })


    // const items = JSON.parse(localStorage.getItem('items'));
    // useEffect(() => {
    //     setUserToken(items)
    //     console.log("checking token===>>>", items)
    // }, [items])


    // console.log("checking LocalStorage", items)




    const values = {
        setIsHome,
        isHome,
        setIsWishList,
        isWishList,
        setIsCart,
        isCart,
        setSuccessfullLogin,
        successfullLogin,
        setRedirectToProfile,
        redirectToProfile,
        setUserToken,
        userToken,
        setUserResponse,
        userResponse,
        // items,
        isAccount,
        setIsAccount,
        setActiveCoupon,
        activeCoupon
    }

    return (
        <NoteContext.Provider value={values}>
            {children}
        </NoteContext.Provider>
    )
}

export default Notestate;