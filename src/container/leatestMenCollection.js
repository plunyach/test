import React from "react";
import { useContext } from "react";
import noteContext from "../context/noteContext";
import "../styles/homePage.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import HomePageBackground from "../images/homePageImg1.png1.png";
// import HomePageBackground from "../images/homePageImg1.png";
import ToolBar from "../component/toolbar";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import axios from "axios";
import { Loader } from "rsuite";

const widthOutput = window.screen.width;
const heightOutput = window.screen.height;

const backGroundImgHeight = (100 / 100) * heightOutput;

const headingFontSize = (3.8 / 100) * widthOutput;
const middleUnderLineWidth = (13 / 100) * widthOutput;
const middleUnderLineHeight = (0.1 / 100) * widthOutput;

const showNowBtn = (10 / 100) * widthOutput;
const showNowBtnFontSize = (1 / 100) * widthOutput;

// console.log("checking width of show btn", showNowBtn)

const mainDivStyle = {
  backgroundImage: `url(${HomePageBackground})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  // backgroundAttachment: "fixed",
  width: "100%",
  height: `${backGroundImgHeight}px`,
  display: "flex",
  zIndex: 1,
};


export const LeatestMenCollection = () => {
  const { setIsHome } = useContext(noteContext);
  const [data, setData] = useState([]);
  const [bannerData, setBannerData] = useState([]);

  const fetchData = useCallback(async () => {
    //api call
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/site/slider/all`;
      const res = await axios.get(url);
      const { data } = res;
      setData(data);
    } catch (error) { }
  }, []);

  const menPageLandingId = "men";

  useEffect(() => {
    fetchData();
    setIsHome(true);
  }, [fetchData]);



  return (
    <>
    <OwlCarousel
                    key={"MENSCOLLECTIOn"}
                    dots={false}
                    nav={true}
                    items={1}
                    loop
                    margin={10}
                  >
      {
        data.length > 0 ?
          data?.map((item, id) => {
            return (<>
              {
                
                  <>
                    {item?.banners?.map((bannersItem, id1) => {
                      return (
                        <div
                          key={id + id1}
                          style={{
                            backgroundImage: `url(${bannersItem.image})`,
                            backgroundSize: "cover",
                            height: "100vh",
                          }}
                          className="mainDiv_HomePage item"
                        >
                          <div className="innerMainDiv_HomePage">
                            <div className="bannerHeadding_HomePage">
                              <div className="bannerInnerMainDiv_HomePage">
                                <div className="bannerUpperHeading_Homepage">
                                  <h1
                                    className="UpperHeading_HomePage"
                                    style={{
                                      fontSize: `${headingFontSize * 0.7}px`,
                                      fontFamily: "",
                                    }}
                                  >
                                    {bannersItem.title}
                                  </h1>
                                </div>
                                <div className="bannerMiddleHeading_HomePage">
                                  <div
                                    style={{
                                      width: `${middleUnderLineWidth}px`,
                                      height: `${middleUnderLineHeight}px`,
                                    }}
                                    className="middleUnderLine"
                                  ></div>
                                  <div>
                                    {" "}
                                    <h1
                                      className="MiddleHeading_HomePage"
                                      style={{
                                        fontSize: `${headingFontSize}px`,
                                        padding: "0 0.5rem",
                                      }}
                                    >
                                      Create
                                    </h1>
                                  </div>
                                  <div
                                    style={{
                                      width: `${middleUnderLineWidth}px`,
                                      height: `${middleUnderLineHeight}px`,
                                    }}
                                    className="middleUnderLine"
                                  ></div>
                                </div>
                                <div className="bannerLowerHeading_HomePage">
                                  <h1
                                    className="LowerHeading_HomePage"
                                    style={{
                                      fontSize: `${headingFontSize * 1}px`,
                                    }}
                                  >
                                    {bannersItem.name}
                                  </h1>
                                </div>
                              </div>
                              <div className="showNowBtn_HoemPage">
                                <a href={bannersItem.link}>
                                  <button
                                    style={{
                                      width: `${showNowBtn}px`,
                                      fontSize: `${showNowBtnFontSize}px`,
                                    }}
                                  >
                                    Shop Now
                                  </button>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </> 
              }

            </>);
          }) : <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            height: `${backGroundImgHeight * 0.7}px`,

          }}>
            <h1
              style={{
                fontSize: `${showNowBtnFontSize * 1.2}px`
              }}
            >Slider Data is Loading...  Please Try After Sometime.  </h1><Loader size="xs" />
          </div>

      }
      </OwlCarousel>
    </>
  );
};
