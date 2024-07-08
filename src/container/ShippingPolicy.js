



import React from 'react'
import '../styles/ShippingPolicy.css';
import ToolBar from '../component/toolbar'
import { Footer } from './footer'
import bottomline from '../svg/ShippingPolicy/bottomline.svg';
import { pagePaths } from '../utils/constant';

export default function ShippingPolicy() {
    return (
        <div>

            <ToolBar fontColor="#474747" logo="black" dropDown="#474747" icons="#474747" backGroundColor="white" stroke="black" />

            <div className='shipo-main-container'>
                <div className='shipo-sub-main-container'>
                    <h2 className='shipo-heading'>Shipping Policy</h2>

                    <div className='shipo-sub-container'>
                        <div className='shipo-text-container'>
                            <p className='shipo-text-content'>
                                We Offer FREE SHIPPING On Some Products And The Same Will Be Specified On The Product Description Page.
                            </p>
                            <p className='shipo-text-content'>
                                Octroi Charges, Wherever Applicable, Is Prepaid And Not To Be Borne By The Customer.
                            </p>
                            <p className='shipo-text-content'>
                                It Is Our Endeavor To Ship All Items In Your Order Together; However, This May Not Always Be Possible Due To Product Characteristics, Or Availability.
                            </p>

                            <p className='shipo-text-content'>
                                There May Be Restrictions On Accepting Orders For Delivery In Certain Pin Codes As A Product Cannot Be Shipped To Those Destinations. In Such Scenarios, The Order Will Not Be Accepted Online And A Message Will Be Displayed Requesting You To Provide An Alternate Pin Code.
                            </p>

                            <p className='shipo-text-content'>
                                Currently, Each Order May Be Shipped Only To A Single Shipping Address. If You Wish To Ship Products To Different Addresses, You Need To Place Different Order For Different Shipping Address. The delivery speeds available up to 7 Business Days.
                            </p>
                            <img src={bottomline} alt='alt' />
                            <p className='shipo-text-content'>Email Us At <a href='mailto:customercare@sizeupp.com'>customercare@sizeupp.com</a> Or Call Our Care Number 8655255488 In Case Of Any Assistance.*</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
