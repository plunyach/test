import React, { useCallback, useEffect, useState } from "react";
import "../styles/shopNow.css";
import backgroundImageImg from "../images/shopNowPayaterBG.png"
import axios from "axios";
import { Loader } from "rsuite";
import { useWindowSize } from "./checkSize";

let BackGroundIm;


const widthOutput = window.screen.width;
const heightOutput = window.screen.height;
const headingFontSize = (3.8 / 100) * widthOutput;
const showNowBtn = (10 / 100) * widthOutput;
const showNowBtnFontSize = (1 / 100) * widthOutput;
const backGroundImgHeight = (100 / 100) * heightOutput;




export const ShowNowPayLater = () => {

    const { width } = useWindowSize();
    const isMobile = width <= 768;
    const [data, setData] = useState([]);

    const fetchData = useCallback(async () => {
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
    return (<>
        {
            data.length > 0 ?
                data?.map((item, id) => {
                    BackGroundIm = isMobile ? item.mobile_image : item.image;
                    return (<>
                        {
                            item.index > 0 ?
                                <a
                                    href={(item?.link)}
                                >
                                    <div style={{
                                        backgroundImage: "url('" + BackGroundIm + "')",
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center center",
                                        width: "100%",
                                        display: "flex",
                                        zIndex: 1,
                                        height: `${isMobile ? "100vh !important" : backGroundImgHeight + "px"}`,
                                    }} className="mainDiv_shopNowPayLater">
                                    </div> </a> : null
                        }

                    </>)
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

    </>)
}