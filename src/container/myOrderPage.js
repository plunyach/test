import React, { useEffect, useReducer, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import "../styles/myOrderPage.css";
import moment from "moment";
import "../styles/trackOrderProgressBar.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import StateAndCityData from "../container/sateAndCity.json";
import CountryData from "../container/country.json";
import { Footer } from "./footer";
import ToolBar from "../component/toolbar";
import MyOrderSVG from "../svg/myOrder.svg";
import SignOutIcon from "../svg/signOut.svg";
import MyAccountIcon from "../svg/myaccount.svg";
import MyContactIcon from "../svg/myContact.svg";
import MySettingIcon from "../svg/mySetting.svg";
import CartItemImg1 from "../images/cartItemImg1.png";
import { BiChevronDown } from "react-icons/bi";
import EditPencelSvg from "../svg/editPencel.svg";
import PasswordEyeIcon from "../svg/passwordEye.svg";
import ShowPasswordEye from "../svg/showPasswordEye.svg";
import ReciverIcon from "../svg/reciverIcon.svg";
import LocationIcon from "../svg/locationIcon.svg";
import EmailIcon from "../svg/emailIcon.svg";
import CrossMarkIcon from "../svg/cross.svg";
import LockIcon from "../svg/lockIcon.svg";
import ConfirmIcon from "../svg/confrimIcon.svg";
import BackArrow from "../svg/backtoArrow.svg";
import Star from "../component/starRaiting";
import ReturnAndRedundIcon from "../svg/returnandRefund.svg";
import { useContext } from "react";
import noteContext from "../context/noteContext";
import { useCallback } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { ShippingAddress } from "../container/shippingAddress";
import { toast } from "react-toastify";

const widthOutPut = window.screen.width;
const userNameFontSize = (1.3 / 100) * widthOutPut;
// const leftContentFontSize = (0.9 / 100) * widthOutPut;
const leftContentFontSize = 12;
const signOutBtnHeight = (3 / 100) * widthOutPut;

// const orderDateDetailsFontSize = (1.1 / 100) * widthOutPut;
const orderDateDetailsFontSize = 12;
// const productDetailsFontSize = (0.9 / 100) * widthOutPut;
const productDetailsFontSize = 12;

const BuyNowBtnSize = (2.5 / 100) * widthOutPut;
const priceDetailsFontSize = (1.1 / 100) * widthOutPut;
const moreItemFontSize = (0.9 / 100) * widthOutPut;

const reviewImgWidth = (20 / 100) * widthOutPut;
const reviewImgHeight = (14.7 / 100) * widthOutPut;
const descriptionBoxHeight = (8 / 100) * widthOutPut;

let array;

let initialEANCode = [];

const orderDetails = [
  {
    datePlaced: "23 Mar 2023",
    delivered: "29 Mar 2023",
    no_of_items: 3,
    order_id: "#828304",
    totalAmount: 4599,
    orderStatus: "Order Can be Return within 5 days of delivery",
    items: [
      {
        productTitle: "Red Chex Shirt",
        order_id: "#828304",
        color: "red",
        size: "M",
        prize: 2699,
        img: CartItemImg1,
      },
      {
        productTitle: "Red Chex Shirt",
        color: "red",
        size: "M",
        prize: 2699,
        img: CartItemImg1,
      },
      {
        productTitle: "Red Chex Shirt",
        color: "red",
        size: "M",
        prize: 2699,
        img: CartItemImg1,
      },
      {
        productTitle: "Red Chex Shirt",
        color: "red",
        size: "M",
        prize: 2699,
        img: CartItemImg1,
      },
      {
        productTitle: "Red Chex Shirt",
        color: "red",
        size: "M",
        prize: 2699,
        img: CartItemImg1,
      },
      {
        productTitle: "Red Chex Shirt",
        color: "red",
        size: "M",
        prize: 2699,
        img: CartItemImg1,
      },
      {
        productTitle: "Red Chex Shirt",
        color: "red",
        size: "M",
        prize: 2699,
        img: CartItemImg1,
      },
      {
        productTitle: "Red Chex Shirt",
        color: "red",
        size: "M",
        prize: 2699,
        img: CartItemImg1,
      },
      {
        productTitle: "Red Chex Shirt",
        color: "red",
        size: "M",
        prize: 2699,
        img: CartItemImg1,
      },
      {
        productTitle: "Red Chex Shirt",
        color: "red",
        size: "M",
        prize: 2699,
        img: CartItemImg1,
      },
      {
        productTitle: "Red Chex Shirt",
        color: "red",
        size: "M",
        prize: 2699,
        img: CartItemImg1,
      },
    ],
  },
  {
    datePlaced: "23 Mar 2023",
    delivered: "29 Mar 2023",
    no_of_items: 3,
    order_id: "#828304",
    totalAmount: 4599,
    orderStatus: "Order Can be Return within 5 days of delivery",
    items: [
      {
        productTitle: "Red Chex Shirt",
        color: "red",
        size: "M",
        prize: 2699,
        img: CartItemImg1,
      },
      {
        productTitle: "Red Chex Shirt",
        color: "red",
        size: "M",
        prize: 2699,
        img: CartItemImg1,
      },
      {
        productTitle: "Red Chex Shirt",
        color: "red",
        size: "M",
        prize: 2699,
        img: CartItemImg1,
      },
      {
        productTitle: "Red Chex Shirt",
        color: "red",
        size: "M",
        prize: 2699,
        img: CartItemImg1,
      },
      {
        productTitle: "Red Chex Shirt",
        color: "red",
        size: "M",
        prize: 2699,
        img: CartItemImg1,
      },
    ],
  },
  {
    datePlaced: "29 Mar 2023",
    delivered: "29 April 2023",
    no_of_items: 3,
    order_id: "#828304",
    totalAmount: 4599,
    orderStatus: "Order Can be Return within 5 days of delivery",
    items: [
      {
        productTitle: "Red Chex Shirt",
        color: "red",
        size: "M",
        prize: 2699,
        img: CartItemImg1,
      },
    ],
  },
];

const orderFilter = [
  {
    name: "This Year",
  },
  {
    name: "This Week",
  },
  {
    name: "This Month",
  },
];

const GRADES = [1, 2, 3, 4, 5];

export const MyOrderPage = () => {

  const showAlert = (text) => {
    Swal.fire(text);
  };

  const isDateMoreThan7DaysFromToday = (date) => {
    const today = moment();
    const orderDate = moment(date);
    const differenceInDays = orderDate.diff(today, 'days');
    return differenceInDays > 7;
  };

  const cancelOrder = (orderId, type) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/user/order/${type}/${orderId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

      .then(async (data) => {
        const responseData = await data.json();
        if (data.status == 200) {
          toast("Cancelled Successfully");
        }
        else {
          toast(responseData.error ?? responseData.message);
        }
      })
      .catch((error) => console.log(error, 'fjsssh'));
  };


  const trackOrder = (orderId) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/user/order/${orderId}/track`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (data) => {
        if (data.status == 200) {
          var urlData = await data.json();
          if (urlData.url != undefined || urlData.url != null) {
            window.open(urlData.url, '_blank');
          }
        }
      })
      .catch((error) => toast(error));
  };

  const { setIsSignIn, setIsAccount } = useContext(noteContext);
  const [userToken, setUserToken] = useState();
  const navigate = useNavigate();

  const [myOrder, setMyOrder] = useState(userToken ? false : true);
  const [myProfile, setMyProfile] = useState(userToken ? true : false);
  const [accountSetting, setAccountSetting] = useState(false);
  const [contactUs, setContactUs] = useState(false);
  const [returnAndRefund, setReturnAndRefund] = useState(false);
  const [filterMonth, setFilterMonth] = useState(false);
  const [activeDeleteAccount, setActiveDeleteAccount] = useState(false);

  // const [countries, setCountries] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectCityArray, setCityArray] = useState();
  const [selectedBillingCity, setSelectedBillingCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedBillingState, setSelectedBillingState] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedBillingCountry, setSelectedBillingCountry] = useState("");
  const [open, setOpen] = useState(false);
  const [addShippingAdd, setAddShippingAdd] = useState(false);
  const [addBillingAdd, setAddBillingAdd] = useState(false);

  const [selectedGender, setSelectedGender] = useState("");
  const [countries, setCountries] = useState(null);
  const [openCountry, setOpenCountry] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [shippindAddress, setShippingAddress] = useState("");
  const [shippindBillingAddress, setShippingBillingAddress] = useState("");
  const [shippindAddressPin, setShippingAddressPin] = useState("");
  const [shippindBillingAddressPin, setShippingBillingAddressPin] =
    useState("");
  const [handleSublineSave, setHandleSubmitSaveBilling] = useState();
  const [handleSublineSaveShipping, setHandleSubmitSaveShipping] = useState();
  const [tokenExpier, setTokenExpire] = useState("");

  const [selectedBillingCityStateCountry, setSelectedBillingCityStateCountry] =
    useState([]);
  const [
    selectedShippingCityStateCountry,
    setSelectedShippingCityStateCountry,
  ] = useState([]);
  const [showShippingAddress, setShowShippingAddress] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState();
  const [showConfrimPassword, setConfrimPassword] = useState();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showCHangeEmail, setShowChangeEmail] = useState(false);
  const [viewOrderDetails, setViewOrderDetails] = useState([]);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [viewDetailsOpenId, setViewDetailsOpenId] = useState(0);
  const [orderTrackStatue, setOrderTrackStatus] = useState(false);
  const [addReviewPopUp, setAddReviewPopup] = useState([]);
  const [addReviewPopUpOpen, setAddReviewPopupOpen] = useState(false);
  const [addReview, setAddReview] = useState(false);
  const [gradeIndex, setGradeIndex] = useState();
  const [userDetails, setUserDetails] = useState([]); //user name store from api
  const [passwordDetails, setPasswordDetails] = useState([]); //user name store from api
  const [userDataUpdate, setUserDataUpdate] = useState(true);
  const [address, setAddress] = useState([]);
  const [showUserChangePopup, setShowUserChangePopup] = useState(false);
  const [totalOrderDetails, setTotalOrderDetails] = useState([]);
  const [getTotalOrderEan, setGetTotalEan] = useState([]);
  const [getAllProduct, setAllProduct] = useState([]);
  const [getAllProductList, setGetAllProductList] = useState([]);
  const [productDetailsStatus, setProducDetailsStatus] = useState({
    status: "",
    ean: "",
  });

  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");

  let getallOrderEan = [];

  const [updatedUserdata, setupdatedUserData] = useState({
    // new state to edit
    fname: "",
    lname: "",
    mobile: "",
    email: "",
    gender: "",
  });

  const [contactUsDetails, setContactUsDetails] = React.useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [updatedPassworddata, setupdatedPasswordData] = useState({
    // new state to edit
    oldPassword: "",
    newPassword: "",
  });

  const [reducer, forceUpdate] = useReducer((x) => x + 1, 0);

  selectedBillingCityStateCountry.city = selectedBillingCity;
  selectedBillingCityStateCountry.state = selectedBillingState;
  selectedBillingCityStateCountry.country = selectedBillingCountry;
  selectedBillingCityStateCountry.shippingMainAddress = shippindBillingAddress;
  selectedBillingCityStateCountry.shippingAddressPinCode =
    shippindBillingAddressPin;

  selectedShippingCityStateCountry.city = selectedCity;
  selectedShippingCityStateCountry.state = selectedState;
  selectedShippingCityStateCountry.country = selectedCountry;
  selectedShippingCityStateCountry.shippingMainAddress = shippindAddress;
  selectedShippingCityStateCountry.shippingAddressPinCode = shippindAddressPin;

  const handleChangeUserEmail = () => {
    setShowChangeEmail(true);
    setShowChangePassword(false);
    setShowUserChangePopup(true);
  };
  const handleChangeUserPassword = () => {
    setShowChangeEmail(false);
    setShowChangePassword(true);
    setShowUserChangePopup(true);
  };

  const handleChangeContectUs = (e) => {
    const { name, value } = e.target;
    setContactUsDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmitContectUs = (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      name: contactUsDetails.fname + " " + contactUsDetails.lname,
      email: contactUsDetails.email,
      mobile: contactUsDetails.mobile,
      message: contactUsDetails.message,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.sizeupp.wezbo.xyz/site/query",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        alert("Your Query has been submitted successfully");
      })
      .catch((error) => {
        toast(error);
      });
    setContactUsDetails({
      fname: "",
      lname: "",
      email: "",
      mobile: "",
      message: "",
    });
  };

  const activeStar = {
    fill: "black",
  };

  const changeGradeIndex = (index) => {
    setGradeIndex(index);
  };

  const remove = () => {
    localStorage.removeItem("items");
    forceUpdate();
    navigate("/");
    // setIsSignIn(true)
    setIsAccount(false);
  };

  let token = JSON.parse(localStorage.getItem("items"))
    ? JSON.parse(localStorage.getItem("items"))
    : "";

  let decodedToken = jwtDecode(token);
  let currentDate = new Date();

  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    // toast("Token expired.");
  } else {
    // toast("Valid token");
    // result = true;
  }

  const fetchAllProductData = useCallback(async () => {
    // api call
    try {
      const url =
        "https://countriesnow.space/api/v0.1/countries/population/cities";
      const res = await axios.get(url);
      const { data } = res;
      setCountries(data.data);
    } catch (error) { }
  }, []);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/user/info`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (data) => {
        const userData = await data.json();
        setUserDetails(userData);
        setSelectedGender(userData.gender);
        // console.log("checkingn userDteails==>>", userData.gender);
      })
      .catch((error) => toast(error));
  };

  const fetchAddressData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/user/address/all`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (data) => {
        const userData = await data.json();
        // console.log("checking  address", userData)
        setAddress(userData);
      })
      .catch((error) => toast(error));
  };
  const fetchOrderDetailsData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/user/order/all`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (data) => {
        const userData = await data.json();
        console.log("checking  total Order details", userData)
        setTotalOrderDetails(userData);
      })
      .catch((error) => toast(error));
  };

  console.log("checking all order", totalOrderDetails);

  const handleUpdateAddress = (e) => {
    setUserDataUpdate(!userDataUpdate);
    const userData = {
      name: address.fname + address.lname,
      address1: address.address1,
      address2: address.address2,
      city: selectedCity,
      state: selectedState,
      country: selectedCountry,
      pincode: address.pincode,
      phone: address.phone,
    };

    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/user/address/${address.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }).catch((err) => toast("error ", err));
    } catch (error) {
      toast("checking error in sign", error);
    }
  };

  const handleUpdateDataSubmit = (e) => {
    alert("updated successfully");
    setUserDataUpdate(!userDataUpdate);
    e.preventDefault();
    const userData = {
      name: updatedUserdata.fname + " " + updatedUserdata.lname,
      mobile: updatedUserdata.mobile,
      email: updatedUserdata.email,
      gender: updatedUserdata.gender,
    };

    // console.log(userData);

    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/user/update`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      }).catch((err) => toast("error ", err)).then(() => remove());
    } catch (error) {
      toast("checking error in sign", error);
    }
  };

  const handleDelectAccount = () => {
    setActiveDeleteAccount(false);
    setIsAccount(false);
    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/user/delete`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            localStorage.removeItem("items");
            forceUpdate();
            navigate("/");
          }
        })
        .catch((err) => toast("error ", err));
    } catch (error) {
      toast("checking error in sign", error);
    }
  };

  // console.log("checkig true or false===>>>>", userDetails)

  const handleAddressSubmit = () => {
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
  };

  const handleGenderChange = (e) => {
    // alert(e.target.value);
    setSelectedGender(e.target.value);
    updatedUserdata.gender = e.target.value;
  };

  const handleShippingAddAddress = () => {
    setAddShippingAdd(true);
    setAddBillingAdd(false);
  };

  const handleBillingAddAddress = () => {
    setAddShippingAdd(false);
    setAddBillingAdd(true);
  };
  // console.log("checking is open", userToken)
  const handleMyOrder = () => {
    setMyOrder(true);
    setMyProfile(false);
    setAccountSetting(false);
    setContactUs(false);
    setReturnAndRefund(false);
  };
  const handleMyprofile = () => {
    setMyOrder(false);
    setMyProfile(true);
    setAccountSetting(false);
    setContactUs(false);
    setReturnAndRefund(false);
  };
  const handleMyaccount = () => {
    setMyOrder(false);
    setMyProfile(false);
    setAccountSetting(true);
    setContactUs(false);
    setReturnAndRefund(false);
  };
  const handleMyContact = () => {
    setMyOrder(false);
    setMyProfile(false);
    setAccountSetting(false);
    setContactUs(true);
    setReturnAndRefund(false);
  };
  const handleMyReturnAndRefund = () => {
    setMyOrder(false);
    setMyProfile(false);
    setAccountSetting(false);
    setContactUs(false);
    setReturnAndRefund(true);
  };

  const handleopenOderDetails = (item) => {
    // if (item === null) {
    //     console.log("checking onclick items12", item)
    // } else {
    //     fetch(`${process.env.REACT_APP_BACKEND_URL}/user/order/${item.id}`, {
    //         method: "GET",
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             Authorization:
    //                 `Bearer ${token}`,
    //         },
    //     })
    //         .then(async (data) => {
    //             const userData = await data.json()
    //             setAllProduct(userData);
    //         })
    //         .catch((error) => console.log(error));
    // }
    // console.log("chcking userData", getAllProduct)
    // setViewOrderDetails(item)
    // setViewDetailsOpen(true)
  };
  // console.log("checking onclick items", getAllProduct)

  const arrowStyled = {
    // transform: rotate(0)
    transform: `${openCountry ? "rotate(180deg)" : "rotate(0)"}`,
  };
  var headers = new Headers();
  headers.append("X-CSCAPI-KEY", "API_KEY");
  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  const getToal = () => { };

  const fetToa = () => { };

  let dummyarray = [];

  const getTotalProductList = () => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/site/product/filtered?limit=100000`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(async (data) => {
      const userData = await data.json();
      setTimeout(() => {
        return setGetAllProductList(userData);
      }, -4);
      // return res.json()
    }).then((result) => {
      // result ? dummyarray.push(result) : setAllProduct([])
      // console.log("checking get all rprofeu", result, dummyarray, `${process.env.REACT_APP_BACKEND_URL}/site/product/${productDetailsStatus.ean}`)
    }).catch((error) => toast(error));
  };


  useEffect(() => {
    fetchData();
    fetchAllProductData();
    fetchAddressData();
    handleUpdateAddress();
    fetchOrderDetailsData();
    setUserToken(JSON.parse(localStorage.getItem("items")));
    getToal();
    fetToa();
    setIsAccount(true);
    getTotalProductList();

    if (productDetailsStatus.status === "ok") {
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/site/product/ean/${productDetailsStatus.ean}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then(async (data) => {
          const userData = await data.json();
          setTimeout(() => {
            return setAllProduct(userData);
          }, -4);
          // return res.json()
        })
        .then((result) => {
          // result ? dummyarray.push(result) : setAllProduct([])
          // console.log("checking get all rprofeu", result, dummyarray, `${process.env.REACT_APP_BACKEND_URL}/site/product/${productDetailsStatus.ean}`)
        })
        .catch((error) => toast(error));
    }
  }, [reducer, productDetailsStatus]);


  // console.log("chcking userData", userDetails)

  const handleTrackStatus = () => {
    setViewDetailsOpen(false);
    setOrderTrackStatus(true);
  };

  const handleBackToOrderDetails = () => {
    setViewDetailsOpen(false);
    setOrderTrackStatus(false);
    setViewOrderDetails(null);
  };

  const handleAddReview = () => {
    setAddReview(true);
    setViewDetailsOpen(true);
    setOrderTrackStatus(false);
    setViewOrderDetails(null);
  };

  const handlePopupReview = (item) => {
    setAddReviewPopup(item);
    setAddReviewPopupOpen(true);
  };
  const handlePopupReviewClose = (item) => {
    setAddReviewPopup(null);
    setAddReviewPopupOpen(false);
  };

  const handleUpdateChangePasswordSubmit = (e) => {
    e.preventDefault();

    const passwordData = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/user/update/password`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      }).catch((err) => toast("error ", err));
    } catch (error) {
      toast("checking error in sign", error);
    }
  };

  const handleChangeUpdateUserFname = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setupdatedUserData({
      fname: value,
      lname: updatedUserdata.lname,
    });
    updatedUserdata.fname = e.target.value;
  };
  const handleChangeUpdateUserLname = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setupdatedUserData({
      fname: updatedUserdata.fname,
      lname: e.target.value,
    });
    updatedUserdata.lname = e.target.value;

  };

  const handleChangeUpdateUser = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    // setupdatedUserData({
    //   key: value,
    // });
    updatedUserdata[key] = value;
    setupdatedUserData({
      fname: updatedUserdata.fname,
      lname: updatedUserdata.lname,
      email: updatedUserdata.email,
      gender: updatedUserdata.gender,
      mobile: updatedUserdata.mobile,
    });

  };

  // const handleChangeUpdatePassword = (e) => {
  //     const key = e.target.name;
  //     const value = e.target.value;
  //     setupdatedPasswordData({
  //         name: e.target.value
  //     });

  // }

  // useEffect(() => {
  //     setupdatedPasswordData({  // new state to edit
  //         oldPassword: updatedPassworddata.oldPassword,
  //         newPassword: updatedPassworddata.newPassword,
  //     })

  //     console.log(updatedPassworddata.oldPassword);
  // })

  useEffect(() => {
    if (userDetails) {
      var spitedUsermae =
        userDetails.name != undefined ? userDetails.name.split(" ") : "";
      var firstname =
        spitedUsermae[0] != null && spitedUsermae[0] != undefined
          ? spitedUsermae[0]
          : userDetails.name;
      var lastname =
        spitedUsermae[0] != null && spitedUsermae.slice(-1)[0] != undefined
          ? spitedUsermae.slice(-1)[0]
          : userDetails.name;
      setupdatedUserData({
        // new state to edit
        fname: firstname,
        lname: lastname,
        mobile: userDetails.mobile,
        email: userDetails.email,
        gender: userDetails.gender,
      });
    }
  }, [userDetails]);


  return (
    <>
      <div className="mainDiv_MyOrderPage">
        <div className="toolBar_MyOrderPage">
          <ToolBar
            fontColor="#474747"
            logo="black"
            dropDown="#474747"
            icons="#474747"
            backGroundColor="white"
            stroke="black"
          />
        </div>
        <div className="contentMainDiv_MyOrderPage">
          <div className="leftMainDiv_MyrderPage">
            <div className="InnerleftMainDiv_MyrderPage">
              <div className="userName_MyOrderPage">
                <h1
                  style={{
                    fontSize: `${userNameFontSize}px`,
                  }}
                >
                  <span>Hello,</span> <br></br>
                  {updatedUserdata.fname} {updatedUserdata.lname}
                </h1>
              </div>

              <div className="contentMainLeftDiv_MyOrderPage">
                {/* {
                                leftContentDivArray?.map((item, id) => {
                                    return (<> */}
                <button
                  onClick={handleMyOrder}
                  style={{
                    backgroundColor: `${myOrder ? "#F5F5F5" : "transparent"}`,
                  }}
                  className="myOrderLeftContent_MyOrderPage"
                >
                  <div className="myOrderLeftContentInner_MyOrderPage">
                    <div className="iconLeftContentDiv_MyOrderPage">
                      <img src={MyOrderSVG} />
                    </div>
                    <div className="contentLeftContentDiv_MyOrderPage">
                      <h1
                        style={{
                          fontSize: `${leftContentFontSize}px`,
                        }}
                      >
                        My Order
                      </h1>
                    </div>
                  </div>
                </button>
                <button
                  onClick={handleMyprofile}
                  style={{
                    backgroundColor: `${myProfile ? "#F5F5F5" : "transparent"}`,
                  }}
                  className="myOrderLeftContent_MyOrderPage"
                >
                  <div className="myOrderLeftContentInner_MyOrderPage">
                    <div className="iconLeftContentDiv_MyOrderPage">
                      <img src={MyAccountIcon} />
                    </div>
                    <div className="contentLeftContentDiv_MyOrderPage">
                      <h1
                        style={{
                          fontSize: `${leftContentFontSize}px`,
                        }}
                      >
                        My profile
                      </h1>
                    </div>
                  </div>
                </button>
                <button
                  onClick={handleMyaccount}
                  style={{
                    backgroundColor: `${accountSetting ? "#F5F5F5" : "transparent"
                      }`,
                  }}
                  className="myOrderLeftContent_MyOrderPage"
                >
                  <div className="myOrderLeftContentInner_MyOrderPage">
                    <div className="iconLeftContentDiv_MyOrderPage">
                      <img src={MySettingIcon} />
                    </div>
                    <div className="contentLeftContentDiv_MyOrderPage">
                      <h1
                        style={{
                          fontSize: `${leftContentFontSize}px`,
                        }}
                      >
                        account setting
                      </h1>
                    </div>
                  </div>
                </button>
                <Link
                to="/contact-us" 
                  // onClick={handleMyContact}
                  style={{
                    backgroundColor: `${contactUs ? "#F5F5F5" : "transparent"}`,
                  }}
                  className="myOrderLeftContent_MyOrderPage"
                >
                  <div className="myOrderLeftContentInner_MyOrderPage">
                    <div className="iconLeftContentDiv_MyOrderPage">
                      <img src={MyContactIcon} />
                    </div>
                    <div className="contentLeftContentDiv_MyOrderPage">
                      <h1
                        style={{
                          fontSize: `${leftContentFontSize}px`,
                        }}
                      >
                        contact us
                      </h1>
                    </div>
                  </div>
                </Link>
                { /* <button
                  onClick={handleMyReturnAndRefund}
                  style={{
                    backgroundColor: `${
                      returnAndRefund ? "#F5F5F5" : "transparent"
                    }`,
                  }}
                  className="myOrderLeftContent_MyOrderPage"
                >
                  <div className="myOrderLeftContentInner_MyOrderPage">
                    <div className="iconLeftContentDiv_MyOrderPage">
                      <img src={ReturnAndRedundIcon} />
                    </div>
                    <div className="contentLeftContentDiv_MyOrderPage">
                      <h1
                        style={{
                          fontSize: `${leftContentFontSize}px`,
                        }}
                      >
                        return and refund
                      </h1>
                    </div>
                  </div>
                </button>
                      */ }
                {/* </>)
                                })
                            } */}
                {/* newsingout */}
                {userToken ? (
                  <div className="signOutBtn_CartPage">
                    <button
                      onClick={remove}
                      style={{
                        height: `${signOutBtnHeight}px`,
                      }}
                    >
                      <img src={SignOutIcon} />
                      <h1
                        style={{
                          fontSize: `${leftContentFontSize}px`,
                        }}
                      >
                        Sign Out
                      </h1>
                    </button>
                  </div>
                ) : null}
                {/* newsingout */}
              </div>
            </div>

            {/* oldsignout */}
          </div>
          {myOrder ? (
            <div className="rightMainDiv_MyOrderPage">
              <div className="headerRightMainDiv_MyOrderPage">
                <div className="sumyorder">
                  <h1
                    style={{
                      fontSize: `${userNameFontSize * 1.2}px`,
                      fontWeight: 600,
                    }}
                  >
                    My Orders
                  </h1>
                </div>{" "}
                <br />
                {/* {viewDetailsOpen ? (
                  <h2
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: `${orderDateDetailsFontSize}px`,
                      fontWeight: "500",
                    }}
                  >
                    &nbsp;&nbsp;(Order Details)
                  </h2>
                ) : orderTrackStatue ? (
                  <h2
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: `${orderDateDetailsFontSize}px`,
                      fontWeight: "500",
                    }}
                  >
                    &nbsp;&nbsp;(Order Tracking)
                  </h2>
                ) : (
                  <div
                    onClick={() => setOpen(!open)}
                    className="selectMainDiv_MyOrderPage"
                    style={{
                      width: `${BuyNowBtnSize * 4.5}px`,
                      height: `${BuyNowBtnSize}px`,
                    }}
                  >
                    {selected ? (
                      selected?.length > 8 ? (
                        selected?.substring(0, 8) + "..."
                      ) : (
                        selected
                      )
                    ) : (
                      <h1
                        style={{
                          fontSize: `${productDetailsFontSize}px`,
                        }}
                      >
                        Recent Orders
                      </h1>
                    )}
                    <BiChevronDown size={20} style={arrowStyled} />
                    {open ? (
                      <ul
                        className="selectUl_MyOrderPage"
                        style={{
                          // width: `${BuyNowBtnSize * 4}px`,
                          top: `${BuyNowBtnSize}px`,
                          fontSize: `${productDetailsFontSize}px`,
                        }}
                      >
                        {orderFilter?.map((item) => (
                          <li
                            key={item?.name}
                            onClick={() => {
                              if (
                                item?.name?.toLowerCase() !==
                                selected.toLowerCase()
                              ) {
                                setSelected(item?.name);
                                setOpen(false);
                                setInputValue("");
                              }
                            }}
                          >
                            {item?.name}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                )} */}
              </div>
              {/* .filter(item => !(item.orderType === "PPD" && item.paymentStatus === "PENDING")) */}
              {totalOrderDetails?.length > 0 &&
                totalOrderDetails?.map((item, id) => {
                  let datePlaced = moment(item.createdAt)
                    .utc()
                    .format("DD MMM YYYY");
                  let expextedDelivery = moment(item.updatedAt)
                    .utc()
                    .format("DD MMMM YYYY");

                  // getallOrderEan.push(item?.orderItems[id].ean_code)

                  let totalArray = [];
                  let totalAmount = 0;
                  for (let i = 0; i < item?.orderItems?.length; i++) {
                    totalArray.push(+item?.orderItems[id]?.mrp);
                  }

                  totalAmount = totalArray.reduce(
                    (previousValue, currentValue, index) =>
                      previousValue + currentValue,
                    0
                  );
                  // console.log("checking orderStatus===>>>", item.orderItems[id].ean_code)

                  return (
                    <>
                      <div
                        style={{
                          background: "white",
                          marginBottom: "2rem",
                        }}
                      >
                        <div
                          key={id}
                          className="itemsDetailsList_MyOrderPage"
                          style={{ border: "1px solid #C7C7C7" }}
                        >
                          <div className="itemsDetailsListInner_MyOrderPage">
                            <div className="itemDetaillist_MyOrderPage">
                              <h2
                                style={{
                                  fontSize: `${orderDateDetailsFontSize}px`,
                                }}
                              >
                                Date Placed
                              </h2>
                              <h3
                                style={{
                                  fontSize: `${leftContentFontSize}px`,
                                }}
                              >
                                {datePlaced}
                              </h3>
                            </div>
                            <div className="itemDetaillist_MyOrderPage">
                              <h2
                                style={{
                                  fontSize: `${orderDateDetailsFontSize}px`,
                                }}
                              >
                                Order Type
                              </h2>
                              <h3
                                style={{
                                  fontSize: `${leftContentFontSize}px`,
                                }}
                              >
                                {item?.orderType}
                              </h3>
                            </div>
                            <div className="itemDetaillist_MyOrderPage">
                              <h2
                                style={{
                                  fontSize: `${orderDateDetailsFontSize}px`,
                                }}
                              >
                                Items
                              </h2>
                              <h3
                                style={{
                                  fontSize: `${leftContentFontSize}px`,
                                }}
                              >
                                {item.orderItems.length}
                              </h3>
                            </div>
                            <div className="itemDetaillist_MyOrderPage">
                              <h2
                                style={{
                                  fontSize: `${orderDateDetailsFontSize}px`,
                                }}
                              >
                                Order ID
                              </h2>
                              <h3
                                style={{
                                  fontSize: `${leftContentFontSize}px`,
                                }}
                              >
                                {item.id}
                              </h3>
                            </div>
                            <div className="itemDetaillist_MyOrderPage">
                              <h2
                                style={{
                                  fontSize: `${orderDateDetailsFontSize}px`,
                                }}
                              >
                                Order Status
                              </h2>
                              <h3
                                style={{
                                  fontSize: `${leftContentFontSize}px`,
                                }}
                              >
                                {item.orderStatus}
                              </h3>
                            </div>
                            <div className="itemDetaillist_MyOrderPage">
                              <h2
                                style={{
                                  fontSize: `${orderDateDetailsFontSize}px`,
                                }}
                              >
                                Payment Status
                              </h2>
                              <h3
                                style={{
                                  fontSize: `${leftContentFontSize}px`,
                                }}
                              >
                                {item.paymentStatus}
                              </h3>
                            </div>
                            <div className="itemDetaillist_MyOrderPage">
                              <h2
                                style={{
                                  fontSize: `${orderDateDetailsFontSize}px`,
                                }}
                              >
                                total amount
                              </h2>
                              <h3
                                style={{
                                  fontSize: `${leftContentFontSize}px`,
                                }}
                              >
                                {item.total}
                              </h3>
                            </div>
                            <div className="itemDetaillist_MyOrderPage">
                              <button
                                style={{
                                  fontSize: `${productDetailsFontSize * 0.8}px`,
                                  // height: `${BuyNowBtnSize}px`,
                                  background: "#262626",
                                  color: "white",
                                  padding: "10px",
                                }}
                                onClick={() => trackOrder(item.id)}
                              >
                                Track Order
                              </button>

                              <button
                                style={{
                                  fontSize: `${productDetailsFontSize * 0.8}px`,
                                  // height: `${BuyNowBtnSize}px`,
                                  background: "#262626",
                                  color: "white",
                                  textAlign: "center",
                                  padding: "10px",
                                  marginTop:'20px',
                                }}
                                onClick={() => {

                                
                                  setProducDetailsStatus(
                                    {
                                      status: "ok",
                                      ean: initialEANCode[id],
                                    },
                                    setViewOrderDetails(
                                      getAllProductList
                                    ),
                                    setViewDetailsOpen(!viewDetailsOpen)
                                  )
                                  if(viewDetailsOpen)
                                    {
                                      setViewDetailsOpenId(0);

                                    }
                                    else
                                    {
                                      setViewDetailsOpenId(item.id);

                                    }
                                }
                                }
                              >
                                {viewDetailsOpenId == item?.id ? 'Close' : 'View'}
                              </button>
                              <button
                                style={{
                                  fontSize: `${productDetailsFontSize * 0.8}px`,
                                  height: `${BuyNowBtnSize}px`,
                                  fontWeight: 600,
                                  
                                  width: `${BuyNowBtnSize * 2.3}px`,
                                }}
                                onClick={() => item.orderStatus != "DELIVERED" ? cancelOrder(item.id, "cancel") : cancelOrder(item.id, "return")}
                              >
                                {item.orderStatus != "DELIVERED" ? "Cancel" : "Return"}
                              </button>
                            </div>
                          </div>
                          {orderTrackStatue ? null : (
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                style={{
                                  flexDirection: `${viewDetailsOpenId == item?.id ? "column" : "row"
                                    }`,
                                  width: `${viewDetailsOpenId == item?.id ? "100%" : "30%"}`,
                                }}
                                className="itemsDetailsListLowerMainDiv_MyOrderPage"
                              >
                                <div
                                  style={{
                                    width: `${viewDetailsOpenId == item?.id ? "100%" : "75%"
                                      }`,
                                    display: "flex",
                                    flexDirection: `${viewDetailsOpenId == item?.id ? "column" : "row"
                                      }`,
                                  }}
                                >
                                  {item.orderItems?.map((itemsDetails, id) => {
                                    initialEANCode.push(
                                      itemsDetails?.ean_code
                                    );
                                    return (
                                      <>
                                        {viewDetailsOpenId != item?.id ? (
                                          <div
                                            style={{
                                              width: "100%",
                                              display: "flex",
                                              marginRight: "0.4rem",
                                            }}
                                          >
                                            {


                                              <div className="allOrderImagesMainDiv_MyOrderPage">
                                                <img
                                                  style={{
                                                    width: `${item.orderItems
                                                      .length > 1
                                                      ? "100%"
                                                      : "50%"
                                                      }`,
                                                  }}
                                                  src={
                                                    itemsDetails?.product.featuredImage
                                                  }
                                                />
                                              </div>



                                              // getAllProductList?.map(
                                              //   (totalItemList, id) => {
                                              //     if (
                                              //       itemsDetails?.ean_code ==
                                              //       totalItemList?.ean_code
                                              //     ) {

                                              //       return (
                                              //         <div className="allOrderImagesMainDiv_MyOrderPage">
                                              //           <img
                                              //             style={{
                                              //               width: `${item.orderItems
                                              //                 .length > 1
                                              //                 ? "100%"
                                              //                 : "50%"
                                              //                 }`,
                                              //             }}
                                              //             src={
                                              //               totalItemList?.featuredImage
                                              //             }
                                              //           />
                                              //         </div>
                                              //       );
                                              //     }
                                              //   }
                                              // )
                                            }
                                          </div >
                                        ) : null}
                                      </>
                                    );
                                  })}
                                </div>

                                <div
                                  style={{
                                    width: "25%",
                                    marginTop: "1rem",
                                    marginLeft: "0.5rem",
                                    cursor: "pointer",
                                  }}
                                >
                                  {viewDetailsOpenId != item?.id
                                    ? item.orderItems.length >= 4 && (
                                      <span
                                        style={{
                                          fontSize: `${moreItemFontSize}px`,
                                        }}
                                        onClick={() =>
                                          handleopenOderDetails(item)
                                        }
                                        className="badge"
                                      >
                                        {item.orderItems.length - 4} +more
                                      </span>
                                    )
                                    : null}
                                </div>
                                {viewDetailsOpen && viewDetailsOpenId === item?.id
                                  ? // getAllProduct?.map((itemsDetails, index) => {

                                  //     console.log("checking items", dummyarray)
                                  //     return (<>
                                  item?.orderItems?.map(
                                    (orderItemsList, id) => {
                                      // array.push(orderItemsList?.ean_code)
                                      console.log(
                                        "checking orderItemsList",
                                        getAllProductList[id]?.description
                                          ?.ean_code,
                                        getAllProductList[id],
                                        "==<<>>==",
                                        orderItemsList?.ean_code,
                                        "==<<>>>===",
                                        getAllProductList[id]?.product_title
                                      );
                                      var viewOrderItemList = orderItemsList?.product;
                                      return (<div className="itemsDetailsListLowerDiv_MyOrderPage" >
                                        <a href={`/product-details?eon=${viewOrderItemList?.ean_code}&s=${viewOrderItemList?.description?.size}`}
                                          style={{
                                            textDecoration: "none",
                                            color: "#262626",
                                          }}
                                        >
                                          <div className="itemContentDiv_MyOrderPage">
                                            <div className="itemContentInnerDiv_MyOrderPage">
                                              <div className="itemContentInnerLeftDiv_MyOrderPage">
                                                <div className="itemImg_MyOrderPage">
                                                  <img
                                                    src={
                                                      viewOrderItemList?.featuredImage
                                                    }
                                                  />
                                                </div>
                                                <div className="itemContent_MyOrderPage">
                                                  <div>
                                                    <h1
                                                      style={{
                                                        fontSize: `${productDetailsFontSize}px`,
                                                        fontWeight: 600,
                                                      }}
                                                    >
                                                      {
                                                        viewOrderItemList?.product_title
                                                      }
                                                      {/* {itemsDetails.product_type} */}
                                                    </h1>
                                                  </div>
                                                  <div className="colorSizeDiv_MyOrderPage">
                                                    <h2
                                                      style={{
                                                        fontSize: `${productDetailsFontSize}px`,
                                                      }}
                                                    >
                                                      Color:{" "}
                                                      {
                                                        viewOrderItemList
                                                          ?.description
                                                          ?.color
                                                      }
                                                      {/* {getAllProduct.product.description.color ? getAllProduct.product.description.color : ""} */}
                                                    </h2>
                                                    <h2
                                                      style={{
                                                        fontSize: `${productDetailsFontSize}px`,
                                                      }}
                                                    >
                                                      Size:{" "}
                                                      {
                                                        viewOrderItemList
                                                          ?.description
                                                          ?.size
                                                      }
                                                      {/* {itemsDetails.description.size} */}
                                                    </h2>
                                                  </div>
                                                  <div className="colorSizeDiv_MyOrderPage">
                                                    <h3
                                                      style={{
                                                        fontSize: `${productDetailsFontSize}px`,
                                                        fontWeight: 500,
                                                      }}
                                                    >
                                                      ₹{" "}
                                                      {
                                                        viewOrderItemList?.mrp
                                                      }
                                                      {/* {itemsDetails.mrp} */}
                                                    </h3>

                                                    <h3
                                                      style={{
                                                        fontSize: `${productDetailsFontSize}px`,
                                                        fontWeight: 500,
                                                      }}
                                                    >
                                                      
                                                      Qnty: 
                                                      {
                                                      orderItemsList?.quantity
                                                      }
                                                      {/* {itemsDetails.mrp} */}
                                                    </h3>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </a>
                                      </div>);
                                      // return (
                                      //   <>
                                      //     {getAllProductList?.map(
                                      //       (viewOrderItemList, id) => {
                                      //         if (
                                      //           viewOrderItemList?.ean_code ===
                                      //           orderItemsList?.ean_code
                                      //         ) {
                                      //           return (
                                      //             <div className="itemsDetailsListLowerDiv_MyOrderPage" >
                                      //               <a href={`/product-details?eon=${viewOrderItemList?.ean_code}&s=${viewOrderItemList?.description?.size}`}
                                      //                 style={{
                                      //                   textDecoration: "none",
                                      //                   color: "#262626",
                                      //                 }}
                                      //               >
                                      //                 <div className="itemContentDiv_MyOrderPage">
                                      //                   <div className="itemContentInnerDiv_MyOrderPage">
                                      //                     <div className="itemContentInnerLeftDiv_MyOrderPage">
                                      //                       <div className="itemImg_MyOrderPage">
                                      //                         <img
                                      //                           src={
                                      //                             viewOrderItemList?.featuredImage
                                      //                           }
                                      //                         />
                                      //                       </div>
                                      //                       <div className="itemContent_MyOrderPage">
                                      //                         <div>
                                      //                           <h1
                                      //                             style={{
                                      //                               fontSize: `${productDetailsFontSize}px`,
                                      //                               fontWeight: 600,
                                      //                             }}
                                      //                           >
                                      //                             {
                                      //                               viewOrderItemList?.product_title
                                      //                             }
                                      //                             {/* {itemsDetails.product_type} */}
                                      //                           </h1>
                                      //                         </div>
                                      //                         <div className="colorSizeDiv_MyOrderPage">
                                      //                           <h2
                                      //                             style={{
                                      //                               fontSize: `${productDetailsFontSize}px`,
                                      //                             }}
                                      //                           >
                                      //                             Color:{" "}
                                      //                             {
                                      //                               viewOrderItemList
                                      //                                 ?.description
                                      //                                 ?.color
                                      //                             }
                                      //                             {/* {getAllProduct.product.description.color ? getAllProduct.product.description.color : ""} */}
                                      //                           </h2>
                                      //                           <h2
                                      //                             style={{
                                      //                               fontSize: `${productDetailsFontSize}px`,
                                      //                             }}
                                      //                           >
                                      //                             Size:{" "}
                                      //                             {
                                      //                               viewOrderItemList
                                      //                                 ?.description
                                      //                                 ?.size
                                      //                             }
                                      //                             {/* {itemsDetails.description.size} */}
                                      //                           </h2>
                                      //                         </div>
                                      //                         <div>
                                      //                           <h3
                                      //                             style={{
                                      //                               fontSize: `${productDetailsFontSize}px`,
                                      //                               fontWeight: 500,
                                      //                             }}
                                      //                           >
                                      //                             ₹{" "}
                                      //                             {
                                      //                               viewOrderItemList?.mrp
                                      //                             }
                                      //                             {/* {itemsDetails.mrp} */}
                                      //                           </h3>
                                      //                         </div>
                                      //                       </div>
                                      //                     </div>
                                      //                   </div>
                                      //                 </div>
                                      //               </a>
                                      //             </div>
                                      //           );
                                      //         }
                                      //       }
                                      //     )}
                                      //   </>
                                      // );
                                    }
                                  )
                                  : //     </>)
                                  // })

                                  null}
                              </div>
                              {viewDetailsOpenId != item?.id ? (
                                <div
                                  style={{
                                    width: "70%",
                                    display: "flex",
                                    justifyContent: "end",
                                  }}
                                >
                                  <div className="itemContentInnerRightDivCancle_MyOrderPage">
                                    <div className="viewProductDiv_MyOrderPage">

                                    </div>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          )}
                          {addReview
                            ? item.items?.map((itemsDetails, index) => {
                              return (
                                <>
                                  <div
                                    key={index}
                                    className="itemsDetailsListLowerDiv_MyOrderPage"
                                  >
                                    <div className="itemContentDiv_MyOrderPage">
                                      <div className="itemContentInnerDiv_MyOrderPage">
                                        <div className="itemContentInnerLeftDiv_MyOrderPage">
                                          <div className="itemImg_MyOrderPage">
                                            <img src={CartItemImg1} />
                                          </div>
                                          <div className="itemContent_MyOrderPage">
                                            <div>
                                              <h1
                                                style={{
                                                  fontSize: `${productDetailsFontSize}px`,
                                                  fontWeight: 600,
                                                }}
                                              >
                                                {itemsDetails.productTitle}
                                              </h1>
                                            </div>
                                            <div className="colorSizeDiv_MyOrderPage">
                                              <h2
                                                style={{
                                                  fontSize: `${productDetailsFontSize}px`,
                                                }}
                                              >
                                                Color: {itemsDetails.color}
                                              </h2>
                                              <h2
                                                style={{
                                                  fontSize: `${productDetailsFontSize}px`,
                                                }}
                                              >
                                                Size: {itemsDetails.size}
                                              </h2>
                                            </div>
                                            <div>
                                              <h3
                                                style={{
                                                  fontSize: `${productDetailsFontSize}px`,
                                                  fontWeight: 500,
                                                }}
                                              >
                                                ₹ {itemsDetails.prize}
                                              </h3>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          style={{
                                            width: "40%",
                                            display: "flex",
                                          }}
                                        >
                                          <div
                                            style={{
                                              width: "33.33%",
                                            }}
                                            className="itemContentInnerRightDiv_MyOrderPage"
                                          >
                                            <div
                                              style={{
                                                width: "100%",
                                                borderRight:
                                                  "1px solid #C5C5C5",
                                                display: "flex",
                                                justifyContent:
                                                  "space-around",
                                              }}
                                              className="viewProductDiv_MyOrderPage"
                                            >
                                              <h2
                                                style={{
                                                  fontSize: `${productDetailsFontSize}px`,
                                                  height: `${BuyNowBtnSize}px`,
                                                }}
                                              >
                                                {/* view product */}
                                              </h2>
                                            </div>
                                          </div>
                                          <div
                                            style={{
                                              width: "33.33%",
                                            }}
                                            className="itemContentInnerRightDiv_MyOrderPage"
                                          >
                                            <div
                                              style={{
                                                width: "100%",
                                                borderRight:
                                                  "1px solid #C5C5C5",
                                                display: "flex",
                                                justifyContent:
                                                  "space-around",
                                              }}
                                              className="viewProductDiv_MyOrderPage"
                                            >
                                              <h2
                                                style={{
                                                  fontSize: `${productDetailsFontSize}px`,
                                                  height: `${BuyNowBtnSize}px`,
                                                  cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                  handlePopupReview(
                                                    itemsDetails
                                                  )
                                                }
                                              >
                                                Add Review
                                              </h2>
                                            </div>
                                          </div>
                                          <div
                                            style={{
                                              width: "33.33%",
                                            }}
                                            className="itemContentInnerRightDiv_MyOrderPage"
                                          >
                                            <div
                                              style={{
                                                width: "100%",
                                              }}
                                              className="viewProductDiv_MyOrderPage"
                                            >
                                              <button
                                                style={{
                                                  fontSize: `${productDetailsFontSize}px`,
                                                  height: `${BuyNowBtnSize * 1.2
                                                    }px`,
                                                  width: `${BuyNowBtnSize * 3
                                                    }px`,
                                                }}
                                              >
                                                Buy Again
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })
                            : null}
                          {orderTrackStatue ? (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  width: `${item.orderItems.length >= 2 ? "13%" : "15%"
                                    }`,
                                  display: "flex",
                                  // flexDirection: `${viewDetailsOpen ? "column" : "row"}`
                                }}
                              >
                                {item.orderItems
                                  ?.slice(0, 2)
                                  ?.map((itemsDetails, id) => {
                                    // console.log("checkng no. of item", item.orderItems.length)
                                    return (
                                      <>
                                        {
                                          <div
                                            style={{
                                              width: "100%",
                                              display: "flex",
                                              marginRight: "0.4rem",
                                              height: "max-content",
                                            }}
                                          >
                                            <div className="allOrderImagesMainDiv_MyOrderPage">
                                              <img
                                                style={{
                                                  width: `${item.orderItems.length >= 2
                                                    ? "100%"
                                                    : "40%"
                                                    }`,
                                                }}
                                                src={CartItemImg1}
                                              />
                                            </div>
                                          </div>
                                        }
                                      </>
                                    );
                                  })}
                              </div>

                              <div
                                style={{
                                  width: "10%",
                                  marginTop: "1rem",
                                  marginLeft: "0.5rem",
                                  cursor: "pointer",
                                }}
                              >
                                {orderTrackStatue
                                  ? item.orderItems.length >= 2 && (
                                    <span
                                      style={{
                                        fontSize: `${moreItemFontSize}px`,
                                      }}
                                      onClick={() =>
                                        handleopenOderDetails(item)
                                      }
                                      className="badge"
                                    >
                                      {item.orderItems.length - 2} +more
                                    </span>
                                  )
                                  : null}
                              </div>
                              <div
                                style={{
                                  width: "57%",
                                }}
                              >
                                <section className="vh-100 gradient-custom-2">
                                  <MDBContainer className="py-5 h-100">
                                    <MDBRow className="justify-content-center align-items-center h-100">
                                      <MDBCol md="10" lg="8" xl="6">
                                        <MDBCard
                                          className="card-stepper"
                                          style={{
                                            borderRadius: "16px",
                                            width: "400px",
                                          }}
                                        >
                                          <MDBCardBody className="p-4">
                                            <ul
                                              id="progressbar-1"
                                              className="mx-0 mt-0 mb-5 px-0 pt-0 pb-4"
                                            >
                                              <li
                                                className={
                                                  item.orderStatus === "PLACED"
                                                    ? "step0 active"
                                                    : "step0"
                                                }
                                                id="step1"
                                              >
                                                <span
                                                  style={{
                                                    marginLeft: "22px",
                                                    marginTop: "12px",
                                                  }}
                                                >
                                                  PLACED
                                                </span>
                                              </li>
                                              <li
                                                className={
                                                  item.shippingStatus ===
                                                    "PLACED"
                                                    ? "step0 active text-center"
                                                    : "step0 text-center"
                                                }
                                                id="step2"
                                              >
                                                <span>SHIPPED</span>
                                              </li>
                                              <li
                                                className={
                                                  item.deviveredStatus ===
                                                    "PLACED"
                                                    ? "step0 active text-muted text-end"
                                                    : "step0 text-muted text-end"
                                                }
                                                id="step3"
                                              >
                                                <span
                                                  style={{
                                                    marginRight: "22px",
                                                  }}
                                                >
                                                  DELIVERED
                                                </span>
                                              </li>
                                            </ul>
                                          </MDBCardBody>
                                        </MDBCard>
                                      </MDBCol>
                                    </MDBRow>
                                  </MDBContainer>
                                </section>
                              </div>
                              <div
                                style={{
                                  // borderLeft: "1px solid #C5C5C5",
                                  width: "20%",
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                              >
                                <button
                                  onClick={handleAddReview}
                                  style={{
                                    fontSize: `${productDetailsFontSize * 1}px`,
                                    height: `${BuyNowBtnSize}px`,
                                    width: `${BuyNowBtnSize * 3.4}px`,
                                    border: "2px solid #2D2D2D",
                                  }}
                                >
                                  Cancel Order
                                </button>
                              </div>
                            </div>
                          ) : null}
                        </div>
                        {orderTrackStatue ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              width: "100%",
                            }}
                            className="orderStatusMainDiv_MyOrder"
                          >
                            <h2
                              style={{
                                fontSize: `${orderDateDetailsFontSize}px`,
                                display: "flex",
                                justifyContent: "center",
                                cursor: "pointer",
                                // width: "20%"
                              }}
                              onClick={handleBackToOrderDetails}
                            >
                              <img src={BackArrow} /> &nbsp;Order Details
                            </h2>
                          </div>
                        ) : null}
                      </div >
                    </>
                  );
                })}
            </div>
          ) : myProfile ? (
            <div className="rightMainDiv_MyOrderPage">
              <div className="headerRightMainDiv_MyOrderPage_MyProfile">
                <div
                  className="profile_title"
                  style={{
                    marginTop: "100px",
                    paddingBottom: "2rem",
                  }}
                >
                  <h1
                    style={{
                      fontSize: `${userNameFontSize * 1.2}px`,
                      fontWeight: 600,
                    }}
                  >
                    My Profile
                  </h1>
                </div>
                <div className="personalDetailsMainDiv_MyOrderPage_MyProfile">
                  <div className="personalDetailsLeftMainDiv_MyOrderPage_MyProfile">
                    <div className="personalDetailsHeadder_MyOrderPage_MyProfile">
                      <h1
                        style={{
                          fontSize: `${userNameFontSize}px`,
                        }}
                      >
                        Personal details:
                      </h1>
                    </div>
                    <div className="personalDetailsMiddleMainDiv_MyOrderPage_MyProfile">
                      <div className="nameMainDiv_MyOrderPage_MyProfile">
                        <div className="nameInnerMainDiv_MyOrderPage_MyProfile">
                          <div className="selectInnerMainDiv_MyOrderPage_MyProfile">
                            <h2
                              style={{
                                fontSize: `${priceDetailsFontSize}px`,
                                color: "#515151",
                                paddingBottom: "0.3rem",
                                fontWeight: 600,
                              }}
                            >
                              First Name
                            </h2>
                            <div
                              className="selectMainInputDiv_MyOrderPage_MyProfile"
                              style={{
                                width: `${BuyNowBtnSize * 4}px`,
                                height: `${BuyNowBtnSize * 1.2}px`,
                              }}
                            >
                              <input
                                type="text"
                                placeholder="Enter First Name"
                                name="fname"
                                value={updatedUserdata.fname}
                                readOnly={userDataUpdate ? false : true}
                                onChange={handleChangeUpdateUser}
                              // onChange={handleChangeUpdateUserFname}
                              />
                            </div>
                          </div>
                          <div className="selectInnerMainDiv_ShippingDetails">
                            <h2
                              style={{
                                fontSize: `${priceDetailsFontSize}px`,
                                color: "#515151",
                                paddingBottom: "0.3rem",
                                fontWeight: 600,
                              }}
                            >
                              Last Name
                            </h2>
                            <div
                              className="selectMainInputDiv_MyOrderPage_MyProfile"
                              style={{
                                width: `${BuyNowBtnSize * 4}px`,
                                height: `${BuyNowBtnSize * 1.2}px`,
                              }}
                            >
                              <input
                                type="text"
                                placeholder="Enter Last Name"
                                name="lname"
                                value={updatedUserdata.lname}
                                readOnly={userDataUpdate ? false : true}
                                onChange={handleChangeUpdateUser}
                              //  onChange={handleChangeUpdateUserLname}

                              />
                            </div>
                          </div>
                        </div>
                        <div className="phoneNoMainDiv_MyOrderPage_MyProfile">
                          <div className="phoneInnerMainDiv_MyOrderPage_MyProfile">
                            <h2
                              style={{
                                fontSize: `${priceDetailsFontSize}px`,
                                color: "#515151",
                                paddingBottom: "0.3rem",
                                fontWeight: 600,
                              }}
                            >
                              Phone No.
                            </h2>
                            <div
                              className="selectMainInputDiv_MyOrderPage_MyProfile"
                              style={{
                                width: `${BuyNowBtnSize * 4}px`,
                                height: `${BuyNowBtnSize * 1.2}px`,
                              }}
                            >
                              <input
                                type="number"
                                placeholder="Enter your Number"
                                name="mobile"
                                value={updatedUserdata.mobile}
                                readOnly={userDataUpdate ? false : true}
                                onChange={handleChangeUpdateUser}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="phoneNoMainDiv_MyOrderPage_MyProfile">
                          <div className="phoneInnerMainDiv_MyOrderPage_MyProfile">
                            <h2
                              style={{
                                fontSize: `${priceDetailsFontSize}px`,
                                color: "#515151",
                                paddingBottom: "0.3rem",
                                fontWeight: 600,
                              }}
                            >
                              Email Id
                            </h2>
                            <div
                              className="selectMainInputDiv_MyOrderPage_MyProfile"
                              style={{
                                width: `${BuyNowBtnSize * 4}px`,
                                height: `${BuyNowBtnSize * 1.2}px`,
                                color: "#515151",
                              }}
                            >
                              <input
                                type="text"
                                placeholder="Enter Your Email"
                                name="email"
                                value={updatedUserdata.email}
                                readOnly={userDataUpdate ? false : true}
                                onChange={handleChangeUpdateUser}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="phoneNoMainDiv_MyOrderPage_MyProfile">
                          <div className="phoneInnerMainDiv_MyOrderPage_MyProfile">
                            <div
                              className="selectMainRadioDiv_MyOrderPage_MyProfile"
                              style={{
                                width: `${BuyNowBtnSize * 4}px`,
                                height: `${BuyNowBtnSize * 1.2}px`,
                                color: "#515151",
                              }}
                            >
                              <label>
                                <input
                                  type="radio"
                                  name="gender"
                                  value="male"
                                  checked={selectedGender === "male"}
                                  // value={updatedUserdata.gender}
                                  // checked={updatedUserdata.gender === "male"}
                                  // readOnly={userDataUpdate ? false : true}
                                  disabled={userDataUpdate ? false : true}
                                  onChange={handleGenderChange}
                                />
                                <h2
                                  style={{
                                    fontSize: `${priceDetailsFontSize}px`,
                                    color: `${selectedGender === "male"
                                      ? "#515151"
                                      : "#999999"
                                      }`,
                                    paddingLeft: "0.3rem",
                                    fontWeight: 600,
                                  }}
                                >
                                  Male
                                </h2>
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="gender"
                                  value="female"
                                  checked={selectedGender === "female"}
                                  // value={updatedUserdata.gender}
                                  // checked={updatedUserdata.gender === "female"}
                                  disabled={userDataUpdate ? false : true}
                                  onChange={handleGenderChange}
                                />
                                <h2
                                  style={{
                                    fontSize: `${priceDetailsFontSize}px`,
                                    color: `${selectedGender === "female"
                                      ? "#515151"
                                      : "#999999"
                                      }`,
                                    paddingLeft: "0.3rem",
                                    fontWeight: 600,
                                  }}
                                >
                                  Female
                                </h2>
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="gender"
                                  // value={updatedUserdata.gender}
                                  // checked={selectedGender === "other"}
                                  value="other"
                                  checked={selectedGender === "other"}
                                  disabled={userDataUpdate ? false : true}
                                  onChange={handleGenderChange}
                                />
                                <h2
                                  style={{
                                    fontSize: `${priceDetailsFontSize}px`,
                                    color: `${selectedGender === "other"
                                      ? "#515151"
                                      : "#999999"
                                      }`,
                                    paddingLeft: "0.3rem",
                                    fontWeight: 600,
                                  }}
                                >
                                  Other
                                </h2>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="BtnMainDiv_MyOrderPage_MyProfile">
                          <div className="Btn_MyOrderPage_MyProfile">
                            <button
                              style={{
                                width: `${BuyNowBtnSize * 3}px`,
                                height: `${BuyNowBtnSize * 1.2}px`,
                              }}
                              className="cancelBtn_MyOrderPage_MyProfile"
                            >
                              Cancel
                            </button>
                            {userDataUpdate ? (
                              <button
                                onClick={handleUpdateDataSubmit}
                                style={{
                                  width: `${BuyNowBtnSize * 3}px`,
                                  height: `${BuyNowBtnSize * 1.2}px`,
                                }}
                                className="editBtn_MyOrderPage_MyProfile"
                              >
                                <img src={EditPencelSvg} /> Update
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  setUserDataUpdate(!userDataUpdate)
                                }
                                style={{
                                  width: `${BuyNowBtnSize * 3}px`,
                                  height: `${BuyNowBtnSize * 1.2}px`,
                                }}
                                className="editBtn_MyOrderPage_MyProfile"
                              >
                                <img src={EditPencelSvg} /> Edit
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address                      */}
                  <ShippingAddress />
                </div>
              </div>
            </div>
          ) : accountSetting ? (
            <div className="rightMainDiv_MyOrderPage_AccountSetting">
              <div className="headerRightMainDiv_MyOrderPage_MyProfile">
                <div
                  class="accountsettingh1"
                  style={{
                    marginTop: "100px",
                    paddingBottom: "2rem",
                  }}
                >
                  <h1
                    style={{
                      fontSize: `${userNameFontSize * 1.2}px`,
                      fontWeight: 600,
                    }}
                  >
                    Account Settings
                  </h1>
                </div>
                <div className="accountSettingLowerMainDiv__MyOrderPage_AccountSetting">
                  <div className="personalDetailsHeadder_MyOrderPage_AccountSetting">
                    <h1
                      className="personal_details_h1"
                      style={{
                        fontSize: `${userNameFontSize}px`,
                      }}
                    >
                      email address
                    </h1>
                  </div>
                  <div className="selectInnerMainDivChangeEmail_MyOrderPage_AccountSetting">
                    <h2
                      style={{
                        fontSize: `${priceDetailsFontSize}px`,
                        color: "#515151",
                        paddingBottom: "0.3rem",
                        fontWeight: 600,
                      }}
                    >
                      Email
                    </h2>
                    <div
                      className="selectMainInputDiv_MyOrderPage_MyProfile"
                      style={{
                        width: `${BuyNowBtnSize * 4}px`,
                        height: `${BuyNowBtnSize * 1.2}px`,
                      }}
                    >
                      <input
                        type="text"
                        placeholder="abcd@email.com"
                        value={userDetails.email}
                        readOnly
                      />
                    </div>
                    <h2
                      style={{
                        fontSize: `${priceDetailsFontSize * 0.8}px`,
                        color: "#515151",
                        paddingTop: "0.5rem",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                      onClick={() => handleChangeUserEmail()}
                    >
                      Change Email
                    </h2>
                  </div>
                  <div className="selectInnerMainDivChangePassowrd_MyOrderPage_AccountSetting">
                    <h2
                      style={{
                        fontSize: `${priceDetailsFontSize}px`,
                        color: "#515151",
                        paddingBottom: "0.3rem",
                        fontWeight: 600,
                      }}
                    >
                      password
                    </h2>
                    <div
                      className="selectMainInputDiv_MyOrderPage_MyProfile"
                      style={{
                        width: `${BuyNowBtnSize * 4}px`,
                        height: `${BuyNowBtnSize * 1.2}px`,
                      }}
                    >
                      <input
                        type="password"
                        placeholder="xxxxxx"
                        value={userDetails.password}
                        readOnly
                      />
                      <img src={PasswordEyeIcon} />
                    </div>
                    <h2
                      style={{
                        fontSize: `${priceDetailsFontSize * 0.8}px`,
                        color: "#515151",
                        paddingTop: "0.5rem",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                      onClick={() => handleChangeUserPassword()}
                    >
                      Change password
                    </h2>
                  </div>
                </div>
                <div className="DeleteAccount_AccountSetting">
                  <button
                    style={{
                      width: `${BuyNowBtnSize * 5}px`,
                      height: `${BuyNowBtnSize * 1.2}px`,
                    }}
                    onClick={() => setActiveDeleteAccount(true)}
                    className="editBtn_MyOrderPage_MyProfile"
                  >
                    {" "}
                    delete account
                  </button>
                </div>
              </div>
            </div>
          ) : contactUs ? (
            <div className="rightMainDiv_MyOrderPage">
              <div className="headerRightMainDiv_MyOrderPage_ContactUs">
                <div
                  className="orderpage_h1"
                  style={{
                    marginTop: "100px",
                    paddingBottom: "2rem",
                  }}
                >
                  <h1
                    style={{
                      fontSize: `${userNameFontSize * 1.2}px`,
                      fontWeight: 600,
                    }}
                  >
                    Contact Us
                  </h1>
                </div>
                <div className="personalDetailsMainDiv_MyOrderPage_ContactUs">
                  <div className="personalDetailsLeftMainDiv_MyOrderPage_ContactUs">
                    <form onSubmit={handleSubmitContectUs}>
                      <div className="personalDetailsMiddleMainDiv_MyOrderPage_ContactUs">
                        <div className="nameInnerMainDiv_MyOrderPage_ContactUs">
                          <div className="selectInnerMainDiv_MyOrderPage_ContactUs">
                            <h2
                              style={{
                                fontSize: `${priceDetailsFontSize}px`,
                                color: "#515151",
                                paddingBottom: "0.3rem",
                                fontWeight: 600,
                              }}
                            >
                              First Name
                            </h2>
                            <div
                              className="selectMainInputDiv_MyOrderPage_ContactUs"
                              style={{
                                width: `${BuyNowBtnSize * 4}px`,
                                height: `${BuyNowBtnSize * 1.2}px`,
                              }}
                            >
                              <input
                                type="text"
                                name="fname"
                                value={contactUsDetails.fname}
                                placeholder="John"
                                onChange={handleChangeContectUs}
                              />
                            </div>
                          </div>
                          <div className="selectInnerMainDiv_MyOrderPage_ContactUs">
                            <h2
                              style={{
                                fontSize: `${priceDetailsFontSize}px`,
                                color: "#515151",
                                paddingBottom: "0.3rem",
                                fontWeight: 600,
                              }}
                            >
                              Last Name
                            </h2>
                            <div
                              className="selectMainInputDiv_MyOrderPage_ContactUs"
                              style={{
                                width: `${BuyNowBtnSize * 4}px`,
                                height: `${BuyNowBtnSize * 1.2}px`,
                              }}
                            >
                              <input
                                type="text"
                                name="lname"
                                value={contactUsDetails.lname}
                                placeholder="Smith"
                                onChange={handleChangeContectUs}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="phoneNoMainDiv_MyOrderPage_ContactUs">
                          <div className="phoneInnerMainDiv_MyOrderPage_ContactUs">
                            <h2
                              style={{
                                fontSize: `${priceDetailsFontSize}px`,
                                color: "#515151",
                                paddingBottom: "0.3rem",
                                fontWeight: 600,
                              }}
                            >
                              Phone No.
                            </h2>
                            <div
                              className="selectMainInputDiv_MyOrderPage_ContactUs"
                              style={{
                                width: `${BuyNowBtnSize * 4}px`,
                                height: `${BuyNowBtnSize * 1.2}px`,
                              }}
                            >
                              <input
                                type="number"
                                name="mobile"
                                value={contactUsDetails.mobile}
                                onChange={handleChangeContectUs}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="phoneNoMainDiv_MyOrderPage_ContactUs">
                          <div className="phoneInnerMainDiv_MyOrderPage_ContactUs">
                            <h2
                              style={{
                                fontSize: `${priceDetailsFontSize}px`,
                                color: "#515151",
                                paddingBottom: "0.3rem",
                                fontWeight: 600,
                              }}
                            >
                              Email Id
                            </h2>
                            <div
                              className="selectMainInputDiv_MyOrderPage_ContactUs"
                              style={{
                                width: `${BuyNowBtnSize * 4}px`,
                                height: `${BuyNowBtnSize * 1.2}px`,
                              }}
                            >
                              <input
                                type="text"
                                name="email"
                                value={contactUsDetails.email}
                                onChange={handleChangeContectUs}
                                placeholder="example@gmail.com"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="phoneNoMainDiv_MyOrderPage_ContactUs">
                          <div className="phoneInnerMainDiv_MyOrderPage_ContactUs">
                            <h2
                              style={{
                                fontSize: `${priceDetailsFontSize}px`,
                                color: "#515151",
                                paddingBottom: "0.3rem",
                                fontWeight: 600,
                              }}
                            >
                              Message
                            </h2>
                            <div
                              className="selectMainInputDivMessage_MyOrderPage_ContactUs"
                              style={{
                                width: `${BuyNowBtnSize * 4}px`,
                                height: `${BuyNowBtnSize * 4}px`,
                                alignItems: "start",
                              }}
                            >
                              <textarea
                                type="text"
                                name="message"
                                value={contactUsDetails.message}
                                onChange={handleChangeContectUs}
                                placeholder="Enter Your Message"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="SendMassege_ContactUs">
                          <button
                            type="submit"
                            style={{
                              width: `${BuyNowBtnSize * 4}px`,
                              height: `${BuyNowBtnSize * 1.2}px`,
                            }}
                            onClick={handleAddressSubmit}
                            className="editBtn_MyOrderPage_MyProfile"
                          >
                            {" "}
                            send message
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="personalDetailsRightMainDiv_MyOrderPage_ContactUs">
                    <div
                      style={{
                        borderBottom: "1px solid #ccc",
                      }}
                      className="phoneMainDiv_MyOrderPage_ContactUs"
                    >
                      <div className="phoneUpperDiv_MyOrderPage_ContactUs">
                        <img src={ReciverIcon} />
                        <h2
                          style={{
                            fontSize: `${userNameFontSize * 0.8}px`,
                          }}
                        >
                          Phone
                        </h2>
                      </div>
                      <div className="phoneNumberDownDiv_MyOrderPage_ContactUs">
                        <h2
                          style={{
                            fontSize: `${userNameFontSize * 0.8}px`,
                          }}
                        >
                          +91 8655255488
                        </h2>
                      </div>
                    </div>
                    <div
                      style={{
                        borderBottom: "1px solid #ccc",
                      }}
                      className="phoneMainDiv_MyOrderPage_ContactUs"
                    >
                      <div className="phoneUpperDiv_MyOrderPage_ContactUs">
                        <img src={LocationIcon} />
                        <h2
                          style={{
                            fontSize: `${userNameFontSize * 0.8}px`,
                          }}
                        >
                          office address
                        </h2>
                      </div>
                      <div className="phoneDownDiv_MyOrderPage_ContactUs">
                        <h2
                          style={{
                            fontSize: `${userNameFontSize * 0.8}px`,
                          }}
                        >
                          Powai, Andheri (E) ,
                          Mumbai-400072
                        </h2>
                      </div>
                    </div>
                    <div className="phoneMainDiv_MyOrderPage_ContactUs">
                      <div className="phoneUpperDiv_MyOrderPage_ContactUs">
                        <img src={EmailIcon} />
                        <h2
                          style={{
                            fontSize: `${userNameFontSize * 0.8}px`,
                          }}
                        >
                          email
                        </h2>
                      </div>
                      <div className="phoneEmaiDownDiv_MyOrderPage_ContactUs">
                        <h2
                          style={{
                            fontSize: `${userNameFontSize * 0.8}px`,
                          }}
                        >
                          customercare@sizeupp.com
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : returnAndRefund ? (
            <div className="rightMainDiv_MyOrderPage">
              <div className="headerRightMainDiv_MyOrderPage">
                <div>
                  <h1
                    style={{
                      fontSize: `${userNameFontSize * 1.2}px`,
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  >
                    returns and refund
                  </h1>
                </div>
                {viewDetailsOpen ? (
                  <h2
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: `${orderDateDetailsFontSize}px`,
                      fontWeight: "500",
                    }}
                  >
                    &nbsp;&nbsp;(Order Details)
                  </h2>
                ) : orderTrackStatue ? (
                  <h2
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: `${orderDateDetailsFontSize}px`,
                      fontWeight: "500",
                    }}
                  >
                    &nbsp;&nbsp;(Order Tracking)
                  </h2>
                ) : (
                  <div
                    onClick={() => setOpen(!open)}
                    className="selectMainDiv_MyOrderPage"
                    style={{
                      width: `${BuyNowBtnSize * 4.5}px`,
                      height: `${BuyNowBtnSize}px`,
                    }}
                  >
                    {selected ? (
                      selected?.length > 8 ? (
                        selected?.substring(0, 8) + "..."
                      ) : (
                        selected
                      )
                    ) : (
                      <h1
                        style={{
                          fontSize: `${productDetailsFontSize}px`,
                        }}
                      >
                        Recent Orders
                      </h1>
                    )}
                    <BiChevronDown size={20} style={arrowStyled} />
                    {open ? (
                      <ul
                        className="selectUl_MyOrderPage"
                        style={{
                          // width: `${BuyNowBtnSize * 4}px`,
                          top: `${BuyNowBtnSize}px`,
                          fontSize: `${productDetailsFontSize}px`,
                        }}
                      >
                        {orderFilter?.map((item) => (
                          <li
                            key={item?.name}
                            onClick={() => {
                              if (
                                item?.name?.toLowerCase() !==
                                selected.toLowerCase()
                              ) {
                                setSelected(item?.name);
                                setOpen(false);
                                setInputValue("");
                              }
                            }}
                          >
                            {item?.name}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                )}
              </div>


              {totalOrderDetails?.map((item, id) => {
                let datePlaced = moment(item.createdAt)
                  .utc()
                  .format("DD MMM YYYY");
                let expextedDelivery = moment(item.updatedAt)
                  .utc()
                  .format("DD MMMM YYYY");


                const isMoreThan7Days = isDateMoreThan7DaysFromToday(item.updatedAt);

                if (isMoreThan7Days) {
                  return (<></>);
                }
                let totalArray = [];
                let totalAmount = 0;
                for (let i = 0; i < item?.orderItems?.length; i++) {
                  totalArray.push(+item?.orderItems[id]?.mrp);
                }

                totalAmount = totalArray.reduce(
                  (previousValue, currentValue, index) =>
                    previousValue + currentValue,
                  0
                );
                return (
                  <>
                    <div
                      style={{
                        background: "white",
                        marginBottom: "2rem",
                      }}
                    >
                      <div key={id} className="itemsDetailsList_MyOrderPage">
                        <div className="itemsDetailsListInner_MyOrderPage">
                          <div className="itemDetaillist_MyOrderPage">
                            <h2
                              style={{
                                fontSize: `${orderDateDetailsFontSize}px`,
                              }}
                            >
                              Date Placed
                            </h2>
                            <h3
                              style={{
                                fontSize: `${leftContentFontSize}px`,
                              }}
                            >
                              {datePlaced}
                            </h3>
                          </div>
                          <div className="itemDetaillist_MyOrderPage">
                            <h2
                              style={{
                                fontSize: `${orderDateDetailsFontSize}px`,
                              }}
                            >
                              Delivered
                            </h2>
                            <h3
                              style={{
                                fontSize: `${leftContentFontSize}px`,
                              }}
                            >
                              {expextedDelivery}
                            </h3>
                          </div>
                          <div className="itemDetaillist_MyOrderPage">
                            <h2
                              style={{
                                fontSize: `${orderDateDetailsFontSize}px`,
                              }}
                            >
                              Items
                            </h2>
                            <h3
                              style={{
                                fontSize: `${leftContentFontSize}px`,
                              }}
                            >
                              {item.orderItems.length}
                            </h3>
                          </div>
                          <div className="itemDetaillist_MyOrderPage">
                            <h2
                              style={{
                                fontSize: `${orderDateDetailsFontSize}px`,
                              }}
                            >
                              Order ID
                            </h2>
                            <h3
                              style={{
                                fontSize: `${leftContentFontSize}px`,
                              }}
                            >
                              {item.id}
                            </h3>
                          </div>
                          <div className="itemDetaillist_MyOrderPage">
                            <h2
                              style={{
                                fontSize: `${orderDateDetailsFontSize}px`,
                              }}
                            >
                              total amount
                            </h2>
                            <h3
                              style={{
                                fontSize: `${leftContentFontSize}px`,
                              }}
                            >
                              {totalAmount}
                            </h3>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              width: "25%",
                            }}
                            className="itemContentInnerLeftDiv_MyOrderPage"
                          >
                            <div
                              style={{
                                width: "38%",
                              }}
                              className="itemImg_MyOrderPage"
                            >
                              <img src={CartItemImg1} />
                            </div>
                            <div
                              style={{
                                width: "60%",
                              }}
                              className="itemContent_MyOrderPage"
                            >
                              <div>
                                <h1
                                  style={{
                                    fontSize: `${productDetailsFontSize}px`,
                                    fontWeight: 600,
                                    textTransform: "capitalize",
                                  }}
                                >
                                  red chex shirt
                                </h1>
                              </div>
                              <div className="colorSizeDiv_MyOrderPage">
                                <h2
                                  style={{
                                    fontSize: `${productDetailsFontSize}px`,
                                    textTransform: "capitalize",
                                  }}
                                >
                                  Color: red
                                </h2>
                                <h2
                                  style={{
                                    fontSize: `${productDetailsFontSize}px`,
                                    textTransform: "capitalize",
                                  }}
                                >
                                  Size: m
                                </h2>
                              </div>
                              <div>
                                <h3
                                  style={{
                                    fontSize: `${productDetailsFontSize}px`,
                                    fontWeight: 500,
                                    textTransform: "capitalize",
                                  }}
                                >
                                  ₹ 2699
                                </h3>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              width: "55%",
                            }}
                          >
                            <section className="vh-100 gradient-custom-2">
                              <MDBContainer className="py-5 h-100">
                                <MDBRow className="justify-content-center align-items-center h-100">
                                  <MDBCol md="10" lg="8" xl="6">
                                    <MDBCard
                                      className="card-stepper"
                                      style={{
                                        borderRadius: "16px",
                                        width: "400px",
                                      }}
                                    >
                                      <MDBCardBody className="p-4">
                                        <ul
                                          id="progressbar-1"
                                          className="mx-0 mt-0 mb-5 px-0 pt-0 pb-4"
                                        >
                                          <li
                                            className="step0 active"
                                            id="step1"
                                          >
                                            <span
                                              style={{
                                                marginLeft: "22px",
                                                marginTop: "12px",
                                              }}
                                            >
                                              PLACED
                                            </span>
                                          </li>
                                          <li
                                            className="step0 active text-center"
                                            id="step2"
                                          >
                                            <span>SHIPPED</span>
                                          </li>
                                          <li
                                            className="step0 text-muted text-end"
                                            id="step3"
                                          >
                                            <span
                                              style={{ marginRight: "22px" }}
                                            >
                                              DELIVERED
                                            </span>
                                          </li>
                                        </ul>
                                      </MDBCardBody>
                                    </MDBCard>
                                  </MDBCol>
                                </MDBRow>
                              </MDBContainer>
                            </section>
                          </div>
                          <div
                            style={{
                              // borderLeft: "1px solid #C5C5C5",
                              width: "20%",
                              display: "flex",
                              justifyContent: "end",
                            }}
                          >
                            <button
                              onClick={handleAddReview}
                              style={{
                                fontSize: `${productDetailsFontSize * 1}px`,
                                height: `${BuyNowBtnSize}px`,
                                width: `${BuyNowBtnSize * 3.4}px`,
                                border: "2px solid #2D2D2D",
                              }}
                            >
                              Cancel Order
                            </button>
                          </div>
                        </div>
                      </div>
                      {orderTrackStatue ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                          }}
                          className="orderStatusMainDiv_MyOrder"
                        >
                          <h2
                            style={{
                              fontSize: `${orderDateDetailsFontSize}px`,
                              display: "flex",
                              justifyContent: "center",
                              cursor: "pointer",
                              textTransform: "capitalize",
                              // width: "20%"
                            }}
                          >
                            your money will be refunded to you within 5 days
                            after picking up the item*
                          </h2>
                        </div>
                      ) : null}
                    </div>
                  </>
                );
              })}
            </div>
          ) : null}
        </div>

        {/* {
                handleSublineSave?.map((testing, id) => {
                    return (<>
                        <div>
                            <h1>{testing}</h1>
                        </div>
                    </>)
                })
            } */}

        <Footer />
      </div >
      {
        showUserChangePopup ? (
          <div className="changePasswordMainDiv_MyOrder_AccountSetting" >
            <div className="changePasswordInnerMainDiv_MyOrder_AccountSeeting">
              <div className="upperHeaderDivChangePassword_MyOrder_AccountSetting">
                <div className="upperHeaderMainDivChangePassword_AccountSetting">
                  <h2
                    style={{
                      fontSize: `${priceDetailsFontSize * 1.3}px`,
                      color: "#515151",
                      paddingTop: "0.5rem",
                      fontWeight: 600,
                    }}
                  >
                    {showCHangeEmail ? "Change Email" : "Change Password"}
                  </h2>
                  <img
                    onClick={() => setShowUserChangePopup(false)}
                    className="crossImgDiv_ChangePassword"
                    src={CrossMarkIcon}
                  />
                </div>
                <div className="currentPasswordChangePassword_AccountSetting">
                  <img src={LockIcon} />
                  <input
                    type={
                      showCHangeEmail
                        ? "text"
                        : showCurrentPassword
                          ? "text"
                          : "password"
                    }
                    placeholder={
                      showCHangeEmail ? "Current Email" : "Current Password"
                    }
                    style={{
                      color: "#000",
                    }}
                    name="oldPassword"
                    value={oldPassword}
                    onChange={(event) => setoldPassword(event.target.value)}
                  />
                  {showCHangeEmail ? null : showCurrentPassword ? (
                    <img
                      style={{ cursor: "pointer", width: "8%" }}
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      src={ShowPasswordEye}
                    />
                  ) : (
                    <img
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      style={{ cursor: "pointer", width: "8%" }}
                      src={PasswordEyeIcon}
                    />
                  )}
                </div>
                <div className="currentPasswordChangePassword_AccountSetting">
                  <img src={LockIcon} />
                  <input
                    type={
                      showCHangeEmail
                        ? "text"
                        : showPassword
                          ? "text"
                          : "password"
                    }
                    placeholder={showCHangeEmail ? "New Email" : "New Password"}
                    style={{
                      color: "#000",
                    }}
                    name="newPassword"
                    value={newPassword}
                    onChange={(event) => setnewPassword(event.target.value)}
                  />
                  {showCHangeEmail ? null : showPassword ? (
                    <img
                      style={{ cursor: "pointer", width: "8%" }}
                      onClick={() => setShowPassword(!showPassword)}
                      src={ShowPasswordEye}
                    />
                  ) : (
                    <img
                      style={{ cursor: "pointer", width: "8%" }}
                      onClick={() => setShowPassword(!showPassword)}
                      src={PasswordEyeIcon}
                    />
                  )}
                </div>
                {showCHangeEmail ? null : (
                  <div className="currentPasswordChangePassword_AccountSetting">
                    <img src={ConfirmIcon} />
                    <input
                      type={showConfrimPassword ? "text" : "password"}
                      placeholder="Confirn New Password"
                      style={{
                        color: "#000",
                      }}
                    />
                    {showConfrimPassword ? (
                      <img
                        style={{ cursor: "pointer", width: "8%" }}
                        onClick={() => setConfrimPassword(!showConfrimPassword)}
                        src={ShowPasswordEye}
                      />
                    ) : (
                      <img
                        style={{ cursor: "pointer", width: "8%" }}
                        onClick={() => setConfrimPassword(!showConfrimPassword)}
                        src={PasswordEyeIcon}
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="changePasswordBtn_AccountSetting">
                <button
                  style={{
                    width: `${BuyNowBtnSize * 4}px`,
                    height: `${BuyNowBtnSize * 1.2}px`,
                  }}
                  onClick={() => setShowUserChangePopup(false)}
                  className="CancelBtn_MyOrderPage_AccountSetting"
                >
                  {" "}
                  cancel
                </button>
                <button
                  style={{
                    width: `${BuyNowBtnSize * 4}px`,
                    height: `${BuyNowBtnSize * 1.2}px`,
                    fontSize: `${BuyNowBtnSize * 0.4}px`,
                  }}
                  className="editBtn_MyOrderPage_MyProfile"
                  onClick={handleUpdateChangePasswordSubmit}
                >
                  {showCHangeEmail ? "Change Email" : "Change Password"}
                </button>
              </div>
            </div>
          </div >
        ) : null}
      {
        addReviewPopUpOpen ? (
          <div className="reviewMainDiv_MyOrder_AccountSetting">
            <div className="reviewInnerMainDiv_MyOrder_AccountSeeting">
              <div className="leftReviewMainDiv_MyOrder">
                <div className="productHeaderReview_MyOrder">
                  <h2
                    style={{
                      color: "black",
                    }}
                  >
                    Product:
                  </h2>
                </div>
                <div className="reviewImgDiv_MyOrder">
                  <div>
                    <img
                      style={{
                        // width: "100%"
                        width: `${reviewImgWidth}px`,
                        height: `${reviewImgHeight}px`,
                      }}
                      src={addReviewPopUp.img}
                    />
                  </div>
                </div>
                <div className="productTitleReview_MyOrder">
                  <h2
                    style={{
                      color: "black",
                    }}
                  >
                    {addReviewPopUp.productTitle}
                  </h2>
                </div>
              </div>
              <div className="upperHeaderDivreview_MyOrder_AccountSetting">
                <div className="upperHeaderMainDivReview_AccountSetting">
                  <h2
                    style={{
                      fontSize: `${priceDetailsFontSize * 1.3}px`,
                      color: "#515151",
                      fontWeight: 600,
                    }}
                  >
                    Give Us Your Review
                  </h2>
                  <img
                    onClick={handlePopupReviewClose}
                    className="crossImgDiv_ChangePassword"
                    src={CrossMarkIcon}
                  />
                </div>
                <div className="reviewDetailsMainDiv_MyOrder">
                  <div className="orderIdReview_MyOrder">
                    <h2
                      style={{
                        fontSize: `${priceDetailsFontSize}px`,
                      }}
                    >
                      Order Id
                    </h2>
                    <h3
                      style={{
                        fontSize: `${priceDetailsFontSize}px`,
                      }}
                    >
                      {addReviewPopUp.order_id}
                    </h3>
                  </div>
                  <div className="NameReview_MyOrder">
                    <h2
                      style={{
                        fontSize: `${priceDetailsFontSize}px`,
                      }}
                    >
                      Your Name
                    </h2>
                    <input
                      style={{
                        fontSize: `${priceDetailsFontSize}px`,
                      }}
                      type="text"
                      placeholder="Write Here"
                    />
                  </div>
                  <div className="DescriptionReview_MyOrder">
                    <h2
                      style={{
                        fontSize: `${priceDetailsFontSize}px`,
                      }}
                    >
                      Description{" "}
                      <span
                        style={{
                          fontSize: `${priceDetailsFontSize * 0.8}px`,
                          fontWeight: 100,
                        }}
                      >
                        (Optional)
                      </span>
                    </h2>
                    <textarea
                      style={{
                        fontSize: `${priceDetailsFontSize}px`,
                        height: `${descriptionBoxHeight}px`,
                      }}
                      type="text"
                      placeholder="Write Here"
                    />
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      paddingTop: "2rem",
                    }}
                  >
                    <h2
                      style={{
                        width: "30%",
                        color: "black",
                      }}
                    >
                      Add Ratings:
                    </h2>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        width: "70%",
                        justifyContent: "space-between",
                      }}
                      className="container"
                    >
                      <h1 className="result">
                        {GRADES[gradeIndex]
                          ? "(" + GRADES[gradeIndex] + "/5 Selected)"
                          : "You didn't review yet"}
                      </h1>
                      <div className="stars">
                        {GRADES.map((grade, index) => (
                          <Star
                            index={index}
                            key={grade}
                            changeGradeIndex={changeGradeIndex}
                            style={gradeIndex > index - 1 ? activeStar : {}}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div></div>
                  <div></div>
                </div>
                <div className="submitReviewBtn_MyOrder">
                  <button
                    style={{
                      fontSize: `${userNameFontSize}px`,
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null
      }
      {
        activeDeleteAccount ? (
          <div className="changePasswordMainDiv_MyOrder_AccountSetting">
            <div className="changePasswordInnerMainDiv_MyOrder_AccountSeeting">
              <div className="upperHeaderDivChangePassword_MyOrder_AccountSetting">
                <div className="upperHeaderMainDivChangePassword_AccountSetting">
                  <h2
                    style={{
                      fontSize: `${priceDetailsFontSize * 1.3}px`,
                      color: "#515151",
                      paddingTop: "0.5rem",
                      fontWeight: 600,
                    }}
                  >
                    Sure Wanted to Delete your Account?
                  </h2>
                  {/* <img onClick={() => setActiveDeleteAccount(false)} className="crossImgDiv_ChangePassword" src={CrossMarkIcon} /> */}
                </div>
              </div>
              <div className="changePasswordBtn_AccountSetting">
                <button
                  style={{
                    width: `${BuyNowBtnSize * 4}px`,
                    height: `${BuyNowBtnSize * 1.2}px`,
                  }}
                  onClick={() => setActiveDeleteAccount(false)}
                  className="CancelBtn_MyOrderPage_AccountSetting"
                >
                  cancel
                </button>
                <button
                  style={{
                    width: `${BuyNowBtnSize * 4}px`,
                    height: `${BuyNowBtnSize * 1.2}px`,
                    fontSize: `${BuyNowBtnSize * 0.4}px`,
                  }}
                  className="editBtn_MyOrderPage_MyProfile"
                  onClick={handleDelectAccount}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        ) : null
      }
    </>
  );
};
