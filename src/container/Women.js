import '../styles/ProductListing.css';
import React, { useState } from 'react';
import ToolBar from '../component/toolbar';
import pip_img1 from '../images/pip/ipi_img1.png';
import pip_img2 from '../images/pip/ipi_img2.png';
import pip_img3 from '../images/pip/ipi_img3.png';
import pip_img4 from '../images/pip/ipi_img4.png';
import filledwishheart from '../svg/pip/filledwishheart.svg';
import emptywishheart from '../svg/pip/emptywishheart.svg';
import select_more from '../svg/pip/select_more.svg';
import filtergridsvg from '../svg/pip/filtergridsvg.svg';
import filtersortby from '../svg/pip/filtersortby.svg';
import plus from '../svg/pip/plus.svg';
import downarrow from '../svg/pip/downarrow.svg';
import { pagePaths } from '../utils/constant';
import img1 from "../images/img1.jpg"
import { useCallback } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useReducer } from 'react';


const widthOutput = window.screen.width;
const productTitleFontSize = (1.1 / 100) * widthOutput;
const heightOfProductImg = (20 / 100) * widthOutput;

let filterAarray = [];
let uniqueSizeNumbers = [];
let filtredSizearrayItems = [];
let styleFilterArray = [];
let patternFilterArray = []

let colorFIlterArray = [];
let uniqueColorCode = [];
let uniqueStyleCode = [];
let uniquePatternCOde = []



export default function ProductListing() {
  const [numColumns, setNumColumns] = useState(2);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [Color, setColor] = useState(false);
  const [Style, setStyle] = useState(false);
  const [Pattern, setPattern] = useState(false);
  const [Size, setSize] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [downArrow, setDownarrow] = useState(false);
  const [sortby, setSortby] = useState(false);
  const [twoGrid, setTwoGrid] = useState(true)
  const [threeGrid, setThreeGrid] = useState(false)
  const [fourGrid, setFourGrid] = useState(false);
  const [filterSize, setFilterSize] = useState(filterAarray);
  const [filterColor, setFilterCOlor] = useState(colorFIlterArray)
  const [filterStyle, setFilterStyle] = useState(styleFilterArray)
  const [filterPattern, setFilterPattern] = useState(patternFilterArray)
  const [reducer, forceUpdate] = useReducer(x => x + 1, 0);
  const [sizeUniqueValue, setSizeUniqueValue] = useState(uniqueSizeNumbers)
  const [isChecked, setIsChecked] = useState(false)

  const [sizeFilterTag, setSizeFilterTag] = useState({
    tag: "",
    selectedSizeTag: ""
  })
  const [sizeFilterTagArray, setFilterTagArray] = useState([])

  uniqueSizeNumbers = [...new Set(filterAarray)];
  uniqueColorCode = [...new Set(filterColor)];
  uniqueStyleCode = [...new Set(filterStyle)];
  uniquePatternCOde = [...new Set(filterPattern)];

  ////
  const [data, setData] = useState([]);
  const [filterData, setFilteredData] = useState([]);
  const [filterColorData, setFilteredCOlorData] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  const [selectedStyle, setSelectedStyle] = useState({});
  const [selectedPattern, setSelectedPattern] = useState({});
  // const [sortBy, setSOrtBy] = useState(false)

  const atleastASizeSelected = Object.keys(selectedSize).length > 0;
  const atleastAColorSelected = Object.keys(selectedColor).length > 0;
  const atleastAStyleSelected = Object.keys(selectedStyle).length > 0;
  const atleastAPatternSelected = Object.keys(selectedPattern).length > 0;
  

  // console.log('list**** test', atleastAColorSelected)


  useEffect(() => {
    setFilteredData(data)
  }, [data])


  useEffect(() => {
    if (!atleastASizeSelected) {
      setFilteredData(data)
    } else {
      const list = data?.filter(({ description }) => selectedSize[description.size]);
      // console.log('list**** test', list)
      setFilteredData(list)
    }
  }, [selectedSize])

  useEffect(() => {
    setFilteredData(data)
  }, [data])

  useEffect(() => {
    if (!atleastAColorSelected) {
      setFilteredData(data)
    } else {
      const list = data.filter(({ description }) => selectedColor[description.color]);
      // console.log('list**** test', list)
      setFilteredData(list)
    }
  }, [selectedColor])



  useEffect(() => {
    if (!atleastAStyleSelected) {
      setFilteredData(data)
    } else {
      const list = data.filter(({ description }) => selectedStyle[description.style]);
      // console.log('list**** test', list)
      setFilteredData(list)
    }
  }, [selectedStyle])

  useEffect(() => {
    if (!atleastAPatternSelected) {
      setFilteredData(data)
    } else {
      const list = data.filter(({ description }) => selectedPattern[description.design_surface]);
      // console.log('list**** test', list)
      setFilteredData(list)
    }
  }, [selectedPattern])

  // console.log('filterData test****', filterColorData, selectedColor)


  ////
  let ean_Code = ""


  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const id = params.id;

  let productIdParam = ""

  const handleParamIdProductId = (id) => {
    if (id === "w") {
      return productIdParam = "w"
    } else {
      return productIdParam = "m"
    }
  }
  handleParamIdProductId(id)





  let token = JSON.parse(localStorage.getItem('items')) ? JSON.parse(localStorage.getItem('items')) : ""

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/site/product/all/category/${params.id}`, {
      method: "GET",

    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);

      })
      .catch((error) => console.log(error));
  }

  const fetchaddToWishList = (ean) => {
    setIsLike(true);
    const userData = {
      ean_code: ean
    };
    try {
      fetch((`${process.env.REACT_APP_BACKEND_URL}/user/wishlist/add`), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
        .then((response) => {
          // console.log("checking response", userData, response.status)
        })
        .catch(err =>
          console.log('error ', err)
        );
    } catch (error) {
      console.log(error)
    }
  }
  const fetchDeleteWishList = (ean) => {
    setIsLike(false);
    try {
      fetch((`${process.env.REACT_APP_BACKEND_URL}/user/wishlist/delete/${ean}`), {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      })
        .then((response) => {
          // console.log("checking response", response.status)
        })
        .catch(err =>
          console.log('error ', err)
        );
    } catch (error) {
      console.log(error)
    }
  }



  // console.log("checking data==>>", "==<><>===>>", data)

  // data?.map((filterItemSize, id) => {
  //   forceUpdate()
  //   return setFilterSize(filterItemSize.description.size)
  // })



  data?.filter((filterSIze, id) => {
    filterAarray.push(filterSIze.description.size)
    colorFIlterArray.push(filterSIze.description.color)
    styleFilterArray.push(filterSIze.description.style)
    patternFilterArray.push(filterSIze.description.design_surface)
  })

  useEffect(() => {
    fetchData()
    fetchaddToWishList()
    fetchDeleteWishList()
  }, [])

  // console.log("checking filtersizeItem", colorFIlterArray, uniqueColorCode)



  const handleRadioChange = (e) => {
    setNumColumns(parseInt(e.target.value));
  };

  const getGridClass = () => {
    if (numColumns === 2) {
      return 'two-column-grid';
    } else if (numColumns === 3) {
      return 'three-column-grid';
    } else if (numColumns === 4) {
      return 'four-column-grid';
    }
  };


  const handleDownArraw = () => {
    setDownarrow(!downArrow);
  }

  const handleSortby = () => {
    setSortby(!sortby)
  }
  const handleSizeMoreColor = () => {
    // console.log("color");
    setColor(!Color);
  }

  const handleSizeMoreStyle = () => {
    setStyle(!Style);
  }

  const handleSizeMoreSize = () => {
    setSize(!Size);
  }

  const handleSizeMorePattern = () => {
    setPattern(!Pattern);
  }

  const handleLikeMethods = () => {
    setIsLike(!isLike);
  }

  const handleGridTwo = () => {
    setTwoGrid(true);
    setThreeGrid(false);
    setFourGrid(false)
    setDownarrow(!downArrow)
  }
  const handleGridThree = () => {
    setTwoGrid(false);
    setThreeGrid(true);
    setFourGrid(false)
    setDownarrow(!downArrow)
  }
  const handleGridFour = () => {
    setTwoGrid(false);
    setThreeGrid(false);
    setFourGrid(true)
    setDownarrow(!downArrow)
  }


  const handleUniqueSize = (e, size, id) => {
    const { checked } = e.target
    let newSizeList = { ...selectedSize }
    if (checked) {
      newSizeList[size] = size
    } else {
      delete newSizeList[size];
    }
    setSelectedSize(newSizeList)
  }

  const handleUniqueColor = (e, color, id) => {
    const { checked } = e.target
    let newColoList = { ...selectedColor }
    if (checked) {
      newColoList[color] = color
    } else {
      delete newColoList[color];
    }
    setSelectedColor(newColoList)
  }


  const handleUniqueStyle = (e, style, id) => {
    const { checked } = e.target
    let newColoList = { ...selectedStyle }
    if (checked) {
      newColoList[style] = style
    } else {
      delete newColoList[style];
    }
    setSelectedStyle(newColoList)
  }
  const handleUniquePattern = (e, pattern, id) => {
    const { checked } = e.target
    let newColoList = { ...selectedStyle }
    if (checked) {
      newColoList[pattern] = pattern
    } else {
      delete newColoList[pattern];
    }
    setSelectedPattern(newColoList)
  }


  /// from here sort by code is Started

  // const handleSortNewest = (e, sortBy, sortCategories) => {
  //   try {
  //     fetch(`${process.env.REACT_APP_BACKEND_URL}/site/product/filtered?category=men&${sortBy}=${sortCategories}`, {
  //       method: "GET",
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         Authorization:
  //           `Bearer ${token}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // setData(data);
  //         // getAllCartItems({ data })
  //         console.log("checking n cart===>>>", data);
  //       })
  //       .catch(err =>
  //         console.log('error ', err)
  //       );
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div className='pip-main-container'>

      <ToolBar fontColor="#474747" logo="black" dropDown="#474747" icons="#474747" backGroundColor="white" stroke="black" />
      <div className='pip-submain-container'>

        <div className='pip-left-container'>
          <p>Add Filter</p>
          <div className='size-filter'>
            <div onClick={() => handleSizeMoreSize()} className='size-title'>
              <span>Size</span>
              {Size ?
                (<img src={select_more} />) :
                (<img src={plus} />)
              }
            </div>
            {Size && (<div className='main-select-size_ProductListing'>
              {
                uniqueSizeNumbers?.map((uniqueSize, id) => {
                  return (<>
                    <div class="custom-checkbox ">
                      <input onClick={(e) => handleUniqueSize(e, uniqueSize, id)} type="checkbox" class="checkbox-input" id={uniqueSize} />
                      <label for={uniqueSize} class="custom-checkbox-label">{uniqueSize}</label>
                    </div>
                  </>)
                })
              }

            </div>)}
          </div>

          <div className='style-filter'>
            <div onClick={() => handleSizeMoreStyle()} className='style-select'>
              <span>Style</span>
              {Style ?
                (<img src={select_more} />) :
                (<img src={plus} />)
              }
            </div>
            {Style && (<div>
              {
                uniqueStyleCode?.map((uniqueStyle, id) => {
                  return (<>
                    <div class="custom-checkbox ">
                      <input onClick={(e) => handleUniqueStyle(e, uniqueStyle, id)} type="checkbox" class="checkbox-input" id={uniqueStyle} />
                      <label for={uniqueStyle} class="custom-checkbox-label">{uniqueStyle}</label>
                    </div>
                  </>)
                })
              }
              {/* <p style={{ padding: "20px" }}>Not Selected any Style</p> */}
            </div>)}
          </div>

          <div className='color-filter'>
            <div onClick={() => handleSizeMoreColor()} className='color-select'>
              <span>Color</span>
              {Color ?
                (<img src={select_more} />) :
                (<img src={plus} />)
              }</div>

            {Color && (
              <div className='checkbox-sub-container-pip'>
                {
                  uniqueColorCode?.map((uniqueColor, id) => {
                    function camelize(str) {
                      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
                        return index === 0 ? word.toLowerCase() : word.toUpperCase();
                      }).replace(/\s+/g, '');
                    }
                    // console.log("checking color trim", uniqueColorCode)
                    return (<>
                      <div className="custom-radio">
                        <input className='colorCheckBor' onClick={(e) => handleUniqueColor(e, uniqueColor, id)} type="checkbox" id={uniqueColor} name="color" value={uniqueColor} />
                        <label style={{
                          background: `${camelize(uniqueColor)}`
                        }} for={uniqueColor} className='label-color1'></label>
                      </div>
                    </>)
                  })
                }
              </div>)}

          </div>

          <div className='pattern-filter'>
            <div onClick={() => handleSizeMorePattern()} className='pattern-select'><span>Pattern</span>
              {Pattern ?
                (<img src={select_more} />) :
                (<img src={plus} />)
              }</div>

            {Pattern && (<div>
              {
                uniquePatternCOde?.map((uniqueStyle, id) => {
                  return (<>
                    <div class="custom-checkbox ">
                      <input onClick={(e) => handleUniquePattern(e, uniqueStyle, id)} type="checkbox" class="checkbox-input" id={uniqueStyle} />
                      <label for={uniqueStyle} class="custom-checkbox-label">{uniqueStyle}</label>
                    </div>
                  </>)
                })
              }
            </div>)}
          </div>

          <div className='more-filter'>
          </div>

        </div>

        <div className='pip-right-container'>

          <div className='pip-heading-women'>
            <p style={{
              textTransform: "capitalize"
            }}>{params.id}</p>
            {params.sub ? <span>{params.sub} {params.subsub ? "/" : null}  {params.subsub}</span> : null}
          </div>

          <div className='filtergrid-1'>
            <div style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center"
            }}
              onClick={() => handleDownArraw()}

            >
              <p
              > <img src={filtergridsvg} alt='alt' /></p>
              {downArrow ? (
                <p style={{
                  paddingLeft: "1rem"
                }}><img src={downarrow} alt='alt' onClick={() => handleDownArraw()} className='rotate-dwnarr' /></p>) :
                (<p style={{
                  paddingLeft: "1rem"
                }}><img src={downarrow} alt='alt' onClick={() => handleDownArraw()} /></p>)}
            </div>
            <div
              onClick={() => handleSortby()}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer"
              }}
            >
              <p style={{
                paddingRight: "1rem"
              }}>Sort By</p>
              {sortby ? (
                <p><img src={downarrow} alt='alt' onClick={() => handleSortby()} className='rotate-dwnarr' /></p>) :
                (<p><img src={downarrow} alt='alt' onClick={() => handleSortby()} /></p>)}
            </div>

            {downArrow && (
              <div className='grid-show'>
                <label onClick={() => handleGridTwo()} class="square-radio">
                  <input type="radio" name="radio-group"
                    value="2"
                    checked={twoGrid}
                    onChange={handleRadioChange}
                  />
                  <span class="radio-custom"></span>
                  2
                </label>

                <label onClick={() => handleGridThree()} class="square-radio">
                  <input type="radio" name="radio-group"
                    value="3"
                    checked={threeGrid}
                    onChange={handleRadioChange}
                  />
                  <span class="radio-custom"></span>
                  3
                </label>

                <label onClick={() => handleGridFour()} class="square-radio">
                  <input type="radio" name="radio-group"
                    value="4"
                    checked={fourGrid}
                    onChange={handleRadioChange}
                  />
                  <span class="radio-custom"></span>
                  4
                </label>
              </div>
            )}


            {sortby && (
              <div className='grid-show-sortby'>

                <label
                  // onClick={(e) => handleSortNewest(e, "sortBy", "newest")}
                  for="Newest" class="square-radio">
                  <input
                    type="radio"
                    id="Newest" />
                  <span class="radio-custom"></span>
                  Newest
                </label>
                <label
                  // onClick={(e) => handleSortNewest(e, "sortBy", "oldest")}
                  for="Oldest" class="square-radio">
                  <input
                    type="radio"
                    id="Oldest" />
                  <span class="radio-custom"></span>
                  Oldest
                </label>
                <label
                  // onClick={(e) => handleSortNewest(e, "sortBy", "price-low-to-high")}
                  for="price-low-to-high" class="square-radio">
                  <input
                    type="radio"
                    id="price-low-to-high" />
                  <span class="radio-custom"></span>
                  Price Low To High
                </label>
                <label
                  // onClick={(e) => handleSortNewest(e, "sortBy", "offer")}
                  for="price-low-to-high" class="square-radio">
                  <input
                    type="radio"
                    id="offer" />
                  <span class="radio-custom"></span>
                  Offer
                </label>
              </div>
            )}
          </div>

          <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "center"
          }}>
            <div
              style={{
                width: "90%",
                display: "grid",
                gridTemplateColumns: `${twoGrid ? "repeat(2,1fr)" : (threeGrid ? "repeat(3,1fr)" : (fourGrid ? "repeat(4,1fr)" : null))}`
              }}>
              {filterData?.map((productItem, id) => {
                // console.log("checking productItem121232", productItem )
                ean_Code = productItem.ean_code

                return (
                  <div
                    className={getGridClass()}>
                    <a
                    // href={pagePaths.productDetailsPage}
                    >
                      <div className={numColumns === 2 ? 'pip-sub-image-container-1' : 'pip-sub-image-container'}>
                        <div className='women-product-img-container'>
                          <a
                            href={`/product-details?eon=${productItem.description.ean_code}&=${productIdParam}`}
                          >
                            <img style={{
                              // height: `${heightOfProductImg}px`
                            }}
                              src={productItem.featuredImage} alt='alt' className='women-product-img'
                            // src="" alt='alt' className='women-product-img'
                            />
                          </a>
                          {
                            !isLike ? (<img src={emptywishheart} alt='alt' className='emptyheart' onClick={() => fetchDeleteWishList(productItem.ean_code)} />) :
                              (<img src={filledwishheart} alt='alt' className='filledheart' onClick={() => fetchaddToWishList(productItem.ean_code)} />)
                          }
                        </div>
                        <div className='women-product-content'>
                          <p style={{
                            fontSize: `${productTitleFontSize}px`
                          }}>{productItem.product_title}</p>
                          <p style={{
                            fontSize: `${productTitleFontSize * 0.9}px`
                          }}>₹ {productItem.mrp}</p>
                        </div>
                      </div>
                    </a>

                  </div>
                )
              })}
            </div>
          </div>

          {/* <div className={getGridClass()}>
            <a
              href={pagePaths.productDetailsPage}
            >
              <div className={numColumns === 2 ? 'pip-sub-image-container-1' : 'pip-sub-image-container'}>
                <div className='women-product-img-container'>
                  <img src={img1} alt='alt' className='women-product-img' />
                  {
                    !isLike ? (<img src={emptywishheart} alt='alt' className='emptyheart' onClick={() => handleLikeMethods()} />) :
                      (<img src={filledwishheart} alt='alt' className='filledheart' onClick={() => handleLikeMethods()} />)
                  }
                </div>
                <div className='women-product-content'>
                  <p>yellow sweat t shirt</p>
                  <p>₹ 1499</p>
                </div>
              </div>
            </a>

            <div className={numColumns === 2 ? 'pip-sub-image-container-1' : 'pip-sub-image-container'}>
              <div className='women-product-img-container'>
                <img src={img1} alt='alt' className='women-product-img' />
                {
                  !isLike ? (<img src={emptywishheart} alt='alt' className='emptyheart' onClick={() => handleLikeMethods()} />) :
                    (<img src={filledwishheart} alt='alt' className='filledheart' onClick={() => handleLikeMethods()} />)
                }
              </div>
              <div className='women-product-content'>
                <p>yellow sweat t shirt</p>
                <p>₹ 1499</p>
              </div>

            </div>

            <div className={numColumns === 2 ? 'pip-sub-image-container-1' : 'pip-sub-image-container'}>
              <div className='women-product-img-container'>
                <img src={pip_img3} alt='alt' className='women-product-img' />
                {
                  !isLike ? (<img src={emptywishheart} alt='alt' className='emptyheart' onClick={() => handleLikeMethods()} />) :
                    (<img src={filledwishheart} alt='alt' className='filledheart' onClick={() => handleLikeMethods()} />)
                }
              </div>
              <div className='women-product-content'>
                <p>yellow sweat t shirt</p>
                <p>₹ 1499</p>
              </div>
            </div>

            <div className={numColumns === 2 ? 'pip-sub-image-container-1' : 'pip-sub-image-container'}>
              <div className='women-product-img-container'>
                <img src={pip_img4} alt='alt' className='women-product-img' />
                {
                  !isLike ? (<img src={emptywishheart} alt='alt' className='emptyheart' onClick={() => handleLikeMethods()} />) :
                    (<img src={filledwishheart} alt='alt' className='filledheart' onClick={() => handleLikeMethods()} />)
                }
              </div>

              <div className='women-product-content'>
                <p>yellow sweat t shirt</p>
                <p>₹ 1499</p>
              </div>
            </div>

            <div className={numColumns === 2 ? 'pip-sub-image-container-1' : 'pip-sub-image-container'}>
              <div className='women-product-img-container'>
                <img src={pip_img2} alt='alt' className='women-product-img' />
                {
                  !isLike ? (<img src={emptywishheart} alt='alt' className='emptyheart' onClick={() => handleLikeMethods()} />) :
                    (<img src={filledwishheart} alt='alt' className='filledheart' onClick={() => handleLikeMethods()} />)
                }
              </div>

              <div className='women-product-content'>
                <p>yellow sweat t shirt</p>
                <p>₹ 1499</p>
              </div>
            </div>

            <div className={numColumns === 2 ? 'pip-sub-image-container-1' : 'pip-sub-image-container'}>
              <div className='women-product-img-container'>
                <img src={pip_img3} alt='alt' className='women-product-img' />
                {
                  !isLike ? (<img src={emptywishheart} alt='alt' className='emptyheart' onClick={() => handleLikeMethods()} />) :
                    (<img src={filledwishheart} alt='alt' className='filledheart' onClick={() => handleLikeMethods()} />)
                }
              </div>

              <div className='women-product-content'>
                <p>yellow sweat t shirt</p>
                <p>₹ 1499</p>
              </div>
            </div>

            <div className={numColumns === 2 ? 'pip-sub-image-container-1' : 'pip-sub-image-container'}>
              <div className='women-product-img-container'>
                <img src={pip_img4} alt='alt' className='women-product-img' />
                {
                  !isLike ? (<img src={emptywishheart} alt='alt' className='emptyheart' onClick={() => handleLikeMethods()} />) :
                    (<img src={filledwishheart} alt='alt' className='filledheart' onClick={() => handleLikeMethods()} />)
                }
              </div>

              <div className='women-product-content'>
                <p>yellow sweat t shirt</p>
                <p>₹ 1499</p>
              </div>
            </div>

            <div className={numColumns === 2 ? 'pip-sub-image-container-1' : 'pip-sub-image-container'}>
              <div className='women-product-img-container'>
                <img src={pip_img1} alt='alt' className='women-product-img' />
                {
                  !isLike ? (<img src={emptywishheart} alt='alt' className='emptyheart' onClick={() => handleLikeMethods()} />) :
                    (<img src={filledwishheart} alt='alt' className='filledheart' onClick={() => handleLikeMethods()} />)
                }
              </div>

              <div className='women-product-content'>
                <p>yellow sweat t shirt</p>
                <p>₹ 1499</p>
              </div>
            </div>

          </div> */}
        </div>
      </div>
    </div>
  )
}
