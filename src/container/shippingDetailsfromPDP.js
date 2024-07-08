import React, { useEffect, useState } from "react";
import "../styles/shippingDetails.css";
import ToolBar from "../component/toolbar";
import { Footer } from "./footer";
import { BiChevronDown } from "react-icons/bi";
import BackArrow from "../svg/backtoArrow.svg";
import { pagePaths } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { getAllCartItems } from "../redux/slices/cartSlice";
import { string } from "i/lib/util";
import { useNavigate } from "react-router-dom";

import StateAndCityData from "../container/sateAndCity.json";
import CountryData from "../container/country.json";
import { useContext } from "react";
import noteContext from "../context/noteContext";
import { useCallback } from "react";
import axios from "axios";
import SuccessSvg from "../svg/successSvg.svg";
import { Loader } from "rsuite";
import { toast } from "react-toastify";

const widthOutPut = window.screen.width;
const number_titleFontSize = (1 / 100) * widthOutPut;
const boxNumberSize = (2 / 100) * widthOutPut;

const cartHeaderFontSize = (2.2 / 100) * widthOutPut;

const priceDetailsFontSize = (1.1 / 100) * widthOutPut;
const priceDetailsHeaderFontSize = (2 / 100) * widthOutPut;

const buyNowBtnHeight = (3 / 100) * widthOutPut;
const buyNowBtnFontSize = (1.2 / 100) * widthOutPut;

const couponDetailHeaderFontSize = (0.9 / 100) * widthOutPut;
const BuyNowBtnSize = (2.5 / 100) * widthOutPut;
const productDetailsFontSize = (0.9 / 100) * widthOutPut;

let totalamount = 0;
let sum = 0;
let totalArray = [];
let dummyObject = [];

export const ShippingPageFromPDP = () => {
  const { activeCoupon } = useContext(noteContext);
  const [verifyCoupon, setVerifyCoupon] = useState(false);
  const [countries, setCountries] = useState(null);
  const [state, setState] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [openCountry, setOpenCountry] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [shippindAddress, setShippingAddress] = useState(true);
  const [data, setData] = useState([]);

  const [statusCoupon, setStatusCoupon] = useState([]);
  const [statusCouponActive, setStatusCouponActive] = useState(false);
  const [couponId, setCouponId] = useState("");
  const [storeCouponId, setStoreCouponId] = useState("");
  const [couponStatus, setCouponStatus] = useState(false);
  const [cartProductDetails, setCartProductDetails] = useState();

  const [encode, setEncode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [mrp, setMrp] = useState("");
  const [addressId, setAddressId] = useState("");

  const dispatch = useDispatch();

  const [addressdata, setAddressData] = useState([]);

  const cartGetAllData = useSelector((state) => state);

  const [userToken, setUserToken] = useState();

  const [shippindAddress2, setShippingAddress2] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectCityArray, setCityArray] = useState();
  const [selectedBillingCity, setSelectedBillingCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedBillingState, setSelectedBillingState] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedBillingCountry, setSelectedBillingCountry] = useState("");
  const [addShippingAdd, setAddShippingAdd] = useState(false);
  const [addBillingAdd, setAddBillingAdd] = useState(false);
  const [selectBillingCityArray, setBillingCityArray] = useState();
  const [openCityB, setOpenCityB] = useState(false);
  const [openCountryB, setOpenCountryB] = useState(false);
  const [openStateB, setOpenStateB] = useState(false);
  const [shippindBillingAddress, setShippingBillingAddress] = useState("");
  const [shippindAddressPin, setShippingAddressPin] = useState("");
  const [shippindBillingAddressPin, setShippingBillingAddressPin] =
    useState("");
  const [handleSublineSave, setHandleSubmitSaveBilling] = useState();
  const [handleSublineSaveShipping, setHandleSubmitSaveShipping] = useState();
  const [selectedBillingCityStateCountry, setSelectedBillingCityStateCountry] =
    useState([]);
  const [
    selectedShippingCityStateCountry,
    setSelectedShippingCityStateCountry,
  ] = useState([]);
  const [showShippingAddress, setShowShippingAddress] = useState(false);
  const [addressSelected, setAddressSelected] = useState(0);
  const [addBillingAddressId, setAddBillingAddressId] = useState();
  const [selectPaymentMethod, setSelectPaymentMethod] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("male");
  const [viewOrderStatus, setViewOrderStatus] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState();
  const [confrimPlaceOrder, setConfrimOrder] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState();

  const [successPage, setSuccessPage] = useState(false);

  const [address, setAddress] = useState([]);
  const [userdata, setUserData] = useState([]);

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phonenum, setPhoneNum] = useState("");

  const [productDetailsStatus, setProducDetailsStatus] = useState({
    status: "",
    ean: "",
  });
  const [confrinAddressStatus, setConfirmStatus] = useState({
    status: "",
  });
  const navigator = useNavigate();

  const pricefrompdp = useSelector(s=>s.quantitySlice).initialState?.totalPrice;

  selectedBillingCityStateCountry.city = selectedBillingCity;
  selectedBillingCityStateCountry.state = selectedBillingState;
  selectedBillingCityStateCountry.country = selectedBillingCountry;
  selectedBillingCityStateCountry.shippingMainAddress = shippindBillingAddress;
  selectedBillingCityStateCountry.shippingAddressPinCode =
    shippindBillingAddressPin;

  selectedShippingCityStateCountry.city = selectedCity;
  selectedShippingCityStateCountry.state = selectedState;
  selectedShippingCityStateCountry.country = selectedCountry;
  selectedShippingCityStateCountry.shippingMainAddress = shippindAddress2;
  selectedShippingCityStateCountry.shippingAddressPinCode = shippindAddressPin;

  const activeCouponCode = JSON.parse(localStorage.getItem("couponCode")) 
    ? JSON.parse(localStorage.getItem("couponCode")) 
    : "";

  const arrowStyled = {
    // transform: rotate(0)
    transform: `${openCountry ? "rotate(180deg)" : "rotate(0)"}`,
  };

  let token = JSON.parse(localStorage.getItem("items"))
    ? JSON.parse(localStorage.getItem("items"))
    : "";

  // Country Data

  var headers = new Headers();
  headers.append("X-CSCAPI-KEY", "API_KEY");
  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });

    // fetch("https://api.countrystatecity.in/v/states", requestOptions)
    //     .then(response => response.text())
    //     .then(result => setState(result))
  }, []);
  // console.log("checking state", state)

  const handleSubmitCoupon = (e) => {
    statusCoupon.code = couponId;

    const userCouponData = {
      code: statusCoupon.code,
      products: activeCouponCode.product,
    };
    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/user/coupon/apply`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userCouponData),
      })
        .then((response) => {
          if (response.status === 200) {
            setCouponStatus(true);
            setVerifyCoupon(true);
          } else if (response.status === 400) {
            setCouponStatus(false);
            setVerifyCoupon(false);
          }
          return response.json();
        })
        .then((result) => setCouponDiscount(result))
        .catch((err) => console.log("error ", err));
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (event) => {
    // look for the `Enter` keyCode
    if (event.keyCode === 13 || event.which === 13) {
      handleSubmitCoupon();
    }
  };

  const handleclick = (e, itemId) => {
    setAddressId(e.currentTarget.id);
    if (e.target.id == itemId) {
      setAddressSelected(e.currentTarget.id);
      setConfrimOrder(true);
    }
  };

  const handlePlaceOrder = (e) => {
    setSelectPaymentMethod(true);
  };

  // All Address
  const allAddress = (e) => {
    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/user/address/all`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setAddressData(data);
        })
        .catch((err) => console.log("error ", err));
    } catch (error) {
      console.log(error);
    }
  };

  let shouldLog = true;

  useEffect(() => {
    if (shouldLog) {
      shouldLog = false;
      allAddress();
    }
  }, []);

  const handleAddressSubmit = () => {
    setShippingAddress(true);
    const newDataObject = {
      key: selectedShippingCityStateCountry.length + 1,
    };
    setHandleSubmitSaveBilling([
      ...selectedBillingCityStateCountry,
      selectedBillingCityStateCountry,
    ]);
    setHandleSubmitSaveShipping([
      ...selectedShippingCityStateCountry,
      selectedShippingCityStateCountry,
    ]);
    setShowShippingAddress(true);

    if (selectedCity) {
      const shippingaddressData = {
        address1: shippindAddress2,
        address2: "2",
        city: selectedCity,
        state: selectedState,
        pincode: shippindAddressPin,
        country: selectedCountry,
        phone: phonenum,
        fName: firstname,
        lName: lastname,
      };

      try {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/user/address/add`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(shippingaddressData),
        })
          .then((response) => {
            if (response.status === 200) {
              setConfirmStatus({
                status: "Address Add",
              });
            }
          })
          .catch((err) => console.log("error ", err));
      } catch (error) {
        console.log(error);
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
        phone: phonenum,
        fName: firstname,
        lName: lastname,
      };

      try {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/user/address/add`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(billingaddressData),
        })
          .then((response) => {})
          .catch((err) => console.log("error ", err));
      } catch (error) {
        toast(error);
      }

      setShippingAddress(true);
    }
  };

  const handleShippingAddAddress = () => {
    setAddShippingAdd(true);
    setAddBillingAdd(false);
  };

  const handleBillingAddAddress = () => {
    setAddShippingAdd(false);
    setAddBillingAdd(true);
  };

  const handleChangeBillingAddress = (addressIdBilling) => {
    setAddressSelected(addressIdBilling);
  };

  const handlePaymentPage = () => {
    if (selectedPaymentMethod === "Cash on Delivery") setSuccessPage(true);

    // if (selectedPaymentMethod === "Cash on Delivery") {
    //     setSuccessPage(true)
    // } else if (selectedPaymentMethod === "Online Payment") {
    //     //navigator("/payment-pages")
    //}
    const orderData = {
      // ean_code: encode,
      // quantity: quantity,
      billingAddressId: Number(addressId),
      shippingAddressId: Number(addressId),
    };

    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/user/order/cart/add`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      })
        .then((response) => {
          if (response.status === 200) {
            setViewOrderStatus(true);
          }
          // console.log("checking response in cart response", response)

          return response.json();
          // }
        })
        .then((result) => {
          setCurrentOrderId(result);
          if (selectedPaymentMethod === "Online Payment")
            paymentByOnlineMethod(result);
        })
        .catch((err) => toast("error ", err));
    } catch (error) {
      toast(error);
    }
  };

  const paymentByOnlineMethod = (respone) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/user/initiate/payment`,
        {
          orderId: respone.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const { encRequest, access_code } = res.data;
        const form = document.createElement("form");
        form.setAttribute("id", "nonseamless");
        form.setAttribute("method", "post");
        form.setAttribute("name", "redirect");
        form.setAttribute(
          "action",
          "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"
        );
        const encRequestInput = document.createElement("input");
        encRequestInput.setAttribute("type", "hidden");
        encRequestInput.setAttribute("id", "encRequest");
        encRequestInput.setAttribute("name", "encRequest");
        encRequestInput.setAttribute("value", encRequest);

        const accessCodeInput = document.createElement("input");
        accessCodeInput.setAttribute("type", "hidden");
        accessCodeInput.setAttribute("name", "access_code");
        accessCodeInput.setAttribute("id", "access_code");
        accessCodeInput.setAttribute("value", access_code);

        form.appendChild(encRequestInput);
        form.appendChild(accessCodeInput);

        document.body.appendChild(form);

        form.submit();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (confrinAddressStatus.status === "Address Add") {
      allAddress();
    }
  }, [confrinAddressStatus.status]);


  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/user/cart/item/all`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        getAllCartItems({ data });
      })
      .catch((error) => console.log(error));
  }, []);

  cartGetAllData?.cartSlice?.initialState?.data?.cartItems?.map((item, id) => {
    setTimeout(() => {
      setEncode(item.ean_code);
      setQuantity(item.quantity);
      // setMrp(item.product.mrp);
      const number = item?.product?.mrp;
      var nf = new Intl.NumberFormat();
      let totalArray = [];

      // console.log("checking eon code", item)
      dummyObject.push({
        status: "ok",
        ean: item.ean_code,
        quantity: item.quantity,
      });

      for (let i = 0; i < data?.cartItems?.length; i++) {
        totalArray.push(+(item?.quantity * item?.product?.mrp));
      }

      sum = totalArray.reduce(
        (previousValue, currentValue, index) => previousValue + currentValue,
        0
      );
      setMrp(pricefrompdp);
    }, -4);
  });

  useEffect(() => {
    dispatch(getAllCartItems({ data }));
  }, [data]);

  return (
    <>
      {successPage ? (
        <>
          {viewOrderStatus ? (
            <div className="successPageMainDiv_PaymentPage">
              <div className="successInnnerMainPage_PaymentPage">
                <div className="successSVGMainDiv_PaymentPage">
                  <img src={SuccessSvg} />
                </div>
                <div className="orderPlaceContent_PaymentPage">
                  <h2
                    style={{
                      fontSize: `${priceDetailsFontSize * 1.5}px`,
                      textAlign: "center",
                    }}
                  >
                    order placed successfully!<br></br> Order Id is{" "}
                    {currentOrderId?.id}
                  </h2>
                  <p
                    style={{
                      fontSize: `${priceDetailsFontSize * 0.8}px`,
                    }}
                  >
                    thankyou for shopping with sizeupp
                  </p>
                </div>
                <div className="viewOrder_PaymentPage">
                  <a
                    href={pagePaths.myOrderPage}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <p>
                      View Order &nbsp; <img src={BackArrow} />
                    </p>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="successPageMainDiv_PaymentPage">
              Please Wait While Redirecting to Confirmation Page
              <Loader size="xs" />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="UpperMainDiv_ShippingDetails">
            <div className="toolBar_ShappingDetails">
              <ToolBar
                fontColor="#474747"
                logo="black"
                dropDown="#474747"
                icons="#474747"
                backGroundColor="white"
                stroke="black"
              />
            </div>
            {/* <div className="downToolBar_ShippingDetails"></div> */}
            <div className="mainDiv_ShippingDetails">
              <div className="breadCrumCartMainDiv_ShippingDetails">
                <div className="breadCrumInner_ShippingDetails">
                  <div
                    style={{
                      width: `${boxNumberSize}px`,
                      height: `${boxNumberSize}px`,
                      borderColor: "#8A8A8A",
                    }}
                    className="numberBreadCrumMain_ShippingDetails"
                  >
                    <h3
                      style={{
                        fontSize: `${number_titleFontSize}px`,
                        color: "#8A8A8A",
                      }}
                    >
                      1
                    </h3>
                  </div>
                  <div
                    style={{
                      paddingRight: "0.5rem",
                      paddingLeft: "0.5rem",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: `${number_titleFontSize}px`,
                        color: "#8A8A8A",
                      }}
                    >
                      Cart
                    </h3>
                  </div>
                </div>
                <div
                  style={{
                    paddingRight: "1rem",
                    color: "#8A8A8A",
                  }}
                >
                  ----------
                </div>
                <div className="breadCrumInner_ShippingDetails">
                  <div
                    style={{
                      width: `${boxNumberSize}px`,
                      height: `${boxNumberSize}px`,
                      borderColor: "#2D2D2D",
                    }}
                    className="numberBreadCrumMain_ShippingDetails"
                  >
                    <h3
                      style={{
                        fontSize: `${number_titleFontSize}px`,
                        color: "#2D2D2D",
                      }}
                    >
                      2
                    </h3>
                  </div>
                  <div
                    style={{
                      paddingRight: "0.5rem",
                      paddingLeft: "0.5rem",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: `${number_titleFontSize}px`,
                        color: "#2D2D2D",
                      }}
                    >
                      Shipping Details
                    </h3>
                  </div>
                </div>
                <div
                  style={{
                    paddingRight: "1rem",
                    color: "#2D2D2D",
                  }}
                >
                  ----------
                </div>
                <div className="breadCrumInner_ShippingDetails">
                  <div
                    style={{
                      width: `${boxNumberSize}px`,
                      height: `${boxNumberSize}px`,
                      borderColor: "#8A8A8A",
                    }}
                    className="numberBreadCrumMain_ShippingDetails"
                  >
                    <h3
                      style={{
                        fontSize: `${number_titleFontSize}px`,
                        color: "#8A8A8A",
                      }}
                    >
                      3
                    </h3>
                  </div>
                  <div
                    style={{
                      paddingRight: "0.5rem",
                      paddingLeft: "0.5rem",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: `${number_titleFontSize}px`,
                        color: "#8A8A8A",
                      }}
                    >
                      Payment
                    </h3>
                  </div>
                </div>
              </div>
              <div className="cartMainPage_ShippingDetails">
                <div className="cartInnerMainDivPage_ShippingDetails">
                  {selectPaymentMethod ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                      className="carProductListMainDiv_ShippingDetails"
                    >
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            border: "1px solid #262626",
                            padding: "1rem",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="Cash on Delivery"
                            id="Cash_on_Delivery"
                            checked={
                              selectedPaymentMethod === "Cash on Delivery"
                            }
                            onChange={() =>
                              setSelectedPaymentMethod("Cash on Delivery")
                            }
                            style={{
                              cursor: "pointer",
                            }}
                          />
                          <label
                            style={{
                              paddingLeft: "0.5rem",
                              fontSize: `${priceDetailsHeaderFontSize * 0.7}px`,
                              cursor: "pointer",
                            }}
                            htmlFor="Cash_on_Delivery"
                          >
                            Cash On Delivery
                          </label>
                        </div>
                        <div
                          style={{
                            border: "1px solid #262626",
                            padding: "1rem",
                            marginTop: "2rem",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="Online Payment"
                            id="Online_Payment"
                            checked={selectedPaymentMethod === "Online Payment"}
                            onChange={() =>
                              setSelectedPaymentMethod("Online Payment")
                            }
                            style={{
                              cursor: "pointer",
                            }}
                          />
                          <label
                            style={{
                              paddingLeft: "0.5rem",
                              fontSize: `${priceDetailsHeaderFontSize * 0.7}px`,
                              cursor: "pointer",
                            }}
                            htmlFor="Online_Payment"
                          >
                            Online Payment
                          </label>
                        </div>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "end",
                        }}
                      >
                        <button
                          style={{
                            width: "25%",
                            padding: "0.5rem",
                            backgroundColor: "#262626",
                            color: "#fff",
                          }}
                          onClick={handlePaymentPage}
                        >
                          Procced
                        </button>
                      </div>
                    </div>
                  ) : shippindAddress ? (
                    <div className="carProductListMainDiv_ShippingDetails">
                      <div className="shippingHeaderMainDiv_ShippingDetails">
                        <h1 className="text-xl"
                        >
                          Shipping Details
                        </h1>
                      </div>
                      <div className="shippingAddressMainDiv_ShippingDetails">
                        <div
                          style={{
                            overflowY: "scroll",
                          }}
                        >
                          {addressdata.length > 0
                            ? addressdata?.map((item, index) => (
                                <>
                                  <div className="ShippingAddressMainUpper_ShippingDetails">
                                    <div
                                      className="shippingAddressInnerDiv_ShippingDetials"
                                      style={{
                                        width: "70%",
                                      }}
                                    >
                                      <h1
                                        style={{
                                          fontSize: `${priceDetailsFontSize}px`,
                                          fontWeight: "600",
                                        }}
                                      >
                                        Shipping Address - {item.fName}{" "}
                                        {item.lName}
                                      </h1>
                                      <h2
                                        style={{
                                          fontSize: `${priceDetailsFontSize}px`,
                                        }}
                                      >
                                        {item.address1} {item.address2} -{" "}
                                        {item.city} , {item.state} ,{" "}
                                        {item.country} - {item.pincode} -{" "}
                                        {item.phone}{" "}
                                      </h2>
                                    </div>
                                    <div
                                      className=""
                                      style={{
                                        width: "25%",
                                        display: "flex",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <button
                                        style={{
                                          background: "#000000",
                                          color: "#ffffff",
                                          padding: "10px",
                                          height: "50px",
                                          fontSize: `${
                                            couponDetailHeaderFontSize * 0.9
                                          }px`,
                                        }}
                                        id={item.id}
                                        onClick={(e) => handleclick(e, item.id)}
                                      >
                                        {addressSelected == item.id
                                          ? "Selected"
                                          : " Select Address"}
                                      </button>
                                    </div>
                                  </div>
                                </>
                              ))
                            : null}

                          {addressdata.length > 0 ? //     marginTop: "1rem" //     padding: "1rem 1rem", //     width: "100%", //     border: "1px solid black", // <div style={{
                          // }}>
                          //     <input id="billingAddress" value="billingAddress" type="checkbox" onChange={(e) => handleChangeBillingAddress(addressSelected)} />
                          //     <label style={{
                          //         paddingLeft: "0.5rem",
                          //         fontSize: `${priceDetailsFontSize}px`,
                          //     }} htmlFor="billingAddress">Same As Billing Address</label>
                          // </div>
                          null : (
                            <h2
                              style={{
                                fontSize: `${priceDetailsFontSize * 1.2}px`,
                                fontWeight: "600",
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              Please Add Address First
                            </h2>
                          )}
                        </div>
                        <div
                          className="lastDivConfirm_ShippingDetails"
                          style={{
                            marginTop: "30px",
                          }}
                        >
                          <a
                            href={pagePaths.cartPage}
                            style={{
                              width: "50%",
                            }}
                          >
                            <div
                              onClick={() =>
                                localStorage.removeItem("couponCode")
                              }
                              className="backToCart_ShippingDetails"
                            >
                              <img src={BackArrow} />
                              <h1
                                style={{
                                  fontSize: `${priceDetailsFontSize}px`,
                                }}
                              >
                                Back to Cart
                              </h1>
                            </div>
                          </a>

                          <div className="confrimAddress_ShippingDetails">
                            <button
                              style={{
                                width: `${BuyNowBtnSize * 5}px`,
                                height: `${BuyNowBtnSize * 1.2}px`,
                                marginRight: "20px",
                                fontSize: `${
                                  couponDetailHeaderFontSize * 1.1
                                }px`,
                              }}
                              onClick={() => setShippingAddress(false)}
                            >
                              Add New Address
                            </button>
                            {addressdata.length ===
                            0 ? null : confrimPlaceOrder ? (
                              <button
                                style={{
                                  width: `${BuyNowBtnSize * 5}px`,
                                  height: `${BuyNowBtnSize * 1.2}px`,
                                  fontSize: `${
                                    couponDetailHeaderFontSize * 1.1
                                  }px`,
                                }}
                                onClick={handlePlaceOrder}
                              >
                                Place Order
                              </button>
                            ) : (
                              <p
                                style={{
                                  fontSize: `${
                                    couponDetailHeaderFontSize * 1.1
                                  }px`,
                                  width: `${BuyNowBtnSize * 5}px`,
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                Select Address
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="carProductListMainDiv_ShippingDetails">
                      <div className="shipping_billingAddress_MyOrderPage_MyProfile">
                        {addShippingAdd || !showShippingAddress ? (
                          <div className="shippingDetailsContentDiv_MyOrderPage_MyProfile">
                            <div className="shippingDetailsContentAddreddDiv_MyOrderPage_MyProfile">
                              <h2
                                style={{
                                  fontSize: `${priceDetailsFontSize}px`,
                                  color: "#515151",
                                  fontWeight: 600,
                                }}
                              >
                                Shipping Address
                              </h2>
                              <input
                                style={{
                                  height: `${BuyNowBtnSize * 1.2}px`,
                                  color: "#515151",
                                }}
                                type="text"
                                value={shippindAddress2}
                                name="shippindAddress"
                                onChange={(e) =>
                                  setShippingAddress2(e.target.value)
                                }
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                paddingTop: "1rem",
                              }}
                            >
                              <div className="selectCityInnerMainDivLower_MyOrderPage_MyProfile">
                                <h2
                                  style={{
                                    fontSize: `${priceDetailsFontSize}px`,
                                    color: "#515151",
                                    paddingBottom: "0.3rem",
                                  }}
                                >
                                  Country
                                </h2>
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
                                  <BiChevronDown
                                    size={20}
                                    style={arrowStyled}
                                  />
                                  {openCity ? (
                                    <ul
                                      className="selectUlLower_MyOrderPage_MyProfile"
                                      style={{
                                        // width: `${BuyNowBtnSize * 4}px`,
                                        top: `${BuyNowBtnSize}px`,
                                        fontSize: `${
                                          productDetailsFontSize * 1.4
                                        }px`,
                                        padding: "0.5rem",
                                      }}
                                    >
                                      {CountryData?.country?.map((item) => (
                                        <li
                                          key={item.name}
                                          onClick={() => {
                                            if (
                                              item.name?.toLowerCase() !==
                                              selectedCountry.toLowerCase()
                                            ) {
                                              setSelectedCountry(item.name);
                                              setCityArray();
                                              setOpenCity(false);
                                              setInputValue("");
                                            }
                                          }}
                                        >
                                          {item.name}
                                        </li>
                                      ))}
                                    </ul>
                                  ) : null}
                                </div>
                              </div>
                              <div className="selectInnerMainDiv_MyOrderPage_MyProfile">
                                <h2
                                  style={{
                                    fontSize: `${priceDetailsFontSize}px`,
                                    color: "#515151",
                                    paddingBottom: "0.3rem",
                                  }}
                                >
                                  Pincode
                                </h2>
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
                                    onChange={(e) =>
                                      setShippingAddressPin(e.target.value)
                                    }
                                    style={{
                                      fontSize: `${priceDetailsFontSize}px`,
                                    }}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="selectUpperMainDivv_MyOrderPage_MyProfile">
                              <div className="selectInnerMainDiv_MyOrderPage_MyProfile">
                                <h2
                                  style={{
                                    fontSize: `${priceDetailsFontSize}px`,
                                    color: "#515151",
                                    paddingBottom: "0.3rem",
                                  }}
                                >
                                  State
                                </h2>
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
                                  <BiChevronDown
                                    size={20}
                                    style={arrowStyled}
                                  />
                                  {openCountry ? (
                                    <ul
                                      className="selectUl_MyOrderPage_MyProfile"
                                      style={{
                                        // width: `${BuyNowBtnSize * 4}px`,
                                        top: `${BuyNowBtnSize}px`,
                                        fontSize: `${
                                          productDetailsFontSize * 1.4
                                        }px`,
                                        padding: "0.5rem",
                                      }}
                                    >
                                      {StateAndCityData.states?.map(
                                        (districtsList, id) => {
                                          return (
                                            <>
                                              <li
                                                key={districtsList.state}
                                                onClick={() => {
                                                  if (
                                                    districtsList.state?.toLowerCase() !==
                                                    selectedState.toLowerCase()
                                                  ) {
                                                    setSelectedState(
                                                      districtsList.state
                                                    );
                                                    setCityArray(
                                                      districtsList.districts
                                                    );
                                                    setOpenCity(false);
                                                    setInputValue("");
                                                  }
                                                }}
                                              >
                                                {districtsList.state}
                                              </li>
                                            </>
                                          );
                                        }
                                      )}
                                    </ul>
                                  ) : null}
                                </div>
                              </div>
                              <div className="selectInnerMainDiv_MyOrderPage_MyProfile">
                                <h2
                                  style={{
                                    fontSize: `${priceDetailsFontSize}px`,
                                    color: "#515151",
                                    paddingBottom: "0.3rem",
                                  }}
                                >
                                  City
                                </h2>
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
                                  <BiChevronDown
                                    size={20}
                                    style={arrowStyled}
                                  />
                                  {openState ? (
                                    <ul
                                      className="selectUl_MyOrderPage_MyProfile"
                                      style={{
                                        // width: `${BuyNowBtnSize * 4}px`,
                                        top: `${BuyNowBtnSize}px`,
                                        fontSize: `${
                                          productDetailsFontSize * 1.4
                                        }px`,
                                        padding: "0.5rem",
                                      }}
                                    >
                                      {selectCityArray?.map((item) => (
                                        <li
                                          key={item}
                                          onClick={() => {
                                            if (
                                              item?.toLowerCase() !==
                                              selectedState.toLowerCase()
                                            ) {
                                              setSelectedCity(item);
                                              setOpenState(false);
                                              setInputValue("");
                                            }
                                          }}
                                        >
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : showShippingAddress ? (
                          <div>
                            <h2>Shipping Address</h2>
                            <div
                              onClick={handleShippingAddAddress}
                              className="addShippingAddress_MyOrderPage_MyProfile"
                            >
                              {address?.map((details, id) => {
                                return (
                                  <>
                                    <h2
                                      style={{
                                        fontSize: `${
                                          priceDetailsFontSize * 0.9
                                        }px`,
                                        color: "#515151",
                                        paddingLeft: "0.3rem",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {details.address1}, {details.address2},{" "}
                                      {details.city}, {details.state},{" "}
                                      {details.country}- {details.pincode}
                                    </h2>
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={handleShippingAddAddress}
                            className="addShippingAddress_MyOrderPage_MyProfile"
                          >
                            <h2
                              style={{
                                fontSize: `${priceDetailsFontSize}px`,
                                color: "#515151",
                                paddingLeft: "0.3rem",
                                fontWeight: 600,
                              }}
                            >
                              + Add Shipping Address
                            </h2>
                          </div>
                        )}
                        {
                          addBillingAdd ? (
                            <div
                              style={{
                                paddingTop: "1rem",
                              }}
                              className="shippingDetailsContentDiv_MyOrderPage_MyProfile"
                            >
                              <div className="shippingDetailsContentAddreddDiv_MyOrderPage_MyProfile">
                                <h2
                                  style={{
                                    fontSize: `${priceDetailsFontSize}px`,
                                    color: "#515151",
                                    fontWeight: 600,
                                  }}
                                >
                                  Billing Address
                                </h2>
                                <input
                                  type="text"
                                  value={shippindBillingAddress}
                                  name="shippindBillingAddress"
                                  onChange={(e) =>
                                    setShippingBillingAddress(e.target.value)
                                  }
                                  style={{
                                    fontSize: `${priceDetailsFontSize}px`,
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  paddingTop: "1rem",
                                }}
                              >
                                <div className="selectCityInnerMainDivLower_MyOrderPage_MyProfile">
                                  <h2
                                    style={{
                                      fontSize: `${priceDetailsFontSize}px`,
                                      color: "#515151",
                                      paddingBottom: "0.3rem",
                                    }}
                                  >
                                    Country
                                  </h2>
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
                                        ? selectedBillingCountry?.substring(
                                            0,
                                            8
                                          ) + "..."
                                        : selectedBillingCountry
                                      : "Select Country"}
                                    <BiChevronDown
                                      size={20}
                                      style={arrowStyled}
                                    />
                                    {openCityB ? (
                                      <ul
                                        className="selectUlLower_MyOrderPage_MyProfile"
                                        style={{
                                          // width: `${BuyNowBtnSize * 4}px`,
                                          top: `${BuyNowBtnSize}px`,
                                          fontSize: `${productDetailsFontSize}px`,
                                          padding: "0.5rem",
                                        }}
                                      >
                                        {CountryData?.country?.map(
                                          (item, index) => (
                                            <li
                                              key={index}
                                              onClick={() => {
                                                if (
                                                  item.name?.toLowerCase() !==
                                                  selectedCountry.toLowerCase()
                                                ) {
                                                  setSelectedBillingCountry(
                                                    item.name
                                                  );
                                                  setCityArray();
                                                  setOpenCityB(false);
                                                  setInputValue("");
                                                }
                                              }}
                                            >
                                              {item.name}
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    ) : null}
                                  </div>
                                </div>
                                <div className="selectInnerMainDiv_MyOrderPage_MyProfile">
                                  <h2
                                    style={{
                                      fontSize: `${priceDetailsFontSize}px`,
                                      color: "#515151",
                                      paddingBottom: "0.3rem",
                                    }}
                                  >
                                    Pincode
                                  </h2>
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
                                      onChange={(e) =>
                                        setShippingBillingAddressPin(
                                          e.target.value
                                        )
                                      }
                                      style={{
                                        fontSize: `${priceDetailsFontSize}px`,
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="selectUpperMainDivv_MyOrderPage_MyProfile">
                                <div className="selectInnerMainDiv_MyOrderPage_MyProfile">
                                  <h2
                                    style={{
                                      fontSize: `${priceDetailsFontSize}px`,
                                      color: "#515151",
                                      paddingBottom: "0.3rem",
                                    }}
                                  >
                                    State
                                  </h2>
                                  <div
                                    onClick={() =>
                                      setOpenCountryB(!openCountryB)
                                    }
                                    className="selectMainDiv_MyOrderPage_MyProfile"
                                    style={{
                                      // width: `${BuyNowBtnSize * 4}px`,
                                      height: `${BuyNowBtnSize}px`,
                                    }}
                                  >
                                    {selectedBillingState
                                      ? selectedBillingState?.length > 8
                                        ? selectedBillingState?.substring(
                                            0,
                                            8
                                          ) + "..."
                                        : selectedBillingState
                                      : "Select State"}
                                    <BiChevronDown
                                      size={20}
                                      style={arrowStyled}
                                    />
                                    {openCountryB ? (
                                      <ul
                                        className="selectUl_MyOrderPage_MyProfile"
                                        style={{
                                          // width: `${BuyNowBtnSize * 4}px`,
                                          top: `${BuyNowBtnSize}px`,
                                          fontSize: `${productDetailsFontSize}px`,
                                        }}
                                      >
                                        {StateAndCityData.states?.map(
                                          (districtsList, id) => (
                                            <li
                                              key={id}
                                              onClick={() => {
                                                if (
                                                  districtsList?.state?.toLowerCase() !==
                                                  selectedBillingState.toLowerCase()
                                                ) {
                                                  setSelectedBillingState(
                                                    districtsList.state
                                                  );
                                                  setBillingCityArray(
                                                    districtsList.districts
                                                  );
                                                  setOpenCountryB(false);
                                                  setInputValue("");
                                                }
                                              }}
                                            >
                                              {districtsList.state}
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    ) : null}
                                  </div>
                                </div>
                                <div className="selectInnerMainDiv_MyOrderPage_MyProfile">
                                  <h2
                                    style={{
                                      fontSize: `${priceDetailsFontSize}px`,
                                      color: "#515151",
                                      paddingBottom: "0.3rem",
                                    }}
                                  >
                                    City
                                  </h2>
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
                                        ? selectedBillingCity?.substring(0, 8) +
                                          "..."
                                        : selectedBillingCity
                                      : "Select City"}
                                    <BiChevronDown
                                      size={20}
                                      style={arrowStyled}
                                    />
                                    {openStateB ? (
                                      <ul
                                        className="selectUl_MyOrderPage_MyProfile"
                                        style={{
                                          // width: `${BuyNowBtnSize * 4}px`,
                                          top: `${BuyNowBtnSize}px`,
                                          fontSize: `${productDetailsFontSize}px`,
                                        }}
                                      >
                                        {selectBillingCityArray?.map(
                                          (item, index) => (
                                            <li
                                              key={index}
                                              onClick={() => {
                                                if (
                                                  item?.toLowerCase() !==
                                                  selectedBillingCity.toLowerCase()
                                                ) {
                                                  setSelectedBillingCity(item);
                                                  setOpenStateB(false);
                                                  setInputValue("");
                                                }
                                              }}
                                            >
                                              {item}
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                              style={{
                                border: "1px solid black",
                                width: "100%",
                                padding: "1rem 1rem",
                                marginTop: "1rem",
                              }}
                            >
                              <input
                                id="billingAddress"
                                value="billingAddress"
                                type="checkbox"
                                onChange={(e) =>
                                  handleChangeBillingAddress(addressSelected)
                                }
                              />
                              <label
                                style={{
                                  paddingLeft: "0.5rem",
                                  fontSize: `${priceDetailsFontSize}px`,
                                }}
                                htmlFor="billingAddress"
                              >
                                Same As Billing Address
                              </label>
                            </div>
                          )
                          // <div style={{
                          //     marginTop: "2rem"
                          // }} onClick={handleBillingAddAddress} className="addShippingAddress_MyOrderPage_MyProfile">
                          //     <h2 style={{
                          //         fontSize: `${priceDetailsFontSize}px`,
                          //         color: "#515151",
                          //         paddingLeft: "0.3rem",
                          //         fontWeight: 600
                          //     }}>+ Add Billing Address</h2>
                          // </div>
                        }
                      </div>

                      <div className="selectUpperMainDivMainLower_ShippingDetails">
                        <div className="selectUpperMainDivLower_ShippingDetails">
                          <div className="selectInnerMainDiv_ShippingDetails">
                            <h2
                              style={{
                                fontSize: `${priceDetailsFontSize}px`,
                                color: "#515151",
                                paddingBottom: "0.3rem",
                              }}
                            >
                              First Name
                            </h2>
                            <div
                              className="selectMainInputDiv_ShippingDetails"
                              style={{
                                width: `${BuyNowBtnSize * 4}px`,
                                height: `${BuyNowBtnSize}px`,
                              }}
                            >
                              <input
                                type="text"
                                name="firstname"
                                value={firstname}
                                onChange={(event) =>
                                  setFirstName(event.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="selectInnerMainDiv_ShippingDetails">
                            <h2
                              style={{
                                fontSize: `${priceDetailsFontSize}px`,
                                color: "#515151",
                                paddingBottom: "0.3rem",
                              }}
                            >
                              Last Name
                            </h2>
                            <div
                              className="selectMainInputDiv_ShippingDetails"
                              style={{
                                width: `${BuyNowBtnSize * 4}px`,
                                height: `${BuyNowBtnSize}px`,
                              }}
                            >
                              <input
                                type="text"
                                name="lastname"
                                value={lastname}
                                onChange={(event) =>
                                  setLastName(event.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="selectUpperMainDivMainLower_ShippingDetails">
                        <div className="selectUpperMainDivLower_ShippingDetails">
                          <div className="ShippingDetailsInnerMainDiv_ShippingDetails">
                            <h2
                              style={{
                                fontSize: `${priceDetailsFontSize}px`,
                                color: "#515151",
                                paddingBottom: "0.3rem",
                              }}
                            >
                              Phone No.
                            </h2>
                            <div
                              className="shippingDetailsMainInputDiv_ShippingDetails"
                              style={{
                                height: `${BuyNowBtnSize}px`,
                              }}
                            >
                              <input
                                type="number"
                                name="phonenum"
                                value={phonenum}
                                onChange={(event) =>
                                  setPhoneNum(event.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="lastDivConfirm_ShippingDetails">
                        <a
                          // href={pagePaths.cartPage}
                          style={{
                            textDecoration: "none",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => setShippingAddress(true)}
                            className="backToCart_ShippingDetails"
                          >
                            <img src={BackArrow} />
                            <h1
                              style={{
                                fontSize: `${priceDetailsFontSize}px`,
                              }}
                            >
                              Back
                            </h1>
                          </div>
                        </a>
                        <div className="confrimAddress_ShippingDetails">
                          <button
                            style={{
                              width: `${BuyNowBtnSize * 5}px`,
                              height: `${BuyNowBtnSize * 1.2}px`,
                            }}
                            onClick={handleAddressSubmit}
                          >
                            Confirm Address
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* {
                                        selectPaymentMethod ? "inside payment" : null
                                    } */}

                  <div className="priceDetailMainDiv_CartPage">
                    <div className="priceDetailsUpperMainDiv_CartPage">
                      <div className="priceDetailUpperInnerDiv_CartPage">
                        <div className="PriceDetailsHeader_CartPage">
                          <h1
                            style={{
                              fontSize: `${priceDetailsHeaderFontSize}px`,
                            }}
                          >
                            Price Details
                          </h1>
                        </div>
                        <div className="pricingDetailsDiv_CartPage">
                          <div className="priceDiv_CartPage">
                            <h2
                              style={{
                                fontSize: `${priceDetailsFontSize}px`,
                              }}
                            >
                              Price
                            </h2>
                            <h2
                              style={{
                                fontSize: `${priceDetailsFontSize}px`,
                              }}
                            >
                              ₹{pricefrompdp}
                            </h2>
                          </div>
                          <div className="discountDiv_CartPage">
                            <h2
                              style={{
                                fontSize: `${priceDetailsFontSize}px`,
                              }}
                            >
                              Discount
                            </h2>
                            <h2
                              style={{
                                fontSize: `${priceDetailsFontSize}px`,
                                color: "#00E150",
                              }}
                            >
                              - ₹{" "}
                              {cartProductDetails?.product?.discount
                                ? cartProductDetails?.product?.discount
                                : 0}
                            </h2>
                          </div>
                          <div className="deliveryDiv_CartPAge">
                            <h2
                              style={{
                                fontSize: `${priceDetailsFontSize}px`,
                              }}
                            >
                              Delivery Charges
                            </h2>
                            <h2
                              style={{
                                fontSize: `${priceDetailsFontSize}px`,
                                color: "#00E150",
                              }}
                            >
                              {cartProductDetails?.product?.delivery_charge
                                ? cartProductDetails?.product?.delivery_charge
                                : "Free"}{" "}
                            </h2>
                          </div>
                          <div className="couponDiv_CartPage">
                            <h2
                              style={{
                                fontSize: `${priceDetailsFontSize}px`,
                              }}
                            >
                              Coupon Applied
                            </h2>
                            <h2
                              style={{
                                fontSize: `${priceDetailsFontSize}px`,
                                color: "#00E150",
                              }}
                            >
                              - ₹{" "}
                              {activeCouponCode?.discount
                                ? activeCouponCode?.discount
                                : couponDiscount?.discount
                                ? couponDiscount?.discount
                                : 0}
                            </h2>
                          </div>
                        </div>
                        <div className="subTotalDiv_CartPAge">
                          <h1
                            style={{
                              fontSize: `${priceDetailsFontSize * 1.1}px`,
                            }}
                          >
                            Subtotal
                          </h1>
                          <h1
                            style={{
                              fontSize: `${priceDetailsFontSize * 1.1}px`,
                            }}
                          >
                            ₹{pricefrompdp}
                            {/* {mrp -
                              (cartProductDetails?.product?.discount
                                ? cartProductDetails?.product?.discount
                                : 0) +
                              (cartProductDetails?.product?.delivery_charge
                                ? typeof cartProductDetails?.product
                                    ?.delivery_charge === string
                                  ? 0
                                  : cartProductDetails?.product?.delivery_charge
                                : 0) -
                              (activeCouponCode?.discount
                                ? activeCouponCode?.discount
                                : couponDiscount?.discount
                                ? couponDiscount?.discount
                                : 0)} */}
                            {/* ₹ {mrp} */}
                          </h1>
                        </div>
                      </div>
                    </div>
                    {activeCouponCode?.discount ? null : (
                      <div className="couponInputDiv_CartPage">
                        <div
                          style={{
                            width: "100%",
                          }}
                        >
                          <h1
                            style={{
                              fontSize: `${couponDetailHeaderFontSize}px`,
                            }}
                          >
                            enter a coupon code to get extra discount*
                          </h1>
                          <div
                            style={{
                              height: `${buyNowBtnHeight}px`,
                            }}
                            className="input_Btn_CartPage"
                          >
                            <input
                              type="text"
                              placeholder="Enter A Coupon Code"
                              name="couponId"
                              value={couponId}
                              onChange={(e) => setCouponId(e.target.value)}
                              onKeyDown={handleKeyPress}
                            />
                            <button onClick={(e) => handleSubmitCoupon(e)}>
                              Verify
                            </button>
                          </div>
                        </div>
                        {verifyCoupon ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            {couponStatus ? (
                              <div>
                                <h1
                                  style={{
                                    fontSize: `${couponDetailHeaderFontSize}px`,
                                    fontWeight: 100,
                                  }}
                                >
                                  Coupon Verified Discount:-{" "}
                                  {couponDiscount?.discount}
                                </h1>
                              </div>
                            ) : null}
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            {couponStatus ? null : (
                              <div>
                                <h1
                                  style={{
                                    fontSize: `${couponDetailHeaderFontSize}px`,
                                    fontWeight: 100,
                                    lineHeight: "30px",
                                  }}
                                >
                                  {couponDiscount?.error}! Please Enter a Valid
                                  Coupon
                                </h1>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};
