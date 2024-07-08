import "../styles/ProductListing.css";
import React, { useState } from "react";
import ToolBar from "../component/toolbar";
import select_more from "../svg/pip/select_more.svg";
import plus from "../svg/pip/plus.svg";
import downarrow from "../svg/pip/downarrow.svg";
import OwlCarousel from "react-owl-carousel";
import axios from "axios";
import { useEffect } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import filledwishheart from "../svg/pip/filledwishheart.svg";
import emptywishheart from "../svg/pip/emptywishheart.svg";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Loading from "./Loading";
import { Footer } from "../container/footer";
import qs from "qs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
// import { toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import dummyimg from "../images/popularImg1.png";
import { useWindowSize } from "./checkSize";
import { pagePaths } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  setaddtocartupdate,
  setwishlistdata,
} from "../redux/slices/CurrentUpdateFun";
import { getAllWishItems } from "../redux/slices/wishSlice";
import { FaCartArrowDown, FaOpencart } from "react-icons/fa";

const widthOutput = window.screen.width;
const productTitleFontSize = (1.1 / 100) * widthOutput;

export default function ProductListing() {
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [filterStateForParams, setFilterStateForParams] = useState("");
  const [numColumns, setNumColumns] = useState(3);
  const [numColumnsGrid, setnumColumnsGrid] = useState(3);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [Color, setColor] = useState(false);
  const [Style, setStyle] = useState(false);
  const [categoriesExpanded, setcategoriesExpanded] = useState(false);
  const [Pattern, setPattern] = useState(false);
  const [Size, setSize] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [downArrow, setDownarrow] = useState(false);
  const [sortby, setSortby] = useState(false);
  const [twoGrid, setTwoGrid] = useState(false);
  const [threeGrid, setThreeGrid] = useState(true);
  const [fourGrid, setFourGrid] = useState(false);

  const [checkedItems, setCheckedItems] = useState([]);
  const [sortStatus, setSortStatus] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState([]);
  const [allSize, setAllSize] = useState([]);
  const [allColor, setAllColor] = useState([]);
  const [allPattern, setAllPattern] = useState([]);
  const [allStyle, setAllStyle] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [unChangeTotalCount, setUnChangeTotalCount] = useState([]);
  const [filterStatus, setFIlterStatus] = useState(false);
  const [currentCategory, setCurrentCategory] = useState();
  const [currentSubCategory, setCurrentSubCategory] = useState();

  const [data, setData] = useState([]);
  const [filterData, setFilteredData] = useState([]);
  const [isVisible, setIsVisible] = useState(window.innerWidth > 768);

  const [totalCount, setTotalCount] = useState(unChangeTotalCount);
  const [isWishListSignIn, setIsWishListSignIn] = useState(false);
  const [wishlistLikeStatue, setWishListLikeStatus] = useState({
    status: "",
  });

  const [catTest, setCatTest] = useState([]);
  const [colorTest, setColorTest] = useState([]);
  const [sizeTest, setSizeTest] = useState([]);
  const [patternTest, setPatternTest] = useState([]);
  const [eanCode, setEanCode] = useState([]);

  //new code
  const [isLoading, SetIsLoading] = useState(false);
  //end new code

  const id = params.id;

  const [codes, setCodes] = useState([]);
  const dispatch = useDispatch();

  let token = JSON.parse(localStorage.getItem("items"))
    ? JSON.parse(localStorage.getItem("items"))
    : "";

  const [filterState, setFilterState] = useState({
    category: params.id.toLowerCase() !== "all" ? params.id : null,
    subCategory:
      params.id.toLowerCase() !== "all" ? searchParams.get("sub") : null,
    subSubCategory:
      params.id.toLowerCase() !== "all" ? searchParams.get("subsub") : null,
    style: [],
    color: [],
    size: [],
    pattern: [],
  });
  let search = searchParams.get("search");
  const [newfilterState, setNewFilterState] = useState({
    category: params.id.toLowerCase() !== "all" ? params.id : null,
    subCategory:
      params.id.toLowerCase() !== "all" ? searchParams.get("sub") : null,
    subSubCategory:
      params.id.toLowerCase() !== "all" ? searchParams.get("subsub") : null,
    style: [],
    color: [],
    size: [],
    pattern: [],
    search: search,
  });

  useEffect(() => {
    //onload main
    handleSortNewest("e", "sortBy", "new");
    setSortby(false);

    fetchaddToWishList();
    fetchDeleteWishList();

    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFilter = () => {
    setIsVisible(!isVisible); // Toggle visibility state
  };

  useEffect(() => {
    // If you want to keep the previous state and only override some properties

    setNewFilterState({
      category: params.id.toLowerCase() !== "all" ? params.id : null,
      subCategory:
        params.id.toLowerCase() !== "all" ? searchParams.get("sub") : null,
      subSubCategory:
        params.id.toLowerCase() !== "all" ? searchParams.get("subsub") : null,
      style:
        params.id.toLowerCase() !== "all" ? searchParams.get("style") : null,
      color:
        params.id.toLowerCase() !== "all" ? searchParams.get("color") : null,
      size: params.id.toLowerCase() !== "all" ? searchParams.get("size") : null,
      pattern:
        params.id.toLowerCase() !== "all" ? searchParams.get("pattern") : null,
    });
    setFilterState((prevFilterState) => ({
      ...prevFilterState,
      category: params.id.toLowerCase() !== "all" ? params.id : undefined,
      subCategory: [searchParams.get("sub")],
      subSubCategory: [searchParams.get("subsub")],
      // Reset other fields if necessary
      style: [],
      color: [],
      size: [],
      pattern: [],
    }));
    if (params.id.toLowerCase() === "all") {
      fetchTotalCountData();
    }
  }, [params]);

  // Use another useEffect to perform actions after filterState changes
  useEffect(() => {
    setSortStatus("");
    setData([]);
    if (shouldLog) {
      shouldLog = false;
      fetchData();
      AllSizeData();
      AllColorData();
      AllStyleData();
      AllPatternData();
      fetchTotalCountData();
    }
  }, [filterState]); // <- Add filterState as a dependency

  useEffect(() => {
    // setFilteredData(data);
    // myc
  }, [data]);

  const getfilteredData = (state) => {
    // let state = { ...filterState };
    state.limit = 100;
    state.offset = page;
    state.sortBy = "new";

    if (!state.category) {
      delete state.subCategory;
      delete state.subSubCategory;
    }

    if (!state.subCategory) {
      delete state.subCategory;
    }
    const params = qs.stringify(state, { encode: false, arrayFormat: "comma" });
    setFilterStateForParams(params);
    try {
      SetIsLoading(true);
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/site/product/filtered?${params}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setFilteredData(data);
          const count = data.length;
          setTotalCount(count);
          SetIsLoading(false);
          setSortby(false);
        })
        .catch((err) => console.log("error ", err));
    } catch (error) {
      console.log(error);
    }
  };

  const addFilter = (filterName, filterValue) => {
    if (filterName === "category") {
      addFilterSingle();
      // addFilterSingle(filterName, filterValue);

      return;
    }

    var newFilterState = {};

    // if (filterName === "subSubCategory") {
    // const filterValues = newfilterState[filterName] || [];
    // newFilterState = {
    //   ...newfilterState,
    //   ...{ [filterName]: [filterValue] },
    // };
    // }
    // else
    // {
    const filterValues = newfilterState[filterName] || [];
    newFilterState = {
      ...newfilterState,
      ...{ [filterName]: [...filterValues, filterValue] },
    };
    // }

    getfilteredData(newFilterState);
    setNewFilterState(newFilterState);
  };

  const addFilterSingle = (filterName, filterValue) => {
    const newFilterState = {
      ...newfilterState,
      ...{ [filterName]: filterValue },
    };
    getfilteredData(newFilterState);
    setNewFilterState(newFilterState);
  };

  const removeFilter = (filterName, filterValue) => {
    let filterValues = newfilterState[filterName] || [];
    filterValues = filterValues.filter((item) => item !== filterValue);

    const newFilterState = {
      ...newfilterState,
      ...{ [filterName]: [...filterValues] },
    };

    getfilteredData(newFilterState);
    setNewFilterState(newFilterState);
  };

  //   const addFilterByInput = (e, filterValue) => {
  //     const target = e.target;
  //     const filterName = target.name;

  //     if (target.checked) {
  //       addFilter(filterName, filterValue);
  //     } else {
  //       removeFilter(filterName, filterValue);
  //     }
  //     setSelectedStyles([...selectedSizes], [filterValue]);
  //   };
  const addFilterByInput = (e, filterValue) => {
    const searchParams = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(filterValue)) {
      searchParams.set(key, value);
    }
    const newURL = window.location.pathname + "?" + searchParams.toString();
    window.history.pushState({}, "", newURL);
    // const searchParams = new URLSearchParams(window.location.search);
    // for (const [key, value] of Object.entries(filterValue)) {
    //     const paramValue = String(value);
    //     searchParams.set(key, paramValue);
    // }

    // const newURL = `${window.location.pathname}?${searchParams.toString()}`;
    // window.history.pushState({}, '', newURL);
    // -----
    const target = e.target;
    const filterName = target.name;
    // console.log("target",target)
    // console.log("filterName",filterName)

    if (target.checked) {
      const updatedSelectedStyles = [{ name: filterName, value: filterValue }];
      setSelectedStyles(updatedSelectedStyles);
      addFilter(filterName, filterValue);
    } else {
      const updatedSelectedStyles = selectedStyles.filter(
        (style) => !(style.name === filterName && style.value === filterValue)
      );
      setSelectedStyles(updatedSelectedStyles);
      removeFilter(filterName, filterValue);
    }
    // redirectToCategory();
  };

  // coloruseeffect-------------
  // useEffect(()=>{
  //   const updatedSelectedStyles = [{ name: "color", value: "blue" }];
  //       setSelectedStyles(updatedSelectedStyles);
  //   addFilter("color", "blue");
  // },[])

  //----------------filtter data show-----

  const includesFilter = (filterName, filterValue) => {
    const filterValues = newfilterState[filterName] || [];
    return filterValues.includes(filterValue);
  };

  const handleRemoveColor = (color) => {
    const newCheckedItems = newfilterState.color.filter(
      (colorItem) => colorItem !== color
    );
    setCheckedItems(newCheckedItems);
  };

  //------Custome-----

  // const getWishlist = () => {
  //   let config = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url: "https://api.sizeupp.wezbo.xyz/user/wishlist",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token + "",
  //     },
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       // let ean = [];
  //       // response.data.map((item) => {
  //       //   ean.push(item.ean_code);
  //       //   setCodes(ean);
  //       //   dispatch(setwishlistdata(ean));
  //       // });
  //       const ean = [];
  //       response.data.forEach((item) => {
  //         ean.push(item.ean_code);
  //       });
  //       setCodes(ean);
  //      dispatch(setIsWishListSignIn(ean));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const getWishlist = () => {
    if (token) {
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
          dispatch(setwishlistdata(response?.data));
          // getAllWishItems(response?.data);
          if (response.data.length !== 0) {
            response.data.map((item) => {
              setCodes((codes) => [...codes, item.product.ean_code]);
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //wishListUnLike Fun------
  const handleRemoveWishlist = (ean_code) => {
    // console.log("ean_code",ean_code)
    // seteancodeFunCall(ean_code)
    if (!token || token === "") {
      window.location.href = pagePaths?.signIn;
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
          getWishlist();
          // window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //wishListLike Fun------
  const handleLikeMethods = (ean_code) => {
    if (!token || token === "") {
      window.location.href = pagePaths?.signIn;
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
          getWishlist();
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
  useEffect(() => {
    getWishlist();
  }, []);

  async function handleAddToCart(ean) {
    if (!token || token === "") {
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
    try {
      await axios
        .request(config)
        .then((resp) => {
          if (resp.status == 401) {
            dispatch(setaddtocartupdate(true));
            navigate(pagePaths.signIn);
            toast.error("error 401!", {
              style: {
                borderRadius: "6px",
                background: "#fff",
              },
            });
            return;
          }
        })
        .catch((err) => {})
        .finally(() => {
          dispatch(setaddtocartupdate(true));
          toast.success("Added To Cart", {
            style: {
              borderRadius: "6px",
              background: "#fff",
            },
          });
        });
    } catch (error) {
      toast.error(`${error}`, {
        style: {
          borderRadius: "6px",
          background: "#fff",
        },
      });
    }
  }

  let ean_Code = "";

  // console.log("checking params in women page", params)

  let productIdParam = "";

  const handleParamIdProductId = (id) => {
    if (id === "w") {
      return (productIdParam = "w");
    } else {
      return (productIdParam = "m");
    }
  };
  handleParamIdProductId(id);
  // let token = JSON.parse(localStorage.getItem('items')) ? JSON.parse(localStorage.getItem('items')) : ""

  // Change By Vinit
  const fetchTotalCountData = () => {
    let state = { ...filterState };

    state.limit = 1000;
    state.offset = page;
    if (!state.category || !state.subCategory || state.subCategory.length > 0) {
      delete state.subCategory;
      delete state.subSubCategory;
    }

    let search = searchParams.get("search");

    // if (!state.category || (!state.subCategory || state.subCategory.length > 0)) {
    //   delete state.subCategory;
    //   delete state.subSubCategory;
    //   }

    if (searchParams.get("subsub")) {
      state.subSubCategory = searchParams.get("subsub");
    }

    const querystring = qs.stringify(state, {
      encode: false,
      arrayFormat: "comma",
    });

    // let state = { ...filterState };
    // console.log(1111, state.subCategory);
    // //not 50
    // state.limit = 100;
    // state.offset = page;
    // if (!state.category || !state.subCategory || state.subCategory.length > 0) {
    //   delete state.subCategory;
    //   delete state.subSubCategory;
    // }

    // const querystring = qs.stringify(state, {
    //   encode: false,
    //   arrayFormat: "comma",
    // });

    // console.log(2222, querystring);

    let url = `${process.env.REACT_APP_BACKEND_URL}/site/product/count?${querystring}`;

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setUnChangeTotalCount(data);

        if (search == null || search == undefined) {
          setTotalCount(data.count);
        }
      })
      .catch((error) => toast(error));
  };

  const [page, setPage] = useState(0);

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setPage(0);
    SetIsLoading(true);
    let state = { ...filterState };
    let search = searchParams.get("search");
    if (search != null && search != undefined) {
      state.search = search;
    }
    state.limit = 1000;
    state.offset = page;
    state.sortBy = "new";
    if (!state.category || !state.subCategory || state.subCategory.length > 0) {
      delete state.subCategory;
      delete state.subSubCategory;
    }

    if (searchParams.get("subsub")) {
      state.subSubCategory = searchParams.get("subsub");
    }

    const querystring = qs.stringify(state, {
      encode: true,
      arrayFormat: "comma",
    });
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/site/product/filtered?${querystring}`
    );
    const datafetchData = await res.json();
    setTotalCount(datafetchData.length);
    setData((prev) => [...prev, ...datafetchData]);
    setFilteredData(datafetchData);
    setLoading(false);
    SetIsLoading(false);
  };

  let shouldLog = true;

  const AllSizeData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/site/size/all`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setAllSize(data);
      })
      .catch((error) => toast(error));
  };
  const AllColorData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/site/color/all`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setAllColor(data);
      })
      .catch((error) => toast(error));
  };
  const AllPatternData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/site/pattern/all`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setAllPattern(data);
      })
      .catch((error) => toast(error));
  };

  const AllStyleData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/site/category/all`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setAllCategories(data);
        const category = data.find((x) => x.name === id);
        if (category) {
          setCurrentCategory(category);
          if (params.sub) {
            const subCategory = category.subCategory.find(
              (x) => x.name === params.sub
            );
            setCurrentSubCategory(subCategory);
          } else {
            let mergedArray = [];
            category.subCategory.forEach((subCategory) => {
              mergedArray = mergedArray.concat(subCategory.subSubCategory);
            });

            setCurrentSubCategory(mergedArray);
          }
          setAllStyle(data);
        }
      })
      .catch((error) => toast(error));
  };

  useEffect(() => {
    if (shouldLog) {
      shouldLog = false;
      AllSizeData();
      AllColorData();
      AllStyleData();
      AllPatternData();
      // getfilteredData();
      // fetchTotalCountData();
    }
  }, [page, filterState.category]);

  // useEffect(()=>{
  //   fetchTotalCountData()
  // },[filterState.category])

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        // setPage((prev) => prev + 4);
        setPage(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // End Vinit

  // console.log("filtredSizearrayItems1212", data)
  const fetchaddToWishList = (ean) => {
    if (ean == undefined || ean == null || ean == "") {
      return;
    }
    setIsLike(true);
    const userData = {
      ean_code: ean,
    };
    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/user/wishlist/add`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          // console.log("checking response", userData, response.status)
        })
        .catch((err) => console.log("error ", err));
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDeleteWishList = (ean) => {
    if (ean == undefined || ean == null || ean == "") {
      return;
    }
    setIsLike(false);
    try {
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/wishlist/delete/${ean}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          // console.log("checking response", response.status)
        })
        .catch((err) => toast("error ", err));
    } catch (error) {
      toast(error);
    }
  };

  const handleRadioChange = (e) => {
    setNumColumns(parseInt(e.target.value));
  };

  const getGridClass = () => {
    if (numColumns === 2) {
      return "two-column-grid";
    } else if (numColumns === 3) {
      return "three-column-grid";
    } else if (numColumns === 4) {
      return "four-column-grid";
    }
  };

  const handleDownArraw = () => {
    setDownarrow(!downArrow);
  };

  const handleSortby = () => {
    setSortby(!sortby);
  };

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
    const percentage = parseInt(((price - discountPrice) / price) * 100);

    return `(${percentage}% OFF)`;
  };

  const handleSizeMoreColor = () => {
    // console.log("color");
    setColor(!Color);
  };

  const handleSizeMoreStyle = () => {
    setStyle(!Style);
  };

  const handleSizeMoreCategories = () => {
    setcategoriesExpanded(!categoriesExpanded);
  };

  const handleSizeMoreSize = () => {
    setSize(!Size);
  };

  const handleSizeMorePattern = () => {
    setPattern(!Pattern);
  };

  const handleGridTwo = () => {
    setnumColumnsGrid(2);
    setTwoGrid(true);
    setThreeGrid(false);
    setFourGrid(false);
    setDownarrow(!downArrow);
    setSortby(sortby);
  };
  const handleGridThree = () => {
    setnumColumnsGrid(3);

    setTwoGrid(false);
    setThreeGrid(true);
    setFourGrid(false);
    setDownarrow(!downArrow);
  };
  const handleGridFour = () => {
    setnumColumnsGrid(3);

    setTwoGrid(false);
    setThreeGrid(false);
    setFourGrid(true);
    setDownarrow(!downArrow);
  };

  const handleUniqueSize = (e, size, id) => {
    console.log(
      "checking unique size ==>> else",
      size,
      `${process.env.REACT_APP_BACKEND_URL}/site/product/filtered?category=${params.id}&size=${size}`,
      size
    );

    if (e.target.checked) {
      setFIlterStatus(true);

      try {
        fetch(
          `${process.env.REACT_APP_BACKEND_URL}/site/product/filtered?category=${params.id}&size=${size}`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setFilteredData(data);
            //myc
          })
          .catch((err) => console.log("error ", err));
      } catch (error) {
        console.log(error);
      }
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/site/product/count${
          filterState.category !== "All" ? "category=" + params.id : ""
        }&size=${size}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setTotalCount(data);
        })
        .catch((error) => console.log(error));
    } else {
      setFilteredData(data);
      //myc
      setFIlterStatus(false);
      setTotalCount(unChangeTotalCount);
    }

    if (selectedSizes.includes(size)) {
      setSelectedSizes(
        selectedSizes.filter((selectedSize) => selectedSize !== size)
      );
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
    // handleUniqueSizeListFIlter()
  };

  // const handleUniqueSize = (e, size, id) => {
  //   const { checked } = e.target
  //   let newColoList = { ...selectedColor }
  //   if (checked) {
  //     newColoList[size] = size
  //   } else {
  //     delete newColoList[size];
  //   }
  //   const newCheckedItems = checkedItems.includes(size)
  //     ? checkedItems.filter((item) => item !== size)
  //     : [...checkedItems, size];
  //   setCheckedItems(newCheckedItems);
  //   setSelectedSizes(newColoList)
  // }

  const handleRemoveSize = (size) => {
    setSelectedSizes(
      selectedSizes.filter((selectedSize) => selectedSize !== size)
    );

    setFilteredData(data);
    //myc
  };

  // console.log("checking unique size", filterAarray)
  const handleUniqueStyle = (e, style, id) => {
    if (e.target.checked) {
      setFIlterStatus(true);
    } else {
      setFilteredData(data);
      //myc
      setFIlterStatus(false);
      setTotalCount(unChangeTotalCount);
    }
    if (selectedStyles?.includes(style)) {
      setSelectedStyles(
        selectedStyles.filter((selectedStyle) => selectedStyle !== style)
      );
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  // console.log("checking n cart===>>>", data, filterData)

  const handleRemoveStyle = (style) => {
    setSelectedStyles(
      selectedStyles.filter((selectedStyles) => selectedStyles !== style)
    );
  };

  const handleUniqueColor = (e, color, id) => {
    console.log("", color);
    // const { checked } = e.target
    // let newColoList = { ...selectedColor }
    // if (checked) {
    //   newColoList[color] = color
    // } else {
    //   delete newColoList[color];
    // }
    // const newCheckedItems = checkedItems.includes(color)
    //   ? checkedItems.filter((item) => item !== color)
    //   : [...checkedItems, color];
    // setCheckedItems(newCheckedItems);
    // setSelectedColor(newColoList)

    if (e.target.checked) {
      setFIlterStatus(true);
      try {
        fetch(
          `${process.env.REACT_APP_BACKEND_URL}/site/product/filtered?category=${params.id}&color=${color}`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setFilteredData(data);
            //myc
          })
          .catch((err) => console.log("error ", err));
      } catch (error) {
        console.log(error);
      }

      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/site/product/count?category=${params.id}&color=${color}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setTotalCount(data);
        })
        .catch((error) => console.log(error));
    } else {
      setFilteredData(data);
      //myc
      setFIlterStatus(false);
      setTotalCount(unChangeTotalCount);
    }
    if (selectedColors?.includes(color)) {
      setSelectedColors(
        selectedColors.filter((selectedColor) => selectedColor !== color)
      );
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  // console.log("checking color trim", filterData)
  const redirectToCategory = (category) => {
    setSelectedStyles([]);
    newfilterState["category"] = category;
    newfilterState.subCategory = [];
    newfilterState.subSubCategory = [];
    newfilterState.size = [];
    newfilterState.color = [];
    newfilterState.pattern = [];
    navigate(`/products/${category}?${filterStateForParams}`);
    setNewFilterState(newfilterState);
  };

  const handleRemovePattern = (pattern) => {
    setSelectedPattern(
      selectedPattern.filter((selected) => selected !== pattern)
    );
  };

  const handleSortNewest = (e, sortBy, sortCategories) => {
    try {
      const paramsToPass = qs.stringify(newfilterState, {
        encode: false,
        arrayFormat: "comma",
      });
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/site/product/filtered?${paramsToPass}&${sortBy}=${sortCategories}&limit=500&offset=0`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setFilteredData(data);
        })
        .catch((err) => console.log("error ", err));
    } catch (error) {
      console.log(error);
    }
    setSortby(!sortby);
    setSortStatus(sortCategories);
  };

  // useEffect(() => {
  //   if (wishlistLikeStatue.status === "unLiked") {
  //     handleLikeMethods();
  //   }
  //   if (wishlistLikeStatue.status === "liked") {
  //     handleRemoveWishlist();
  //   }
  // }, [wishlistLikeStatue.status]);

  const sliderimg = [
    {
      img: "https://pixabay.com/photos/pitbull-dog-fall-domestic-animal-8501582/",
    },
    {
      img: "https://pixabay.com/photos/bear-grizzly-animal-fauna-zoo-8845470/",
    },
    {
      img: "https://pixabay.com/photos/pitbull-dog-fall-domestic-animal-8501582/",
    },
  ];

  const options = {
    margin: 10,
    responsiveClass: true,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      // 600: {
      //   items: 2,
      // },
      // 1000: {
      //   items: 3,
      // }
    },
    loop: true,
  };

  //-----colorsearch Filter-----
  const [searchOnsubCategory, setsearchOnsubCategory] = useState("");
  const [filteredSubCategory, setFilteredSubCategory] =
    useState(currentSubCategory);
  // ----------
  useEffect(() => {
    setFilteredSubCategory(
      currentSubCategory?.filter((item) =>
        item.name.toLowerCase().includes(searchOnsubCategory.toLowerCase())
      )
    );
  }, [searchOnsubCategory, currentSubCategory]);
  //------------
  const handleSearchChange = (e) => {
    setsearchOnsubCategory(e.target.value);
  };

  //-----colorsearch Filter-----
  const [colorsearch, setColorsearch] = useState("");
  const [filteredColor, setFilteredColor] = useState(allColor);
  useEffect(() => {
    setFilteredColor(
      allColor?.filter((item) =>
        item.name.toLowerCase().includes(colorsearch.toLowerCase())
      )
    );
  }, [colorsearch, allColor]);
  const handleSearchChangecolor = (e) => {
    setColorsearch(e.target.value);
  };
  //-----Sizesearch Filter-----
  const [Sizesearch, setSizesearch] = useState("");
  const [filteredSize, setFilteredSize] = useState(allSize);
  // -----------
  useEffect(() => {
    setFilteredSize(
      allSize?.filter((item) =>
        item.name.toLowerCase().includes(Sizesearch.toLowerCase())
      )
    );
  }, [Sizesearch, allSize]);
  const handleSearchChangeSize = (e) => {
    setSizesearch(e.target.value);
  };

  //-----patternSearch Filter-----
  const [patternSearch, setPatternSearch] = useState("");
  const [filteredPattern, setFilteredPattern] = useState(allPattern);
  useEffect(() => {
    setFilteredPattern(
      allPattern?.filter((item) =>
        item.name.toLowerCase().includes(patternSearch.toLowerCase())
      )
    );
  }, [patternSearch, allPattern]);
  const handleSearchChangePattern = (e) => {
    setPatternSearch(e.target.value);
  };
  // ----------

  const handleClick = (productItem) => {
    navigate(
      `/product-details?eon=${productItem.description.ean_code}&s=${productIdParam}&title=${productItem.product_title}`
    );
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="pip-main-container">
        <ToolBar
          fontColor="#474747"
          logo="black"
          dropDown="#474747"
          icons="#474747"
          backGroundColor="white"
          stroke="black"
        />
        <div className="pip-submain-container">
          {/* leftcontainer */}
          <div
            className="pip-left-container"
            style={{
              display: isVisible ? "block" : "none",
              zIndex: isVisible && "1",
            }}
          >
            {/*<p style={{ display: isVisible ? "block" : "none" }}>Add Filter</p>
            <button onClick={() => setIsVisible(!isVisible)}>Toggle Filter</button> */}
            <div
              className="woman-add-filter-container"
              style={{ display: isVisible ? "block" : "none" }}
            ></div>

            <hr></hr>

            {/* Men Women  */}
            <div
              className="style-filter"
              style={{ display: isVisible ? "block" : "none" }}
            >
              <div
                onClick={() => handleSizeMoreCategories()}
                className="style-select"
              >
                <span>Gender</span>
                {categoriesExpanded ? (
                  <img src={select_more} alt="" />
                ) : (
                  <img src={plus} alt="" />
                )}
              </div>
              {categoriesExpanded && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(1,1fr)",
                    overflow: "scroll",
                    overflowX: "hidden",
                    // height: "30vh",
                  }}
                >
                  {allCategories.map((uniqueStyle, id) => {
                    return (
                      <div>
                        <div className="custom-checkbox">
                          <input
                            type="radio"
                            className="radio"
                            name="category"
                            value={uniqueStyle.name}
                            checked={uniqueStyle.name === filterState.category}
                            onChange={
                              (e) => redirectToCategory(uniqueStyle.name)
                              // setCatTest(uniqueStyle.name)
                            }
                          />
                          <label className="custom-checkbox-label">
                            {uniqueStyle.name}
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {/* Men Women End  */}

            {currentCategory && (
              <div
                className="style-filter"
                style={{ display: isVisible ? "block" : "none" }}
              >
                <div
                  onClick={() => handleSizeMoreStyle()}
                  className="style-select"
                >
                  <span>Products</span>
                  {Style ? (
                    <img src={select_more} alt="" />
                  ) : (
                    <img src={plus} alt="" />
                  )}
                </div>
                {Style && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(1,1fr)",
                      overflow: "scroll",
                      overflowX: "hidden",
                      maxHeight: "30vh",
                    }}
                  >
                    {/* ----Search Input------ */}
                    <div className="catogry_inputBox">
                      <input
                        type="text"
                        placeholder="Serach..."
                        value={searchOnsubCategory}
                        onChange={handleSearchChange}
                        className="catogry_search_input_pro_page"
                      />
                    </div>

                    {/* {currentSubCategory.map((uniqueStyle, id) => {
                      return (
                        <div key={id} className="custom-checkbox">
                          <input
                            type="checkbox"
                            className="checkbox-input"
                            id={uniqueStyle}
                            checked={includesFilter(
                              "subSubCategory",
                              uniqueStyle.name
                            )}
                            value={uniqueStyle.name}
                            name="subSubCategory"
                            onChange={(e) =>
                              addFilterByInput(e, uniqueStyle.name)
                            }
                          />
                          <label
                            htmlFor={uniqueStyle.name}
                            className="custom-checkbox-label"
                          >
                            {uniqueStyle.name}
                          </label>
                        </div>
                      );
                    })} */}
                    {filteredSubCategory.map((uniqueStyle, id) => (
                      <div key={id} className="custom-checkbox">
                        <input
                          type="checkbox"
                          className="checkbox-input"
                          id={uniqueStyle.name}
                          checked={includesFilter(
                            "subSubCategory",
                            uniqueStyle.name
                          )}
                          value={uniqueStyle.name}
                          name="subSubCategory"
                          onChange={(e) =>
                            addFilterByInput(e, uniqueStyle.name)
                          }
                        />
                        <label
                          htmlFor={uniqueStyle.name}
                          className="custom-checkbox-label"
                        >
                          {uniqueStyle.name}
                        </label>
                      </div>
                    ))}

                    {/* <p style={{ padding: "20px" }}>Not Selected any Style</p> */}
                  </div>
                )}
              </div>
            )}

            <div
              className="color-filter"
              style={{ display: isVisible ? "block" : "none" }}
            >
              <div
                onClick={() => handleSizeMoreColor()}
                className="color-select"
              >
                <span>Color</span>
                {Color ? (
                  <img src={select_more} alt="" />
                ) : (
                  <img src={plus} alt="" />
                )}
              </div>

              {/* ---------- */}

              {Color && (
                <div className="checkbox-sub-container-pip">
                  {/* ----Search Color Input------ */}
                  <div className="catogry_inputBox">
                    <input
                      type="text"
                      placeholder="Serach..."
                      className="catogry_search_input_pro_page"
                      value={colorsearch}
                      onChange={handleSearchChangecolor}
                    />
                  </div>

                  {/* {allColor?.map((uniqueColor, id) => {
                    return (
                      <>
                        <div className="custom-checkbox">
                          <input
                            type="checkbox"
                            className="checkbox-input"
                            // className='checkbox-input-color'
                            onChange={(e) =>
                              addFilterByInput(e, uniqueColor.name)
                            }
                            id={uniqueColor.name}
                            name="color"
                            value={uniqueColor.name}
                            checked={includesFilter("color", uniqueColor.name)}
                          />
                          <label
                            htmlFor={uniqueColor.name}
                            className="custom-checkbox-label"
                          >
                            {uniqueColor.name}
                          </label>
                        </div>
                      </>
                    );
                  })} */}

                  {filteredColor?.map((uniqueColor, id) => {
                    return (
                      <div className="custom-checkbox" key={id}>
                        <input
                          type="checkbox"
                          className="checkbox-input"
                          onChange={(e) =>
                            addFilterByInput(e, uniqueColor.name)
                          }
                          id={uniqueColor.name}
                          name="color"
                          value={uniqueColor.name}
                          checked={includesFilter("color", uniqueColor.name)}
                        />
                        <label
                          htmlFor={uniqueColor.name}
                          className="custom-checkbox-label"
                        >
                          {uniqueColor.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ---------- */}
            <div
              className="size-filter"
              style={{ display: isVisible ? "block" : "none" }}
            >
              <div onClick={() => handleSizeMoreSize()} className="size-title">
                <span>Size</span>
                {Size ? (
                  <img src={select_more} alt="" />
                ) : (
                  <img src={plus} alt="" />
                )}
              </div>
              {Size && (
                <div className="main-select-size_ProductListing">
                  {/* ------ */}
                  <div className="catogry_inputBox">
                    <input
                      type="text"
                      placeholder="Serach..."
                      value={Sizesearch}
                      onChange={handleSearchChangeSize}
                      className="catogry_search_input_pro_page"
                    />
                  </div>
                  {/* ------- */}
                  {/* {allSize?.map((uniqueSize, id) => {
                    return (
                      <>
                        <div class="custom-checkbox ">
                          <input
                            onChange={(e) =>
                              addFilterByInput(e, uniqueSize.name)
                            }
                            type="checkbox"
                            name="size"
                            checked={includesFilter("size", uniqueSize.name)}
                            class="checkbox-input .checkbox-input-woman"
                            id={uniqueSize.name}
                          />
                          <label
                            for={uniqueSize.name}
                            class="custom-checkbox-label"
                          >
                            {uniqueSize.name}
                          </label>
                        </div>
                      </>
                    );
                  })} */}
                  <div className="size_ProductListing_box">
                    {filteredSize?.map((uniqueSize, id) => (
                      <div className="custom-checkbox" key={id}>
                        <input
                          type="checkbox"
                          onChange={(e) => addFilterByInput(e, uniqueSize.name)}
                          name="size"
                          checked={includesFilter("size", uniqueSize.name)}
                          className="checkbox-input checkbox-input-woman"
                          id={uniqueSize.name}
                        />
                        <label
                          htmlFor={uniqueSize.name}
                          className="custom-checkbox-label"
                        >
                          {uniqueSize.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* ------ */}
            <div
              className="pattern-filter"
              style={{ display: isVisible ? "block" : "none" }}
            >
              <div
                onClick={() => handleSizeMorePattern()}
                className="pattern-select"
              >
                <span>Pattern</span>
                {Pattern ? (
                  <img src={select_more} alt="" />
                ) : (
                  <img src={plus} alt="" />
                )}
              </div>

              {Pattern && (
                <div
                  style={{
                    overflow: "scroll",
                    overflowX: "hidden",
                    maxHeight: "30vh",
                  }}
                >
                  {/* ------ */}
                  <div className="catogry_inputBox">
                    <input
                      type="text"
                      placeholder="Serach..."
                      className="catogry_search_input_pro_page"
                      value={patternSearch}
                      onChange={handleSearchChangePattern}
                    />
                  </div>
                  {/* {allPattern?.map((uniquePattern, id) => (
                    <div key={id} className="custom-checkbox">
                      <input
                        onChange={(e) =>
                          addFilterByInput(e, uniquePattern.name)
                        }
                        name="pattern"
                        type="checkbox"
                        className="checkbox-input"
                        id={uniquePattern.name}
                        checked={includesFilter("pattern", uniquePattern.name)}
                      />
                      <label
                        htmlFor={uniquePattern.name}
                        className="custom-checkbox-label"
                      >
                        {uniquePattern.name}
                      </label>
                    </div>
                  ))} */}
                  {filteredPattern?.map((uniquePattern, id) => (
                    <div key={id} className="custom-checkbox">
                      <input
                        onChange={(e) =>
                          addFilterByInput(e, uniquePattern.name)
                        }
                        name="pattern"
                        type="checkbox"
                        className="checkbox-input"
                        id={uniquePattern.name}
                        checked={includesFilter("pattern", uniquePattern.name)}
                      />
                      <label
                        htmlFor={uniquePattern.name}
                        className="custom-checkbox-label"
                      >
                        {uniquePattern.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ------ */}
            <div
              className="pattern-filter"
              style={{ display: isVisible ? "block" : "none" }}
            >
              <div
                onClick={() => handleSizeMorePattern()}
                className="pattern-select"
              >
                <span>Price</span>
                {Pattern ? (
                  <img src={select_more} alt="" />
                ) : (
                  <img src={plus} alt="" />
                )}
              </div>

              {Pattern && (
                <div
                  style={{
                    overflow: "scroll",
                    overflowX: "hidden",
                    maxHeight: "30vh",
                  }}
                >
                  {/* ------ */}
                  <div className="catogry_inputBox">
                    <input
                      type="text"
                      placeholder="Serach..."
                      className="catogry_search_input_pro_page"
                      value={patternSearch}
                      onChange={handleSearchChangePattern}
                    />
                  </div>
                  {/*  */}
                  {filteredPattern?.map((uniquePattern, id) => (
                    <div key={id} className="custom-checkbox">
                      <input
                        onChange={(e) =>
                          addFilterByInput(e, uniquePattern.name)
                        }
                        name="pattern"
                        type="checkbox"
                        className="checkbox-input"
                        id={uniquePattern.name}
                        checked={includesFilter("pattern", uniquePattern.name)}
                      />
                      <label
                        htmlFor={uniquePattern.name}
                        className="custom-checkbox-label"
                      >
                        {uniquePattern.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
{/* --------------------------- */}
            <div className="more-filter"></div>

            {isMobile && (
              <div onClick={() => handleFilter()} style={{ marginTop: "25px" }}>
                Close
              </div>
            )}
          </div>

          <div className="pip-right-container">
            <div className="filtergrid-1">
              <div className="sort_by">
                <p
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  <b style={{ fontSize: "18px" }}>{params.id}</b>
                </p>
              </div>
              <div className="sort_by">
                <button onClick={handleFilter}>
                  <FontAwesomeIcon icon={faFilter} />{" "}
                </button>
              </div>

              <div onClick={() => handleSortby()} className="sort_by">
                <p className="pl">Sort by</p>
                {sortby ? (
                  <p className="pl">
                    <img
                      src={downarrow}
                      alt="alt"
                      onClick={() => handleSortby()}
                      className="rotate-dwnarr"
                    />
                  </p>
                ) : (
                  <p className="pl">
                    <img
                      src={downarrow}
                      alt="alt"
                      onClick={() => handleSortby()}
                    />
                  </p>
                )}
              </div>
              <p
                style={{
                  fontSize: `${productTitleFontSize}px`,
                  fontWeight: "600",
                }}
              >
                Products: {isLoading ? <>Loading...</> : totalCount}
              </p>

              {downArrow && (
                <div className="grid-show">
                  <label onClick={() => handleGridTwo()} class="square-radio">
                    <input
                      type="radio"
                      name="radio-group"
                      value="2"
                      checked={twoGrid}
                      onChange={handleRadioChange}
                    />
                    <span class="radio-custom"></span>2
                  </label>

                  <label onClick={() => handleGridThree()} class="square-radio">
                    <input
                      type="radio"
                      name="radio-group"
                      value="3"
                      checked={threeGrid}
                      onChange={handleRadioChange}
                    />
                    <span class="radio-custom"></span>3
                  </label>

                  <label onClick={() => handleGridFour()} class="square-radio">
                    <input
                      type="radio"
                      name="radio-group"
                      value="4"
                      checked={fourGrid}
                      onChange={handleRadioChange}
                    />
                    <span class="radio-custom"></span>4
                  </label>
                </div>
              )}

              {sortby && (
                <div className="grid-show-sortby">
                  <label
                    onClick={(e) => handleSortNewest(e, "sortBy", "new")}
                    for="Newest"
                    class="square-radio"
                  >
                    <input
                      type="radio"
                      id="Newest"
                      name="sortOption"
                      checked={sortStatus === "new"}
                      value="new"
                      onChange={(e) => setSortStatus(e.target.value)}
                    />
                    <span class="radio-custom"></span>
                    Newest
                  </label>
                  {/* <label
                  // onClick={(e) => handleSortNewest(e, "sortBy", "oldest")}
                  for="Oldest" class="square-radio">
                  <input
                    type="radio"
                    id="Oldest" />
                  <span class="radio-custom"></span>
                  Oldest
                </label> */}
                  <label
                    onClick={(e) =>
                      handleSortNewest(e, "sortBy", "price-low-to-high")
                    }
                    for="price-low-to-high"
                    class="square-radio"
                  >
                    <input
                      type="radio"
                      id="price-low-to-high"
                      name="sortOption"
                      checked={sortStatus === "price-low-to-high"}
                      value="price-low-to-high"
                      onChange={(e) => setSortStatus(e.target.value)}
                    />
                    <span class="radio-custom"></span>
                    Price Low To High
                  </label>
                  <label
                    onClick={(e) =>
                      handleSortNewest(e, "sortBy", "price-high-to-low")
                    }
                    for="price-high-to-low"
                    class="square-radio"
                  >
                    <input
                      type="radio"
                      id="price-high-to-low"
                      name="sortOption"
                      checked={sortStatus === "price-high-to-low"}
                      value="price-high-to-low"
                      onChange={(e) => setSortStatus(e.target.value)}
                    />
                    <span class="radio-custom"></span>
                    Price High To Low
                  </label>
                </div>
              )}
            </div>

            <div className="product_list">
              <div
                className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 sm:px-10 px-6 sm:py-6 py-8 w-auto`}
              >
                {filterData?.map((productItem, id) => {
                  ean_Code = productItem.ean_code;
                  return (
                    <>
                      {productItem?.featuredImage.includes("null") ? null : (
                        <div className={getGridClass()}>
                          <div
                            className={
                              numColumns === 2
                                ? "pip-sub-image-container-1 offer-container"
                                : "pip-sub-image-container offer-container"
                            }
                          >
                            <div>
                              {/* <Link
                                to={`/product-details?eon=${productItem.description.ean_code}&s=${productIdParam}&title=${productItem.product_title}`}
                                style={{
                                  textDecoration: "none",
                                  color: "#262626",
                                }}
                              >
                                <img
                                  style={
                                    {
                                      // height: `${heightOfProductImg}px`
                                    }
                                  }
                                  src={productItem.featuredImage}
                                  alt="alt"
                                  className="gallery-image rounded-lg women-product-img offer-image"
                                  // src="" alt='alt' className='women-product-img'
                                />
                                {(() => {
                                  const discountPrice =
                                    productItem.discountPrice !== null
                                      ? productItem.discountPrice
                                      : 0;
                                  const mrp =
                                    productItem.mrp !== undefined
                                      ? productItem.mrp
                                      : 0;
                                  const discountPercentage =
                                    mrp !== 0
                                      ? Math.round(
                                          ((mrp - discountPrice) / mrp) * 100
                                        )
                                      : 0;
                                  if (discountPercentage == 0) {
                                    return <></>;
                                  }
                                  return (
                                    <div className="ribbon">
                                      <span>
                                        {discountPercentage + "% off"}
                                      </span>
                                    </div>
                                  );
                                })()}
                              </Link> */}
                              <Carousel
                                infiniteLoop={true}
                                autoPlay={false}
                                showStatus={false}
                                showThumbs={false}
                                showIndicators={false}
                                emulateTouch={false}
                                className="custom-carousel"
                              >
                                {productItem.images.map((item, id) => {
                                  return (
                                    <>
                                      <div
                                        onClick={() => handleClick(productItem)}
                                      >
                                        <img
                                          style={
                                            {
                                              // height: `${heightOfProductImg}px`
                                            }
                                          }
                                          //  src={productItem.featuredImage}
                                          src={item.image}
                                          alt="alt"
                                          className="gallery-image rounded-lg women-product-img offer-image"
                                        />
                                        {(() => {
                                          const discountPrice =
                                            productItem.discountPrice !== null
                                              ? productItem.discountPrice
                                              : 0;
                                          const mrp =
                                            productItem.mrp !== undefined
                                              ? productItem.mrp
                                              : 0;
                                          const discountPercentage =
                                            mrp !== 0
                                              ? Math.round(
                                                  ((mrp - discountPrice) /
                                                    mrp) *
                                                    100
                                                )
                                              : 0;
                                          if (discountPercentage == 0) {
                                            return <></>;
                                          }
                                          return (
                                            <div className="ribbon">
                                              <span>
                                                {discountPercentage + "% off"}
                                              </span>
                                            </div>
                                          );
                                        })()}
                                      </div>
                                    </>
                                  );
                                })}
                              </Carousel>
                            </div>
                            {/* ------ */}
                            <div className="women-product-content">
                              <div>
                                <p className="title text-base md:text-lg lg:text-xl wishcartbtn_box">
                                  {productItem.product_title}

                                  <div className="wishlist_main_box">
                                    <button
                                      className="addtocart_with_wishlist"
                                      onClick={() =>
                                        handleAddToCart(productItem?.ean_code)
                                      }
                                    >
                                      <FaCartArrowDown className="iconcart" />
                                    </button>
                                    <p className="wishListIconMainDiv_ProductDetailPage_box">
                                      {codes.includes(productItem?.ean_code) ? (
                                        <img
                                          className="wishListIconImg_products"
                                          src={filledwishheart}
                                          alt="alt"
                                          onClick={() =>
                                            handleRemoveWishlist(
                                              productItem?.ean_code
                                            )
                                          }
                                        />
                                      ) : (
                                        <img
                                          className="wishListIconImg_products"
                                          src={emptywishheart}
                                          alt="Product Image"
                                          onClick={() =>
                                            handleLikeMethods(
                                              productItem?.ean_code
                                            )
                                          }
                                        />
                                      )}
                                    </p>
                                  </div>
                                </p>
                                <div className="price_wrapper">
                                  {(() => {
                                    const discountPrice =
                                      productItem.discountPrice !== null
                                        ? productItem.discountPrice
                                        : 0;
                                    const mrp =
                                      productItem.mrp !== undefined
                                        ? productItem.mrp
                                        : 0;
                                    const discountPercentage =
                                      mrp !== 0
                                        ? Math.round(
                                            ((mrp - discountPrice) / mrp) * 100
                                          )
                                        : 0;

                                    return (
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        {discountPrice === mrp ? (
                                          <span
                                            className="price"
                                            style={{ marginRight: "10px" }}
                                          ></span>
                                        ) : (
                                          <del
                                            className="price"
                                            style={{ marginRight: "10px" }}
                                          >
                                            ₹ {mrp !== 0 ? mrp : 0}
                                          </del>
                                        )}
                                        <p
                                          className="price text-lg md:text-sm lg:text-base"
                                          style={{ marginRight: "4px" }}
                                        >
                                          ₹{" "}
                                          {discountPrice !== 0
                                            ? discountPrice
                                            : 0}
                                        </p>

                                        {discountPrice === mrp ? (
                                          <></>
                                        ) : (
                                          <p className="price discount">
                                            ( {discountPercentage}% off )
                                          </p>
                                        )}
                                      </div>
                                    );
                                  })()}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {loading && <Loading />}
      </div>
      <Footer />
    </>
  );
}
