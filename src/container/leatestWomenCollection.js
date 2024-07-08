import React, { useCallback, useEffect, useState } from "react";
import "../styles/leatestWomenCollection.css";
import backgroundImageImg from "../images/leatestMenCollectionBG.png";
import { pagePaths } from "../utils/constant";
import axios from "axios";
import { Loader } from "rsuite";

const widthOutput = window.screen.width;
const heightOutput = window.screen.height;
const headingFontSize = (3.8 / 100) * widthOutput;
const showNowBtn = (10 / 100) * widthOutput;
const showNowBtnFontSize = (1 / 100) * widthOutput;
const backGroundImgHeight = (100 / 100) * heightOutput;
let BackGroundIm;

export const LeatestWomenCollection = () => {
  const [data, setData] = useState([]);

  const backgroundImgTopSaller = {
    backgroundImage: `url(${BackGroundIm})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    width: "100%",
    display: "flex",
    zIndex: 1,
    height: `${backGroundImgHeight}px`,
  };


  const fetchData = useCallback(async () => {
    //api call
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/site/banner/all`;
      const res = await axios.get(url);
      const { data } = res;
      setData(data);
    } catch (error) { }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  return (
    <>
      {
        data.length > 0 ?
          data?.map((item, id) => {
            BackGroundIm = item.index === 4 ? item.image : null
            return (<>
              {
                item.index === 4 ?
                  <div
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center center",
                      width: "100%",
                      display: "flex",
                      zIndex: 1,
                      height: `${backGroundImgHeight}px`,
                    }}
                    className="mainDiv_LatestCollectionWomen"
                  >
                    <div className="innerMainDiv_LatestCollectionWomen">
                      <div className="bannerHeadding_LatestCollectionWomen">
                        <div className="bannerInnerMainDiv_LatestCollectionWomen">
                          <div className="bannerUpperHeading_LatestCollectionWomen">
                            <h1
                              className="UpperHeading_LatestCollectionWomen"
                              style={{
                                fontSize: `${headingFontSize}px`,
                              }}
                            >
                              latest women’s collection
                            </h1>
                          </div>
                        </div>
                        <div className="showNowBtn_LatestCollectionWomen">
                          <a href={item?.link}>
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
                  </div> : null
              }

            </>)
          }) :<div style={{
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

    </>
  );
};
