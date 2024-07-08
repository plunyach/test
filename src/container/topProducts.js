import React, { useCallback, useEffect, useState } from "react";
import "../styles/topProducts.css";
import axios from "axios";
import { Loader } from "rsuite";
import { Link } from "react-router-dom";
import { useWindowSize } from "./checkSize";

const widthOutput = window.screen.width;
const heightOutput = window.screen.height;
const showNowBtnFontSize = (1.2 / 100) * widthOutput;
const backGroundImgHeight = (100 / 100) * heightOutput;

export const TopProducts = () => {
  const { width } = useWindowSize();
  const isMobile = width <= 768; 
  const menPageLandingId = "women";

  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/site/slider/all`;
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
      <div
        className="mainDiv_TopProducts h-auto w-full flex flex-col lg:flex-row justify-center"
      >
        {data.length > 0 ? (
          data?.map((item, id) => {
            return (
              <>
                {item?.index === 3 ? (
                  <>
                    {item?.banners?.map((bannerItems) => {
                      return (
                        <div className="lg:w-1/3 h-[50rem] relative flex flex-col justify-end w-full">
                          <div className="w-full h-full absolute top-0 left-0 overflow-hidden">
                            <Link
                              to={bannerItems.link}
                            >
                              <div
                                key={id}
                                style={{
                                  backgroundImage: `url(${isMobile ? bannerItems.mobile_image : bannerItems.image})`,
                                  backgroundSize: "cover",
                                }}
                                className="innerMainDiv_TopProducts"
                              >
                              </div>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </>
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
      </div>
    </>
  );
};
