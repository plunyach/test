import React from "react";
import { useRef } from "react";
import "../styles/careerPage.css";
import { Footer } from "./footer";
import ToolBar from "../component/toolbar";
import bannerIng from "../images/careerPageImg.png";
import { useState } from "react";
import { findAllByAltText } from "@testing-library/react";
import CallReciverIcon from "../svg/reciverIcon.svg";
import LocationIcon from "../svg/locationIcon.svg";
import EmailIcon from "../svg/emailIcon.svg"


const widthOutput = window.screen.width;
const careerHeaderFontSize = (3 / 100) * widthOutput;
const bannerHeadingFontSuze = (3 / 100) * widthOutput;
const bannerContentfonstSize = (1 / 100) * widthOutput;
const joinBtnWidth = (8 / 100) * widthOutput;
const joinBtnHeight = (3 / 100) * widthOutput;

const jobOpeningFontSize = (2 / 100) * widthOutput;

const inputHeight = (3 / 100) * widthOutput;
const sendMessegeBtnWidth = (12 / 100) * widthOutput;
const sendMessegeBtnHeight = (3 / 100) * widthOutput;
const detailsFontSize = (1.22 / 100) * widthOutput;

const rightDivHeaderFontSize = (1.2 / 100) * widthOutput;
const rightDivContentFontSize = (1 / 100) * widthOutput;

const contactUsIconwidth = (1.6 / 100) * widthOutput;

const jobOpeningArray = [
    {
        post: "Marketing Executive1",
        level: "Senior Level1",
        description1: "1 lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade. lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade.lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade. lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade.",
        description2: "lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade. lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade.lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade. lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade.",
    },
    {
        post: "Marketing Executive2",
        level: "Senior Level2",
        description1: "2 lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade. lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade.lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade. lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade.",
        description2: "lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade. lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade.lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade. lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade.",
    },
    {
        post: "Marketing Executive3",
        level: "Senior Level3",
        description1: "3 lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade. lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade.lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade. lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade.",
        description2: "lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade. lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade.lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade. lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade.",
    },
    {
        post: "Marketing Executive4",
        level: "Senior Leve4l",
        description1: "4 lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade. lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade.lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade. lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade.",
        description2: "lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade. lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade.lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade. lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade.",
    },
]

export const CareerPage = () => {
    const [descriptionDetails, setDescriptionDetails] = useState([])
    const [openDescription, setOpenDescriptionOpen] = useState(false)
    const [sendJopApplication, setSendJobApplication] = useState([])
    const [sendJopApplicationOpen, setSendJobApplicationOpen] = useState(false)
    const [fileName, setFileName] = useState("");
    const handleFile = (file) => {
        setFileName(file.name);
    };

    const hiddenFileInput = useRef(null);

    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    const handleChange = (event) => {
        const fileUploaded = event.target.files[0];
        handleFile(fileUploaded);
    };

    const handleOpenDescription = (item) => {
        setDescriptionDetails(item)
        setOpenDescriptionOpen(true)

    }

    const handleOpenApplication = (item) => {
        setSendJobApplicationOpen(true)
        setSendJobApplication(item)
    }


    return (<>
        <ToolBar fontColor="black" logo="black" dropDown="black" icons="black" backGroundColor="white" stroke="black" />
        <div className="careerMainDiv_CareerPage">
            <div className="careerInnerMainDiv_CareerPage">
                <div className="careerHeading_CareerPage">
                    <h2 style={{
                        fontSize: `${careerHeaderFontSize}px`
                    }}>Careers</h2>
                </div>
                {
                    sendJopApplicationOpen ?
                        <div className="contactUsLowerDiv_CareerPage">

                            <div className="coontatUsLowerLeftDiv_CareerPage">
                                <div style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center"
                                }}>
                                    <h2>Applying For</h2>
                                    <h2 style={{
                                        fontWeight:600
                                    }}>{sendJopApplication.post}</h2>
                                </div>
                                <div className="nameContactUs_ConrtactUsPage">

                                    <div className="firstNameContactUs_CareerPage">
                                        <h2 style={{
                                            fontSize: `${detailsFontSize}px`
                                        }}>First Name</h2>
                                        <input
                                            type="text"
                                            placeholder="Mohit"
                                            style={{
                                                height: `${inputHeight}px`,
                                                fontSize: `${detailsFontSize}px`
                                            }}
                                        />
                                    </div>
                                    <div className="firstNameContactUs_CareerPage">
                                        <h2 style={{
                                            fontSize: `${detailsFontSize}px`
                                        }}>Last Name</h2>
                                        <input
                                            type="text"
                                            placeholder="Mohit"
                                            style={{
                                                height: `${inputHeight}px`,
                                                fontSize: `${detailsFontSize}px`
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="phoneContactus_CareerPage">
                                    <h2 style={{
                                        fontSize: `${detailsFontSize}px`
                                    }}>Phone No.</h2>
                                    <input
                                        type="number"
                                        style={{
                                            height: `${inputHeight}px`,
                                            fontSize: `${detailsFontSize}px`
                                        }}
                                    />

                                </div>
                                <div className="emailContactus_CareerPage">
                                    <h2 style={{
                                        fontSize: `${detailsFontSize}px`
                                    }}>Email Id</h2>
                                    <input
                                        type="text"
                                        placeholder="mohitchauhan@gmail.com"
                                        style={{
                                            height: `${inputHeight}px`,
                                            fontSize: `${detailsFontSize}px`
                                        }}
                                    />

                                </div>
                                <div className="messageContactus_CareerPage">
                                    <h2 style={{
                                        fontSize: `${detailsFontSize}px`
                                    }}>Message</h2>
                                    <textarea
                                        type="text"
                                        placeholder="Enter Your Message"
                                        style={{
                                            height: `${inputHeight * 3}px`,
                                            fontSize: `${detailsFontSize}px`
                                        }}
                                    />

                                </div>
                                <h2 style={{
                                    fontSize: `${detailsFontSize}px`,
                                    paddingBottom: "1rem"
                                }}>Attach Your Resume</h2>
                                <button className="button-upload" onClick={handleClick}>
                                    +
                                </button>
                                <input
                                    type="file"
                                    onChange={handleChange}
                                    ref={hiddenFileInput}
                                    style={{ display: "none" }}
                                />
                                <h2 style={{
                                    fontSize: `${detailsFontSize}px`,
                                    paddingBottom: "1rem"
                                }}>{fileName}</h2>
                                <div className="sendMessageBtn_CareerPage ">
                                    <button
                                        style={{
                                            width: `${sendMessegeBtnWidth}px`,
                                            height: `${sendMessegeBtnHeight}px`,
                                            fontSize: `${detailsFontSize}px`
                                        }}
                                    >
                                        Send Application
                                    </button>
                                </div>
                            </div>
                            <div className="contactusLowerRightDiv_CareerPage">
                                <div className="conatctusLowerInnerMainDiv_CareerPage">
                                    <div className="numberDetailsMainDiv_CareerPage">
                                        <div style={{
                                            paddingBottom: "0.5rem"
                                        }}>
                                            <img style={{
                                                width: `${contactUsIconwidth}px`
                                            }} src={CallReciverIcon} />
                                        </div>
                                        <div style={{
                                            paddingBottom: "0.5rem"
                                        }}>
                                            <h2 style={{
                                                fontSize: `${rightDivHeaderFontSize}px`
                                            }}>Phone</h2>
                                        </div>
                                        <div>
                                            <h3 style={{
                                                fontSize: `${rightDivContentFontSize}px`,
                                                color:"#494949"
                                            }}>+91 8655255488</h3>
                                        </div>
                                    </div>
                                    <div style={{
                                        borderTop: "1px solid #8D8D8D"
                                    }} className="numberDetailsMainDiv_CareerPage">
                                        <div style={{
                                            paddingBottom: "0.5rem"
                                        }}>
                                            <img style={{
                                                width: `${contactUsIconwidth}px`
                                            }} src={LocationIcon} />
                                        </div>
                                        <div style={{
                                            paddingBottom: "0.5rem"
                                        }}>
                                            <h2 style={{
                                                fontSize: `${rightDivHeaderFontSize}px`
                                            }}>Office Address</h2>
                                        </div>
                                        <div>
                                            <h3 style={{
                                                fontSize: `${rightDivContentFontSize}px`,
                                                color:"#494949",
                                                textAlign:"center"
                                            }}>Powai, Andheri (E) , Mumbai-400072</h3>
                                        </div>
                                    </div>
                                    <div style={{
                                        borderTop: "1px solid #8D8D8D"
                                    }} className="numberDetailsMainDiv_CareerPage">
                                        <div style={{
                                            paddingBottom: "0.5rem"
                                        }}>
                                            <img style={{
                                                width: `${contactUsIconwidth}px`
                                            }} src={EmailIcon} />
                                        </div>
                                        <div style={{
                                            paddingBottom: "0.5rem"
                                        }}>
                                            <h2 style={{
                                                fontSize: `${rightDivHeaderFontSize}px`
                                            }}>Phone</h2>
                                        </div>
                                        <div>
                                            <h3 style={{
                                                fontSize: `${rightDivContentFontSize}px`,
                                                color:"#494949"
                                            }}>customercare@sizeupp.com</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="lowerMainDiv">
                            <div className="banner_CareerPage">
                                <div className="bannerLeftDiv_CareerPage">
                                    <h1 style={{
                                        fontSize: `${bannerHeadingFontSuze}px`
                                    }}>Willing to work with us?</h1>
                                    <p style={{
                                        fontSize: `${bannerContentfonstSize}px`
                                    }}>lörem ipsum mytotropi grexit, krosk trehös. Rarade syde sakavis i krohyrad hemining. Divade.</p>
                                    <button style={{
                                        width: `${joinBtnWidth}px`,
                                        height: `${joinBtnHeight}px`,
                                        fontSize: `${bannerContentfonstSize}px`
                                    }}>
                                        Join Us
                                    </button>
                                </div>
                            </div>
                            <div className="ourOpening_CareerPage">
                                <h1 style={{
                                    fontSize: `${jobOpeningFontSize}px`
                                }}>Our Openings</h1>
                            </div>
                            <div className="jobsMainDiv_CareerPage">
                                {
                                    jobOpeningArray?.map((item, id) => {
                                        return (<>
                                            <div key={id} className="jobOpeningInnerMainDiv_CareerPage">
                                                <div className="jobOpeningInnerInnerMainDiv_CareerPage">
                                                    <div className="jobOpeningLeftDiv">
                                                        <div>
                                                            <h1 style={{
                                                                fontSize: `${bannerContentfonstSize * 1.7}px`
                                                            }}>{item.post}</h1>
                                                        </div>
                                                        <div>
                                                            <h2 style={{
                                                                fontSize: `${bannerContentfonstSize * 1.2}px`
                                                            }}>{item.level}</h2>
                                                        </div>
                                                    </div>
                                                    <div className="jobOpeningRightManDiv_CareerPage">
                                                        <h3 onClick={() => handleOpenDescription(item)}>View Details</h3>
                                                    </div>
                                                </div>
                                                {
                                                    openDescription ?
                                                        <div className="descriptionDetails_CareerPage">
                                                            <h2>Description</h2>
                                                            <p style={{
                                                                fontSize: `${bannerContentfonstSize}px`
                                                            }}>{descriptionDetails.description1}</p>
                                                            <p style={{
                                                                fontSize: `${bannerContentfonstSize}px`
                                                            }} >{descriptionDetails.description2}</p>
                                                            <button style={{
                                                                fontSize: `${jobOpeningFontSize * 0.6}px`
                                                            }}
                                                                onClick={() => handleOpenApplication(descriptionDetails)}
                                                            >
                                                                Apply for this job
                                                            </button>
                                                        </div>

                                                        : null
                                                }
                                            </div>


                                        </>)
                                    })

                                }


                            </div>
                        </div>
                }

            </div>
        </div>
        <Footer />
    </>)
}