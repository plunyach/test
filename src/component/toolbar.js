import React, { createContext, useCallback, useState } from "react";
import "../styles/toolbar.css";
import { pagePaths } from "../utils/constant";
import { useContext } from "react";
import noteContext from "../context/noteContext";
import { useEffect } from "react";
import CompanyLogo from "../svg/SizeuppFinalWebLogo.png";
import cross from "../svg/cross.svg";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
// import { invalid } from "moment/moment";
// import dropDown from "../svg/dropDown.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { IoCartOutline, IoHome } from "react-icons/io5";
import { SlUser } from "react-icons/sl";
import { SlUserFemale } from "react-icons/sl";
import { FiUserPlus } from "react-icons/fi";
import { BsBookmarkHeartFill, BsListCheck } from "react-icons/bs";
import Badge from "@mui/material/Badge";
import { FaOpencart } from "react-icons/fa";
import { RiHeartAddLine } from "react-icons/ri";

import Sizeuplogo from "../images/SizeuppLogo.png";
import { getAllCartItems } from "../redux/slices/cartSlice";
import { getAllWishItems } from "../redux/slices/wishSlice";
import { toast } from "react-toastify";
import { ToolBarContext } from "./toolbarContext";
import { BiCommand } from "react-icons/bi";
import { PiSignInFill } from "react-icons/pi";
import { setaddtocartupdate } from "../redux/slices/CurrentUpdateFun";

const widthOutPut = window.screen.width;
const itemFontSize = (1 / 100) * widthOutPut;

// const heightOutput = window.screen.height;
const widthOutput = window.screen.width;

const dropDownTitleFontSize = (1.1 / 100) * widthOutput;
const searchIconWidth = (1.4 / 100) * widthOutput;
const logoWidth = (8 / 100) * widthOutput;

const menuDropDownArray = [
  {
    title: "Men",
    subcontent: [
      {
        topWare: "Top ware Men",
        topWareContent: [
          "ethnic wear ",
          "co-ord set",
          "tops",
          "dresses",
          "shirts",
          "t-shirts",
          "sweatshirts",
        ],
      },
      {
        topWare: "Bottom ware Men",
        topWareContent: [
          "denims",
          "pants",
          "ethnic pants",
          "tracks",
          "shorts & 3/4th",
          "jeggings",
          "leggings",
        ],
      },
      {
        topWare: "accessories Men",
        topWareContent: ["lingerie", "socks", "belts"],
      },
      // {
      //     topWare: "Top Ware2",
      //     topWareContent: "Top Ware outsude"
      // },
    ],
  },
  {
    title: "Women",
    subcontent: [
      {
        topWare: "Top ware Women",
        topWareContent: [
          "ethnic wear ",
          "co-ord set",
          "tops",
          "dresses",
          "shirts",
          "t-shirts",
          "sweatshirts",
        ],
      },
      {
        topWare: "Bottom ware Women",
        topWareContent: [
          "denims",
          "pants",
          "ethnic pants",
          "tracks",
          "shorts & 3/4th",
          "jeggings",
          "leggings",
        ],
      },
      {
        topWare: "accessories Women",
        topWareContent: ["lingerie", "socks", "belts"],
      },
      // {
      //     topWare: "Top Ware2",
      //     topWareContent: "Top Ware outsude"
      // },
    ],
  },
  {
    title: "Bestseller",
    subcontent: [
      {
        topWare: "Top ware Best Saller",
        topWareContent: [
          "ethnic wear ",
          "co-ord set",
          "tops",
          "dresses",
          "shirts",
          "t-shirts",
          "sweatshirts",
        ],
      },
      {
        topWare: "Bottom ware Best Saller",
        topWareContent: [
          "denims",
          "pants",
          "ethnic pants",
          "tracks",
          "shorts & 3/4th",
          "jeggings",
          "leggings",
        ],
      },
      {
        topWare: "accessories Best Saller",
        topWareContent: ["lingerie", "socks", "belts"],
      },
      // {
      //     topWare: "Top Ware2",
      //     topWareContent: "Top Ware outsude"
      // },
    ],
  },
  {
    title: "Sale",
    subcontent: [
      {
        topWare: "Top ware Sale",
        topWareContent: [
          "ethnic wear ",
          "co-ord set",
          "tops",
          "dresses",
          "shirts",
          "t-shirts",
          "sweatshirts",
        ],
      },
      {
        topWare: "Bottom ware Sale",
        topWareContent: [
          "denims",
          "pants",
          "ethnic pants",
          "tracks",
          "shorts & 3/4th",
          "jeggings",
          "leggings",
        ],
      },
      {
        topWare: "accessories Sale",
        topWareContent: ["lingerie", "socks", "belts"],
      },
      // {
      //     topWare: "Top Ware2",
      //     topWareContent: "Top Ware outsude"
      // },
    ],
  },
];

let productPageTitle = "";

const ToolBar = (props) => {
  const dispatch = useDispatch();

  const { cartCount, incrementCartCount } = useContext(ToolBarContext);

  const { fontColor, logo, dropDown, icons, backGroundColor, stroke } = props;
  const [subContent, setSubContent] = useState([]);
  const { isHome, isWishList, isCart, isSignIn, isAccount } =
    useContext(noteContext);
  const [isSearch, setIsSearch] = useState(false);
  const [isMenuBar, setMenuBar] = useState(false);

  const [data, setData] = useState([]);
  const [categoriesMenu, setCtegoriesMenu] = useState([]);

  const [categoriesTitleMenu, setCategoriesTitleMenu] = useState("");

  // State to store the input value and the filtered list
  const [inputValue, setInputValue] = useState("");
  const [filteredList, setFilteredList] = useState(data);

  const cartSlice = useSelector((state) => state.cartSlice) || {};
  const wishSlice = useSelector((state) => state.wishSlice) || {};

  //-----custome----
  const getaddtocartupdate = useSelector(
    (state) => state.currentupdatefun.addtocartupdate
  );

  // Provide fallback empty arrays if the data isn't loaded yet
  const { cartItems = [] } = cartSlice?.initialState?.data || {};
  const { wishItems = [] } = wishSlice?.initialState || {};

  const cartItemsCount = (cartItems ? cartItems.length : 0) + cartCount;

  const wishItemsCount = wishSlice ? wishSlice.initialState?.data?.length : 0;

  // const aa = useSelector((state) => state.currentupdatefun.wishlistdata.data?.length : 0);
  const currentlengthwishlist = useSelector(
    (state) => state.currentupdatefun.wishlistdata?.length
  );
  // console.log("aaaaaaaa---", aa)

  let token = JSON.parse(localStorage.getItem("items"))
    ? JSON.parse(localStorage.getItem("items"))
    : "";

  useEffect(() => {}, [inputValue]);

  const fetchsearchData = async (inputValue) => {
    //api call
    setFilteredList([]);
    if (inputValue) {
      try {
        const url = `${process.env.REACT_APP_BACKEND_URL}/site/product/search/all?search=${inputValue}`;
        const res = await axios.get(url);
        const { data } = res;
      } catch (error) {
        toast(error);
      }
    }
  };

  // Event handler for input change
  const handleInputChange = (event) => {
    const searchValue = event.target.value;
    setInputValue(searchValue);
    // if (searchValue)
    //   {
    //     fetchsearchData(searchValue);
    //   }

    // Filter the list based on the search value
    // const filtered = data?.filter((item) =>
    //   item.product_title?.toLowerCase().includes(searchValue.toLowerCase())
    // );
    // setFilteredList(filtered);
  };

  const openMenuBar = (event) => {
    setMenuBar((current) => !current);
  };

  const fetchMenuData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/site/category/all`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setCtegoriesMenu(data);
      })
      .catch((error) => toast(error));
  };

  useEffect(() => {
    // fetchSearhData();
    // fetchsearchData();
  }, [isSearch]);

  useEffect(() => {
    fetchMenuData();
    // fetchData();
  }, []);

  const fetchData1 = () => {
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
        dispatch(setaddtocartupdate(false));
        setData(data);
        getAllCartItems({ data });
        dispatch(getAllCartItems({ data }));
      })
      .catch((error) => {toast(error) 
        dispatch(setaddtocartupdate(false));
      });
  };
  //--------
  const fetchData2 = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/user/wishlist`, {
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
        getAllWishItems({ data });
        dispatch(getAllWishItems({ data }));
      })
      .catch((error) => toast(error));
  };
  //----
  useEffect(() => {
    fetchData1();
    fetchData2();
  }, []);

  useEffect(() => {
    if (getaddtocartupdate == true) {
      fetchData1();
    }
  }, [getaddtocartupdate]);
  

  const handleProductTile = (subCategore, ProductTitle) => {
    setSubContent(subCategore);
    productPageTitle = ProductTitle;
  };
  //-----
  const navigate = useNavigate();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search(inputValue);
    }
  };
  const search = (query) => {
    navigate(`/products/all?search=${query}`);
    setMenuBar(false);
  };

  const HandleSearch = () => {
    openMenuBar();
  };

  return (
    <>
      <div
        style={{
          backgroundColor: `${backGroundColor}`,
        }}
        className="mainDiv_ToolBar"
      >
        <Link to={pagePaths.root} className="logo_sizeuup">
          <div className="logoMainDiv_ToolBar">
            <img src={CompanyLogo} />
          </div>
        </Link>
        <button class="hamburger-icon" onClick={() => openMenuBar()}>
          <img src="https://icons.veryicon.com/png/o/miscellaneous/we/sidebar-2.png" />
        </button>

        <div className={isMenuBar ? "nav nav-left" : "nav"}>
          <div className="nav-content">
            <div className="sizeuuplogo_box_mobile">
              <img src={Sizeuplogo} className="SizeuplogoNavBar" />
              <RxCross2
                className="cross-icon-mobile"
                onClick={() => setMenuBar(false)}
              />
            </div>
            {/* ----- */}
            <div className="innerMainSearchDIv_ToolBar_mobile">
              <input
                // style={{
                //   border: `${backGroundColor === "white"
                //     ? "1px solid black"
                //     : "1px solid transparent"
                //     }`,
                // }}
                onKeyPress={handleKeyPress}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search..."
                className="inputMobile"
              />
              <Link
                to={`/products/all?search=${inputValue}`}
                className="searchBtnMobile"
                onClick={HandleSearch}
              >
                Search
              </Link>
            </div>
            {/* ----- */}
            <ul>
              <li onClick={openMenuBar}>
                <Link to="/" className="toolbar_mobile_li">
                  <IoHome className="mobile_icons_li" /> Home{" "}
                </Link>
              </li>
              <li onClick={openMenuBar}>
                <Link to="/products/all" className="toolbar_mobile_li">
                  <BiCommand className="mobile_icons_li" /> All Products{" "}
                </Link>
              </li>
              <li onClick={openMenuBar}>
                <Link to="/products/men" className="toolbar_mobile_li">
                  <SlUser className="mobile_icons_li" /> Men{" "}
                </Link>
              </li>
              <li onClick={openMenuBar}>
                <Link to="/products/women" className="toolbar_mobile_li">
                  <SlUserFemale className="mobile_icons_li" /> Women{" "}
                </Link>
              </li>
              <li onClick={openMenuBar}>
                {JSON.parse(localStorage.getItem("items")) === null ? (
                  <Link to="/sign-in" className="toolbar_mobile_li">
                    <PiSignInFill className="mobile_icons_li" /> Sign In{" "}
                  </Link>
                ) : (
                  <Link
                    to={pagePaths.myOrderPage}
                    className="toolbar_mobile_li"
                  >
                    <FiUserPlus className="mobile_icons_li" /> Accounts{" "}
                  </Link>
                )}
              </li>
              <li onClick={openMenuBar}>
                <Link to="/wishlist" className="toolbar_mobile_li">
                <Badge badgeContent={currentlengthwishlist} color="primary">
                <RiHeartAddLine className="mobile_icons_li" />
                  </Badge>
                   Wishlist
                </Link>
              </li>
              <li onClick={openMenuBar}>
                <Link to="/cart-page" className="toolbar_mobile_li">
                  <Badge badgeContent={cartItemsCount} color="primary">
                    <IoCartOutline color="action" className="mobile_icons_li" />
                  </Badge>
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {isSearch ? (
          <div
            style={{
              width: "80%",
            }}
            className="mainSearchDiv_ToolBar"
          >
            <div className="innerMainSearchDIv_ToolBar">
              <input
                style={{
                  border: `${
                    backGroundColor === "white"
                      ? "1px solid black"
                      : "1px solid transparent"
                  }`,
                }}
                onKeyPress={handleKeyPress}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search..."
              />
              <Link
                to={`/products/all?search=${inputValue}`}
                style={{
                  textDecoration: "none",
                  fontSize: "16px",
                  color: "white",
                  padding: "10px",
                }}
                className="searchBtn"
              >
                Search
              </Link>
              <divsetMun
                className="cross-icon-box"
                onClick={() => setIsSearch(false)}
              >
                {/* <img onClick={() => setIsSearch(false)} src={cross} width={40} style={{marginLeft:'10px'}} /> */}
                <RxCross2 className="cross-icon" />
              </divsetMun>
            </div>
            <ul className="filtredList_toolbar" style={{ marginTop: "220px" }}>
              {inputValue
                ? filteredList.map((item, index) => (
                    <li key={index}>
                      <Link to={`/product-details?eon=${item.ean_code}`}>
                        {item.product_title}
                      </Link>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        ) : (
          <div
            className="sidebarmain_"
            style={{
              width: "80%",
              display: "flex",
            }}
          >
            <div
              style={{
                width: "57%",
              }}
              className="middleMainDiv_ToolBar"
            >
              {isHome ? null : (
                <div>
                  <Link
                    to={pagePaths.root}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <h1
                      className={
                        backGroundColor === "white"
                          ? "contentTitle_Toolbar menu_clr_change all_product"
                          : "contentTitle_Toolbar all_product"
                      }
                    >
                      Home
                    </h1>
                  </Link>
                </div>
              )}
              <Link
                className={
                  backGroundColor === "white"
                    ? "contentTitle_Toolbar menu_clr_change all_product"
                    : "contentTitle_Toolbar all_product"
                }
                to="/products/all"
              >
                All Products
              </Link>
              {categoriesMenu?.map((item, id) => {
                return (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        cursor: "pointer",
                        margin: "0 1rem",
                      }}
                      onMouseLeave={() => setSubContent(null)}
                      // onMouseEnter={() => handleProductTile(item.subCategory, item.name)}
                      onMouseOver={() =>
                        handleProductTile(item.subCategory, item.name)
                      }
                    >
                      <h1
                        onMouseEnter={() => (
                          setSubContent(item.subCategory),
                          setCategoriesTitleMenu(item?.name)
                        )}
                        onMouseLeave={() => (
                          setSubContent(null), setCategoriesTitleMenu(null)
                        )}
                        className={
                          backGroundColor === "white"
                            ? "contentTitle_Toolbar menu_clr_change"
                            : "contentTitle_Toolbar"
                        }
                      >
                        {item.name}&nbsp;
                        {item?.name === categoriesTitleMenu ? (
                          <svg
                            width="12"
                            height="9"
                            viewBox="0 0 14 9"
                            fill="black"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13 8L7 2L1 8"
                              stroke="black"
                              stroke-width="1.5"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="12"
                            height="9"
                            viewBox="0 0 14 9"
                            fill="black"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 1L7 7L13 1"
                              stroke="black"
                              stroke-width="1.5"
                            />
                          </svg>
                        )}
                      </h1>
                    </div>
                  </>
                );
              })}
              <div
                onMouseEnter={() => (
                  setSubContent(subContent),
                  setCategoriesTitleMenu(productPageTitle)
                )}
                onMouseLeave={() => setSubContent(null)}
                className="dropDown_TollBaar"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    zIndex: "5",
                    background: "white",
                    left: "10%",
                    borderRadius: "10px",
                  }}
                >
                  {subContent?.map((subCategoeries, id) => {
                    return (
                      <>
                        <div
                          style={{
                            padding: "2rem 2rem",
                          }}
                        >
                          <h1
                            style={{
                              fontWeight: "600",
                              fontSize: `${searchIconWidth * 0.8}px`,
                            }}
                          >
                            {subCategoeries.name}
                          </h1>
                          <h1>
                            {subCategoeries?.subSubCategory?.map(
                              (subSubCategories) => {
                                return (
                                  <>
                                    <div
                                      style={{
                                        fontSize: `${searchIconWidth * 0.7}px`,
                                        padding: "0.2rem 0",
                                        lineHeight: 2,
                                      }}
                                      className="subSubMenuToolBar"
                                    >
                                      <Link
                                        to={`/products/${productPageTitle}?sub=${encodeURIComponent(
                                          subCategoeries.name
                                        )}&subsub=${encodeURIComponent(
                                          subSubCategories?.name
                                        )}`}
                                        style={{
                                          color: "#262626",
                                          textDecoration: "none",
                                          lineHeight: 2,
                                          fontWeight: 100,
                                        }}
                                      >
                                        {subSubCategories?.name}
                                      </Link>
                                    </div>
                                  </>
                                );
                              }
                            )}
                          </h1>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="signInMainDiv_ToolBar">
              <div className="RightSecMainDiv_ToolBar">
                <div className="RightSecInnerMainDiv_ToolBar">
                  <div
                    onClick={() => setIsSearch(true)}
                    className="searchMainDiv_ToolBar"
                  >
                    <svg
                      // width={`${searchIconWidth}`}
                      height="20"
                      viewBox="0 0 19 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="8.5"
                        cy="8.5"
                        r="7.5"
                        stroke="black"
                        stroke-width="1.5"
                      />
                      <path
                        d="M14 15L18 19"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                    <h1
                      className={
                        backGroundColor === "white"
                          ? "contentTitle_Toolbar menu_clr_change"
                          : "contentTitle_Toolbar"
                      }
                    >
                      Search
                    </h1>
                  </div>
                  <Link
                    to={
                      JSON.parse(localStorage.getItem("items")) === null
                        ? pagePaths.signIn
                        : pagePaths.myOrderPage
                    }
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <div className="searchMainDiv_ToolBar">
                      {/* <svg
                        width={`${searchIconWidth}`}
                        height="25"
                        viewBox="0 0 19 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 23.3787C1.5 11.3787 17 10.3787 18 23.3787"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M14.5 5.75C14.5 8.33367 12.302 10.5 9.5 10.5C6.69804 10.5 4.5 8.33367 4.5 5.75C4.5 3.16633 6.69804 1 9.5 1C12.302 1 14.5 3.16633 14.5 5.75Z"
                          stroke="black"
                          stroke-width="1.5"
                        />
                      </svg> */}
                      <FiUserPlus style={{ fontSize: "30px" }} />
                      <h1
                        className={
                          backGroundColor === "white"
                            ? "contentTitle_Toolbar menu_clr_change"
                            : "contentTitle_Toolbar"
                        }
                        style={{ width: "60px" }}
                      >
                        {JSON.parse(localStorage.getItem("items")) === null
                          ? "Sign In"
                          : " Accounts"}
                      </h1>
                    </div>
                  </Link>
                  <Link
                    style={{
                      display: "flex",
                      textDecoration: "none",
                    }}
                    to={
                      JSON.parse(localStorage.getItem("items")) === null
                        ? pagePaths.signIn
                        : pagePaths.wishlistPage
                    }
                  >
                    <div className="searchMainDiv_ToolBar">
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={`${searchIconWidth * 1.2}`}
                        height="22"
                        viewBox="0 0 24 22"
                        fill="none"
                      >
                        <path
                          d="M4.17725 14.8378L4.17721 14.8377C2.17876 12.4629 1.19101 9.98171 1.21868 7.2734L1.21868 7.27329C1.2524 4.03238 3.91613 1.4 7.15875 1.4C9.32935 1.4 10.8727 2.50001 11.818 3.484C12.7636 2.49912 14.307 1.4 16.4775 1.4C19.7201 1.4 22.3838 4.03242 22.4176 7.27376V7.27387C22.4452 9.98274 21.4564 12.4639 19.4591 14.8381L19.459 14.8383C18.5166 15.9578 16.8365 17.71 13.0146 20.2397C12.6606 20.4747 12.244 20.5997 11.8186 20.6H11.8174C11.3918 20.5995 10.975 20.4742 10.621 20.2388M4.17725 14.8378L10.6203 20.2384C10.6206 20.2385 10.6208 20.2387 10.621 20.2388M4.17725 14.8378C5.11956 15.9573 6.79952 17.7093 10.621 20.2388M4.17725 14.8378L10.621 20.2388"
                          stroke-width="1.2"
                          stroke="black"
                        />
                      </svg> */}

                      <RiHeartAddLine
                        style={{ fontSize: "30px", color: "#000" }}
                      />

                      <h1
                        className={
                          backGroundColor === "white"
                            ? "contentTitle_Toolbar menu_clr_change"
                            : "contentTitle_Toolbar"
                        }
                      >
                        Wishlist
                        {/* {wishItemsCount > 0 && (
                          <div className="bg-dot">
                            <span className="wishlist-number">
                              {wishItemsCount ?? 0}
                              aa
                            </span>
                          </div>
                        )} */}
                        {currentlengthwishlist > 0 && (
                          <div className="bg-dot">
                            <span className="wishlist-number">
                              {currentlengthwishlist ?? 0}
                            </span>
                          </div>
                        )}
                      </h1>
                    </div>
                  </Link>
                  <Link
                    to={
                      JSON.parse(localStorage.getItem("items")) === null
                        ? pagePaths.signIn
                        : pagePaths.cartPage
                    }
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <div className="searchMainDiv_ToolBar">
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={`${searchIconWidth * 1.35}`}
                        height="23"
                        viewBox="0 0 28 23"
                        fill="none"
                      >
                        <path
                          d="M24.9065 13.5756L26.2529 6.77878C26.2985 6.54906 26.2942 6.32881 26.2435 6.12404C26.1919 5.91756 26.092 5.72225 25.9449 5.54416C25.7978 5.36434 25.6249 5.22841 25.4339 5.13807C25.2446 5.04859 25.0295 5.00213 24.7946 5.00213H6.74427L8.44348 13.5756C8.51317 13.9292 8.69815 14.2286 8.95454 14.4394C9.21007 14.6493 9.54044 14.7715 9.90179 14.7715H23.4482C23.8095 14.7715 24.1399 14.6485 24.3954 14.4394C24.6518 14.2295 24.8368 13.9292 24.9065 13.5756ZM20.8525 17.3948C21.6259 17.3948 22.3271 17.7088 22.8347 18.2155C23.3415 18.7223 23.6555 19.4235 23.6555 20.1978C23.6555 20.9713 23.3415 21.6725 22.8347 22.1792C22.3271 22.6868 21.6268 23 20.8525 23C20.0781 23 19.3778 22.686 18.8702 22.1792C18.3634 21.6725 18.0494 20.9713 18.0494 20.1978C18.0494 19.4235 18.3634 18.7232 18.8702 18.2155C19.3778 17.7088 20.0781 17.3948 20.8525 17.3948ZM22.0587 18.9916C21.7498 18.6827 21.3239 18.4917 20.8525 18.4917C20.381 18.4917 19.9551 18.6827 19.6462 18.9916C19.3374 19.3005 19.1472 19.7263 19.1472 20.1978C19.1472 20.6684 19.3382 21.0952 19.6462 21.404C19.9551 21.7129 20.381 21.9039 20.8525 21.9039C21.3239 21.9039 21.7498 21.7129 22.0587 21.404C22.3667 21.0952 22.5577 20.6693 22.5577 20.1978C22.5577 19.7263 22.3667 19.3005 22.0587 18.9916ZM11.7352 17.3948C12.5087 17.3948 13.2099 17.7088 13.7166 18.2155C14.2242 18.7223 14.5374 19.4235 14.5374 20.1978C14.5374 20.9713 14.2234 21.6725 13.7166 22.1792C13.2099 22.6868 12.5087 23 11.7352 23C10.9609 23 10.2606 22.686 9.75295 22.1792C9.2462 21.6725 8.93217 20.9713 8.93217 20.1978C8.93217 19.4235 9.2462 18.7232 9.75295 18.2155C10.2597 17.7088 10.9609 17.3948 11.7352 17.3948ZM12.9414 18.9916C12.6326 18.6827 12.2067 18.4917 11.7352 18.4917C11.2637 18.4917 10.8379 18.6827 10.529 18.9916C10.2201 19.3005 10.0291 19.7263 10.0291 20.1978C10.0291 20.6684 10.2201 21.0952 10.529 21.404C10.8379 21.7129 11.2637 21.9039 11.7352 21.9039C12.2058 21.9039 12.6326 21.7129 12.9414 21.404C13.2503 21.0952 13.4413 20.6693 13.4413 20.1978C13.4413 19.7263 13.2503 19.3005 12.9414 18.9916ZM5.53461 4.5341L4.8532 1.09696H1.36702C1.06418 1.09696 0.818115 0.851756 0.818115 0.54891C0.818115 0.246063 1.06418 0 1.36702 0H5.30317C5.56042 0 5.79014 0.181536 5.8409 0.443085L6.5266 3.90517H24.7946C25.1895 3.90517 25.5621 3.98777 25.901 4.1478C26.2374 4.30696 26.5369 4.5427 26.7898 4.84985C27.0427 5.15786 27.2165 5.4977 27.3069 5.85819C27.3981 6.2204 27.4058 6.60068 27.3292 6.9887L25.9828 13.7855C25.8623 14.3947 25.5397 14.9152 25.0906 15.2834C24.6406 15.6525 24.0676 15.8685 23.449 15.8685H9.90265C9.2832 15.8685 8.71106 15.6525 8.26109 15.2834C7.81198 14.9143 7.48935 14.3947 7.3689 13.7855L5.54579 4.58658C5.54149 4.56937 5.53805 4.5513 5.53547 4.53324L5.53461 4.5341Z"
                          fill={`${icons}`}
                        />
                      </svg> */}
                      <FaOpencart style={{ fontSize: "30px", color: "#000" }} />
                      <h1
                        className={
                          backGroundColor === "white"
                            ? "contentTitle_Toolbar menu_clr_change"
                            : "contentTitle_Toolbar"
                        }
                      >
                        Cart
                        {cartItemsCount > 0 && (
                          <div className="bg-dot">
                            <span className="cart-number">
                              {cartItemsCount}
                            </span>
                          </div>
                        )}
                      </h1>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ToolBar;
