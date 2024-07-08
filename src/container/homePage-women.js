import React from "react";
import "../styles/homePage-women.css";
import HomePageWoMenIng from "../images/homePageWomenImg.png";


const widthOutput = window.screen.width;
const heightOutput = window.screen.height;

const headerFontSize = (3 / 100) * widthOutput;
const contentFontSize = (1.2 / 100) * widthOutput;
const showNowFontSize = (1.31 / 100) * widthOutput;
const topMarginHeight = (15 / 100) * heightOutput;

const showNowBtnwidth = (10 / 100) * widthOutput;
const showBtnHeight = (3.5 / 100) * widthOutput;

export const HomePageWomen = () => {
    return (<>
        <div className="mainDiv_HomePageWomen">
            <div className="innerMainDiv_HomePageWomen">
                <div className="innerMainDownDiv_HomePageWomen">
                    <img style={{
                        marginTop: `${-topMarginHeight}px`
                    }} src={HomePageWoMenIng} />
                </div>
                <div className="innerMianUpperDiv_HomePageWomen">
                    <div style={{
                        width: "70%"
                    }}>
                        <div>
                            <h1 style={{
                                fontSize: `${headerFontSize}px`
                            }}>Women</h1>
                        </div>
                        <div style={{
                            width: "80%"
                        }}>
                            <h2 style={{
                                fontSize: `${contentFontSize}px`
                            }}>Lörem ipsum diagebel spegt. Kroligt vimuren, norära, tinyssade fase. Vajusade plasm egonende ultrass, håplanade. Dolingar real pregt. Dev infranat. </h2>
                        </div>
                        <div className="viewAllBtn_HomePageWomen">
                            <button
                                style={{
                                    width: `${showNowBtnwidth}px`,
                                    height: `${showBtnHeight}px`,
                                    fontSize: `${showNowFontSize}px`
                                }}
                            >View All</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>)
}