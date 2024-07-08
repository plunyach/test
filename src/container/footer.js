import React from "react";
import "../styles/footer.css";
import CompanyLogo from "../svg/SizeuppFinalWebLogo.png";
import linkedInSvg from "../svg/linkedIn.svg";
import InstagramSvg from "../svg/instagram.svg";
import FacebookSvg from "../svg/facebook.svg";
import { pagePaths } from "../utils/constant";
import WezboLogo from "../svg/wezboLogo.svg"
import { Link } from 'react-router-dom'


const widthOutput = window.screen.width;
const heightOutput = window.screen.height;

const headerFontSize = (1.2 / 100) * widthOutput;
const contentFontSize = (0.8 / 100) * widthOutput;
const copyRightFontSize = (1 / 100) * widthOutput;

export const Footer = () => {
    return (<>
        <div className="mainDiv_Footer">
            <div className="upperMainDiv_Footer px-8 py-16 mx-10 flex  md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                    <div>
                        <h1 className="text-lg font-bold text-white tracking-widest mb-3">
                            Company
                        </h1>

                    </div>
                    <div>
                        <h2 className="text-sm">
                            <Link
                                to={pagePaths.aboutUsPage}
                                style={{
                                    textDecoration: "none",
                                    color: "white"
                                }}
                            >
                                About Us
                            </Link>
                        </h2>
                        <h2 className="text-sm">
                            <Link
                                to={pagePaths.contactUsPage}
                                style={{
                                    textDecoration: "none",
                                    color: "white"
                                }}
                            >
                                Contact Us
                            </Link>
                        </h2>
                        <h2 className="text-sm">
                            <Link
                                to={pagePaths.sitemap}
                                style={{
                                    textDecoration: "none",
                                    color: "white"
                                }}
                            >
                                Site Map
                            </Link>
                        </h2>

                    </div>
                </div>
                <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                    <div>
                        <h1 className="text-lg font-bold text-white tracking-widest mb-3">
                            shop
                        </h1>
                    </div>
                    <div>
                        <h2 className="text-sm">
                            <a href={`products/women`}
                                style={{
                                    color: "white",
                                    textDecoration: "none"
                                }}
                            >
                                women
                            </a>
                        </h2>

                        <h2 className="text-sm">
                            <Link to={`products/men`}
                                style={{
                                    color: "white",
                                    textDecoration: "none"
                                }}
                            >
                                men
                            </Link>
                        </h2>
                    </div>
                </div>
                <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                    <div>
                        <h1 className="text-lg font-bold text-white tracking-widest mb-3">
                            policies
                        </h1>
                    </div>
                    <div>
                        <h2 className="text-sm">
                            <Link
                                to={pagePaths.termsOfServices}
                                style={{
                                    textDecoration: "none",
                                    color: "white"
                                }}
                            >
                                Terms & Conditions
                            </Link>
                        </h2>

                        <h2 className="text-sm">
                            <Link
                                to={pagePaths.cancellationPage}
                                style={{
                                    textDecoration: "none",
                                    color: "white"
                                }}
                            >
                                returns, exchange & cancellation
                            </Link>
                        </h2>

                        <h2 className="text-sm">
                            <Link
                                to={pagePaths.faq}
                                style={{
                                    textDecoration: "none",
                                    color: "white"
                                }}
                            >
                                FAQ’s
                            </Link>
                        </h2>

                        
                        <h2 className="text-sm">
                            <Link
                                to={pagePaths.shippingPolicy}
                                style={{
                                    textDecoration: "none",
                                    color: "white"
                                }}
                            >
                                Shipping Policy
                            </Link>
                        </h2>

                        <h2 className="text-sm">
                            <Link
                                to={pagePaths.PrivacyPolicy}
                                style={{
                                    textDecoration: "none",
                                    color: "white"
                                }}
                            >
                                Privacy Policy
                            </Link>
                        </h2>

                    </div>
                </div>
                <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                    <div>
                        <h1 className="text-lg font-bold text-white tracking-widest mb-3">
                            contact
                        </h1>
                    </div>
                    <div>
                        
                        <h2 className="text-sm">
                            <b>Email:</b> customercare@sizeupp.com
                        </h2>
                        <h2 className="text-sm">
                            <b>Phone:</b>   +91 8655255488
                        </h2>
                        <h2 className="text-sm">
                            <b>Store Address: </b>Sizeupp-Mumbai-Breach Candy <br /> 43 - Krishnabad Building, Bhulabhai Desai Road, Opp Akruti Sky Park, <br />Breach Candy, Mumbai 400026.
                        </h2>

                    </div>
                </div>
            </div>
            <div className="lowerMainDiv_Footer">
                <div className="logoMianDiv_Footer">
                    <img src={CompanyLogo} />
                </div>
                <div className="copyRightDiv_Footer">
                    <h1 style={{
                        fontSize: `${copyRightFontSize}px`,
                        textAlign: "center"
                    }}>
                        copyrights © 2023 sizeupp company all rights reserved
                        <span className="spanWezbo">
                            <Link
                                className="wezboLink"
                                to="https://wezbocloud.com/"
                            >
                            </Link>
                        </span>
                    </h1>
                </div>
                <div className="social_Footer">
                    <Link
                        target="blank"
                        to="https://wezbocloud.com/"
                    >
                        <img src={WezboLogo} />
                    </Link>
                    {/* <Link
                        target="blank"
                        to="https://wezbocloud.com/"
                    >
                        <img src={linkedInSvg} />
                    </Link> */}
                    <Link
                        target="blank"
                        to="https://www.instagram.com/sizeupp.in?igsh=bndtanpnNmdlbWt5"
                    >
                        <img src={InstagramSvg} />
                    </Link>
                    <Link
                        target="blank"
                        to="https://www.facebook.com/SizeuppStore?mibextid=ZbWKwL"
                    >
                        <img src={FacebookSvg} />
                    </Link>
                </div>
            </div>
        </div>
    </>)
} 