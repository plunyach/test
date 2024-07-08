import ToolBar from "../component/toolbar";
import "../styles/productdetails.css";
import { Footer } from "./footer";
import CrossMarkIcon from "../svg/cross.svg";
import ImageZoom from "react-image-zooom";
import filledwishheart from "../svg/pip/filledwishheart.svg";
import emptywishheart from "../svg/pip/emptywishheart.svg";
import like from "../svg/productDetails/like.svg";
import dislike from "../svg/productDetails/dislike.svg";
import viewmore from "../svg/productDetails/viewmore.svg";
import React, { useContext, useState } from "react";
import reviewed_singlestar from "../svg/productDetails/reviewed_singlestar.svg";
import maximize_pd from "../svg/productDetails/maximize_pd.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { pagePaths } from "../utils/constant";
import Chinoesmen from "../images/chinosmen.jpeg";
import Inches from "../images/inches.jpeg";
import Cms from "../images/cms.jpeg";
import Guide from "../images/size-guide.jpg";
import { useDispatch, useSelector } from "react-redux";
import OwlCarousel from "react-owl-carousel";
import "react-medium-image-zoom/dist/styles.css";
import { getQuantityItems } from "../redux/slices/quantitySlice";
import { getConfig } from "../redux/slices/configSlice";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
 import toast, { Toaster } from "react-hot-toast"; 
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useWindowSize } from "./checkSize";
import { Helmet } from "react-helmet-async";
import { ToolBarContext } from "../component/toolbarContext";
import { setaddtocartupdate, setwishlistdata } from "../redux/slices/CurrentUpdateFun";
// import { isValidUrl } from "../functions/productDetailsPageFunctions";

const widthOutput = window.screen.width;
const displayImageHeight = (28.5 / 100) * widthOutput;
const Inc_secBtnWidth = (2 / 100) * widthOutput;
const Inc_secBtnFontSize = (1.2 / 100) * widthOutput;
const Inc_secBtnCountFontSize = (1 / 100) * widthOutput;

export default function ProductDetails() {
  const { width } = useWindowSize();
  const isMobile = width <= 768;

  const { cartCount, incrementCartCount } = useContext(ToolBarContext);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (e) {
      return false;
    }
  };

  const [isSelected, setIsSelected] = useState(false);
  const [selectedSize, setSelectedSize] = useState("1");
  const [view, setView] = useState(true);
  const [guide, setGuide] = useState(false);
  const [menChart, setMenchart] = useState(false);
  const [womenChart, setWomenChart] = useState(false);
  const [productDetails, setProductDetails] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [colorDisclaimer, setColorDisclaimer] = useState(true);
  const [isLike, setisLike] = useState(false);
  const [zoomImageStore, setZoomImageStore] = useState();
  const [zoomImageStoreStatus, setZoomImageSToreStatus] = useState(false);
  const [imageStatus, setImageStatus] = useState(false);
  const [sizeDataID, setSizeDataID] = useState({
    eanCode: "",
  });
  const [colorDataID, setColorDataID] = useState({
    eanCode: "",
  });

  const [sizeDataList, setSizeDataList] = useState([]);
  const [colorDataList, setColorDataList] = useState([]);
  const [selectedEanCode, setSelectedEanCode] = useState("");

  const [colorData, setColorData] = useState([]);
  const [defaultChecked, setDefaultChecked] = useState(false);
  const [deliveryPincode, setDeviveryPincode] = useState([]);
  const [reviewsData, setreviewsData] = useState([]);
  const [codes, setCodes] = useState([]);
  const [pincodeInput, setPincodeInput] = useState("");

  const [data, setData] = useState([]);

  const [pin, setPin] = useState(false);
  const [pinInput, setPinInput] = useState(false);
  const [pinCheck, setPinCheck] = useState(false);
  const [categoryType, setCategoryType] = useState(2);
  const [activeTab, setActiveTab] = useState("inches");

  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const id = params.eon;

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [test, setTest] = useState();

  const [checkVisibility, setCheckVisibility] = useState(false);
  const [enterVisibility, setEnterVisibility] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  const navigate = useNavigate();

  let Eon = String(id).split("&=");

  let token = JSON.parse(localStorage.getItem("items"))
    ? JSON.parse(localStorage.getItem("items"))
    : "";
  async function handleAddToCart(ean) {
    // console.log("ean-----",ean)
    if (!quantity) quantity = 1;
    if (!pincodeInput) {
      if (timeoutId) clearTimeout(timeoutId);
      setPinInput(true);
      setEnterVisibility(true);
      const id = setTimeout(() => {
        setEnterVisibility(false);
      }, 3000);
      setTimeoutId(id);
      return;
    }
    if (!deliveryPincode.isServiceable) {
      setPinCheck(true);
      if (timeoutId) clearTimeout(timeoutId);
      setCheckVisibility(true);
      const id = setTimeout(() => {
        setCheckVisibility(false);
      }, 3000);
      setTimeoutId(id);
      return;
    }

    if (!token || token === "") {
      // window.location.href = pagePaths.signIn;
      return;
    }

    let data = JSON.stringify({
      ean_code: ean,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.sizeupp.wezbo.xyz/user/cart/add",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    for (let i = 1; i <= quantity; i++) {
      try {
        await axios
          .request(config)
          .then((resp) => {
            if (resp.status == 401) {
              navigate(pagePaths.signIn);
              // toast("error 401");
              toast.error("error 401!", {
                style: {
                  borderRadius: "6px",
                  background: "#fff",
                },
              }); 
              return;
            }

            incrementCartCount(cartCount + 1, ean);
            // navigate(pagePaths.cartPage);
          })
          .catch((err) => {
            // toast("Something went wrong");
          })
          .finally(() =>{
          dispatch(setaddtocartupdate(true))
          toast.success("Added To Cart", {
            style: {
              borderRadius: "6px",
              background: "#fff",
            },
          })
        }
          );
      } catch (error) {
        // navigate(pagePaths.signIn);
        toast.error(`${error}`, {
          style: {
            borderRadius: "6px",
            background: "#fff",
          },
        }); 
        // toast(error);
      }
    }
  }

  async function handleAddToCartBuy(ean) {
    if (!quantity) quantity = 1;

    if (!pincodeInput) {
      if (timeoutId) clearTimeout(timeoutId);
      setEnterVisibility(true);
      setPinInput(true);
      const id = setTimeout(() => {
        setEnterVisibility(false);
      }, 3000);
      setTimeoutId(id);
      return;
    }
    if (!deliveryPincode.isServiceable) {
      if (timeoutId) clearTimeout(timeoutId);
      setCheckVisibility(true);
      setPinCheck(true);
      const id = setTimeout(() => {
        setCheckVisibility(false);
      }, 3000);
      setTimeoutId(id);
      return;
    }
    // //alerdy commented---
    //     // if (!token || token === "") {
    //     //   window.location.href = pagePaths.signIn;
    //     //   return;
    //     // }

    let data = JSON.stringify({
      ean_code: ean,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.sizeupp.wezbo.xyz/user/cart/add",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    };
    dispatch(getConfig({ config }));

    for (let i = 1; i <= quantity; i++) {
      try {
        const response = await axios.request(config);
        if (response.status == 401) {
          // navigate(pagePaths.signIn);
          return;
        }

        // }
      } catch (error) {
        console.error(error);
        // If one failed request should stop further requests, uncomment the following:
        // break;
      }
    }

    if (JSON.parse(localStorage.getItem("items")) === null) {
      navigate("/sign-in");

      // window.location.href = pagePaths.signIn;
    } else {
      // Redirect after ALL requests have been attempted
      window.location.href = pagePaths.cartPage;
      window.location.href =
        pagePaths.shippingPage + "?eanCode=" + ean;
      // window.location.href = pagePaths.shippingPage + "?eanCode=" + ean + "&param2=" + value2 + "&param3=" + value3;
    }
  }

  const getSimilarProducts = (similarType) => {
    // subSubCategory.name
    if (similarType != undefined) {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/site/product/similar/${similarType}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((resp) => {
          setSimilarProducts(resp.data);
        })
        .catch((error) => {});
    }
  };

  useEffect(() => {
    const similarType = data?.product?.subSubCategoryId;
    if (similarType !== undefined) {
      getSimilarProducts(similarType);
    }
  }, [data?.product?.subSubCategoryId]);

  const getProductPrice = (price, discountPrice) => {
    if (discountPrice) {
      return parseInt(discountPrice);
    }
    return parseInt(price);
  };

  const getDiscountPercent = (price, discountPrice) => {
    if (!discountPrice || !price) {
      return null;
    }
    if (isNaN(price) || isNaN(discountPrice)) {
      return null;
    }
    if (!discountPrice) {
      return null;
    }
    const percentage = parseInt(((price - discountPrice) / price) * 100);

    return `(${percentage}% OFF)`;
  };

  const fetchData = () => {
    setData([]);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BACKEND_URL}/site/product/ean/${Eon[0]}`,
      headers: {},
    };

    let configForSimilar = {
      method: "get",
      maxBodyLength: 4,
      url: `${
        process.env.REACT_APP_BACKEND_URL
      }/site/product/filtered?category=${
        categoryType == 1 ? "Men" : "Women"
      }&limit=4&offset=0`,
      headers: {},
    };
    axios
      .request(config)
      .then((response) => {
        setData(response.data);
        setSizeDataID({
          eanCode: response?.data?.product?.ean_code,
        });
        setSizeDataList(response.data);
        console.log("response.data--------",response.data)
        setreviewsData(response.data?.product?.reviews);
        getSimilarProducts(data?.product?.subSubCategoryId);
      })
      .catch((error) => {
        // toast(error);
        toast.error(`${error}`, {
          style: {
            borderRadius: "6px",
            background: "#fff",
          },
        }); 
        
      });
  };

  const toggleSelection = (item, itemSize) => {
    setSizeDataID({
      eanCode: item,
    });

    setSelectedSize(itemSize);

    fetch(`${process.env.REACT_APP_BACKEND_URL}/site/product/ean/${item}`, {
      method: "GET",
    })
      .then(async (data) => {
        const userData = await data.json();
        setSizeDataList(userData);
      })
      .catch((error) => console.log(error));
  };

  // console.log("checking eon1212", data, colorData)
  const handleColor = (colorItems) => {
    setSizeDataList(colorItems.images);
    setColorData(colorItems.description.color);
  };

  // console.log("checking checked color", defaultChecked)
  const handleChangeColorName = (colorItemEan) => {
    setColorDataID({
      eanCode: colorItemEan,
    });
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/site/product/ean/${colorItemEan}`,
      {
        method: "GET",
      }
    )
      .then(async (data) => {
        const userData = await data.json();
        setSizeDataList(userData);
      })
      .catch((error) => console.log(error));
  };

  const getWishlist = () => {
    if (token && token != "") {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://api.sizeupp.wezbo.xyz/user/wishlist",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token + "",
        },
      };

      axios
        .request(config)
        .then((response) => {
          dispatch(setwishlistdata(response?.data))
          if (response.data.length !== 0) {
            response.data.map((item) => {
              if (item.ean_code === Eon[0]) {
                setCodes(item.ean_code);
              }
            });
          }
        })
        .catch((error) => {
          // toast(error);
          toast.error(`${error}`, {
            style: {
              borderRadius: "6px",
              background: "#fff",
            },
          }); 
        });
    }
  };

  const handleLikeMethods = (ean_code) => {
    if (!token || token === "") {
      window.location.href = pagePaths.signIn;
    } else {
      let data = JSON.stringify({
        ean_code: ean_code,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BACKEND_URL}/user/wishlist/add`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token + "",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          setCodes(response.data.ean_code);
          getWishlist()
        })
        .catch((error) => {
          // toast(error);
          toast.error(`${error}`, {
            style: {
              borderRadius: "6px",
              background: "#fff",
            },
          }); 
        });
    }
  };

  const handleRemoveWishlist = (ean_code) => {
    if (!token || token === "") {
      window.location.href = pagePaths.signIn;
    } else {
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BACKEND_URL}/user/wishlist/delete/${ean_code}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token + "",
        },
      };

      axios
        .request(config)
        .then((response) => {
          setCodes([]);
          getWishlist()
          // window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    fetchData();

    getWishlist();

    // fetchSizeDataGet();
  }, []);

  useEffect(() => {
    getSimilarProducts(data?.product?.subSubCategoryId);
    setPincodeFromLocalStorage();
  }, [data?.product?.subSubCategoryId]);

  const setPincodeFromLocalStorage = () => {
    var pincode = localStorage.getItem("pincode");
    if (pincode != null || pincode != undefined) {
      setPincodeInput(pincode);
      fetchPincodeData();
    }
  };
  const handleReview = () => {
    setView(!view);
  };

  const handleProductDetails = () => {
    setProductDetails(!productDetails);
  };
  const handleGuide = () => {
    setGuide(!guide);
  };

  const handleDelivery = () => {
    setDelivery(!delivery);
  };
  const handleColorDisclaimer = () => {
    setColorDisclaimer(!colorDisclaimer);
  };
  const handleSizeguilde = () => {
    if (categoryType == 1) {
      setMenchart(!menChart);
    }
    if (categoryType == 2) {
      setWomenChart(!womenChart);
    }
  };

  const fetchPincodeData = () => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/site/check/pincode/${pincodeInput}`,
      {
        method: "GET",
      }
    )
      .then(async (data) => {
        const userData = await data.json();
        setDeviveryPincode(userData);
        if (data.status === 200) {
          setPin(true);
          localStorage.setItem("pincode", pincodeInput);
        }
      })
      .catch((error) => console.log(error));
  };
  const handleKeyPress = (event) => {
    // look for the `Enter` keyCode
    if (event.keyCode === 13 || event.which === 13) {
      // fetchPincodeData();
    }
  };

  const handlePincode = (e) => {
    setPincodeInput(e.target.value);
  };

  useEffect(() => {
    if (data?.sizes === undefined) {
    } else {
      return (
        setSizeDataList(data?.sizes[0].images),
        setColorData(data?.colors[0]?.description.color)
      );
    }
  }, []);

  useEffect(() => {
    // Cleanup the timeout when the component unmounts
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);
  const handleZoomImageStore = (img) => {
    setZoomImageStore(img);
    setZoomImageSToreStatus(true);
  };
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setQuantity(quantity);
    dispatch(getQuantityItems({ quantity }));
  }, [quantity]);

  async function handleSubmitBuyNow(ean) {
    handleAddToCartBuy(ean);
    const product_price = data?.product?.discountPrice
      ? data.product.discountPrice
      : 0;
    const totalPrice = product_price * quantity;
    dispatch(getQuantityItems({ totalPrice }));
  }

  //new
  const [imageErrors, setImageErrors] = useState(
    Array(sizeDataList?.product?.images.length).fill(false)
  );
  const handleImageError = (index) => {
    const newImageErrors = [...imageErrors];
    newImageErrors[index] = true;
    setImageErrors(newImageErrors);
  };
  //new

  // useEffect(() => {
  //   setPincodeFromLocalStorage();

  // }, []);
  return (
    <>
       <Toaster position="top-right" reverseOrder={false} />
      <Helmet>
        <title>{`${data?.product?.product_title ?? ""} - Sizeupp`}</title>
      </Helmet>
      <div>
        <ToolBar
          fontColor="#474747"
          logo="black"
          dropDown="#474747"
          icons="#474747"
          backGroundColor="white"
          stroke="black"
        />
        <div className="pd-main-container">
          <div className="pd-sub-main-container">
            <div className="left-img-container">
              {sizeDataList?.product?.images?.map((itemImages, id) => {
                var imgArr = itemImages.image.split("/");

                return (
                  <>
                    {itemImages.image &&
                      !imageErrors[id] &&
                      itemImages.image != null &&
                      itemImages.image != undefined &&
                      imgArr[imgArr.length - 1] != "null" && (
                        <img
                          style={{
                            height: `${displayImageHeight}px`,
                            width: "100%",
                            cursor: "pointer",
                          }}
                          onClick={() => handleZoomImageStore(itemImages.image)}
                          src={itemImages.image}
                          alt="" // No alt attribute when there is no image
                          onError={(e) => {
                            e.target.onerror = null; // Remove the onError handler to prevent infinite loop
                            // e.target.src = noImg;
                            handleImageError(id);
                          }}
                        />
                      )}
                  </>
                );
              })}
            </div>

            <div className="pd-right-contianer">
              {view && (
                <div className="pd-right-sub-contianer">
                  <div>
                    <p className="pd-txt-heading">
                      {data?.product?.product_title}
                      {/* <p style={{
                                        fontSize: `${productTitleFontSize * 0.4}px`
                                    }} className='rupee-txt'><span>₹</span> <span>
                                            {data?.product?.mrp}
                                        </span>
                                    </p> */}
                      {/*  */}

                      {/*  */}
                    </p>

                    <div className="price_wrapper detail_product">
                      <p className="price">
                        ₹{" "}
                        {data?.product?.discountPrice
                          ? data.product.discountPrice
                          : 0}
                      </p>
                      {data?.product?.discountPrice === data?.product?.mrp ? (
                        <del className="price"></del>
                      ) : (
                        <del className="price">₹ {data?.product?.mrp}</del>
                      )}

                      {/* {data?.product?.mrp && data?.product?.discountPrice && (
                        <p className="price discount">
                          ({" "}
                          {(
                            ((data.product.mrp - data.product.discountPrice) /
                              data.product.mrp) *
                            100
                          ).toFixed(0)}


                          % off )
                        </p>
                      )} */}

                      {data?.product?.mrp &&
                        data?.product?.discountPrice &&
                        data.product.mrp !== data.product.discountPrice && (
                          <p className="price discount">
                            ({" "}
                            {(
                              ((data.product.mrp - data.product.discountPrice) /
                                data.product.mrp) *
                              100
                            ).toFixed(0)}
                            % off )
                          </p>
                        )}
                    </div>
                  </div>

                  <p className="wishListIconMainDiv_ProductDetailPage">
                    {codes.includes(data?.product?.ean_code) ? (
                      <img
                        className="wishListIconImg"
                        src={filledwishheart}
                        alt="alt"
                        onClick={() =>
                          handleRemoveWishlist(data?.product?.ean_code)
                        }
                      />
                    ) : (
                      <img
                        className="wishListIconImg"
                        src={emptywishheart}
                        alt="alt"
                        onClick={() =>
                          handleLikeMethods(data?.product?.ean_code)
                        }
                      />
                    )}
                  </p>
                </div>
              )}

              {view && (
                <div className="checkbox-main-container">
                  <p className="text-sm font-semibold md:text-lg">
                    {sizeDataList?.product?.description.model_size}
                  </p>

                  <p className="text-sm font-semibold md:text-lg">
                    Color :{" "}
                    {colorData?.length > 0
                      ? colorData
                      : data?.product?.description.color}
                  </p>
                  {data?.product?.quantity <= 5 && (
                    <p className="text-sm font-semibold md:text-lg text-red">
                      Only {data?.product?.quantity} Left In Stock
                    </p>
                  )}

                  <div className="checkbox-sub-container">
                    {data?.colorDetail?.map((colorItems, id) => {
                      return (
                        <>
                          <div
                            style={{
                              background: `${colorItems.color}`,
                            }}
                            onClick={() => handleColor(colorItems.ean_code)}
                            className="custom-radio"
                          >
                            <input
                              type="radio"
                              id={colorItems.ean_code}
                              name="color"
                              value={defaultChecked}
                              onChange={() =>
                                handleChangeColorName(colorItems.ean_code)
                              }
                            />
                            <label
                              htmlFor={colorItems.ean_code}
                              className="label-color1"
                            ></label>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              )}

              {view && (
                <div
                  style={{
                    paddingTop: "1rem",
                  }}
                  className="main-select-size_ProductDetailsPage"
                >
                  <p className="text-base font-semibold md:text-lg">size</p>
                  <div className="select-size flex-col md:flex-row">
                    <div className="sub-select-size">
                      {data?.sizeDetail?.map((sizeItem, id) => {
                        return (
                          <>
                            <div
                              style={{
                                background: `${
                                  selectedSize == sizeItem?.size
                                    ? "bisque"
                                    : "#fff"
                                }`,
                              }}
                              className={`selectable-box ${
                                isSelected ? "selected" : ""
                              }`}
                              id={"color1"}
                              onClick={(e) =>
                                toggleSelection(
                                  sizeItem.ean_code,
                                  sizeItem.size
                                )
                              }
                            >
                              <span>{sizeItem?.size}</span>
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <p
                      className="size-guide"
                      onClick={() => handleSizeguilde()}
                    >
                      <span className="text-xs">size guide</span>{" "}
                      <span>
                        <img src={maximize_pd} alt="alt" />
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {view && (
                <div className="pinInputCheck">
                  {pinInput && enterVisibility ? (
                    <p
                      className="available-product"
                      style={{
                        color:
                          deliveryPincode.isServiceable === true
                            ? "green"
                            : "red",
                      }}
                    >
                      Please enter a pincode first.
                    </p>
                  ) : null}
                </div>
              )}

              {view && (
                <div className="pinInputCheck">
                  {pinCheck && checkVisibility ? (
                    <p
                      className="available-product"
                      style={{
                        color:
                          deliveryPincode.isServiceable === true
                            ? "green"
                            : "red",
                      }}
                    >
                      Please check the pincode first.
                    </p>
                  ) : null}
                </div>
              )}
              {/* add remove quantity buttons */}
              {view && (
                // <div className="quantity_pin">
                <div className="itemListDetailsRightInnerDiv_CartPage">
                  <div className="check-pin">
                    <div className="quantityMeasureDiv_CarPage">
                      <button
                        style={{
                          width: `${Inc_secBtnWidth}px`,
                          height: `${Inc_secBtnWidth}px`,
                          fontSize: `${Inc_secBtnFontSize}px`,
                          fontWeight: 100,
                        }}
                        onClick={() => {
                          // setQuantity(
                          //   quantity - 1 > 0 ? Number(quantity) - 1 : quantity
                          // );
                          if (quantity - 1 > 0) {
                             setQuantity(
                            quantity - 1 > 0 ? Number(quantity) - 1 : quantity
                          );
                          } else {
                            // toast("You have to select at least one Item!");
                            toast.error("You have to select at least one Item!", {
                              style: {
                                borderRadius: "6px",
                                background: "#fff",
                              },
                            });
                          }
                        }}
                        className="dec_quantity_CartPage"
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
                            stroke="#D9D9D9"
                            stroke-width="0.707143"
                          />
                          <path
                            d="M11.6064 17.5H23.3922"
                            stroke="black"
                            stroke-width="1.17857"
                          />
                        </svg>
                      </button>
                      <div className="countItem_CartPage">
                        <h2
                          style={{
                            fontWeight: 100,
                            fontSize: `${Inc_secBtnCountFontSize}px`,
                          }}
                        >
                          {quantity}
                        </h2>
                      </div>
                      {/* plus button of quantity */}
                      <button
                        style={{
                          width: `${Inc_secBtnWidth}px`,
                          height: `${Inc_secBtnWidth}px`,
                          fontSize: `${Inc_secBtnFontSize}px`,
                          fontWeight: 100,
                        }}
                        onClick={() => {
                          if (data?.product?.quantity > quantity) {
                            setQuantity(
                              quantity < data?.product?.quantity
                                ? Number(quantity) + 1
                                : quantity
                            );
                          } else {
                            toast.error("No more items remaining. You have reached the end of the item!", {
                              style: {
                                borderRadius: "6px",
                                background: "#fff",
                              },
                            });
                          }
                        }}
                        className="Inc_quantity_CartPage"
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
                            stroke="#D9D9D9"
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
                    <input
                      type="number"
                      placeholder="Enter Pin"
                      value={pincodeInput}
                      onChange={(e) => handlePincode(e)}
                      onKeyDown={handleKeyPress}
                    />
                    <button onClick={fetchPincodeData}>Check</button>
                  </div>

                  {/* </div> */}
                  {pin ? (
                    <p
                      className="available-product"
                      style={{
                        color:
                          deliveryPincode.isServiceable === true
                            ? "green"
                            : "red",
                      }}
                    >
                      {deliveryPincode.isServiceable === true
                        ? "Expected To Arrived on  " + deliveryPincode.edd
                        : "Product not Deliverable to this Pincode"}
                    </p>
                  ) : null}
                </div>
              )}

              {view && (
                <div className="cart_buy">
                  <button
                    className="addtocart"
                    onClick={() => handleAddToCart(sizeDataID.eanCode)}
                  >
                    Add to cart
                  </button>
                  <Link
                    className="buyNowLink"
                    // to={
                    //     JSON.parse(localStorage.getItem("items")) === null
                    //       ? pagePaths.signIn
                    //       : pagePaths.shippingPage
                    //   }
                  >
                    <button
                      className="buynow"
                      onClick={() => handleAddToCartBuy(sizeDataID.eanCode)}
                    >
                      Buy Now
                    </button>
                  </Link>
                </div>
              )}
              <p style={{ padding: "10px", margin: "20px" }}>
                {data?.product?.description?.product_details}
              </p>
              <div
                className={`${
                  !view
                    ? "reviewed-container-removedpding"
                    : "reviewed-container"
                }`}
              >
                {!productDetails && !guide && !delivery && (
                  <div className="review-header1">
                    {reviewsData?.length !== 0 ? (
                      <p className={`${!view ? "" : "review-header"}`}>
                        top reviews
                      </p>
                    ) : null}
                    {reviewsData?.slice(0, 2).map((review, index) => (
                      <>
                        <div className="review-details" key={index}>
                          <span>{review.name}</span>
                          <p className="reviewed-singlestar-txt">
                            <img src={reviewed_singlestar} alt="alt" />
                            <span className="total-review">
                              {review.rating}
                            </span>
                          </p>
                        </div>
                        <p className="review-content">{review.review}</p>
                        <div className="details-pd">
                          <p>
                            <img
                              style={{
                                width: "20%",
                              }}
                              src={data?.product?.featuredImage}
                              alt="alt"
                            />
                            <span>+{data?.product?.images?.length} images</span>
                          </p>

                          <div className="like-dislike-container">
                            <div>
                              {" "}
                              <span className="likecounts">31 </span>
                              <img src={like} alt="alt" className="likeimg" />
                            </div>
                            <div>
                              <span className="dislikecounts">6 </span>
                              <img
                                src={dislike}
                                alt="alt"
                                className="likeimg"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                )}
                {reviewsData?.length !== 0 ? (
                  <p className="view-more-txt" onClick={() => handleReview()}>
                    {view ? (
                      <div className="more-less-text">
                        <span>View</span>
                        <span>More</span>
                        <span>
                          <img
                            src={viewmore}
                            alt="alt"
                            className="dropdown-view-more "
                          />
                        </span>
                      </div>
                    ) : (
                      <div className="more-less-text">
                        <span>View</span>
                        <span>Less</span>
                        <span>
                          <img
                            src={viewmore}
                            alt="alt"
                            className="dropdown-view-more rotate-dwnarr"
                          />
                        </span>
                      </div>
                    )}
                  </p>
                ) : null}
              </div>
              {view && (
                <div className="product-details-review">
                  <p
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => handleProductDetails()}
                  >
                    Product details{" "}
                    <img
                      src={viewmore}
                      alt="alt"
                      className={`${productDetails && "product-review-txt"}`}
                    />
                  </p>
                  {productDetails && (
                    <ol className="pd-details-more">
                      {data?.product?.description.design_surface !== "NA" ? (
                        <li>
                          <span
                            style={{
                              fontWeight: 700,
                            }}
                          >
                            Design Surface:-
                          </span>{" "}
                          <span>
                            {data?.product?.description.design_surface}
                          </span>
                        </li>
                      ) : null}
                      {data?.product?.description.fabric_deatils !== "NA" ? (
                        <li>
                          <span
                            style={{
                              fontWeight: 700,
                            }}
                          >
                            Fabric Details:-
                          </span>{" "}
                          <span>
                            {data?.product?.description.fabric_deatils}
                          </span>
                        </li>
                      ) : null}

                      {data?.product?.description.neck_type !== "NA" ? (
                        <li>
                          <span
                            style={{
                              fontWeight: 700,
                            }}
                          >
                            {" "}
                            Neck Type:-
                          </span>{" "}
                          <span>{data?.product?.description.neck_type}</span>
                        </li>
                      ) : null}
                      {data?.product?.description.occasion !== "NA" ? (
                        <li>
                          <span
                            style={{
                              fontWeight: 700,
                            }}
                          >
                            Occasion:-
                          </span>{" "}
                          <span>{data?.product?.description.occasion}</span>
                        </li>
                      ) : null}

                      {data?.product?.description.fit !== "NA" ? (
                        <li>
                          <span
                            style={{
                              fontWeight: 700,
                            }}
                          >
                            Fit:-
                          </span>{" "}
                          <span>{data?.product?.description.fit}</span>
                        </li>
                      ) : null}
                      {data?.product?.description.sleeve !== "NA" ? (
                        <li>
                          <span
                            style={{
                              fontWeight: 700,
                            }}
                          >
                            Sleeve:-
                          </span>{" "}
                          <span>{data?.product?.description.sleeve}</span>
                        </li>
                      ) : null}
                      {data?.product?.description.style !== "NA" ? (
                        <li>
                          <span
                            style={{
                              fontWeight: 700,
                            }}
                          >
                            Style:-
                          </span>{" "}
                          <span>{data?.product?.description.style}</span>
                        </li>
                      ) : null}
                    </ol>
                  )}

                  <p
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => handleGuide()}
                  >
                    care guide{" "}
                    <img
                      src={viewmore}
                      alt="alt"
                      className={`${guide && "product-review-txt"}`}
                    />
                  </p>
                  {guide && (
                    <ol className="pd-details-more">
                      {data?.product?.description.washcare !== "NA" ? (
                        <li>
                          <span
                            style={{
                              fontWeight: 700,
                            }}
                          >
                            {" "}
                            washcare:-
                          </span>{" "}
                          <span>{data?.product?.description.washcare}</span>
                        </li>
                      ) : null}
                    </ol>
                  )}
                  <p
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelivery()}
                  >
                    return policy
                    <img
                      src={viewmore}
                      alt="alt"
                      className={`${delivery && "product-review-txt"}`}
                    />
                  </p>
                  {delivery && (
                    <ol className="pd-details-more">
                      <li>
                        Return Can Be Initiated Up To 10 Days From The Date Of
                        Order Delivered.
                      </li>
                    </ol>
                  )}

                  <p
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => handleColorDisclaimer()}
                  >
                    Color Disclaimer
                    <img
                      src={viewmore}
                      alt="alt"
                      className={`${delivery && "product-review-txt"}`}
                    />
                  </p>
                  {colorDisclaimer && (
                    <ol className="pd-details-more">
                      <li>
                        Product Colour May Slightly Vary Due to Photographic
                        Lighting Sources or Your Device Screen Settings
                      </li>
                    </ol>
                  )}
                </div>
              )}
            </div>
          </div>

          {
            <>
              <p
                className={`${
                  !productDetails && !guide && !delivery
                    ? "might-like-header-txt-rmv-pdg"
                    : "might-like-header-txt"
                }`}
              >
                you might also like
              </p>
            </>
          }
          {
            <div className="pd-options-product">
              <OwlCarousel
                nav={false}
                key={"121212"}
                dots={false}
                items={isMobile ? 2 : 4}
                loop={true}
                autoplay={true}
                autoplayTimeout={2500}
                autoplayHoverPause={true}
              >
                {similarProducts.map((e) => (
                  <div
                    className="pd-options-product-1 item"
                    key={"121212" + e.description.ean_code}
                    style={{ width: "auto" }}
                  >
                    <a
                      href={`/product-details?eon=${e.description.ean_code}&s=0`}
                    >
                      <div className="img-container-heart-img">
                        <img
                          className="img-prd-details"
                          src={e.featuredImage}
                          alt={e.product_title}
                        />
                      </div>
                    </a>
                    <span className="product-name">{e.product_title}</span>
                    <span className="product-price">
                      <span className="rupee-text">₹</span> {e.mrp}
                    </span>
                  </div>
                ))}
              </OwlCarousel>
            </div>
          }
        </div>
        <Footer />
      </div>
      {zoomImageStoreStatus ? (
        <div className="changePasswordMainDiv_MyOrder_ProductDetailsPage">
          <div className="changePasswordInnerMainDiv_MyOrder_ProductDetailsPage">
            <div className="upperHeaderDivChangePassword_MyOrder_ProductDetailsPage">
              <div className="upperHeaderMainDivChangePassword_ProductDetailsPage">
                <img
                  onClick={() => setZoomImageSToreStatus(false)}
                  className="crossImgDiv_ChangePassword"
                  src={CrossMarkIcon}
                />
              </div>
              <div className="mainImageDiv">
                <ImageZoom src={zoomImageStore} />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {menChart && (
        <>
          <div className="layer">
            <div className="pop_up">
              <h2>Size Chart in cm and inches</h2>
              <img
                src={
                  data.sizeGuide.cm_image != null &&
                  isValidUrl(data.sizeGuide.cm_image)
                    ? data.sizeGuide.cm_image
                    : Chinoesmen
                }
                alt=""
              />
              <div className="cross_popup" onClick={() => setMenchart(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                  class="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </>
      )}

      {womenChart && (
        <>
          <div className="layer">
            <div className="pop_up">
              <h2>Size Chart in cm and inches</h2>
              <div className="tabs_chart">
                <button
                  className={activeTab === "cms" ? "active" : ""}
                  onClick={() => handleTabChange("cms")}
                >
                  size in cms
                </button>
                <button
                  className={activeTab === "inches" ? "active" : ""}
                  onClick={() => handleTabChange("inches")}
                >
                  size in inches
                </button>
                {data?.product?.category.name != "Men" && (
                  <button
                    className={activeTab === "guide" ? "active" : ""}
                    onClick={() => handleTabChange("guide")}
                  >
                    Size Guide
                  </button>
                )}
              </div>
              <div>
                <img
                  src={
                    activeTab === "cms"
                      ? data?.sizeGuide?.cm_image != null &&
                        isValidUrl(data?.sizeGuide?.cm_image)
                        ? data?.sizeGuide?.cm_image
                        : Cms
                      : activeTab === "inches"
                      ? data?.sizeGuide?.inches_image != null &&
                        isValidUrl(data?.sizeGuide?.inches_image)
                        ? data?.sizeGuide?.inches_image
                        : Inches
                      : data?.sizeGuide?.guide != null &&
                        isValidUrl(data?.sizeGuide?.guide)
                      ? data?.sizeGuide?.guide
                      : Guide
                  }
                  id="image_chart"
                  className={
                    activeTab === "cms"
                      ? ""
                      : activeTab === "inches"
                      ? ""
                      : "guide"
                  }
                  alt=""
                />
              </div>
              <div
                className="cross_popup"
                onClick={() => setWomenChart(false)}
                style={{ margin: "20px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                  class="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
