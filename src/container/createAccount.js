import React, { useEffect, useState } from "react";
import "../styles/createAccount.css";
import BackArrow from "../svg/backArrow.svg";
import logo from "../svg/SizeuppFinalWebLogo.png";
import { pagePaths } from "../utils/constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'


const widthOutPut = window.screen.width;
const SignHeaderFontSize = (2.4 / 100) * widthOutPut;
const phone_emailBtnFontSize = (0.8 / 100) * widthOutPut;
const label_inputFontsize = (1.2 / 100) * widthOutPut;
const getOtpBtnFontSize = (1.2 / 100) * widthOutPut;

const createAccountFontSize = (1 / 100) * widthOutPut;

const heightPhone_email = (3.2 / 100) * widthOutPut;
const paddinglabel_inputDiv = (2 / 100) * widthOutPut;

const priceDetailsFontSize = (1.1 / 100) * widthOutPut;

const BuyNowBtnSize = (2.5 / 100) * widthOutPut;

export const CreateAccount = () => {
    const [emailOpen, setEmailOpen] = useState(true)
    const [getOtp, setGetOtp] = useState(false);
    const [offInoutLayout, setOffInputLayout] = useState(true)
    const [otp, setOtp] = useState(new Array(6).fill(""))
    const [selectedGender, setSelectedGender] = useState('');
    const [redirectToSign, setRedirectToSign] = useState(false)
    // console.log("checking gender", selectedGender)
    const navigator = useNavigate()

    const [data, setData] = useState({
        fullname: "",
        email: "",
        mobile: "",
        password: "",
    })


   

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            name: data.fullname,
            email: data.email,
            mobile: data.mobile,
            password: data.password,
            gender: selectedGender
        };
        // axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/signup`, userData).then((response) => {
        //     console.log("checking response", userData, response.status)
        //     // if (response.status === 200) {
        //     //     navigator("/sign-in")
        //     // } else {
        //     //     setRedirectToSign(true)
        //     // }
        // }
        // );

        try {
            fetch((`${process.env.REACT_APP_BACKEND_URL}/user/signup`), {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
                .then(async(response) => { 
                    const responseData = await response.json()
                    if (response.status === 200) {
                        // console.log(responseData)
                        localStorage.setItem('userid', JSON.stringify(responseData.userid))
                        setGetOtp(true)
                        setOffInputLayout(false) 
                        setRedirectToSign(true)
                        //navigator("/sign-in")
                    } else {
                        alert(responseData.error) 
                    }
                })
                .catch(err =>
                    console.log('error ', err)
                );
        } catch (error) {
            console.log(error)
        }
        
    };


    const verifyOtp = (e)=>{
        e.preventDefault(); 
    }
    
    const handleKeyPress = (event) => { 
        if (event.keyCode === 13 || event.which === 13) {
            handleSubmit()
        }
    }

    const handleGenderChange = (e) => {
        setSelectedGender(e.target.value);
    };


    const handleChangeOtp = (element, index) => {
        if (isNaN(element.value)) return false

        setOtp([...otp?.map((d, idx) => (idx === index ? element.value : d))])
        // console.log("checking keys", element.key)

        if (element.nextSibling) {
            element.nextSibling.focus()
        } else if (element.key === 'Backspace') {
            element.previousSibling.focus()
        }

    }

    const handleGetOtp = () => {
        setGetOtp(true)
        setOffInputLayout(false)
        const userData = {
            user_id:Number(localStorage.getItem('userid')),
            otp: otp.join(""),
        };
        try {
            fetch((`${process.env.REACT_APP_BACKEND_URL}/user/verify_otp`), {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
                .then(async(response) => {
                    // console.log(response)
                    if (response.status === 200) {
                        const responseData = await response.json()
                        // console.log(responseData)
                       //localStorage.setItem('userid', JSON.stringify(responseData.userid))
                        //setGetOtp(true)
                        //setOffInputLayout(false)
                        // console.log(response);
                        //setRedirectToSign(true)
                        navigator("/sign-in")
                        // navigator("/shipping-page")
                    } else {
                        alert('error')
                        //setRedirectToSign(true)
                    }
                })
                .catch(err =>
                    console.log('error ', err)
                );
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
        const keyDownHandler = element => {
            handleChangeOtp(element)
        }
        document.addEventListener('keydown', keyDownHandler)
        return () => {
            document.addEventListener('keydown', keyDownHandler)
        }
    }, [])


    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };




    return (<>
        <div className="mainDiv_CreateAccount">
            <div className="innerMainDiv_CreateAccount">
                <div className="toolBar_CreateAccount">
                    <div className="backArrow_CreateAccount">
                        <Link
                            to={pagePaths.root}
                        ><img src={BackArrow} /></Link>
                    </div>
                    <div className="logo_CreateAccount">
                        <Link
                            to={pagePaths.root}
                            style={{
                                display: "flex",
                                justifyContent: "center"
                            }}
                        ><img style={{
                            width: "50%"
                        }} src={logo} /></Link>
                    </div>
                </div>
                <div className="lowerSignContent_CreateAccount">
                    <div className="lowerSignContentMainDiv_CreateAccount">
                        <div className="signInHeader_CreateAccount">
                            <h1 style={{
                                fontSize: `${SignHeaderFontSize}px`
                            }}>Create Account</h1>
                        </div>

                        {/* <div className="phone-email_CreateAccount">
                            <div className="phone-emailInner_CreateAccount">
                                <div style={{
                                    height: `${heightPhone_email}px`
                                }} className="phone_CreateAccount">
                                    <button className="phone_CreateAccount" onClick={() => setEmailOpen(false)} style={{
                                        fontSize: `${phone_emailBtnFontSize}px`,
                                        backgroundColor: `${emailOpen ? "#EEEEEE" : "#2D2D2D"}`,
                                        color: `${emailOpen ? "#2D2D2D" : "#FBFBFB"}`
                                    }}>Phone No.</button>
                                </div>
                                <div style={{
                                    height: `${heightPhone_email}px`
                                }} className="email_CreateAccount">
                                    <button onClick={() => setEmailOpen(true)} style={{
                                        fontSize: `${phone_emailBtnFontSize}px`,
                                        backgroundColor: `${emailOpen ? "#2D2D2D" : "#FBFBFB"}`,
                                        color: `${emailOpen ? "#FBFBFB" : "#2D2D2D"}`
                                    }}>Email</button>
                                </div>
                            </div>
                        </div> */}
                        {
                            offInoutLayout ?
                                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                    <div style={{
                                        padding: `${paddinglabel_inputDiv}px 0px`
                                    }} className="label-input_CreateAccount">

                                        {
                                            emailOpen ? <div className="label_CreateAccount">
                                                <h1 style={{
                                                    fontSize: `${label_inputFontsize * 0.95}px`,
                                                    paddingBottom: `${paddinglabel_inputDiv}px`
                                                }}>Enter Your Details To Get OTP</h1>
                                            </div>
                                                :
                                                <div className="label_CreateAccount">
                                                    <h1 style={{
                                                        fontSize: `${label_inputFontsize * 0.95}px`,
                                                        paddingBottom: `${paddinglabel_inputDiv}px`
                                                    }}>Enter Your Mobile No. To Get OTP</h1>
                                                </div>
                                        }



                                        {
                                            emailOpen ? <div style={{
                                                width: "100%"
                                            }}>
                                                <div className="inputDiv_CreateAccount">
                                                    <input
                                                        className="input_CreateAccount"
                                                        style={{
                                                            fontSize: `${label_inputFontsize * 0.95}px`
                                                        }}
                                                        required
                                                        type="text"
                                                        name="fullname"
                                                        value={data.fullname}
                                                        placeholder="Full Name"
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="inputDiv_CreateAccount">
                                                    <input
                                                        className="input_CreateAccount"
                                                        style={{
                                                            fontSize: `${label_inputFontsize * 0.95}px`
                                                        }}
                                                        required
                                                        type="email"
                                                        name="email"
                                                        value={data.email}
                                                        placeholder="Email"
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="inputDiv_CreateAccount">
                                                    <input
                                                        className="input_CreateAccount"
                                                        style={{
                                                            fontSize: `${label_inputFontsize * 0.95}px`
                                                        }}
                                                        required
                                                        type="text"
                                                        name="mobile"
                                                        value={data.mobile}
                                                        placeholder="Mobile Number"
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="inputDiv_CreateAccount">
                                                    <input
                                                        className="input_CreateAccount"
                                                        style={{
                                                            fontSize: `${label_inputFontsize * 0.95}px`
                                                        }}
                                                        required
                                                        type="password"
                                                        name="password"
                                                        value={data.password}
                                                        placeholder="Password"
                                                        onChange={handleChange}
                                                        onKeyPress={handleKeyPress}
                                                    />
                                                </div>
                                                <div
                                                    className="selectMainRadioDiv_MyOrderPage_MyProfile"
                                                    style={{
                                                        width: `${BuyNowBtnSize * 4}px`,
                                                        height: `${BuyNowBtnSize * 1.2}px`,
                                                        color: "#515151",
                                                        padding: "0"
                                                    }}
                                                >
                                                    <label>
                                                        <input 
                                                            type="radio"
                                                            value="male"
                                                            checked={selectedGender === 'male'}
                                                            // readOnly={userDataUpdate ? false : true}
                                                            onChange={handleGenderChange}
                                                        />
                                                        <h2 style={{
                                                            fontSize: `${priceDetailsFontSize}px`,
                                                            color: `${selectedGender === "male" ? "#515151" : "#999999"}`,
                                                            paddingLeft: "0.3rem",
                                                            fontWeight: 600
                                                        }}>Male</h2>
                                                    </label>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            value="female"
                                                            checked={selectedGender === 'female'}
                                                            onChange={handleGenderChange}
                                                        />
                                                        <h2 style={{
                                                            fontSize: `${priceDetailsFontSize}px`,
                                                            color: `${selectedGender === "female" ? "#515151" : "#999999"}`,
                                                            paddingLeft: "0.3rem",
                                                            fontWeight: 600
                                                        }}>Female</h2>
                                                    </label>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            value="other"
                                                            checked={selectedGender === 'other'}
                                                            onChange={handleGenderChange}
                                                        />
                                                        <h2 style={{
                                                            fontSize: `${priceDetailsFontSize}px`,
                                                            color: `${selectedGender === "other" ? "#515151" : "#999999"}`,
                                                            paddingLeft: "0.3rem",
                                                            fontWeight: 600
                                                        }}>Other</h2>
                                                    </label>
                                                </div>
                                            </div>
                                                : <div className="inputDiv_CreateAccount">
                                                    <input
                                                        className="input_CreateAccount"
                                                        style={{
                                                            fontSize: `${label_inputFontsize * 0.95}px`
                                                        }}
                                                        type="number"
                                                        placeholder="Phone No."
                                                    />
                                                </div>
                                        }
                                        {
                                            getOtp ?
                                                <div className="inputDiv_CreateAccount">
                                                    <input
                                                        className="input_CreateAccount"
                                                        style={{
                                                            fontSize: `${label_inputFontsize * 0.95}px`
                                                        }}
                                                        type="number"
                                                        placeholder="Phone No."
                                                    />
                                                </div>
                                                : null
                                        }

                                    </div>
                                </div> :
                                <div style={{
                                    padding: `${paddinglabel_inputDiv}px 0px`
                                }} className="label-input_CreateAccount">

                                    <div className="label_CreateAccount">
                                        <h1 style={{
                                            fontSize: `${label_inputFontsize * 0.95}px`,
                                            paddingBottom: `${paddinglabel_inputDiv}px`
                                        }}>Enter Your Email To Get OTP</h1>
                                    </div>

                                    <div className="inputOtpDiv_CreateAccount">

                                        {
                                            otp?.map((data, index) => {
                                                return (
                                                    <input
                                                        name="otp"
                                                        type="text"
                                                        maxLength="1"
                                                        key={index}
                                                        value={data}
                                                        onChange={e => handleChangeOtp(e.target, index)}
                                                        onFocus={e => e.target.select()}
                                                    />
                                                )
                                            })
                                        }


                                        {/* <input
                                            name="otp"
                                            type="number"
                                            maxLength="1"
                                        />
                                        <input
                                            name="otp"
                                            type="number"
                                            maxLength="1"
                                        />
                                        <input
                                            name="otp"
                                            type="number"
                                            maxLength="1"
                                        /> */}
                                    </div>
                                    <p>Entered Otp {otp.join("")}</p>

                                </div>
                        }
                        <div className="getOTPBtn_CreateAccount">
                            {
                                getOtp ?
                                    <button style={{
                                        fontSize: `${getOtpBtnFontSize}px`,
                                        height: `${heightPhone_email * 1.1}px`
                                    }}
                                        onClick={handleGetOtp}
                                    >
                                        Verify OTP
                                    </button>
                                    : (emailOpen ? <button style={{
                                        fontSize: `${getOtpBtnFontSize}px`,
                                        height: `${heightPhone_email * 1.1}px`
                                    }}
                                        onClick={(e) => handleSubmit(e)}
                                    >
                                        Submit
                                    </button>
                                        : <button style={{
                                            fontSize: `${getOtpBtnFontSize}px`,
                                            height: `${heightPhone_email * 1.1}px`
                                        }}
                                            onClick={(e) => handleSubmit(e)}
                                        >
                                            GET OTP
                                        </button>)

                            }

                        </div>
                        <div className="createAccount_CreateAccount">
                            <h3 style={{
                                fontSize: `${createAccountFontSize}px`
                            }}><span>Do you have already account?</span>
                                <Link style={{
                                    // textDecoration: "none",
                                    color: "black"
                                }}
                                    to={pagePaths.signIn}
                                >Sign In</Link></h3>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>)
}