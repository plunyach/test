import React, { useEffect, useState } from "react";
import "../styles/signInMobile.css";
import BackArrow from "../svg/backArrow.svg";
import logo from "../svg/SizeuppFinalWebLogo.png";
import { pagePaths } from "../utils/constant";
import axios from "axios";
import { useContext } from "react";
import noteContext from "../context/noteContext";
import { Loader } from "rsuite";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";

const widthOutPut = window.screen.width;
const SignHeaderFontSize = (2.4 / 100) * widthOutPut;
const phone_emailBtnFontSize = (0.8 / 100) * widthOutPut;
const label_inputFontsize = (1.2 / 100) * widthOutPut;
const getOtpBtnFontSize = (1.2 / 100) * widthOutPut;

const createAccountFontSize = (1 / 100) * widthOutPut;

const heightPhone_email = (3.2 / 100) * widthOutPut;
const paddinglabel_inputDiv = (2 / 100) * widthOutPut;

export const SignInMobile = () => {

  //sweet alert

  const showAlert = (text) => {
    Swal.fire(text);
  };
  //end

  const [forgotPassword, setForgotPassword] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [getOtp, setGetOtp] = useState(false);
  const [offInoutLayout, setOffInputLayout] = useState(true);
  const [userNotFount, setUserNotFOunt] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [redirectToSign, setRedirectToSign] = useState(false);
  const [disableEmailShow, setdisableEmailShow] = useState(false);

  const [isOtpSent, setIsOtpSent] = useState(false);

  const pricefrompdp = useSelector((s) => s.quantitySlice).initialState
    ?.quantity;
  const configfrompdp = useSelector((s) => s.configSlice).initialState?.config;

  const {
    setSuccessfullLogin,
    successfullLogin,
    setRedirectToProfile,
    setUserToken,
    userToken,
    userResponse,
    redirectToProfile,
  } = useContext(noteContext);
  const navigate = useNavigate();

  const [logindata, setLoginData] = useState({
    email: "",
    password: "",
    mobile: "",
    type: "email",
    otp: "",
    showPassword: false,
  });

  const handleReset = (e) => {
    if (e) e.preventDefault();
    const userData = {
      email : logindata.email
    };

    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/user/forgot-password`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }).then((resp) => {
        
        if(resp.status == 200)
          {
            toast.success("OTP Sent Successfully", {
              position: toast.POSITION.TOP_RIGHT
            });
            
          }
          else
          {
            toast.error("Something went wrong, Try Again", {
              position: toast.POSITION.TOP_RIGHT
            });
            

          }

        setForgotPassword(false);
      });
    } catch (error) {
      
    }
  }

  const resendOTP = () => {
    const userData = {
      email : logindata.email,
      type :  logindata.mobile != null ? "SMS" : "EMAIL",
      mobile : logindata.mobile
    };
    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/user/resend-otp`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }).then(async (resp) => {
        var tempRes = await resp.json();
        if(resp.status == 200)
          {
            toast("OTP Sent Successfully");
          }
          else
          {
            toast(tempRes.error ?? 'Something went wrong');
          }

      });
    } catch (error) {
      
    }
  };
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const userData = {
      email: logindata.email,
      password: logindata.password,
      mobile: logindata.mobile,
      type: logindata.mobile
        ? "SMS"
        : logindata.email && logindata.password
          ? "LOGIN"
          : "EMAIL",
    };

    // console.log(userData)
    // return;
    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then(async (response) => {
          const responseData = await response.json();
          console.log("responseresponse",response)
          if (response.status === 200) {

            // navigate('/my-order-page')
            //navigate(-1)
            if (userData.mobile || (userData.email && !userData.password)) {
              // console.log(1111)
              //setGetOtp(true)
              localStorage.setItem("items", JSON.stringify(responseData.token));
              localStorage.setItem("userid", JSON.stringify(responseData.userId));
              if (userData.type === "SMS") {
                setdisableEmailShow(true);
                setIsOtpSent(true);
                toast("OTP sent on mobile");
                
              }
              setGetOtp(true);
              setOffInputLayout(false);
              // console.log(response);
              setRedirectToSign(true);
            } else {
              if (pricefrompdp) {
                for (let i = 1; i <= pricefrompdp; i++) {
                  try {
                    const response = await axios.request(configfrompdp);
                  } catch (error) {
                    console.error(error);
                    // If one failed request should stop further requests, uncomment the following:
                    // break;
                  }
                }
                // Redirect after ALL requests have been attempted
                // window.location.href = pagePaths.cartPage;
                navigate("/cart-page");

                navigate("/shipping-page");
              } else {
                navigate("/");
              }

              return (
                setSuccessfullLogin(true),
                setRedirectToProfile(true),
                setOffInputLayout(true)
              );
            }
          } else if (
            responseData.error ===
            "Cannot read properties of null (reading 'id')"
          ) {
            showAlert("Account Does Not exist");
            // setUserNotFOunt(true)
            setOffInputLayout(true);
          } else {
            // console.log(response);
            // console.log(responseData);
            // console.log(1111)
            showAlert("Invalid Error Contact to admin");
            return setSuccessfullLogin(false);
          }
        })
        .catch(
          (err) => console.log("error ", err)
          // console.log("checking error in sign", `${process.env.REACT_APP_BACKEND_URL}/auth/login`, err)
        );
    } catch (error) { }

    //setGetOtp(false)
    // setOffInputLayout(false)
    //setEmailOpen(true);
  };

  const handleGetOtp = () => {
    setGetOtp(true);
    setOffInputLayout(false);
    const userData = {
      user_id: Number(localStorage.getItem("userid")),
      otp: String(otp.join("")),
      type: logindata.mobile ? "SMS" : "EMAIL",
    };
    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/verify`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then(async (response) => {

          const responseData2 = await response.json();
          if (response.status === 200 && responseData2.token !== null) {

            localStorage.setItem("items", JSON.stringify(responseData2.token));
            localStorage.setItem("userid", JSON.stringify(responseData2.userId));

            localStorage.setItem("items", JSON.stringify(responseData2.token));
            toast(responseData2.message);
            // const responseData = await response.json()
            if (pricefrompdp) {
              navigate("/shipping-page");
            } else {
              navigate("/");
            }
            return (
              setSuccessfullLogin(true),
              setRedirectToProfile(true),
              setOffInputLayout(true)
            );
            // console.log(responseData)
            //localStorage.setItem('userid', JSON.stringify(responseData.userid))
            //setGetOtp(true)
            //setOffInputLayout(false)
            // console.log(response);
            //setRedirectToSign(true)
            //navigator("/sign-in")
          } else {
            alert(responseData2.error);
            //setRedirectToSign(true)
          }
        })
        .catch((err) => console.log("error ", err));
    } catch (error) {
    }
  };
  const handleKeyPress = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      handleSubmit();
    }
  };

  // console.log("checking signIn", offInoutLayout)

  const handleChange = (e) => {
    const value = e.target.value;
    setLoginData({
      ...logindata,
      [e.target.name]: value,
    });
  };

  const handlePasswordVisibilityChange = (e) => {
    const { checked } = e.target;
    if (checked) {
      setLoginData({
        ...logindata,
        showPassword: true,
        password: "",
      });
    } else {
      setLoginData({
        ...logindata,
        showPassword: false,
      });
    }
  };

  const handleChangeOtp = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp?.map((d, idx) => (idx === index ? element.value : d))]);
    // console.log("checking keys", element.key)

    // if (element.nextSibling) {
    //   element.nextSibling.focus();
    // } else if (element.key === "Backspace") {
    //   element.previousSibling.focus();
    // }
  };
  const handleKeyUpOtp = (element, index, event) => {
    if (event.key === "Backspace") {
        if (element.previousSibling) {
            element.previousSibling.focus();
        }
    } else {
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    }
};



  setTimeout(() => {
    return setSuccessfullLogin(false);
  }, 1000);
  if (successfullLogin) {
    // navigate("/my-order-page");
    // navigate(-1);
  }

  useEffect(() => {
    const keyDownHandler = (element) => {
      handleChangeOtp(element);
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.addEventListener("keydown", keyDownHandler);
    };
  }, []);

  useEffect(() => {
    const nonBlankElementsCount = otp?.filter((element) => {
      // Check for non-blank element (not an empty string, not null, and not undefined)
      return element !== "" && element !== null && element !== undefined;
    }).length;

    if (nonBlankElementsCount === 4) {
      handleGetOtp();
    }
  }, [otp]);

  useEffect(() => {
    
    if (logindata?.mobile?.length === 10) {
      handleSubmit();
    }
  }, [logindata]);

  return (
    <>
      <div className="mainDiv_SignInMobile">
        <div className="innerMainDiv_SignInMobile">
          <div className="toolBar_SignInMobile">
            <div className="backArrow_SignInMObile">
              <a href={pagePaths.root} onClick={() => {
                localStorage.removeItem("items");
                localStorage.removeItem("userid");
              }}>
                <img src={BackArrow} />
              </a>
            </div>
            <div className="logo_SignInMobile">
              <a
                href={pagePaths.root}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  style={{
                    width: "50%",
                  }}
                  src={logo}
                />
              </a>
            </div>
          </div>
          <div className="lowerSignContent_SignInMobile">
            <div className="lowerSignContentMainDiv_SignInMobile">
              <div className="signInHeader_SignInMobile">
                <h1
                  style={{
                    fontSize: `${SignHeaderFontSize}px`,
                  }}
                >
                  Sign In
                </h1>
              </div>

              <div className="phone-email_SignInMobile">
                <div className="phone-emailInner_SignInMobile">
                  <div
                    style={{
                      height: `${heightPhone_email}px`,
                    }}
                    className="phone_SignIMobile"
                  >
                    <button
                      className="phone_SignInMobile"
                      onClick={() => setEmailOpen(false)}
                      style={{
                        fontSize: `${phone_emailBtnFontSize}px`,
                        backgroundColor: `${emailOpen ? "#EEEEEE" : "#2D2D2D"}`,
                        color: `${emailOpen ? "#2D2D2D" : "#FBFBFB"}`,
                      }}
                    >
                      Phone No.
                    </button>
                  </div>
                  {!isOtpSent ? <div
                    style={{
                      height: `${heightPhone_email}px`,
                    }}
                    className="email_SignIMobile"
                  >

                    <button
                      onClick={() => {
                        setEmailOpen(true); setGetOtp(false);
                        setOffInputLayout(true);

                      }}
                      style={{
                        fontSize: `${phone_emailBtnFontSize}px`,
                        backgroundColor: `${emailOpen ? "#2D2D2D" : "#eeeeee"}`,
                        color: `${emailOpen ? "#FBFBFB" : "#2d2d2d"}`,
                      }}
                    >
                      Email
                    </button>
                  </div> : ''}
                </div>
              </div>
              {offInoutLayout ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      padding: `${paddinglabel_inputDiv}px 0px`,
                    }}
                    className="label-input_SignInMobile"
                  >
                    {emailOpen ? (
                      <div className="label_SignInMobile">
                        <h1
                          style={{
                            fontSize: `${label_inputFontsize * 0.95}px`,
                            paddingBottom: `${paddinglabel_inputDiv}px`,
                          }}
                        >
                          Enter Your Email And Password
                        </h1>
                      </div>
                    ) : (
                      <div className="label_SignInMobile">
                        <h1
                          style={{
                            fontSize: `${label_inputFontsize * 0.95}px`,
                            paddingBottom: `${paddinglabel_inputDiv}px`,
                          }}
                        >
                          Enter Your Mobile No. To Get OTP
                        </h1>
                      </div>
                    )}

                    {emailOpen ? (
                      <div className="inputDiv_SignInMobile">
                        <input
                          className="input_SignInMobile"
                          style={{
                            fontSize: `${label_inputFontsize * 0.95}px`,
                          }}
                          type="email"
                          name="email"
                          value={logindata.email}
                          placeholder="Email Address"
                          onChange={handleChange}
                        />
                        {
                          !forgotPassword &&
                            <>
                          <input
                            className={`input_SignInMobile ${!logindata.showPassword ? "" : "hidden"
                              }`}
                            style={{
                              fontSize: `${label_inputFontsize * 0.95}px`,
                            }}
                            type="password"
                            name="password"
                            value={logindata.password}
                            placeholder="Password"
                            onChange={handleChange}
                            onKeyDown={handleKeyPress}
                          />
                        
                        <input
                          type="checkbox"
                          className="form-control"
                          style={{ marginTop: "10px" }}
                          name="otpChecked"
                          checked={logindata.showPassword}
                          onChange={handlePasswordVisibilityChange}
                        />
                        <label> Login with OTP</label>
                        </>
                    }
                      </div>
                    ) : (
                      <div className="inputDiv_SignInMobile">
                        <input
                          className="input_SignInMobile"
                          style={{
                            fontSize: `${label_inputFontsize * 0.95}px`,
                          }}
                          placeholder="Phone No."
                          type="phone"
                          name="mobile"
                          value={logindata.mobile}
                          onChange={handleChange}
                          onKeyDown={handleKeyPress}
                        />
                      </div>
                    )}
                    {getOtp ? (
                      successfullLogin ? null : (
                        <div className="inputDiv_SignInMobile">
                          <input
                            className="input_SignInMobile"
                            style={{
                              fontSize: `${label_inputFontsize * 0.95}px`,
                            }}
                            type="number"
                            placeholder="Phone No."
                          />
                        </div>
                      )
                    ) : null}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    padding: `${paddinglabel_inputDiv}px 0px`,
                  }}
                  className="label-input_SignInMobile"
                >
                  <div className="label_SignInMobile">
                    <h1
                      style={{
                        fontSize: `${label_inputFontsize * 0.95}px`,
                        paddingBottom: `${paddinglabel_inputDiv}px`,
                      }}
                    >
                      Enter the OTP
                    </h1>
                  </div>

                  <div className="inputOtpDiv_SignInMobile">
                    {otp?.map((data, index) => {
                      return (
                        <input
                          name="otp"
                          type="text"
                          maxLength="1"
                          key={index}
                          value={data}
                          onChange={(e) => handleChangeOtp(e.target, index)}
                          onFocus={(e) => e.target.select()}
                          onKeyUp={(e) => handleKeyUpOtp(e.target, index, e)}
                        />
                      );
                    })}

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
              )}
              <div className="getOTPBtn_SignInMobile">
                {getOtp ? (
                  <div>
                  <button
                    style={{
                      fontSize: `${getOtpBtnFontSize}px`,
                      height: `${heightPhone_email * 1.1}px`,
                      width : '200px'
                    }}
                    onClick={handleGetOtp}
                  >
                    Verify OTP
                  </button>
                      <p
                      onClick={resendOTP}
                      style={{cursor:'pointer','marginTop' : '20px',textAlign:'center'}}
                      >Resend OTP</p>
                  </div>
                ) : emailOpen ? (
                  userNotFount ? (
                    <button
                      style={{
                        fontSize: `${getOtpBtnFontSize}px`,
                        height: `${heightPhone_email * 1.1}px`,
                      }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      style={{
                        fontSize: `${getOtpBtnFontSize}px`,
                        height: `${heightPhone_email * 1.1}px`,
                      }}
                      onClick={forgotPassword ? handleReset : handleSubmit}
                    >
                      {forgotPassword ? "Reset" : "Submit"}
                    </button>
                  )
                ) : (
                  <button
                    style={{
                      fontSize: `${getOtpBtnFontSize}px`,
                      height: `${heightPhone_email * 1.1}px`,
                    }}
                    onClick={handleSubmit}
                  >
                    Get OTP
                  </button>
                )}
              </div>
              <div className="createAccount_SignInMobile">
                <h3
                  style={{
                    fontSize: `${createAccountFontSize}px`,
                  }}
                >
                  <span>
                    {userNotFount ? (
                      <span
                        style={{
                          color: "red",
                        }}
                      >
                        Invalid User Credential
                      </span>
                    ) : (
                      "Do not have account?"
                    )}
                  </span>{" "}
                  <a
                    style={{
                      // textDecoration: "none",
                      color: "black",
                    }}
                    href={pagePaths.createAccount}
                  >
                    Create Account
                  </a>


                </h3>

              </div>
              { /* <p style={{cursor:"pointer"}} onClick={() => {
                  setForgotPassword(true);
                  setEmailOpen(true);
              }}>Forgot Password?</p> */ }
            </div>
          </div>
        </div>
      </div>
      {/* {successfullLogin ? (
        <div className="quickViewMainDiv_MyOrder_TrendingProduct">
          <div className="quickViewInnerMainDiv_TrendingProduct">
            <div className="successfullMessage_SignIn">
              <h1
                style={{
                  fontSize: `${SignHeaderFontSize}px`,
                }}
              >
                Sign In Successfull
              </h1>
            </div>
            <p
              style={{
                fontSize: `${SignHeaderFontSize * 0.5}px`,
              }}
            >
              redirect to main Profile Page
            </p>
            <Loader size="md" />
          </div>
        </div>
      ) : null} */}
    </>
  );
};
