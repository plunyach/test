import React, { useEffect, useState } from "react";
import "../styles/paymentPages.css";

import ToolBar from "../component/toolbar";
import { Footer } from "./footer";
import { BiChevronDown } from "react-icons/bi";
import BackArrow from "../svg/backtoArrow.svg";
import { pagePaths } from "../utils/constant";
import SuccessSvg from "../svg/successSvg.svg";

const widthOutPut = window.screen.width;
const number_titleFontSize = (1 / 100) * widthOutPut;
const boxNumberSize = (2 / 100) * widthOutPut;

const cartHeaderFontSize = (2.2 / 100) * widthOutPut;

const priceDetailsFontSize = (1.1 / 100) * widthOutPut;
const priceDetailsHeaderFontSize = (2 / 100) * widthOutPut;

const buyNowBtnHeight = (3 / 100) * widthOutPut;
const buyNowBtnFontSize = (1.2 / 100) * widthOutPut;

const inputHeight = (3 / 100) * widthOutPut;
const BuyNowBtnSize = (2.5 / 100) * widthOutPut;
const cardDetailsHeaderFontSize = (0.9 / 100) * widthOutPut;
const productDetailsFontSize = (0.9 / 100) * widthOutPut;




export const PaymenyPages = () => {
    const [creditCard, setCreditCard] = useState(true);
    const [debitCard, setDebitCard] = useState(false);
    const [netBanking, setNetBanking] = useState(false);
    const [upi, setUPI] = useState(false)
    const [expiryYear, setExpiryYear] = useState(null);
    const [openYear, setOpenYear] = useState(false);
    const [openMonth, setOpenMonth] = useState(false);
    const [expiryMonth, setExpiryMonth] = useState(null);
    const [selected, setSelected] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [afterValidate, setAfterValidate] = useState(false);
    const [successPage, setSuccessPage] = useState(false)





    // console.log("checking credit card true", creditCard)

    const handleCreditCard = () => {
        setCreditCard(true);
        setDebitCard(false);
        setNetBanking(false);
        setUPI(false)
    }
    const handleDebitCard = () => {
        setCreditCard(false);
        setDebitCard(true);
        setNetBanking(false);
        setUPI(false)
    }
    const handleNetBanking = () => {
        setCreditCard(false);
        setDebitCard(false);
        setNetBanking(true);
        setUPI(false)
    }
    const handleUPI = () => {
        setCreditCard(false);
        setDebitCard(false);
        setNetBanking(false);
        setUPI(true)
    }

    const arrowStyledYear = {
        // transform: rotate(0)
        transform: `${openYear ? "rotate(180deg)" : "rotate(0)"}`
    }
    const arrowStyledMonth = {
        // transform: rotate(0)
        transform: `${openMonth ? "rotate(180deg)" : "rotate(0)"}`
    }
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "API_KEY");
    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };


    useEffect(() => {
        fetch("https://restcountries.com/v2/all?fields=name")
            .then((res) => res.json())
            .then((data) => {
                setExpiryYear(data);
                setExpiryMonth(data)
            });


        // fetch("https://api.countrystatecity.in/v1/states", requestOptions)
        //     .then(response => response.text())
        //     .then(result => setExpiryMonth(result))
    }, []);


    return (<>
        <div className="UpperMainDiv_PaymentPages">
            <div className="toolBar_ShappingDetails">
                <ToolBar fontColor="#474747" logo="black" dropDown="#474747" icons="#474747" backGroundColor="white" stroke="black" />
            </div>
            {/* <div className="downToolBar_PaymentPages"></div> */}
            {
                successPage ?
                    <div className="successPageMainDiv_PaymentPage">
                        <div className="successInnnerMainPage_PaymentPage">
                            <div className="successSVGMainDiv_PaymentPage">
                                <img src={SuccessSvg} />
                            </div>
                            <div className="orderPlaceContent_PaymentPage">
                                <h2 style={{
                                    fontSize: `${priceDetailsFontSize * 1.5}px`
                                }}>order placed successfully!</h2>
                                <p style={{
                                    fontSize: `${priceDetailsFontSize * 0.8}px`
                                }}>thankyou for shopping with sizeupp, your order is expected to be delivered to you till 23rd mar 2023</p>
                            </div>
                            <div className="viewOrder_PaymentPage">
                                <a
                                    href={pagePaths.myOrderPage}
                                    style={{
                                        textDecoration: "none"
                                    }}
                                >
                                    <p>View Order &nbsp; <img src={BackArrow} /></p>
                                </a>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="mainDiv_PaymentPages">
                        <div className="breadCrumCartMainDiv_PaymentPages">
                            <div className="breadCrumInner_PaymentPages">
                                <div style={{
                                    width: `${boxNumberSize}px`,
                                    height: `${boxNumberSize}px`,
                                    borderColor: "#8A8A8A"
                                }} className="numberBreadCrumMain_PaymentPages">
                                    <h3 style={{
                                        fontSize: `${number_titleFontSize}px`,
                                        color: "#8A8A8A"
                                    }}>1</h3>
                                </div>
                                <div style={{
                                    paddingRight: "0.5rem",
                                    paddingLeft: "0.5rem"
                                }}>
                                    <h3 style={{
                                        fontSize: `${number_titleFontSize}px`,
                                        color: "#8A8A8A"
                                    }}>Cart</h3>
                                </div>
                            </div>
                            <div style={{
                                paddingRight: "1rem",
                                color: "#8A8A8A"
                            }}>----------</div>
                            <div className="breadCrumInner_PaymentPages">
                                <div style={{
                                    width: `${boxNumberSize}px`,
                                    height: `${boxNumberSize}px`,
                                    borderColor: "#8A8A8A"
                                }} className="numberBreadCrumMain_PaymentPages">
                                    <h3 style={{
                                        fontSize: `${number_titleFontSize}px`,
                                        color: "#8A8A8A"
                                    }}>2</h3>
                                </div>
                                <div style={{
                                    paddingRight: "0.5rem",
                                    paddingLeft: "0.5rem"
                                }}>
                                    <h3 style={{
                                        fontSize: `${number_titleFontSize}px`,
                                        color: "#8A8A8A"
                                    }}>Shipping Details</h3>
                                </div>
                            </div>
                            <div style={{
                                paddingRight: "1rem",
                                color: "#8A8A8A"
                            }}>----------</div>
                            <div className="breadCrumInner_PaymentPages">
                                <div style={{
                                    width: `${boxNumberSize}px`,
                                    height: `${boxNumberSize}px`,
                                    borderColor: "#2D2D2D"
                                }} className="numberBreadCrumMain_PaymentPages">
                                    <h3 style={{
                                        fontSize: `${number_titleFontSize}px`,
                                        color: "#2D2D2D"
                                    }}>3</h3>
                                </div>
                                <div style={{
                                    paddingRight: "0.5rem",
                                    paddingLeft: "0.5rem"
                                }}>
                                    <h3 style={{
                                        fontSize: `${number_titleFontSize}px`,
                                        color: "#2D2D2D"
                                    }}>Payment</h3>
                                </div>
                            </div>
                        </div>
                        <div className="cartMainPage_PaymentPages">
                            <div className="cartInnerMainDivPage_PaymentPages">
                                <div className="carProductListMainDiv_PaymentPages">
                                    <div className="shippingHeaderMainDiv_PaymentPages">
                                        <h1 style={{
                                            fontSize: `${cartHeaderFontSize}px`
                                        }}>Payment</h1>
                                    </div>
                                    <div className="paymentGatwayName_PaymentPages" >
                                        <div className="paymentGatwayNameInner_PaymentPages">
                                            <h2 style={{
                                                fontSize: `${cardDetailsHeaderFontSize * 1.2}px`,
                                                fontWeight: `${creditCard ? 600 : 100}`,
                                                borderBottom: `${creditCard ? "2px solid #262626" : "0px solid red"}`
                                            }}
                                                onClick={handleCreditCard}
                                            >Credit Card</h2>
                                            <h2 style={{
                                                fontSize: `${cardDetailsHeaderFontSize * 1.2}px`,
                                                fontWeight: `${debitCard ? 600 : 100}`,
                                                borderBottom: `${debitCard ? "2px solid #262626" : "0px solid red"}`
                                            }}
                                                onClick={handleDebitCard}
                                            >Debit Card</h2>
                                            <h2 style={{
                                                fontSize: `${cardDetailsHeaderFontSize * 1.2}px`,
                                                fontWeight: `${netBanking ? 600 : 100}`,
                                                borderBottom: `${netBanking ? "2px solid #262626" : "0px solid red"}`
                                            }}
                                                onClick={handleNetBanking}
                                            >Net Banking</h2>
                                            <h2 style={{
                                                fontSize: `${cardDetailsHeaderFontSize * 1.2}px`,
                                                fontWeight: `${upi ? 600 : 100}`,
                                                borderBottom: `${upi ? "2px solid #262626" : "0px solid red"}`,
                                                paddingBottom: "1rem"
                                            }}
                                                onClick={handleUPI}
                                            >UPI</h2>
                                        </div>
                                    </div>
                                    <div className="shippingAddressMainDiv_PaymentPages">
                                        <div>

                                            {
                                                creditCard ?
                                                    <div className="creditCardDetails_PaymentPages">
                                                        <div className="creditCardDetailsInner_PaymentPages">
                                                            <div className="cardHolderName_PaymentPages">
                                                                <h2 style={{
                                                                    fontSize: `${cardDetailsHeaderFontSize}px`,
                                                                    paddingBottom: "0.3rem"
                                                                }}>Card Holder Name</h2>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Enter Here"
                                                                    style={{
                                                                        height: `${inputHeight}px`
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="cardNumberName_PaymentPages">
                                                                <h2 style={{
                                                                    fontSize: `${cardDetailsHeaderFontSize}px`,
                                                                    paddingBottom: "0.3rem"
                                                                }}>Card Number</h2>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Enter Here"
                                                                    style={{
                                                                        height: `${inputHeight}px`
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="cardExpery_CVV_PaymentPages">
                                                                <div className="experyMonth_PaymentPage">
                                                                    <h2 style={{
                                                                        fontSize: `${cardDetailsHeaderFontSize}px`,
                                                                        paddingBottom: "0.3rem"
                                                                    }}>Expiry Month</h2>
                                                                    <div
                                                                        onClick={() => setOpenMonth(!openMonth)}
                                                                        className="selectMainDiv_PaymentPages"
                                                                        style={{
                                                                            // width: `${BuyNowBtnSize * 4}px`,
                                                                            height: `${inputHeight}px`,
                                                                        }}
                                                                    >
                                                                        {selected
                                                                            ? selected?.length > 25
                                                                                ? selected?.substring(0, 25) + "..."
                                                                                : selected
                                                                            : "Select"}
                                                                        <BiChevronDown size={20} style={arrowStyledMonth}
                                                                        />
                                                                        {
                                                                            openMonth ? <ul
                                                                                className="selectUl_PaymentPages"
                                                                                style={{
                                                                                    // width: `${BuyNowBtnSize * 4}px`,
                                                                                    top: `${inputHeight}px`,
                                                                                    fontSize: `${productDetailsFontSize}px`
                                                                                }}
                                                                            >
                                                                                {expiryMonth?.map((item) => (
                                                                                    <li
                                                                                        key={item?.name}
                                                                                        onClick={() => {
                                                                                            if (item?.name?.toLowerCase() !== selected.toLowerCase()) {
                                                                                                setSelected(item?.name);
                                                                                                setOpenMonth(false);
                                                                                                setInputValue("");
                                                                                            }
                                                                                        }}
                                                                                    >
                                                                                        {item?.name}
                                                                                    </li>
                                                                                ))}
                                                                            </ul> : null
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="experyYear_PaymentPage">
                                                                    <h2 style={{
                                                                        fontSize: `${cardDetailsHeaderFontSize}px`,
                                                                        paddingBottom: "0.3rem"
                                                                    }}>Expiry Year</h2>
                                                                    <div
                                                                        onClick={() => setOpenYear(!openYear)}
                                                                        className="selectMainDiv_PaymentPages"
                                                                        style={{
                                                                            // width: `${BuyNowBtnSize * 4}px`,
                                                                            height: `${inputHeight}px`,
                                                                        }}
                                                                    >
                                                                        {selected
                                                                            ? selected?.length > 25
                                                                                ? selected?.substring(0, 25) + "..."
                                                                                : selected
                                                                            : "Select"}
                                                                        <BiChevronDown size={20} style={arrowStyledYear}
                                                                        />
                                                                        {
                                                                            openYear ? <ul
                                                                                className="selectUl_PaymentPages"
                                                                                style={{
                                                                                    // width: `${BuyNowBtnSize * 4}px`,
                                                                                    top: `${inputHeight}px`,
                                                                                    fontSize: `${productDetailsFontSize}px`
                                                                                }}
                                                                            >
                                                                                {expiryYear?.map((item) => (
                                                                                    <li
                                                                                        key={item?.name}
                                                                                        onClick={() => {
                                                                                            if (item?.name?.toLowerCase() !== selected.toLowerCase()) {
                                                                                                setSelected(item?.name);
                                                                                                setOpenYear(false);
                                                                                                setInputValue("");
                                                                                            }
                                                                                        }}
                                                                                    >
                                                                                        {item?.name}
                                                                                    </li>
                                                                                ))}
                                                                            </ul> : null
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="cvv_PaymentPage">
                                                                    <h2 style={{
                                                                        fontSize: `${cardDetailsHeaderFontSize}px`,
                                                                        paddingBottom: "0.3rem"
                                                                    }}>CVV</h2>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Enter Here"
                                                                        style={{
                                                                            height: `${inputHeight}px`
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    (
                                                        debitCard ?
                                                            <div className="creditCardDetails_PaymentPages">
                                                                <div className="creditCardDetailsInner_PaymentPages">
                                                                    <div className="cardHolderName_PaymentPages">
                                                                        <h2 style={{
                                                                            fontSize: `${cardDetailsHeaderFontSize}px`,
                                                                            paddingBottom: "0.3rem"
                                                                        }}>Card Holder Name</h2>
                                                                        <input
                                                                            type="text"
                                                                            placeholder="Enter Here"
                                                                            style={{
                                                                                height: `${inputHeight}px`
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div className="cardNumberName_PaymentPages">
                                                                        <h2 style={{
                                                                            fontSize: `${cardDetailsHeaderFontSize}px`,
                                                                            paddingBottom: "0.3rem"
                                                                        }}>Card Number</h2>
                                                                        <input
                                                                            type="text"
                                                                            placeholder="Enter Here"
                                                                            style={{
                                                                                height: `${inputHeight}px`
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div className="cardExpery_CVV_PaymentPages">
                                                                        <div className="experyMonth_PaymentPage">
                                                                            <h2 style={{
                                                                                fontSize: `${cardDetailsHeaderFontSize}px`,
                                                                                paddingBottom: "0.3rem"
                                                                            }}>Expiry Month</h2>
                                                                            <div
                                                                                onClick={() => setOpenMonth(!openMonth)}
                                                                                className="selectMainDiv_PaymentPages"
                                                                                style={{
                                                                                    // width: `${BuyNowBtnSize * 4}px`,
                                                                                    height: `${inputHeight}px`,
                                                                                }}
                                                                            >
                                                                                {selected
                                                                                    ? selected?.length > 25
                                                                                        ? selected?.substring(0, 25) + "..."
                                                                                        : selected
                                                                                    : "Select"}
                                                                                <BiChevronDown size={20} style={arrowStyledMonth}
                                                                                />
                                                                                {
                                                                                    openMonth ? <ul
                                                                                        className="selectUl_PaymentPages"
                                                                                        style={{
                                                                                            // width: `${BuyNowBtnSize * 4}px`,
                                                                                            top: `${inputHeight}px`,
                                                                                            fontSize: `${productDetailsFontSize}px`
                                                                                        }}
                                                                                    >
                                                                                        {expiryMonth?.map((item) => (
                                                                                            <li
                                                                                                key={item?.name}
                                                                                                onClick={() => {
                                                                                                    if (item?.name?.toLowerCase() !== selected.toLowerCase()) {
                                                                                                        setSelected(item?.name);
                                                                                                        setOpenMonth(false);
                                                                                                        setInputValue("");
                                                                                                    }
                                                                                                }}
                                                                                            >
                                                                                                {item?.name}
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul> : null
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <div className="experyYear_PaymentPage">
                                                                            <h2 style={{
                                                                                fontSize: `${cardDetailsHeaderFontSize}px`,
                                                                                paddingBottom: "0.3rem"
                                                                            }}>Expiry Year</h2>
                                                                            <div
                                                                                onClick={() => setOpenYear(!openYear)}
                                                                                className="selectMainDiv_PaymentPages"
                                                                                style={{
                                                                                    // width: `${BuyNowBtnSize * 4}px`,
                                                                                    height: `${inputHeight}px`,
                                                                                }}
                                                                            >
                                                                                {selected
                                                                                    ? selected?.length > 25
                                                                                        ? selected?.substring(0, 25) + "..."
                                                                                        : selected
                                                                                    : "Select"}
                                                                                <BiChevronDown size={20} style={arrowStyledYear}
                                                                                />
                                                                                {
                                                                                    openYear ? <ul
                                                                                        className="selectUl_PaymentPages"
                                                                                        style={{
                                                                                            // width: `${BuyNowBtnSize * 4}px`,
                                                                                            top: `${inputHeight}px`,
                                                                                            fontSize: `${productDetailsFontSize}px`
                                                                                        }}
                                                                                    >
                                                                                        {expiryYear?.map((item) => (
                                                                                            <li
                                                                                                key={item?.name}
                                                                                                onClick={() => {
                                                                                                    if (item?.name?.toLowerCase() !== selected.toLowerCase()) {
                                                                                                        setSelected(item?.name);
                                                                                                        setOpenYear(false);
                                                                                                        setInputValue("");
                                                                                                    }
                                                                                                }}
                                                                                            >
                                                                                                {item?.name}
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul> : null
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <div className="cvv_PaymentPage">
                                                                            <h2 style={{
                                                                                fontSize: `${cardDetailsHeaderFontSize}px`,
                                                                                paddingBottom: "0.3rem"
                                                                            }}>CVV</h2>
                                                                            <input
                                                                                type="text"
                                                                                placeholder="Enter Here"
                                                                                style={{
                                                                                    height: `${inputHeight}px`
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            :
                                                            (netBanking ?
                                                                <div className="creditCardDetails_PaymentPages">
                                                                    <div className="creditCardDetailsInner_PaymentPages">
                                                                        <div className="cardExpery_CVV_PaymentPages">
                                                                            <div style={{
                                                                                width: "100%"
                                                                            }} className="experyYear_PaymentPage">
                                                                                <h2 style={{
                                                                                    fontSize: `${cardDetailsHeaderFontSize}px`,
                                                                                    paddingBottom: "0.3rem"
                                                                                }}>Select Your Bank</h2>
                                                                                <div
                                                                                    onClick={() => setOpenYear(!openYear)}
                                                                                    className="selectMainDiv_PaymentPages"
                                                                                    style={{
                                                                                        // width: `${BuyNowBtnSize * 4}px`,
                                                                                        height: `${inputHeight}px`,
                                                                                    }}
                                                                                >
                                                                                    {selected
                                                                                        ? selected?.length > 25
                                                                                            ? selected?.substring(0, 25) + "..."
                                                                                            : selected
                                                                                        : "Select"}
                                                                                    <BiChevronDown size={20} style={arrowStyledYear}
                                                                                    />
                                                                                    {
                                                                                        openYear ? <ul
                                                                                            className="selectUl_PaymentPages"
                                                                                            style={{
                                                                                                // width: `${BuyNowBtnSize * 4}px`,
                                                                                                top: `${inputHeight}px`,
                                                                                                fontSize: `${productDetailsFontSize}px`
                                                                                            }}
                                                                                        >
                                                                                            {expiryYear?.map((item) => (
                                                                                                <li
                                                                                                    key={item?.name}
                                                                                                    onClick={() => {
                                                                                                        if (item?.name?.toLowerCase() !== selected.toLowerCase()) {
                                                                                                            setSelected(item?.name);
                                                                                                            setOpenYear(false);
                                                                                                            setInputValue("");
                                                                                                        }
                                                                                                    }}
                                                                                                >
                                                                                                    {item?.name}
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul> : null
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                : (upi ?
                                                                    <div style={{
                                                                        display: "flex",
                                                                        flexDirection: "column"
                                                                    }} className="creditCardDetails_PaymentPages">
                                                                        <div className="creditCardDetailsInner_PaymentPages">
                                                                            <div className="cardExpery_CVV_PaymentPages">
                                                                                <div className="cardNumberName_PaymentPages">
                                                                                    <h2 style={{
                                                                                        fontSize: `${cardDetailsHeaderFontSize}px`,
                                                                                        paddingBottom: "0.3rem"
                                                                                    }}>Enter Your UPI Id</h2>
                                                                                    <input
                                                                                        type="text"
                                                                                        placeholder="Enter Here"
                                                                                        style={{
                                                                                            height: `${inputHeight}px`
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {
                                                                            afterValidate ?
                                                                                <div style={{
                                                                                    paddingTop: "1.5rem"
                                                                                }}>
                                                                                    <h1 style={{
                                                                                        fontSize: `${number_titleFontSize * 1.4}px`,
                                                                                    }}>Name:- </h1>
                                                                                </div>
                                                                                :
                                                                                <div className="ValidateBtnDiv_PaymentPages">
                                                                                    <button style={{
                                                                                        width: `${BuyNowBtnSize * 5}px`,
                                                                                        height: `${BuyNowBtnSize * 1.2}px`,
                                                                                    }}
                                                                                        onClick={() => setAfterValidate(true)}
                                                                                    >
                                                                                        Validate <img src={BackArrow} />
                                                                                    </button>
                                                                                </div>
                                                                        }


                                                                    </div>
                                                                    : null)
                                                            )
                                                    )
                                            }
                                        </div>
                                        <div className="lastDivConfirm_PaymentPages">
                                            <div className="backToCart_PaymentPages">
                                                <h1 style={{
                                                    fontSize: `${priceDetailsFontSize}px`,
                                                }}>Amount To Pay</h1>
                                                <h2 style={{
                                                    fontSize: `${priceDetailsFontSize * 1.5}px`,
                                                }}>
                                                    ₹ {(2222).toLocaleString()}
                                                </h2>
                                            </div>
                                            <div className="confrimAddress_PaymentPages">
                                                <button style={{
                                                    width: `${BuyNowBtnSize * 5}px`,
                                                    height: `${BuyNowBtnSize * 1.2}px`,
                                                }}
                                                    onClick={() => setSuccessPage(true)}
                                                >
                                                    Pay Now <img src={BackArrow} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="priceDetailMainDiv_PaymentPages">
                                    <div className="priceDetailsUpperMainDiv_PaymentPages">
                                        <div className="priceDetailUpperInnerDiv_PaymentPages">
                                            <div className="PriceDetailsHeader_PaymentPages">
                                                <h1 style={{
                                                    fontSize: `${priceDetailsHeaderFontSize}px`
                                                }}>Price Details</h1>
                                            </div>
                                            <div className="pricingDetailsDiv_PaymentPages">
                                                <div className="priceDiv_PaymentPages">
                                                    <h2 style={{
                                                        fontSize: `${priceDetailsFontSize}px`
                                                    }}>Price</h2>
                                                    <h2 style={{
                                                        fontSize: `${priceDetailsFontSize}px`
                                                    }}>₹ {(2222).toLocaleString()}</h2>
                                                </div>
                                                <div className="discountDiv_PaymentPages">
                                                    <h2 style={{
                                                        fontSize: `${priceDetailsFontSize}px`
                                                    }}>Discount</h2>
                                                    <h2 style={{
                                                        fontSize: `${priceDetailsFontSize}px`,
                                                        color: "#00E150"
                                                    }}>- ₹  {(22).toLocaleString()}</h2>
                                                </div>
                                                <div className="deliveryDiv_PaymentPages">
                                                    <h2 style={{
                                                        fontSize: `${priceDetailsFontSize}px`
                                                    }}>Delivery Charges</h2>
                                                    <h2 style={{
                                                        fontSize: `${priceDetailsFontSize}px`,
                                                        color: "#00E150"
                                                    }}>Free</h2>
                                                </div>
                                                <div className="couponDiv_PaymentPages">
                                                    <h2 style={{
                                                        fontSize: `${priceDetailsFontSize}px`
                                                    }}>Coupon Applied</h2>
                                                    <h2 style={{
                                                        fontSize: `${priceDetailsFontSize}px`,
                                                        color: "#00E150"
                                                    }}>- ₹  {(400).toLocaleString()}</h2>
                                                </div>
                                            </div>
                                            <div className="subTotalDiv_PaymentPages">
                                                <h1 style={{
                                                    fontSize: `${priceDetailsFontSize * 1.1}px`
                                                }}>
                                                    Subtotal
                                                </h1>
                                                <h1 style={{
                                                    fontSize: `${priceDetailsFontSize * 1.1}px`
                                                }}>
                                                    ₹ {(1800).toLocaleString()}
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }

        </div>
        <Footer />
    </>)
}