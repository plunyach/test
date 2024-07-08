import axios from "axios";
import { useEffect, useState } from "react";
import ToolBar from "../component/toolbar";
import "../styles/cartPage.css";
import { Link, useParams } from "react-router-dom";
import { Footer } from "../container/footer";


export default function ShippingConfirmPage() {
    const { orderID } = useParams();
    const [orderStatus,setOrderStatus] = useState(false);
    useEffect(() => {
        let token = JSON.parse(localStorage.getItem("items"))
        ? JSON.parse(localStorage.getItem("items"))
        : "";

        
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/order/${orderID}`,
        {headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },}).then((response) => {
            if(response.data[0] != null || response.data[0] != undefined)
                {
                    if(response.data[0].paymentStatus == "Success")
                        {
                            setOrderStatus(true);
                        }
                }
        });
    });
    return (<div>
        <ToolBar
            fontColor="#474747"
            logo="black"
            dropDown="#474747"
            icons="#474747"
            backGroundColor="white"
            stroke="black"
        />
        <div className="mainDiv_CartPage" >
            <div style={{marginTop:'100px',textAlign:"center",paddingTop:'40px',paddingBottom:'40px'}}>
                {orderStatus == false ?
            (<><h2>Payment Failed</h2>
            <Link to={"/"}>Go To Home</Link> </>)    
                : 
            (<><h2>Payment Successfully Done</h2>
                <h4 style={{color:'grey'}}>Your Order Id Is : {orderID}</h4>
                <Link to={"/my-order-page"}>Go To Orders Page</Link> </>)
                }
                
                </div>
        </div>
        <Footer />
    </div>

    );
};