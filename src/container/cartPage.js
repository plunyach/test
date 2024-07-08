import React, { useCallback, useState } from "react";
import "../styles/cartPage.css";
import ToolBar from "../component/toolbar";
import CartItemImg1 from "../images/cartItemImg1.png";
import DeleteIcon from "../svg/deleteIcon.svg";
import Cross from "../svg/cross.svg";
import { Footer } from "./footer";
import { pagePaths } from "../utils/constant";
import { useContext } from "react";
import noteContext from "../context/noteContext";
import { useEffect } from "react";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";
import { string } from "i/lib/util";
import { useReducer } from "react";
import { getAllCartItems } from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "i/lib/inflections";
import BackArrow from "../svg/backtoArrow.svg";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast"; 
import { ToolBarContext } from "../component/toolbarContext";

const widthOutPut = window.screen.width;
const number_titleFontSize = (1 / 100) * widthOutPut;
const boxNumberSize = (2 / 100) * widthOutPut;

const cartHeaderFontSize = (2.2 / 100) * widthOutPut;
const itemFontSize = (1 / 100) * widthOutPut;
const cartDetailsHeaderFontSize = (0.9 / 100) * widthOutPut;
const productDetailsFontSize = (0.9 / 100) * widthOutPut;

const Inc_secBtnWidth = (2 / 100) * widthOutPut;
const Inc_secBtnFontSize = (1.2 / 100) * widthOutPut;
const Inc_secBtnCountFontSize = (1 / 100) * widthOutPut;

const priceDetailsFontSize = (1.1 / 100) * widthOutPut;
const priceDetailsHeaderFontSize = (2 / 100) * widthOutPut;

const buyNowBtnHeight = (3 / 100) * widthOutPut;
const buyNowBtnFontSize = (1.2 / 100) * widthOutPut;

const couponDetailHeaderFontSize = (0.9 / 100) * widthOutPut;

const itemListArray = [
  {
    product_Name: "Red Chex Shirt",
    color: "Red",
    size: "M",
    amount: 1000,
    img: CartItemImg1,
  },
  {
    product_Name: "Red Chex Shirt",
    color: "Red",
    size: "M",
    amount: 2699,
    img: CartItemImg1,
  },
  {
    product_Name: "Red Chex Shirt",
    color: "Red",
    size: "M",
    amount: 2699,
    img: CartItemImg1,
  },
  {
    product_Name: "Red Chex Shirt",
    color: "Red",
    size: "M",
    amount: 2699,
    img: CartItemImg1,
  },
  {
    product_Name: "Red Chex Shirt",
    color: "Red",
    size: "M",
    amount: 2699,
    img: CartItemImg1,
  },
];

let dummyObject = [];

export const CartPage = () => {
  const { cartCount, incrementCartCount } = useContext(ToolBarContext);

  const [count, setCount] = useState(1);
  const [verifyCoupon, setVerifyCoupon] = useState(false);
  const { setIsCart, userToken, setActiveCoupon, activeCoupon } =
    useContext(noteContext);
  const [totalAmount, setTotalAMount] = useState(0);

  const [data, setData] = useState([]);
  const [cartProductDetails, setCartProductDetails] = useState();
  const [reducer, forceUpdate] = useReducer((x) => x + 1, 0);
  const dispatch = useDispatch();
  const cartGetAllData = useSelector((state) => state);
  const [couponDiscount, setCouponDiscount] = useState();

  const [status, setStatus] = useState({
    status: "",
    ean: "",
  });
  const [clearStatus, setClearStatus] = useState({
    status: "",
  });
  const [statusCoupon, setStatusCoupon] = useState([]);
  const [statusCouponActive, setStatusCouponActive] = useState(false);
  const [couponId, setCouponId] = useState("");
  const [storeCouponId, setStoreCouponId] = useState("");
  const [couponStatus, setCouponStatus] = useState(false);

  const quantity_new = useSelector((s) => s.quantitySlice);
  const quantity = Object.keys(quantity_new).length
    ? quantity_new?.initialState?.quantity
    : 1;
  const [sum, setSum] = useState(0);

  // const fetchData = useCallback(async () => {
  //     //api call
  //     try {

  //         const url = `${process.env.REACT_APP_BACKEND_URL}/user/cart/item/all`;
  //         console.log("checking in cart-===>>>", url)
  //         const res = await axios.get(url)
  //         const { data } = res;
  //         setData(data)
  //     } catch (error) {
  //     }
  // }, [])

  let token = JSON.parse(localStorage.getItem("items"))
    ? JSON.parse(localStorage.getItem("items"))
    : "";
  // useEffect(() => {
  //     if (!token) {
  //         window.location.href = pagePaths.signIn;
  //     }
  // });
  // console.log("cehcojjksdhvcfjhsvkdlc", token)

  const fetchData = () => {
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
  };

  const handleClearAll = () => {
    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/user/cart/clear`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).catch((err) => console.log("error ", err));
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, [clearStatus]);

  // console.log("checking cart clear", clearStatus, data)

  useEffect(() => {
    dispatch(getAllCartItems({ data }));
  }, [data]);

  useEffect(() => {
    setIsCart(true);
    fetchData();
    // console.log("checking add in cart useEffect");

    if (status.status === "add") {
      // console.log("checking add in cart add");

      try {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/user/cart/add`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ean_code: status.ean }),
        })
          .then((res) => {
            if (res.status === 200){ setStatus("add")}
            else if(res.status === 400){
              toast.error("No more items remaining. You have reached the end of the item!", {
                style: {
                  borderRadius: "6px",
                  background: "#fff",
                },
              }); 
            }
          })
          .catch((err) => console.log("error ", err));
      } catch (error) {
      }
    }
    if (status.status === "remove") {
      console.log("checking add in cart remove");

      try {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/user/cart/remove`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ean_code: status.ean }),
        })
          .then((res) => {
            if (res.status === 200) {
              setStatus("remove");
            }
          })
          .catch((err) => {
            toast(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
    if (status.status === "delete") {
      // console.log("checking add in cart remove")

      try {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/user/cart/delete`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ean_code: status.ean }),
        })
          .then((res) => console.log("checking res in remove cart", res))
          .catch((err) => console.log("error ", err));
      } catch (error) {
        console.log(error);
      }
    }
  }, [status]);

  useEffect(() => {
    let sum = 0;
    cartGetAllData?.cartSlice?.initialState?.data?.cartItems?.map(
      (coupanData) => {
        setTimeout(() => {
          setStatusCoupon({
            code: "",
            product: [
              {
                ean: coupanData.ean_code,
                quantity: coupanData.quantity,
              },
            ],
          });
        }, -4);
        sum += coupanData?.quantity * coupanData?.product?.discountPrice;
      }
    );
    setSum(sum);
  }, [cartGetAllData]);

  // console.log('data =>', data)

  // console.log("cart-===>>>", data)
  // console.log("checkng fetch data", data)
  //
  // console.log(
  //   "coupon ean123123",
  //   couponId,
  //   storeCouponId,
  //   statusCoupon.product
  // );

  const handleSubmitCoupon = (e) => {
    statusCoupon.code = couponId;
    var userCouponData = {
      code: statusCoupon.code,
      products: statusCoupon.product,
    };
    if (data.cartItems.length > 0) {
      var productsToSend = data.cartItems.map((resp) => {
        return { ean_code: resp.ean_code, quantity: resp.quantity };
      });
      userCouponData = {
        code: statusCoupon.code,
        products: productsToSend,
      };
    }

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
          console.log("checking coupon response", response);
          if (response.status === 200) {
            setCouponStatus(true);
            setVerifyCoupon(true);
            setActiveCoupon({
              status: response.status,
            });
          } else if (response.status === 400) {
            setCouponStatus(false);
            setVerifyCoupon(false);
          }
          return response.json();
        })
        .then((result) => {
          if (sum > result?.discount) {
            setCouponDiscount(result);
          }
        })
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

  // console.log(
  //   "checking coupon status",
  //   statusCoupon,
  //   couponId,
  //   activeCoupon,
  //   couponDiscount
  // );

  const handleSubmitBuyNow = () => {
    if (activeCoupon.status === 200) {
      localStorage.setItem(
        "couponCode",
        JSON.stringify({
          code: couponId,
          discount: couponDiscount.discount,
          product: statusCoupon.product,
        })
      );
      setActiveCoupon({
        code: couponId,
      });
    } else {
      localStorage.setItem(
        "couponCode",
        JSON.stringify({
          product: statusCoupon.product,
        })
      );
    }
  };

  // console.log("checking coupon valid", cartGetAllData)

  return (
    <>
       <Toaster position="top-right" reverseOrder={false} />

      <div className="UpperMainDiv_CartPage">
        <div className="toolbaar_CartPage">
          <ToolBar
            fontColor="#474747"
            logo="black"
            dropDown="#474747"
            icons="#474747"
            backGroundColor="white"
            stroke="black"
          />
        </div>
        {/* <div className="downToolBar_CartPage"></div> */}
        {data?.cartItems?.length > 0 ? (
          <div className="mainDiv_CartPage">
            <div className="breadCrumCartMainDiv_CartPage">
              <div className="breadCrumInner_CartPage">
                <div
                  style={{
                    width: `${boxNumberSize}px`,
                    height: `${boxNumberSize}px`,
                    borderColor: "#2D2D2D",
                  }}
                  className="numberBreadCrumMain_CartPage"
                >
                  <h3
                    style={{
                      fontSize: `${number_titleFontSize}px`,
                      color: "#2D2D2D",
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
                      color: "#2D2D2D",
                    }}
                  >
                    Cart
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
              <div className="breadCrumInner_CartPage">
                <div
                  style={{
                    width: `${boxNumberSize}px`,
                    height: `${boxNumberSize}px`,
                    borderColor: "#8A8A8A",
                  }}
                  className="numberBreadCrumMain_CartPage"
                >
                  <h3
                    style={{
                      fontSize: `${number_titleFontSize}px`,
                      color: "#8A8A8A",
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
                      color: "#8A8A8A",
                    }}
                  >
                    Shipping Details
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
              <div className="breadCrumInner_CartPage">
                <div
                  style={{
                    width: `${boxNumberSize}px`,
                    height: `${boxNumberSize}px`,
                    borderColor: "#8A8A8A",
                  }}
                  className="numberBreadCrumMain_CartPage"
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
            <div className="cartMainPage_CartPage">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="card h-fit max-w-6xl p-5 rounded-lg bg-white">
                  <div className="cartProductUpperinner_CartPage">
                    <div className="cartHeading_CartPage">
                      <h1 className="text-base font-bold">
                        Cart
                        <span className="text-sm">
                          ({data?.cartItems?.length} items)
                        </span>
                      </h1>
                    </div>
                    <div className="clearAll_CartPage">
                      <img
                        style={{
                          width: "20%",
                          paddingRight: "0.3rem",
                        }}
                        src={Cross}
                      />
                      <h1
                        className="text-base"
                        style={{
                          fontWeight: 100,
                        }}
                        onClick={() => {
                          handleClearAll(setClearStatus({ status: "ok" }));
                          setCouponStatus(false);
                          setVerifyCoupon(false);
                          setCouponDiscount();
                          incrementCartCount(0, 0);
                        }}
                      >
                        Clear All
                      </h1>
                    </div>
                  </div>
                  {/*  <div className="headerMainPage">
                      <div className="productHeader_CartPage">
                        <h1
                          style={{
                            fontSize: `${cartDetailsHeaderFontSize}px`,
                          }}
                        >
                          Product
                        </h1>
                      </div>
                      <div className="qanAmountHeader_CartPage">
                        <div className="quantityHeader_CartPage">
                          <h1
                            style={{
                              fontSize: `${cartDetailsHeaderFontSize}px`,
                            }}
                          >
                            Quantity
                          </h1>
                        </div>
                        <div
                          style={{
                            width: "70%",
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <div className="amountHeader_CartPage">
                            <h1
                              style={{
                                fontSize: `${cartDetailsHeaderFontSize}px`,
                              }}
                            >
                              amount
                            </h1>
                          </div>
                          <div className="amountHeader_CartPage"></div>
                        </div>
                      </div>
                            </div> */}
                  <div className="cartItemListMainDiv_Cartpage">
                    {cartGetAllData?.cartSlice?.initialState?.data?.cartItems?.map(
                      (item, id) => {
                        return (
                          <>
                            <div
                              className="grid gap-2 py-4 lg:grid-cols-6 md:grid-cols-4 grid-cols-3"
                              key={id}
                            >
                              <div className="col-span-1 justify-center items-center">
                                <a
                                  href={`/product-details?eon=${item?.product?.description.ean_code}&s=${item?.product?.description?.size}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "#262626",
                                  }}
                                >
                                  <img
                                    className="sm:h-38 sm:w-38 h-32 w-32 rounded-md object-contain object-center"
                                    src={item?.product?.featuredImage}
                                  />
                                </a>
                              </div>
                              <div className="col-span-2 md:col-span-3">
                                <div className="grid grid-cols-3 gap-2 justify-center items-center">
                                  <h2 className="text-base col-span-3 font-semibold">
                                    Name: {item?.product?.product_title}
                                  </h2>
                                  <div className="mt-2 text-sm col-span-1 flex justify-center items-center">
                                    <h2 className="text-sm text-c-gray-500 mb-2">
                                      Style: {item?.product?.description?.style}
                                    </h2>
                                  </div>
                                  <div className="mt-2 col-span-1 flex justify-center items-center">
                                    <h3 className="text-sm font-medium text-c-gray-900">
                                      ₹ {item?.product?.discountPrice}
                                    </h3>
                                  </div>
                                  {/*  <h1
                                          style={{
                                            fontSize: `${productDetailsFontSize}px`,
                                            lineHeight: "0px",
                                          }}
                                        >
                                          {item?.product?.product_type}
                                        </h1> */}
                                  <div className="col-span-1 flex justify-center items-center font-normal text-sm py-2">
                                    <h2 className="text-sm font-medium text-c-gray-900">
                                      Color: {item?.product?.description?.color}
                                    </h2>
                                  </div>
                                  <div className="col-span-1 flex justify-center items-center">
                                    <h2 className="text-sm font-medium text-c-gray-900">
                                      Size: {item?.product?.description?.size}
                                    </h2>
                                  </div>

                                  <div className="col-span-1 flex justify-center items-center">
                                    <button
                                      onClick={() => {
                                        setStatus({
                                          status: "remove",
                                          ean: item.ean_code,
                                        });
                                        setCouponStatus(false);
                                        setVerifyCoupon(false);
                                        setCouponDiscount();
                                      }}
                                      disabled={item?.quantity === 1}
                                      className="h-7 w-7  flex items-center justify-center "
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="35"
                                        height="35"
                                        viewBox="0 0 35 35"
                                        fill="none"
                                      >
                                        <circle
                                          cx="17.5"
                                          cy="17.5"
                                          r="16.5"
                                          fill="white"
                                          // stroke="#D9D9D9"
                                          stroke-width="0.707143"
                                        />
                                        <path
                                          d="M11.6064 17.5H23.3922"
                                          stroke="black"
                                          stroke-width="1.17857"
                                        />
                                      </svg>
                                    </button>
                                    <div className="mx-1 h-7 w-9 rounded-md border text-center">
                                      <h2 className="text-sm">
                                        {item?.quantity}
                                        {/* {quantity} */}
                                      </h2>
                                    </div>
                                    <button
                                      onClick={() => {
                                        setStatus({
                                          status: "add",
                                          ean: item.ean_code,
                                        });
                                        setCouponStatus(false);
                                        setVerifyCoupon(false);
                                        setCouponDiscount();
                                      }}
                                      className="h-7 w-7  flex items-center justify-center "
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="35"
                                        height="35"
                                        viewBox="0 0 35 35"
                                        fill="none"
                                      >
                                        <circle
                                          cx="17.6426"
                                          cy="17.5"
                                          r="16.5"
                                          fill="white"
                                          // stroke="#D9D9D9"
                                          stroke-width="0.707143"
                                        />
                                        <path
                                          d="M17.6426 11.6072V23.3929"
                                          stroke="black"
                                          stroke-width="1.17857"
                                        />
                                        <path
                                          d="M11.75 17.5H23.5357"
                                          stroke="black"
                                          stroke-width="1.17857"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                  <div className="col-span-1 flex justify-center items-center">
                                    <img
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        setStatus({
                                          status: "delete",
                                          ean: item.ean_code,
                                        });
                                        setCouponStatus(false);
                                        setVerifyCoupon(false);
                                        setCouponDiscount();
                                      }}
                                      src={DeleteIcon}
                                    />
                                  </div>
                                  <div className="col-span-1 flex justify-center items-center">
                                    <h2 className="text-sm font-medium text-c-gray-900">
                                      ₹{" "}
                                      {item?.quantity *
                                        item?.product?.discountPrice}
                                    </h2>
                                  </div>
                                </div>
                                <div className="priceDeleteDiv_CartPage">
                                  <div className="itemPrice_CartPage"></div>
                                  <div></div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      }
                    )}
                  </div>
                </div>
                <div className="h-full pr-6 bg-white rounded-lg">
                  <div className="priceDetailsUpperMainDiv_CartPage">
                    <div className="priceDetailUpperInnerDiv_CartPage">
                      <div className="PriceDetailsHeader_CartPage">
                        <h1 className="border-b border-c-gray-200 px-4 py-3 text-lg font-medium text-c-gray-900 sm:p-4">
                          Order Summary
                        </h1>
                      </div>
                      <div className="pricingDetailsDiv_CartPage">
                        <div className="priceDiv_CartPage">
                          <h2 className="text-sm text-c-gray-800">Price</h2>
                          <h2 className="text-sm text-c-gray-800">₹{sum}</h2>
                        </div>
                        <div className="discountDiv_CartPage">
                          <h2 className="text-sm text-c-gray-800">Discount</h2>
                          <h2
                            className="text-sm text-c-gray-800"
                            style={{
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
                          <h2 className="text-sm text-c-gray-800">
                            Delivery Charges
                          </h2>
                          <h2
                            className="text-sm text-c-gray-800"
                            style={{
                              color: "#00E150",
                            }}
                          >
                            {cartProductDetails?.product?.delivery_charge
                              ? cartProductDetails?.product?.delivery_charge
                              : "Free"}{" "}
                          </h2>
                        </div>
                        <div className="couponDiv_CartPage">
                          <h2 className="text-sm text-c-gray-800">
                            Coupon Applied
                          </h2>
                          <h2
                            className="text-sm text-c-gray-800"
                            style={{
                              color: "#00E150",
                            }}
                          >
                            - ₹{" "}
                            {couponDiscount?.discount
                              ? couponDiscount?.discount
                              : 0}
                          </h2>
                        </div>
                      </div>
                      <div className="subTotalDiv_CartPAge">
                        <h1 className="text-base font-semibold text-c-gray-900">
                          Subtotal
                        </h1>
                        <h1 className="text-base font-semibold text-c-gray-900">
                          ₹{" "}
                          {(
                            sum -
                            (couponDiscount?.discount
                              ? couponDiscount?.discount
                              : 0) +
                            (cartProductDetails?.product?.delivery_charge
                              ? typeof cartProductDetails?.product
                                  ?.delivery_charge === string
                                ? 0
                                : cartProductDetails?.product?.delivery_charge
                              : 0) -
                            (cartProductDetails?.product?.coupon
                              ? cartProductDetails?.product?.coupon
                              : 0)
                          ).toFixed(2)}
                        </h1>
                      </div>
                    </div>
                    <div className="buyNowBtn_CartPage">
                      <Link
                        style={{
                          textDecoration: "none",
                        }}
                        to={pagePaths.shippingPage}
                      >
                        <button
                          className="px-3 py-2 text-sm font-semibold text-white"
                          onClick={handleSubmitBuyNow}
                        >
                          Buy Now
                        </button>
                      </Link>
                    </div>
                    <h1
                      className="text-sm font-semibold"
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "1rem",
                      }}
                    >
                      <a
                        href={pagePaths.root}
                        style={{
                          color: "#262626",
                          textDecoration: "none",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <img src={BackArrow} />
                        &nbsp;Continue to Shopping
                      </a>
                    </h1>
                  </div>
                  <div className="couponInputDiv_CartPage">
                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <h1
                        className="text-sm font-semibold"
                        style={{
                          lineHeight: "30px",
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
                            <h1 className="text-sm">
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
                              className="text-sm"
                              style={{
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
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ width: "100%" }}>
            <div
              style={{
                width: "100%",
                padding: "4rem 0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1
                style={{
                  fontSize: `${cartHeaderFontSize}px`,
                  fontWeight: "600",
                  marginTop: "100px",
                }}
              >
                No Items in Cart
              </h1>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};
