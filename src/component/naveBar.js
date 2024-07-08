import React, { useState } from "react";
import "../styles/navBar.css";

const widthOutput = window.screen.width;
const fontsizeHeader = (1.2 / 100) * widthOutput;
const fontsizeContent = (0.8 / 100) * widthOutput;
const headerHeight = (3.5 / 100) * widthOutput;
const subContentWidth = (8 / 100) * widthOutput;


const menuArray = [
    {
        name: "Women",
        subContent: [
            {
                name: "Women",
                subName1: "Women Accessories1",

            },
            {
                name: "Women",
                subName2: "Women Accessories2",

            },
            {
                name: "Women",
                subName3: "Women Accessories3",
            }
        ]
    },
    {
        name: "Mens",
        subContent: [
            {
                name: "Mens",
                subName1: "Mens Accessories1",

            },
            {
                name: "Mens",
                subName2: "Mens Accessories2",

            },
            {
                name: "Mens",
                subName3: "Mens Accessories3",
            }
        ]
    },
    {
        name: "Super Savers",
        subContent: [
            {
                name: "Super Savers",
                subName1: "Super Accessories1",

            },
            {
                name: "Super Savers",
                subName2: "Super Accessories2",

            },
            {
                name: "Super Savers",
                subName3: "Super Accessories3",
            }
        ]
    },
]
const menuContentArray = [
    {
        name: "Ethic Ware"
    },
    {
        name: "co-ord set"
    },
    {
        name: "tops"
    },
    {
        name: "dresses"
    },
    {
        name: "shirts"
    },
    {
        name: "t-shirts"
    },
    {
        name: "sweatshirts"
    },
    {
        name: "denims"
    },
    {
        name: "pants"
    },
    {
        name: "ethnic pants"
    },
    {
        name: "tracks"
    },
    {
        name: "shorts & 3/4th"
    },
    {
        name: "jeggings"
    },
    {
        name: "leggings"
    },
]

const NavBar = () => {
    const [womenContent, setWomenContent] = useState(false)
    return (<>
        <div className="mainDiv_NavBar">
            <div className="innerMainDiv_NavBar">
                {
                    menuArray?.map((item, id) => {
                        return (<>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column"
                                }}
                            >
                                <div onClick={() => setWomenContent(!womenContent)} className="hoverContentDiv_NavBar" key={id}>
                                    <div style={{
                                        height: `${headerHeight}px`
                                    }} className="contentHeader_NavBar">
                                        <h1
                                            style={{
                                                fontSize: `${fontsizeHeader}px`,
                                                color: "#9C9C9C",
                                                fontWeight: "100"
                                            }}>{item.name}</h1>
                                    </div>

                                </div>
                            </div>
                        </>)
                    })
                }

            </div>
            {
                womenContent ?
                    <div className="mainLowerDiv_NavBar">
                        <div className="hoverContentDivLower_NavBar">
                            <div style={{
                                height: `${headerHeight}px`
                            }} className="contentHeaderLower_NavBar">
                                <h1
                                    style={{
                                        fontSize: `${fontsizeHeader}px`,
                                        // color: "#9C9C9C",
                                        fontWeight: "100"
                                    }}>Women
                                </h1>
                                <div className="subContentTitleMainDiv_NavBar">
                                    <div className="subContentTitle_NavBar">
                                        {
                                            menuContentArray?.map((item, id) => {
                                                return (<>
                                                    <div
                                                        key={id}
                                                        style={{
                                                            width: `${subContentWidth}px`
                                                        }}
                                                    >
                                                        <h1 style={{
                                                            fontSize: `${fontsizeContent}px`,
                                                            padding: "0.8rem",
                                                            fontWeight: "100",
                                                            textTransform: "capitalize"
                                                        }}>{item.name}</h1>
                                                    </div>
                                                </>)
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                height: `${headerHeight}px`
                            }} className="contentHeaderLower_NavBar">
                                <h1
                                    style={{
                                        fontSize: `${fontsizeHeader}px`,
                                        // color: "#9C9C9C",
                                        fontWeight: "100"
                                    }}>Women1
                                </h1>
                                <div className="subContentTitleMainDiv_NavBar">
                                    <div className="subContentTitle_NavBar">
                                        {
                                            menuContentArray?.map((item, id) => {
                                                return (<>
                                                    <div
                                                        key={id}
                                                        style={{
                                                            width: `${subContentWidth}px`
                                                        }}
                                                    >
                                                        <h1 style={{
                                                            fontSize: `${fontsizeContent}px`,
                                                            padding: "0.8rem",
                                                            fontWeight: "100",
                                                            textTransform: "capitalize"
                                                        }}>{item.name}</h1>
                                                    </div>
                                                </>)
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                           


                        </div>
                    </div> : null
            }

        </div >
    </>)
}

export default NavBar;


