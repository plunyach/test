import React from "react";
import "../styles/contactUsPage.css";
import { Footer } from "./footer";
import ToolBar from "../component/toolbar";
import CallReciverIcon from "../svg/reciverIcon.svg";
import WhatsappIcon from "../svg/whatsapp.svg";
import LocationIcon from "../svg/locationIcon.svg";
import EmailIcon from "../svg/emailIcon.svg"
import axios from "axios";

const widthOutput = window.screen.width;
const contactHeaderFontSize = (3 / 100) * widthOutput;
const inputHeight = (3 / 100) * widthOutput;
const sendMessegeBtnWidth = (12 / 100) * widthOutput;
const sendMessegeBtnHeight = (3 / 100) * widthOutput;
const detailsFontSize = (1.22 / 100) * widthOutput;

const rightDivHeaderFontSize = (1.2 / 100) * widthOutput;
const rightDivContentFontSize = (1 / 100) * widthOutput;

const contactUsIconwidth = (1.6 / 100) * widthOutput;
const whatsappIconwidth = (1.4 / 100) * widthOutput;

export const ContactUsPAge = () => {

    const [contactUsDetails, setContactUsDetails] = React.useState({
        "fname": "",
        "lname": "",
        "email": "",
        "mobile": "",
        "message": ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactUsDetails((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = JSON.stringify({
            "name": contactUsDetails.fname + " " + contactUsDetails.lname,
            "email": contactUsDetails.email,
            "mobile": contactUsDetails.mobile,
            "message": contactUsDetails.message
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.sizeupp.wezbo.xyz/site/query',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                alert("Your Query has been submitted successfully");
            })
            .catch((error) => {
                console.log(error);
            });
        setContactUsDetails({
            "fname": "",
            "lname": "",
            "email": "",
            "mobile": "",
            "message": ""
        });
    };

    return (<>
        <ToolBar fontColor="black" logo="black" dropDown="black" icons="black" backGroundColor="white" stroke="black" />
        <div className="contactUsMainDiv_ContactUsPage">
            <div className="contactUsInnerMianDiv_COntactUsPage">
                <div className="contactUsHeader_ContactUsPage">
                    <h1 style={{
                        fontSize: `${contactHeaderFontSize}px`
                    }}>Contact Us</h1>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                    <div className="card h-fit max-w-6xl p-5 md:p-12 bg-white">
                        <form onSubmit={handleSubmit}>
                            <div className="nameContactUs_ConrtactUsPage">
                                <div className="firstNameContactUs_ContactUsPage">
                                    <h2 className="text-xs text-gray-600">First Name</h2>
                                    <input className="text-xs"
                                        type="text"
                                        name="fname"
                                        value={contactUsDetails.fname}
                                        placeholder="John"
                                        onChange={handleChange}
                                        style={{
                                            height: `${inputHeight}px`                                           
                                        }}
                                    />
                                </div>
                                <div className="firstNameContactUs_ContactUsPage">
                                    <h2 className="text-xs text-gray-600">Last Name</h2>
                                    <input className="text-xs"
                                        type="text"
                                        name="lname"
                                        value={contactUsDetails.lname}
                                        placeholder="Smith"
                                        onChange={handleChange}
                                        style={{
                                            height: `${inputHeight}px`  
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="phoneContactus_ContactUsPage">
                                <h2 className="text-xs text-gray-600">Phone No.</h2>
                                <input className="text-xs"
                                    type="number"
                                    name="mobile"
                                    value={contactUsDetails.mobile}
                                    onChange={handleChange}
                                    style={{
                                        height: `${inputHeight}px`
                                    }}
                                />

                            </div>
                            <div className="emailContactus_ContactUsPage">
                                <h2 className="text-xs text-gray-600">Email Id</h2>
                                <input className="text-xs"
                                    type="text"
                                    name="email"
                                    value={contactUsDetails.email}
                                    onChange={handleChange}
                                    placeholder="example@gmail.com"
                                    style={{
                                        height: `${inputHeight}px`
                                    }}
                                />

                            </div>
                            <div className="messageContactus_ContactUsPage">
                                <h2 className="text-xs text-gray-600">Message</h2>
                                <textarea className="text-xs"
                                    type="text"
                                    cols={30}
                                    rows={5}
                                    name="message"
                                    value={contactUsDetails.message}
                                    onChange={handleChange}
                                    placeholder="Enter Your Message"
                                    
                                />

                            </div>
                            <div className="sendMessageBtn_ConatctUsPAge">
                                <button
                                    type="submit"
                                    className="text-white px-6 py-3 font-xs rounded-md sm:mb-0"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="h-full pr-6 bg-white">
                        <div className="conatctusLowerInnerMainDiv_ContactUsPage">
                            <div className="numberDetailsMainDiv_ContactUsPage">
                                <div style={{
                                    paddingBottom: "0.5rem"
                                }}>
                                    <img className="h-8 w-10" 
                                    src={CallReciverIcon} alt="phone" />
                                </div>
                                <div style={{
                                    paddingBottom: "0.5rem"
                                }}>
                                    <h2 className="text-xl"
                                    >Phone</h2>
                                </div>
                                <div className="flex gap-2">
                                <img className="h-4 w-6" src={WhatsappIcon} alt="WhatsApp" />
                                    <h3 className="text-xs"
                                    style={{
                                        color: "#494949"
                                    }}>+91 8655255488</h3>
                                </div>
                            </div>
                            <div style={{
                                borderTop: "1px solid #8D8D8D"
                            }} className="numberDetailsMainDiv_ContactUsPage">
                                <div style={{
                                    paddingBottom: "0.5rem"
                                }}>
                                    <img className="h-8 w-10" 
                                    src={LocationIcon} />
                                </div>
                                <div style={{
                                    paddingBottom: "0.5rem"
                                }}>
                                    <h2 className="text-xl">Office Address</h2>
                                </div>
                                <div>
                                    <h3 className="text-xs" style={{
                                        color: "#494949"
                                    }}>Powai, Andheri (E) , Mumbai-400072</h3>
                                </div>
                            </div>
                            <div style={{
                                borderTop: "1px solid #8D8D8D"
                            }} className="numberDetailsMainDiv_ContactUsPage">
                                <div style={{
                                    paddingBottom: "0.5rem"
                                }}>
                                    <img className="h-8 w-10" src={EmailIcon} />
                                </div>
                                <div style={{
                                    paddingBottom: "0.5rem"
                                }}>
                                    <h2 className="text-xl">Email</h2>
                                </div>
                                <div>
                                    <h3 className="text-xs" style={{
                                        color: "#494949"
                                    }}>customercare@sizeupp.com</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>)
}