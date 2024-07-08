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
import { Link } from "react-router-dom";
import { useWindowSize } from "./checkSize";

const widthOutput = window.screen.width;
const heightOutput = window.screen.height;

const backGroundImgHeight = (100 / 100) * heightOutput;

const headingFontSize = (3.8 / 100) * widthOutput;
const middleUnderLineWidth = (13 / 100) * widthOutput;
const middleUnderLineHeight = (0.1 / 100) * widthOutput;

const showNowBtn = (10 / 100) * widthOutput;
const showNowBtnFontSize = (1 / 100) * widthOutput;

// console.log("checking width of show btn", showNowBtn)

// Adjust the mainDiv_HomePage style to ensure responsiveness
const mainDivStyle = {
  width: "100%", // Full width
  height: "auto", // Height auto to maintain aspect ratio
  display: "flex",
  justifyContent: "center", // Center the content
  alignItems: "center", // Align items vertically
  overflow: "hidden", // Prevents image from overflowing
};

const HomePageArray = [
  {
    BgImg: HomePageBackground,
    upperText: "Live your dance",
    middleText: "Create",
    lowerText: "Memories",
  },
  {
    BgImg: HomePageBackground,
    upperText: "Live your dance",
    middleText: "Create",
    lowerText: "Memories",
  },
  {
    BgImg: HomePageBackground,
    upperText: "Live your dance",
    middleText: "Create",
    lowerText: "Memories",
  },
  {
    BgImg: HomePageBackground,
    upperText: "Live your dance",
    middleText: "Create",
    lowerText: "Memories",
  },
];

let bGImage;

export const HomePage = () => {

  const { width } = useWindowSize();
  const isMobile = width <= 768; 
  const { setIsHome } = useContext(noteContext);
  const [data, setData] = useState([]);
  const [topslider, settopslider] = useState("");
  const [bannerData, setBannerData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/site/slider/all`;
      const res = await axios.get(url);
      const { data } = res;
      // Top Slider
      const url2 = `${process.env.REACT_APP_BACKEND_URL}/site/topheader/all`;
      const res2 = await axios.get(url2);
      const data2 = res2.data;
      settopslider(data2);
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
      {Array.isArray(topslider) &&
        topslider.map((data) => {
          return (
            <marquee scrollamount="6" className="marquee">
              <a href={data?.url} target="_blank">
                {data?.content}
              </a>
            </marquee>
          );
        })}
      <div className="toolBar_HomePage">
        <ToolBar
          fontColor="white"
          logo="white"
          dropDown="white"
          icons="white"
          backGroundColor="transparent"
          stroke="white"
        />
      </div>
      {data.length > 0 ? (
        data?.map((item, id) => {
          return (
            <>
              {item.index === 1 ? (
                <div className="sliderClass" style={{ width: '100%', overflow: 'hidden' }}>
                <OwlCarousel
                  key={id}
                  dots={false}
                  nav={true}
                  items={1}
                  loop
                  autoplay
                  autoplayTimeout={5000}
                  margin={10}
                >
                  {item?.banners?.map((bannersItem, id1) => {
                    return (
                      <Link
                      to={bannersItem.link}
                    >
                      <div
                        id={id + id1}
                        style={{
                          backgroundImage: `url(${isMobile ? bannersItem.mobile_image : bannersItem.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          width: '100%',
                           height:isMobile && '100vh'
                          // Ensure the div is full width
                        }}
                        className="mainDiv_HomePage item"
                      >
                       
                      </div>
                      </Link>
                    );
                  })}
                </OwlCarousel>
                </div>
              ) : null}
            </>
          );
        })
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            height: `${backGroundImgHeight * 0.7}px`,
          }}
        >
          <h1
            style={{
              fontSize: `${showNowBtnFontSize * 1.2}px`,
            }}
          >
            Slider Data is Loading... Please Try After Sometime.{" "}
          </h1>
          <Loader size="xs" />
        </div>
      )}
    </>
  );
};
