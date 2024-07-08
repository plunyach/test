import React, { useEffect, useReducer, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../styles/myOrderPage.css";
import "../styles/trackOrderProgressBar.css"
import StateAndCityData from "../container/sateAndCity.json";
import CountryData from "../container/country.json";
import { BiChevronDown } from "react-icons/bi";
import { useContext } from "react";
import noteContext from "../context/noteContext";
import { useCallback } from "react";
import axios from "axios";


const widthOutPut = window.screen.width;
const userNameFontSize = (1.3 / 100) * widthOutPut
const leftContentFontSize = (0.9 / 100) * widthOutPut;
const signOutBtnHeight = (3 / 100) * widthOutPut;

const orderDateDetailsFontSize = (1.1 / 100) * widthOutPut;
const productDetailsFontSize = (0.9 / 100) * widthOutPut;

const BuyNowBtnSize = (2.5 / 100) * widthOutPut;
const priceDetailsFontSize = (1.1 / 100) * widthOutPut;
const moreItemFontSize = (0.9 / 100) * widthOutPut;

const reviewImgWidth = (20 / 100) * widthOutPut;
const reviewImgHeight = (14.7 / 100) * widthOutPut;
const descriptionBoxHeight = (8 / 100) * widthOutPut;


export const ShippingAddress = () => {
    const [userToken, setUserToken] = useState()
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectCityArray, setCityArray] = useState();
    const [selectedBillingCity, setSelectedBillingCity] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedBillingState, setSelectedBillingState] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("India");
    const [selectedBillingCountry, setSelectedBillingCountry] = useState("");
    
    const [addShippingAdd, setAddShippingAdd] = useState(false)
    const [addBillingAdd, setAddBillingAdd] = useState(false)
    const [selectBillingCityArray, setBillingCityArray] = useState();

    const [openCountry, setOpenCountry] = useState(false);
    const [openState, setOpenState] = useState(false);
    const [openCity, setOpenCity] = useState(false);

    const [openCityB, setOpenCityB] = useState(false);
    const [openCountryB, setOpenCountryB] = useState(false);
    const [openStateB, setOpenStateB] = useState(false);

    const [shippindAddress, setShippingAddress] = useState("")
    const [shippindBillingAddress, setShippingBillingAddress] = useState("")
    const [shippindAddressPin, setShippingAddressPin] = useState("")
    const [shippindBillingAddressPin, setShippingBillingAddressPin] = useState("")
        
    const [handleSublineSave, setHandleSubmitSaveBilling] = useState()
    const [handleSublineSaveShipping, setHandleSubmitSaveShipping] = useState();

    const [selectedBillingCityStateCountry, setSelectedBillingCityStateCountry] = useState([])
    const [selectedShippingCityStateCountry, setSelectedShippingCityStateCountry] = useState([])
    const [showShippingAddress, setShowShippingAddress] = useState(false)
   
    const [address, setAddress] = useState([])
    const [userdata, setUserData] = useState([]) 


    const [productDetailsStatus, setProducDetailsStatus] = useState({
        status: "",
        ean: ""
    })


    selectedBillingCityStateCountry.city = selectedBillingCity;
    selectedBillingCityStateCountry.state = selectedBillingState;
    selectedBillingCityStateCountry.country = selectedBillingCountry;
    selectedBillingCityStateCountry.shippingMainAddress = shippindBillingAddress;
    selectedBillingCityStateCountry.shippingAddressPinCode = shippindBillingAddressPin;

    selectedShippingCityStateCountry.city = selectedCity;
    selectedShippingCityStateCountry.state = selectedState;
    selectedShippingCityStateCountry.country = selectedCountry;
    selectedShippingCityStateCountry.shippingMainAddress = shippindAddress;
    selectedShippingCityStateCountry.shippingAddressPinCode = shippindAddressPin;


    let token = JSON.parse(localStorage.getItem('items')) ? JSON.parse(localStorage.getItem('items')) : ""

    const arrowStyled = {
        // transform: rotate(0)
        transform: `${openCountry ? "rotate(180deg)" : "rotate(0)"}`
    }

    const userdetails = (e, sortBy, sortCategories) => {
        try {
          fetch(`${process.env.REACT_APP_BACKEND_URL}/user/info`, {
            method: "GET",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization:
                `Bearer ${token}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              setUserData(data);

            })
            .catch(err =>
              console.log('error ', err)
            );
        } catch (error) {
          console.log(error)
        }
    }

    let shouldLog = true;

    useEffect(() => {
      if(shouldLog) {
        shouldLog = false;
        userdetails();
      }
    }, []);



    const handleAddressSubmit = () => {
        const newDataObject = {
            key: selectedShippingCityStateCountry.length + 1,
        };
        setHandleSubmitSaveBilling([...selectedBillingCityStateCountry, selectedBillingCityStateCountry]);
        setHandleSubmitSaveShipping([...selectedShippingCityStateCountry, selectedShippingCityStateCountry]);
        setShowShippingAddress(true)


        if (selectedCity) {
            
            const shippingaddressData = {
                address1: shippindAddress,
                address2: "2",
                city: selectedCity,
                state: selectedState,
                pincode: shippindAddressPin,
                country: selectedCountry,
                phone: "8824433482",
                fName: "Rohit",
                lName: "Kumar"
            }
    
    
            try {
                fetch((`${process.env.REACT_APP_BACKEND_URL}/user/address/add`), {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization:
                            `Bearer ${token}`,
                    },
                    body: JSON.stringify(shippingaddressData)
                })
                    .then((response) => {
                        // if (response.status !== 200) {
                            // setCouponStatus(true)
                            // setVerifyCoupon(true)
                        // }
                    })
                    .catch(err =>
                        console.log('error ', err)
                    );
            } catch (error) {
                console.log(error)
            }

        }



        if (selectedBillingCity) {
            
            const billingaddressData = {
                address1: shippindBillingAddress,
                address2: "2",
                city: selectedBillingCity,
                state: selectedBillingState,
                pincode: shippindBillingAddressPin,
                country: selectedBillingCountry,
                phone: "8824433482",
                fName: "Rohit",
                lName: "Kumar"
            }
    
    
            try {
                fetch((`${process.env.REACT_APP_BACKEND_URL}/user/address/add`), {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization:
                            `Bearer ${token}`,
                    },
                    body: JSON.stringify(billingaddressData)
                })
                    .then((response) => {
                        // if (response.status !== 200) {
                            // setCouponStatus(true)
                            // setVerifyCoupon(true)
                        // }
                    })
                    .catch(err =>
                        console.log('error ', err)
                    );
            } catch (error) {
                console.log(error)
            }

        }

    }

    const handleShippingAddAddress = () => {
        setAddShippingAdd(true)
        setAddBillingAdd(false)
    }

    const handleBillingAddAddress = () => {
        setAddShippingAdd(false)
        setAddBillingAdd(true)
    }


return (<>

<div className="personalDetailsRightMainDiv_MyOrderPage_MyProfile">
<div className="addressDetailsHeadder_MyOrderPage_MyProfile">

<h1 style={{
        fontSize: `${userNameFontSize}px`
}}>Address details:</h1>
</div>
<div style={{
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "90%"
}}>
    <div className="shipping_billingAddress_MyOrderPage_MyProfile">

        {
            addShippingAdd || !showShippingAddress ?
                <div className="shippingDetailsContentDiv_MyOrderPage_MyProfile">
                    <div className="shippingDetailsContentAddreddDiv_MyOrderPage_MyProfile">
                        <h2 style={{
                            fontSize: `${priceDetailsFontSize}px`,
                            color: "#515151",
                            fontWeight: 600
                        }}>Shipping Address</h2>
                        <input
                            style={{
                                height: `${BuyNowBtnSize * 1.2}px`,
                                color: "#515151",
                            }}
                            type="text"
                            value={shippindAddress}
                            name="shippindAddress"
                            onChange={(e) => setShippingAddress(e.target.value)}
                        />
                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingTop: "1rem"
                    }}>
                        <div className="selectCityInnerMainDivLower_MyOrderPage_MyProfile">
                            <h2 style={{
                                fontSize: `${priceDetailsFontSize}px`,
                                color: "#515151",
                                paddingBottom: "0.3rem"
                            }}>Country</h2>
                            <div
                                onClick={() => setOpenCity(!openCity)}
                                className="selectMainDivLower_MyOrderPage_MyProfile"
                                style={{
                                    // width: `${BuyNowBtnSize * 4}px`,
                                    height: `${BuyNowBtnSize}px`,
                                }}
                            >
                                {selectedCountry
                                    ? selectedCountry?.length > 8
                                        ? selectedCountry?.substring(0, 8) + "..."
                                        : selectedCountry
                                    : "Select Country"}
                                <BiChevronDown size={20} style={arrowStyled}
                                />
                                {
                                    openCity ? <ul
                                        className="selectUlLower_MyOrderPage_MyProfile"
                                        style={{
                                            // width: `${BuyNowBtnSize * 4}px`,
                                            top: `${BuyNowBtnSize}px`,
                                            fontSize: `${productDetailsFontSize * 1.4}px`,
                                            padding: "0.5rem"
                                        }}
                                    >
                                        {CountryData?.country?.map((item) => (
                                            <li
                                                key={item.name}
                                                onClick={() => {
                                                    if (item.name?.toLowerCase() !== selectedCountry.toLowerCase()) {
                                                        setSelectedCountry(item.name);
                                                        setCityArray()
                                                        setOpenCity(false);
                                                        setInputValue("");
                                                    }
                                                }}
                                                                                            >
                                                {item.name}
                                            </li>

                                        )
                                        )
                                        }
                                    </ul> : null
                                }
                            </div>
                        </div>
                        <div className="selectInnerMainDiv_MyOrderPage_MyProfile">
                            <h2 style={{
                                fontSize: `${priceDetailsFontSize}px`,
                                color: "#515151",
                                paddingBottom: "0.3rem"
                            }}>Pincode</h2>
                            <div
                                className="selectMainInputDiv_MyOrderPage_MyProfile"
                                style={{
                                    width: `${BuyNowBtnSize * 4}px`,
                                    height: `${BuyNowBtnSize}px`,
                                }}
                            >
                                <input
                                    type="number"
                                    value={shippindAddressPin}
                                    name="shippindAddressPin"
                                    onChange={(e) => setShippingAddressPin(e.target.value)}
                                    style={{
                                        fontSize: `${priceDetailsFontSize}px`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="selectUpperMainDivv_MyOrderPage_MyProfile">
                        <div className="selectInnerMainDiv_MyOrderPage_MyProfile">
                            <h2 style={{
                                fontSize: `${priceDetailsFontSize}px`,
                                color: "#515151",
                                paddingBottom: "0.3rem"
                            }}>State</h2>
                            <div
                                onClick={() => setOpenCountry(!openCountry)}
                                className="selectMainDiv_MyOrderPage_MyProfile"
                                style={{
                                    // width: `${BuyNowBtnSize * 4}px`,
                                    height: `${BuyNowBtnSize}px`,
                                }}
                            >
                                {selectedState
                                    ? selectedState?.length > 8
                                        ? selectedState?.substring(0, 8) + "..."
                                        : selectedState
                                    : "Select State"}
                                <BiChevronDown size={20} style={arrowStyled}
                                />
                                {
                                    openCountry ? <ul
                                        className="selectUl_MyOrderPage_MyProfile"
                                        style={{
                                            // width: `${BuyNowBtnSize * 4}px`,
                                            top: `${BuyNowBtnSize}px`,
                                            fontSize: `${productDetailsFontSize * 1.4}px`,
                                            padding: "0.5rem"
                                        }}
                                    >
                                        {StateAndCityData.states?.map((districtsList, id) => {
                                            return (<>
                                                <li
                                                    key={districtsList.state}
                                                    onClick={() => {
                                                        if (districtsList.state?.toLowerCase() !== selectedState.toLowerCase()) {
                                                            setSelectedState(districtsList.state);
                                                            setCityArray(districtsList.districts)
                                                            setOpenCity(false);
                                                            setInputValue("");
                                                        }
                                                    }}
                                                >
                                                    {districtsList.state}
                                                </li>
                                            </>)
                                        })
                                        }
                                    </ul> : null
                                }
                            </div>
                        </div>
                        <div className="selectInnerMainDiv_MyOrderPage_MyProfile">
                            <h2 style={{
                                fontSize: `${priceDetailsFontSize}px`,
                                color: "#515151",
                                paddingBottom: "0.3rem"
                            }}>City</h2>
                            <div
                                onClick={() => setOpenState(!openState)}
                                className="selectMainDiv_MyOrderPage_MyProfile"
                                style={{
                                    width: `${BuyNowBtnSize * 4}px`,
                                    height: `${BuyNowBtnSize}px`,
                                }}
                            >
                                {selectedCity
                                    ? selectedCity?.length > 8
                                        ? selectedCity?.substring(0, 8) + "..."
                                        : selectedCity
                                    : "Select City"}
                                <BiChevronDown size={20} style={arrowStyled} />
                                {
                                    openState ? <ul
                                        className="selectUl_MyOrderPage_MyProfile"
                                        style={{
                                            // width: `${BuyNowBtnSize * 4}px`,
                                            top: `${BuyNowBtnSize}px`,
                                            fontSize: `${productDetailsFontSize * 1.4}px`,
                                            padding: "0.5rem"
                                        }}
                                    >
                                        {selectCityArray?.map((item) => (
                                            <li
                                                key={item}
                                                onClick={() => {
                                                    if (item?.toLowerCase() !== selectedState.toLowerCase()) {
                                                        setSelectedCity(item);
                                                        setOpenState(false);
                                                        setInputValue("");
                                                    }
                                                }}
                                                                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
                : (showShippingAddress ?
                    <div>
                        <h2>Shipping Address</h2>
                        <div onClick={handleShippingAddAddress} className="addShippingAddress_MyOrderPage_MyProfile">

                            {
                                address?.map((details, id) => {
                                    return (<>
                                        <h2 style={{
                                            fontSize: `${priceDetailsFontSize * 0.9}px`,
                                            color: "#515151",
                                            paddingLeft: "0.3rem",
                                            fontWeight: 600
                                        }}>{details.address1}, {details.address2}, {details.city}, {details.state}, {details.country}- {details.pincode}</h2>
                                    </>)
                                })
                            }
                        </div>
                    </div>
                    :
                    <div onClick={handleShippingAddAddress} className="addShippingAddress_MyOrderPage_MyProfile">
                        <h2 style={{
                            fontSize: `${priceDetailsFontSize}px`,
                            color: "#515151",
                            paddingLeft: "0.3rem",
                            fontWeight: 600
                        }}>+ Add Shipping Address</h2>
                    </div>
                )

        }
        {
            addBillingAdd ?
                <div style={{
                    paddingTop: "1rem"
                }} className="shippingDetailsContentDiv_MyOrderPage_MyProfile">
                    <div className="shippingDetailsContentAddreddDiv_MyOrderPage_MyProfile">
                        <h2 style={{
                            fontSize: `${priceDetailsFontSize}px`,
                            color: "#515151",
                            fontWeight: 600
                        }}>Billing Address</h2>
                        <input
                            type="text"
                            value={shippindBillingAddress}
                            name="shippindBillingAddress"
                            onChange={(e) => setShippingBillingAddress(e.target.value)}
                            style={{
                                fontSize: `${priceDetailsFontSize}px`,
                            }}
                        />
                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingTop: "1rem"
                    }}>
                        <div className="selectCityInnerMainDivLower_MyOrderPage_MyProfile">
                            <h2 style={{
                                fontSize: `${priceDetailsFontSize}px`,
                                color: "#515151",
                                paddingBottom: "0.3rem"
                            }}>Country</h2>
                            <div
                                onClick={() => setOpenCityB(!openCityB)}
                                className="selectMainDivLower_MyOrderPage_MyProfile"
                                style={{
                                    // width: `${BuyNowBtnSize * 4}px`,
                                    height: `${BuyNowBtnSize}px`,
                                }}
                            >
                                {selectedBillingCountry
                                    ? selectedBillingCountry?.length > 8
                                        ? selectedBillingCountry?.substring(0, 8) + "..."
                                        : selectedBillingCountry
                                    : "Select Country"}
                                <BiChevronDown size={20} style={arrowStyled}
                                />
                                {
                                    openCityB ? <ul
                                        className="selectUlLower_MyOrderPage_MyProfile"
                                        style={{
                                            // width: `${BuyNowBtnSize * 4}px`,
                                            top: `${BuyNowBtnSize}px`,
                                            fontSize: `${productDetailsFontSize}px`,
                                            padding: "0.5rem"
                                        }}
                                    >
                                        {CountryData?.country?.map((item, index) => (
                                            <li
                                                key= {index}
                                                onClick={() => {
                                                    if (item.name?.toLowerCase() !== selectedCountry.toLowerCase()) {
                                                        setSelectedBillingCountry(item.name);
                                                        setCityArray()
                                                        setOpenCityB(false)
                                                        setInputValue("");
                                                    }
                                                }}
                                                                                            >
                                                {item.name}
                                            </li>
                                        ))}
                                    </ul> : null
                                }
                            </div>
                        </div>
                        <div className="selectInnerMainDiv_MyOrderPage_MyProfile">
                            <h2 style={{
                                fontSize: `${priceDetailsFontSize}px`,
                                color: "#515151",
                                paddingBottom: "0.3rem"
                            }}>Pincode</h2>
                            <div
                                className="selectMainInputDiv_MyOrderPage_MyProfile"
                                style={{
                                    width: `${BuyNowBtnSize * 4}px`,
                                    height: `${BuyNowBtnSize}px`,
                                }}
                            >
                                <input
                                    type="number"
                                    value={shippindBillingAddressPin}
                                    name="shippindBillingAddressPin"
                                    onChange={(e) => setShippingBillingAddressPin(e.target.value)}
                                    style={{
                                        fontSize: `${priceDetailsFontSize}px`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="selectUpperMainDivv_MyOrderPage_MyProfile">
                        <div className="selectInnerMainDiv_MyOrderPage_MyProfile">
                            <h2 style={{
                                fontSize: `${priceDetailsFontSize}px`,
                                color: "#515151",
                                paddingBottom: "0.3rem"
                            }}>Sate</h2>
                            <div
                                onClick={() => setOpenCountryB(!openCountryB)}
                                className="selectMainDiv_MyOrderPage_MyProfile"
                                style={{
                                    // width: `${BuyNowBtnSize * 4}px`,
                                    height: `${BuyNowBtnSize}px`,
                                }}
                            >
                                {selectedBillingState
                                    ? selectedBillingState?.length > 8
                                        ? selectedBillingState?.substring(0, 8) + "..."
                                        : selectedBillingState
                                    : "Select State"}
                                <BiChevronDown size={20} style={arrowStyled}
                                />
                                {
                                    openCountryB ? <ul
                                        className="selectUl_MyOrderPage_MyProfile"
                                        style={{
                                            // width: `${BuyNowBtnSize * 4}px`,
                                            top: `${BuyNowBtnSize}px`,
                                            fontSize: `${productDetailsFontSize}px`
                                        }}
                                    >
                                        {StateAndCityData.states?.map((districtsList, id) => (
                                            <li
                                                key={id}
                                                onClick={() => {
                                                    if (districtsList?.state?.toLowerCase() !== selectedBillingState.toLowerCase()) {
                                                        setSelectedBillingState(districtsList.state);
                                                        setBillingCityArray(districtsList.districts)
                                                        setOpenCountryB(false);
                                                        setInputValue("");
                                                    }
                                                }}
                                                                                            >
                                                {districtsList.state}
                                            </li>
                                        ))}
                                    </ul> : null
                                }
                            </div>
                        </div>
                        <div className="selectInnerMainDiv_MyOrderPage_MyProfile">
                            <h2 style={{
                                fontSize: `${priceDetailsFontSize}px`,
                                color: "#515151",
                                paddingBottom: "0.3rem"
                            }}>City</h2>
                            <div
                                onClick={() => setOpenStateB(!openStateB)}
                                className="selectMainDiv_MyOrderPage_MyProfile"
                                style={{
                                    width: `${BuyNowBtnSize * 4}px`,
                                    height: `${BuyNowBtnSize}px`,
                                }}
                            >
                                {selectedBillingCity
                                    ? selectedBillingCity?.length > 8
                                        ? selectedBillingCity?.substring(0, 8) + "..."
                                        : selectedBillingCity
                                    : "Select City"}
                                <BiChevronDown size={20} style={arrowStyled}
                                />
                                {
                                    openStateB ? <ul
                                        className="selectUl_MyOrderPage_MyProfile"
                                        style={{
                                            // width: `${BuyNowBtnSize * 4}px`,
                                            top: `${BuyNowBtnSize}px`,
                                            fontSize: `${productDetailsFontSize}px`
                                        }}
                                    >
                                        {selectBillingCityArray?.map((item, index) => (
                                            <li
                                                key={index}
                                                onClick={() => {
                                                    if (item?.toLowerCase() !== selectedBillingCity.toLowerCase()) {
                                                        setSelectedBillingCity(item);
                                                        setOpenStateB(false);
                                                        setInputValue("");
                                                    }
                                                }}
                                                                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
                : <div style={{
                    marginTop: "2rem"
                }} onClick={handleBillingAddAddress} className="addShippingAddress_MyOrderPage_MyProfile">
                    <h2 style={{
                        fontSize: `${priceDetailsFontSize}px`,
                        color: "#515151",
                        paddingLeft: "0.3rem",
                        fontWeight: 600
                    }}>+ Add Billing Address</h2>
                </div>
        }
    </div>
    <div className="BtnMainDiv_MyOrderPage_MyProfile">
        <div className="Btn_MyOrderPage_MyProfile">
            <button style={{
                width: `${BuyNowBtnSize * 3}px`,
                height: `${BuyNowBtnSize * 1.2}px`,
            }}
                className="cancelBtn_MyOrderPage_MyProfile"
            >
                Cancel
            </button>
            <button style={{
                width: `${BuyNowBtnSize * 3}px`,
                height: `${BuyNowBtnSize * 1.2}px`,
            }}
                onClick={handleAddressSubmit}
                className="editBtn_MyOrderPage_MyProfile"
            >  Save
            </button>
        </div>
    </div>
</div>
                                            </div>

</>)

}