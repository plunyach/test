import React from "react";
import "../styles/topSallerWomen.css";
import topSallerImg1 from "../images/popularImgWomen1.png";
import topSallerImg2 from "../images/popularImgWomen2.png";
import topSallerImg3 from "../images/popularImgWomen3.png";

const TopSallerWomenImgArray = [
    {
        img: topSallerImg1,
        name: "Poloi Shirt",
        price: 2000,
    },
    {
        img: topSallerImg2,
        name: "Poloi Shirt2",
        price: 20002,
    },
    {
        img: topSallerImg3,
        name: "Poloi Shirt3",
        price: 20003,
    },
    {
        img: topSallerImg1,
        name: "Poloi Shirt4",
        price: 20004,
    },
]


const widthOutput = window.screen.width;
const heightOutput = window.screen.height;
const popularImgWidth = (18 / 100) * widthOutput;
const popularImgHeight = (20 / 100) * widthOutput;

const contentFontsize = (1 / 100) * widthOutput;
const contentPriceFontSize = (0.8 / 100) * widthOutput;
const vieDetailsFontSize = (0.6 / 100) * widthOutput;
const showNowBtnwidth = (10 / 100) * widthOutput;
const showBtnHeight = (3.5 / 100) * widthOutput;
const showNowFontSize = (1.31 / 100) * widthOutput;

const topSallerFontSize = (2.5 / 100) * widthOutput;





export const TopSallerWomen = () => {

    return (<>
        <div className="mainDiv_TopSallerWomen">
            <div className="innermainUpperDiv_TopSallerWomen">
                <div className="horizantalLine_TopSallerWomen"></div>
                <div className="horizantalLineName_TopSallerWomen">
                    <h1 style={{
                        fontSize: `${topSallerFontSize}px`
                    }}>Top Sallers</h1>
                </div>
                <div className="horizantalLine_TopSallerWomen"></div>

            </div>
            <div className="innerMainDiv_TopSallerWomen">
                {
                    TopSallerWomenImgArray?.map((img, id) => {
                        return (<>
                            <div
                                key={id}
                                style={{
                                    backgroundImage: `url(${(img.img)})`,
                                    width: `${popularImgWidth}px`,
                                    height: `${popularImgHeight}px`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                }}
                                className="topSallerImgDiv">
                                <div className="topSallerContentDiv_TopSallerWomen">
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "end",
                                            width: "100%",
                                            marginBottom: "5%"
                                        }}
                                    >
                                        <div>
                                            <h1 style={{
                                                fontSize: `${contentFontsize}px`
                                            }}>
                                                {img.name}
                                            </h1>
                                            <h2 style={{
                                                fontSize: `${contentPriceFontSize}px`
                                            }}>
                                                ₹{img.price}
                                            </h2>
                                        </div>
                                        <div>
                                            <h3 style={{
                                                fontSize: `${vieDetailsFontSize}px`
                                            }}>View Details</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>)
                    })
                }
            </div>
            <div className="viewAllBtn_TopSallerWomen">
                <button
                    style={{
                        width: `${showNowBtnwidth}px`,
                        height: `${showBtnHeight}px`,
                        fontSize: `${showNowFontSize}px`
                    }}
                >View All</button>
            </div>
        </div>
    </>)
}